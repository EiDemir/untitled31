'use client';

import {motion} from "framer-motion";
import {useContext, useEffect, useState} from "react";
import Image from "next/image";
import {clamp, fill, sum} from "lodash";
import axios from "axios";
import {MouseEvent} from "react";
import {toastEnd, toastStart} from "@/utils/toast";
import {CartItem} from "@/types";
import {fetchCardLocalStorage} from "@/utils/localStorage";
import {CartItemsNumberContext} from "@/store/CartItemsNumberContext";
import Link from "next/link";
import LoadingAnimation from "@/components/ui/LoadingAnimation";
import {TrashIcon} from "@heroicons/react/24/outline";
import {useRouter} from "next/navigation";

export const variants = {
    initial: {
        scale: 0.5,
        transition: {
            staggerChildren: 0.1
        }
    },
    animate: {
        transition: {
            staggerChildren: 0.1
        },
        scale: 1
    }
};

export const dotVariants = {
    initial: {
        y: -5
    }, animate: {
        y: 5
    }
};

export default function Cart({cartItems}: {
    cartItems?: CartItem[]
}) {
    const cartCtx = useContext(CartItemsNumberContext);
    const [items, setItems] = useState(cartItems);
    const [isLoading, setIsLoading] = useState(!cartItems);
    const [disabledButtons, setDisabledButtons] = useState(fill(Array(cartItems ? cartItems.length : 0), false));
    const router = useRouter();

    useEffect(() => {
        router.refresh();
    }, []);

    useEffect(() => {
        if (!cartItems) {
            fetchCardLocalStorage((items) => setItems(items));
        }
    }, [cartItems]);

    const subtotal = sum(!items ? [] : items.map(item => item.quantity * item.product!.price));
    const vat = (subtotal * 0.05);

    const changeQuantity = (operator: string, itemIndex: number) => {
        if (cartItems) {
            setDisabledButtons(prevState => prevState.map((item, index) => index === itemIndex ? true : item))
            axios.put('/api/cart', {
                cartItemId: items![itemIndex].id,
                quantity: items![itemIndex].quantity + (operator === '+' ? 1 : -1)
            }).then(() => {
                setDisabledButtons(prevState => prevState.map((item, index) => index === itemIndex ? false : item));
                setItems(prevState => prevState?.map((item, index) =>
                    index === itemIndex ? {
                        ...item,
                        quantity: clamp(item.quantity + (operator === '+' ? +1 : -1), 1, prevState[index].product!.quantity)
                    } : {...item}));
            }).catch(() => {
            })
                .finally(() => {
                });
        } else {
            const currentItems = JSON.parse(localStorage.getItem('cart-items') as string);
            const itemToBeChanged = currentItems[itemIndex];
            itemToBeChanged.quantity = clamp(itemToBeChanged.quantity + (operator === '+' ? +1 : -1), 1, items![itemIndex].product!.quantity);
            localStorage.setItem('cart-items', JSON.stringify(currentItems));
            setItems(prevState => prevState?.map((item, index) =>
                index === itemIndex ? {
                    ...item,
                    quantity: clamp(item.quantity + (operator === '+' ? +1 : -1), 1, prevState[index].product!.quantity)
                } : {...item}));
        }
    }

    const toggleRemoveItemButton = (event: MouseEvent<HTMLButtonElement>, cartItemId: string, itemIndex: number) => {
        if (cartItems) {
            event.currentTarget.disabled = true;
            const ts = toastStart('Deleting from Cart');
            axios.delete('/api/cart/' + cartItemId).then(() => {
                    cartCtx.setCartItemsNumber(prevState => prevState - 1);
                    toastEnd('Deleted from Cart', ts);
                    setItems(prevItems =>
                        prevItems!.filter(item => item.id !== cartItemId));
                    setDisabledButtons(prevState => prevState.filter((item, index) => index === itemIndex));
                }
            ).catch(() => {
                event.currentTarget.disabled = false;
            });
        } else {
            cartCtx.setCartItemsNumber(prevState => prevState - 1);
            const currentItems = JSON.parse(localStorage.getItem('cart-items') as string);
            localStorage.setItem('cart-items', JSON.stringify(currentItems.filter((item: CartItem, index: number) => index !== itemIndex)));
            setItems(prevItems =>
                prevItems!.filter((item, index) => index !== itemIndex));
        }
    };

    return (
        <div className='flex flex-col lg:flex-row gap-8'>
            {items && items.length > 0 ?
                <div className='flex flex-col gap-y-7 lg:w-2/3'>
                    <table
                        className='h-min rounded-3xl table-auto text-sm ring-1 ring-[#E4E4E4] ring-inset'>
                        <thead className='bg-[#E4E4E4] drop-shadow-sm h-12'>
                        <tr className='font-medium'>
                            <th className='py-4 pl-5 text-start rounded-l-3xl'>PRODUCT</th>
                            <th className='py-4 text-start'>PRICE</th>
                            <th className='py-4 text-start'>QUANTITY</th>
                            <th className='py-4 text-start rounded-r-3xl'>SUBTOTAL</th>
                        </tr>
                        </thead>
                        <tbody className='divide-y divide-[#E4E4E4]'>
                        {items.map((item, index) =>
                            <motion.tr layout transition={{duration: 0.2}}
                                       key={item.product?.images[0]! + item.color + item.size}
                                       className=''>
                                <td className='flex sm:flex-row flex-col gap-5 justify-start sm:items-center py-4 pl-5 pr-2'>
                                    <Link prefetch={false} href={'/product/' + item.product!.id}>
                                        <Image
                                            className='cursor-pointer rounded-xl object-cover max-w-[15vw] lg:max-w-[8vw]'
                                            src={item.product!.images[0]}
                                            alt="Product's image" width={133.3} height={200}/>
                                    </Link>
                                    <div className='flex flex-col'>
                                        <Link prefetch={false}
                                              href={'/product/' + item.product!.id}>{item.product!.name}</Link>
                                        {item.color &&
                                            <p className='text-sm text-[#767676] capitalize'>Color: {item.color}</p>}
                                        {item.size &&
                                            <p className='text-sm text-[#767676]'>Size: <p className='uppercase'>{item.size}</p></p>}
                                        <button
                                            onClick={(event) => toggleRemoveItemButton(event, item.id!, index)}
                                            className='flex gap-x-1 text-red-500 text-sm font-medium mt-3 items-center'><TrashIcon
                                            className='w-5 h-auto'/><p className='pt-0.5'>DELETE</p></button>
                                    </div>
                                </td>
                                <td>${item.product!.price}</td>
                                <td>
                                    <div
                                        className='flex flex-row w-28 h-14 ring-1 ring-[#E4E4E4] ring-inset items-center justify-center rounded-full'>
                                        <motion.button layout disabled={disabledButtons[index]}
                                                       type='button'
                                                       className={`pl-2 w-full h-full ${disabledButtons[index] ? 'text-sm' : 'text-xl'}`}
                                                       onClick={() => changeQuantity('-', index)}>-
                                        </motion.button>
                                        {disabledButtons[index] ?
                                            <LoadingAnimation color='000000'/> :
                                            <input readOnly
                                                   className='w-9 border-transparent focus:border-transparent focus:ring-0 p-0 text-center text-[#222222]'
                                                   type='number'
                                                   value={item.quantity.toString()} step='1'
                                                   min='0' max='10'/>}
                                        <motion.button layout disabled={disabledButtons[index]}
                                                       type='button'
                                                       className={`pr-2 w-full h-full ${disabledButtons[index] ? 'text-sm' : 'text-xl'}`}
                                                       onClick={() => changeQuantity('+', index)}>+
                                        </motion.button>
                                    </div>
                                </td>
                                <td className='pr-5'>
                                    <div className='flex justify-between'>
                                        ${(item.quantity * item.product!.price).toFixed(2)}
                                    </div>
                                </td>
                            </motion.tr>)}
                        </tbody>
                    </table>
                    <div
                        className='rounded-full bg-white max-w-[400px] ring-1 ring-[#E4E4E4] h-12 ring-inset flex justify-between items-center'>
                        <input type='email' placeholder='Coupon Code'
                               className='border-transparent focus:border-transparent focus:ring-0 p-0 w-full text-sm my-3 mx-4 placeholder-[#767676]'/>
                        <button type='button'
                                className='rounded-full px-4 w-56 h-full text-sm font-medium bg-[#E4E4E4] hover:bg-[#222222] hover:text-white'>APPLY
                            COUPON
                        </button>
                    </div>
                </div> :
                <div className='md:w-2/3 my-24 md:my-0 flex items-center justify-center text-xl font-medium'>
                    {isLoading && !items ? 'Loading...' : 'Your Cart is Empty.'}
                </div>
            }
            <div className='lg:w-1/3 lg:sticky top-0 flex flex-col gap-y-5'>
                <div className='p-8 h-min rounded-3xl ring-1 ring-inset ring-[#222222] bg-white/50 backdrop-blur-md'>
                    <h1 className='font-medium mb-6'>CART TOTALS</h1>
                    <div className='divide-y'>
                        <div className='font-medium py-4 text-sm grid grid-cols-2'>
                            SUBTOTAL
                            <p className='pl-4'>${subtotal.toFixed(2)}</p>
                        </div>
                        <div className='font-medium py-4 text-sm grid grid-cols-2'>
                            SHIPPING
                            <p className='pl-4'>FREE SHIPPING</p>
                        </div>
                        <div className='font-medium py-4 text-sm grid grid-cols-2'>
                            VAT (5%)
                            <p className='pl-4'>${vat.toFixed(2)}</p>
                        </div>
                        <div className='font-medium py-4 text-sm grid grid-cols-2'>
                            TOTAL
                            <p className='pl-4'>${(subtotal + vat).toFixed(2)}</p>
                        </div>
                    </div>
                </div>
                <button disabled={!(items && items.length > 0)} type='button'
                        className='hover:bg-black disabled:bg-[#E4E4E4] disabled:drop-shadow-none drop-shadow-lg rounded-full h-14 bg-[#222222] font-medium text-sm text-white'>
                    <Link href='/checkout' prefetch={false}>
                        PROCEED TO CHECKOUT
                    </Link>
                </button>
            </div>
        </div>
    );
}
