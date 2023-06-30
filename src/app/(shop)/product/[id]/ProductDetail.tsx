'use client';

import {useContext, useEffect, useState} from "react";
import {clamp, floor} from "lodash";
import {motion} from "framer-motion";
import {HeartIcon} from "@heroicons/react/24/outline";
import {HeartIcon as HeartSolid} from "@heroicons/react/24/solid"
import axios from "axios";
import {toastEnd, toastStart} from "@/utils/toast";
import {useRouter} from "next/navigation";
import {CartItemsNumberContext} from "@/store/CartItemsNumberContext";

export default function ProductDetail({productDetail, user}: {
    productDetail: {
        name: string,
        price: number,
        id: string,
        maxQuantity: number,
        colors: string[],
        sizes: string[]
    }, user: { addedToWishlist: boolean, quantity: number } | null
}) {
    const cartCtx = useContext(CartItemsNumberContext);
    const [selectedOptions, setSelectedOptions] = useState({
        color: productDetail.colors.length ? productDetail.colors[floor(productDetail.colors.length / 2)] : 'null',
        size: productDetail.sizes.length ? productDetail.sizes[floor(productDetail.sizes.length / 2)] : 'null'
    });
    const [quantity, setQuantity] = useState(1);
    const [isHovered, setIsHovered] = useState(false);
    const [isAddedToCart, setIsAddedToCart] = useState<number>(!user ? 0 : user.quantity);
    const [isAddedToWishlist, setIsAddedToWishlist] = useState<boolean>(!user ? false : user.addedToWishlist);
    const [isWishlistButtonDisabled, setIsWishlistButtonDisabled] = useState(false);
    const [isCartButtonDisabled, setIsCartButtonDisabled] = useState(false);
    const router = useRouter();

    useEffect(() => {
        if (!user)
            router.prefetch('/auth/login');
    }, [router, user]);

    const toggleFavoriteButton = () => {
        if (user) {
            setIsWishlistButtonDisabled(true);
            const ts = toastStart(isAddedToWishlist ? 'Deleting from Wishlist' : 'Adding to Wishlist');
            (isAddedToWishlist ? axios.delete : axios.put)
            ('/api/favorites/' + productDetail.id)
                .then(() => {
                    toastEnd(isAddedToWishlist ? 'Deleted from Wishlist' : 'Added to Wishlist', ts);
                    setIsAddedToWishlist(prevState => !prevState);
                }).catch()
                .finally(() => setIsWishlistButtonDisabled(false));
        } else {
            router.push('/auth/login');
        }
    }

    const toggleCartButton = () => {
        setIsCartButtonDisabled(true);
        const ts = toastStart('Adding to Your Cart');
        if (user) {
            axios.post('/api/cart', {
                productId: productDetail.id,
                quantity,
                color: selectedOptions.color,
                size: selectedOptions.size
            }).then(() => {
                cartCtx.setCartItemsNumber(prevState => prevState + 1);
                toastEnd('Added to Your cart', ts);
            }).catch(() => toastEnd("Already in Your Cart", ts, true))
                .finally(() => setIsCartButtonDisabled(false));
        } else {
            const data = localStorage.getItem('cart-items');
            const items: {
                productId: string,
                quantity: number,
                color: string,
                size: string
            }[] = data !== null ? JSON.parse(data) : [];

            if (items.filter(item =>
                item.size === selectedOptions.size &&
                item.color === selectedOptions.color &&
                item.productId === productDetail.id).length) {
                setTimeout(() => {
                    toastEnd("Already in Your Cart", ts, true);
                    setIsCartButtonDisabled(false);
                }, 1000);
            } else {
                items.push({
                    productId: productDetail.id,
                    quantity,
                    color: selectedOptions.color,
                    size: selectedOptions.size
                });
                localStorage.setItem('cart-items', JSON.stringify(items));
                setTimeout(() => {
                    cartCtx.setCartItemsNumber(prevState => prevState + 1);
                    toastEnd('Added to Your cart', ts);
                    setIsCartButtonDisabled(false);
                }, 1000);
            }
        }
    }

    const changeQuantity = (operator: string) => setQuantity(
        clamp(quantity + (operator === '+' ? 1 : -1), 1, productDetail.maxQuantity));

    return (
        <div className='px-[3.6vw] sm:px-0 sm:w-5/12 flex flex-col gap-y-1'>
            <p className='mb-6 text-sm font-medium text-[#222222] leading-none'>HOME / THE SHOP</p>
            <p className='text-[1.625rem] text-[#222222]'>{productDetail.name}</p>
            <p className='font-medium text-[1.375rem] text-[#222222]'>${productDetail.price}</p>
            <p className='font-sm my-6 text-[#222222]'>Phasellus sed volutpat orci. Fusce eget lore mauris vehicula
                elementum gravida
                nec dui. Aenean
                aliquam varius ipsum, non ultricies tellus sodales eu. Donec dignissim viverra nunc, ut aliquet
                magna posuere eget.
            </p>
            {productDetail.sizes.length > 0 &&
                <div className='flex items-center mb-6'>
                    <p className='min-w-[75px] font-medium'>Sizes</p>
                    <div className='flex flex-wrap gap-3'>
                        {productDetail.sizes.map(size =>
                            <motion.span
                                whileTap={{scale: 0.9}}
                                animate={{
                                    scale: selectedOptions.size === size ? [0.9, 1] : 1
                                }}
                                transition={{duration: 0.2, ease: 'easeIn'}}
                                onClick={() => setSelectedOptions(prevState =>
                                    ({...prevState, size}))} className={`${selectedOptions.size === size ?
                                'ring-[#222222]' : 'ring-[#E4E4E4]'} ring-inset rounded-full bg-transparent transition-colors cursor-pointer ring-1 py-1 w-11 text-center`}
                                key={size}>{size}</motion.span>)}
                    </div>
                </div>
            }
            {productDetail.colors.length > 0 &&
                <div className='flex items-center mb-6'>
                    <p className='min-w-[75px] font-medium'>Colors</p>
                    <div className='flex gap-x-3'>
                        {productDetail.colors.map(color =>
                            <motion.span
                                initial={false}
                                whileTap={{scale: 0.9}}
                                animate={{
                                    scale: 1,
                                    border: selectedOptions.color === color ? '6px solid white' : '0px solid white'
                                }}
                                transition={{duration: 0.2, ease: 'easeIn'}}
                                onClick={() => setSelectedOptions(prevState =>
                                    ({...prevState, color}))}
                                style={{background: color}}
                                className={`${selectedOptions.color === color ?
                                    'ring-2 ring-[#222222]' : ''} rounded-full cursor-pointer h-10 w-10`}
                                key={color}/>)}
                    </div>
                </div>
            }
            <div className='flex gap-x-5'>
                <div className='flex flex-row w-28 h-14 ring-1 ring-[#E4E4E4] items-center justify-center rounded-full'>
                    <button type='button' className='w-7 h-full'
                            onClick={() => changeQuantity('-')}>-
                    </button>
                    <input readOnly
                           className='border-transparent focus:border-transparent focus:ring-0 p-0 text-center text-[#222222]'
                           type='number'
                           value={quantity.toString()} step='1'
                           min='0' max='10'/>
                    <button type='button' className='w-7 h-full'
                            onClick={() => changeQuantity('+')}>+
                    </button>
                </div>
                <button onClick={toggleCartButton} type='button' disabled={isCartButtonDisabled}
                        className='hover:bg-black drop-shadow-lg rounded-full h-14 bg-[#222222] font-medium text-sm text-white w-64'>ADD
                    TO CART
                </button>
            </div>
            <div className='h-px bg-gray-200 self-center w-full my-6'/>
            <div className='mb-6'>
                <button onClick={toggleFavoriteButton} disabled={isWishlistButtonDisabled} type='button'
                        onMouseEnter={() => setIsHovered(true)}
                        onMouseLeave={() => setIsHovered(false)}
                        className='text-sm w-max flex flex-col gap-y-2 items-center cursor-pointer'>
                    <div className='flex gap-x-2 items-center tracking-wider'>
                        {isAddedToWishlist ? <HeartSolid className='w-6 h-auto'/> :
                            <HeartIcon className='w-6 h-auto'/>}
                        {!isAddedToWishlist ? 'ADD TO WISHLIST' : 'DELETE FROM WISHLIST'}
                    </div>
                    <div
                        className={`bg-black h-0.5 ${isHovered ? ' w-full' : 'w-2/3'} transition-width ease-in duration-300`}/>
                </button>
            </div>
            <div className='text-sm leading-6'>
                <p><span className='text-[#767676]'>SKU: </span>N/A</p>
                <p><span className='text-[#767676]'>CATEGORIES: </span>Casual & Urban Wear, Jackets, Men</p>
                <p><span className='text-[#767676]'>TAGS: </span>biker, black, bomber, leather</p>
            </div>
        </div>
    );
}