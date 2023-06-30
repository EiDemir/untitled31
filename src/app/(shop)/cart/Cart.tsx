'use client';

import {motion} from "framer-motion";
import {useContext, useEffect, useState} from "react";
import Image from "next/image";
import {clamp, fill, sum} from "lodash";
import {XMarkIcon} from "@heroicons/react/24/outline";
import axios from "axios";
import {MouseEvent} from "react";
import {toastEnd, toastStart} from "@/utils/toast";
import {CartItem} from "@/types";
import {fetchCardLocalStorage} from "@/utils/localStorage";
import {CartItemsNumberContext} from "@/store/CartItemsNumberContext";
import {useRouter} from "next/navigation";
import Link from "next/link";

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
    const router = useRouter();
    const cartCtx = useContext(CartItemsNumberContext);
    const [items, setItems] = useState(cartItems ?? []);
    const [disabledButtons, setDisabledButtons] = useState(fill(Array(cartItems ? cartItems.length : 0), false));

    useEffect(() => {
        if (!cartItems) {
            fetchCardLocalStorage((items) => setItems(items));
        }
    }, [cartItems]);

    const subtotal = sum(items.map(item => item.quantity * item.product!.price));
    const vat = (subtotal * 0.05);

    const changeQuantity = (operator: string, itemIndex: number) => {
        if (cartItems) {
            setDisabledButtons(prevState => prevState.map((item, index) => index === itemIndex ? true : item))
            axios.put('/api/cart', {
                cartItemId: items[itemIndex].id,
                quantity: items[itemIndex].quantity + (operator === '+' ? 1 : -1)
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
            itemToBeChanged.quantity = clamp(itemToBeChanged.quantity + (operator === '+' ? +1 : -1), 1, items[itemIndex].product!.quantity);
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
                        prevItems.filter(item => item.id !== cartItemId));
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
                prevItems.filter((item, index) => index !== itemIndex));
        }
    };

    return (
        <div className='relative mx-[3.6vw] sm:mx-[5vw] lg:mx-[10vw] my-20 flex flex-col gap-y-12'>
            <motion.h1 initial={{y: 10, opacity: 0}} animate={{y: 0, opacity: 1}}
                       className='font-bold text-3xl sm:text-4xl'>CART
            </motion.h1>
            <div className='flex flex-col gap-y-3'>
                <div className='flex'>
                    <div className='w-1/3 flex gap-x-2.5'>
                        <span className='text-[#222222] text-lg font-medium'>01</span>
                        <div>
                            <h1 className='text-[#222222] text-lg font-medium'>SHOPPING BAG</h1>
                            <p className='text-[#767676] text-sm'>Manage Your Items List</p>
                        </div>
                    </div>
                    <div className='w-1/3 flex gap-x-2.5'>
                        <span className='text-[#767676] text-lg font-medium'>02</span>
                        <div>
                            <h1 className='text-[#767676] text-lg font-medium'>SHIPPING AND CHECKOUT</h1>
                            <p className='text-[#767676] text-sm'>Checkout Your Items List</p>
                        </div>
                    </div>
                    <div className='w-1/3 flex gap-x-2.5'>
                        <span className='text-[#767676] text-lg font-medium'>03</span>
                        <div>
                            <h1 className='text-[#767676] text-lg font-medium'>CONFIRMATION</h1>
                            <p className='text-[#767676] text-sm'>Review and Submit Your Order</p>
                        </div>
                    </div>
                </div>
                <div className='relative w-full h-0.5 bg-[#E4E4E4]'>
                    <motion.div initial={{width: '0'}} animate={{width: '33.333333%'}}
                                className='absolute h-0.5 bg-[#222222]'/>
                </div>
            </div>
            <div className='flex gap-x-8'>
                {items.length ?
                    <div className='flex flex-col gap-y-7 w-2/3'>
                        <table
                            className='h-min rounded-3xl table-auto text-sm ring-1 ring-[#E4E4E4] ring-inset'>
                            <thead className='bg-[#E4E4E4] drop-shadow-sm h-12'>
                            <tr className='font-medium'>
                                <th className='py-4 pl-5 w-1/2 text-start rounded-l-3xl'>PRODUCT</th>
                                <th className='py-4 text-start'>PRICE</th>
                                <th className='py-4 text-start w-1/5'>QUANTITY</th>
                                <th className='py-4 text-start w-1/5 rounded-r-3xl'>SUBTOTAL</th>
                            </tr>
                            </thead>
                            <tbody className='divide-y divide-[#E4E4E4]'>
                            {items.map((item, index) =>
                                <motion.tr layout transition={{duration: 0.2}}
                                           key={item.product?.images[0]! + item.color + item.size}
                                           className=''>
                                    <td className='flex gap-x-5 items-center py-4 pl-5'>
                                        <Image onClick={() => router.push('/product/' + item.product!.id)}
                                               className='cursor-pointer h-full rounded-3xl object-cover aspect-[1/1]'
                                               src={item.product!.images[0]}
                                               alt="Product's image" width='120' height='120'/>
                                        <div className='flex flex-col'>
                                            <Link href={'/product/' + item.product!.id}>{item.product!.name}</Link>
                                            {item.color &&
                                                <p className='text-sm text-[#767676]'>Color: {item.color}</p>}
                                            {item.size &&
                                                <p className='text-sm text-[#767676]'>Size: {item.size}</p>}
                                        </div>
                                    </td>
                                    <td className=''>${item.product!.price}</td>
                                    <td className=''>
                                        <div
                                            className='flex flex-row w-28 h-14 ring-1 ring-[#E4E4E4] ring-inset items-center justify-center rounded-full'>
                                            <motion.button layout disabled={disabledButtons[index]}
                                                           type='button'
                                                           className='w-7 h-full'
                                                           onClick={() => changeQuantity('-', index)}>-
                                            </motion.button>
                                            {disabledButtons[index] ?
                                                <motion.div className='px-1' initial='initial' animate='animate'
                                                            variants={variants}
                                                            style={{display: 'flex', columnGap: '4px'}}>
                                                    <motion.span variants={dotVariants}
                                                                 transition={{
                                                                     ease: 'easeInOut',
                                                                     duration: 0.5,
                                                                     repeatType: 'reverse',
                                                                     repeat: Infinity
                                                                 }}
                                                                 style={{
                                                                     width: '10px',
                                                                     height: '10px',
                                                                     background: '#222222',
                                                                     borderRadius: '50%'
                                                                 }}/>
                                                    <motion.span variants={dotVariants}
                                                                 transition={{
                                                                     ease: 'easeInOut',
                                                                     duration: 0.5,
                                                                     repeatType: 'reverse',
                                                                     repeat: Infinity
                                                                 }}
                                                                 style={{
                                                                     width: '10px',
                                                                     height: '10px',
                                                                     background: '#222222',
                                                                     borderRadius: '50%'
                                                                 }}/>
                                                    <motion.span variants={dotVariants}
                                                                 transition={{
                                                                     ease: 'easeInOut',
                                                                     duration: 0.5,
                                                                     repeatType: 'reverse',
                                                                     repeat: Infinity
                                                                 }}
                                                                 style={{
                                                                     width: '10px',
                                                                     height: '10px',
                                                                     background: '#222222',
                                                                     borderRadius: '50%'
                                                                 }}/>
                                                </motion.div> :
                                                <input readOnly
                                                       className='border-transparent focus:border-transparent focus:ring-0 p-0 text-center text-[#222222]'
                                                       type='number'
                                                       value={item.quantity.toString()} step='1'
                                                       min='0' max='10'/>}
                                            <motion.button layout disabled={disabledButtons[index]}
                                                           type='button'
                                                           className='w-7 h-full'
                                                           onClick={() => changeQuantity('+', index)}>+
                                            </motion.button>
                                        </div>
                                    </td>
                                    <td className='pr-5'>
                                        <div className='flex justify-between'>
                                            ${(item.quantity * item.product!.price).toFixed(2)}
                                            <button
                                                onClick={(event) => toggleRemoveItemButton(event, item.id!, index)}
                                                className='disabled:text-[#E4E4E4] text-[#222222]'><XMarkIcon
                                                className='w-5 h-auto'/></button>
                                        </div>
                                    </td>
                                </motion.tr>)}
                            </tbody>
                        </table>
                        <motion.div layout
                                    whileTap={{
                                        scale: 0.9
                                    }}
                                    transition={{
                                        ease: 'easeOut'
                                    }}
                                    className='rounded-full bg-white max-w-[400px] ring-1 ring-[#E4E4E4] h-12 ring-inset flex justify-between items-center'>
                            <input type='email' placeholder='Coupon Code'
                                   className='border-transparent focus:border-transparent focus:ring-0 p-0 w-full text-sm my-3 mx-4 placeholder-[#767676]'/>
                            <button type='button'
                                    className='rounded-r-full px-4 w-56 h-full text-sm font-medium bg-[#E4E4E4] hover:bg-[#222222] hover:text-white'>APPLY
                                COUPON
                            </button>
                        </motion.div>
                    </div> :
                    <div className='w-2/3 flex items-center justify-center text-xl font-medium'>
                        Your Cart is Empty.
                    </div>
                }
                <div className='w-1/3 sticky top-0 flex flex-col gap-y-5'>
                    <div className='p-8 h-min rounded-3xl ring-1 ring-[#222222] bg-white/50 backdrop-blur-md'>
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
                    <button disabled={!items.length} onClick={() => {
                    }} type='button'
                            className='hover:bg-black disabled:bg-[#E4E4E4] disabled:drop-shadow-none drop-shadow-lg rounded-full h-14 bg-[#222222] font-medium text-sm text-white'>
                        PROCEED TO CHECKOUT
                    </button>
                </div>
            </div>
        </div>
    );
}