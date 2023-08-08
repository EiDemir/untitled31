'use client';

import Link from "next/link";
import Image from "next/image";
import {domAnimation, LazyMotion, m, useCycle} from "framer-motion";
import {useContext, useEffect, useState} from "react";
import {floor} from "lodash";
import {ChevronDownIcon} from "@heroicons/react/24/solid";
import {toastEnd, toastStart} from "@/utils/toast";
import axios from "axios";
import {CartItemsNumberContext} from "@/store/CartItemsNumberContext";
import {useMediaQuery} from "usehooks-ts";
import {XMarkIcon} from "@heroicons/react/24/outline";

const variants = {
    initial: {
        opacity: 0
    },
    visible: {
        opacity: 1,
        transition: {
            duration: 0.8,
            ease: 'easeOut'
        }
    }
};

export default function ProductItem({
                                        imageLink,
                                        categories,
                                        title,
                                        price,
                                        id,
                                        sizes,
                                        colors,
                                        isAuthenticated,
                                        wishlistDeleteButton = false,
                                        deleteHandler, deleteButtonDisabled
                                    }: {
    wishlistDeleteButton?: boolean,
    deleteHandler?: (id: string) => void,
    deleteButtonDisabled?: boolean
    imageLink: string,
    categories: { name: string }[],
    title: string,
    price: number,
    id: string,
    sizes: string[],
    colors: { name: string, hexColorCode: string }[],
    isAuthenticated: boolean
}) {
    const md = useMediaQuery('(min-width: 768px)');
    const [isHovered, setIsHovered] = useState(false);
    const [isQuickAddOpen, toggleQuickAdd] = useCycle(false, true);
    const [selectedOptions, setSelectedOptions] = useState({
        color: colors.length ? colors[0] : undefined,
        size: sizes.length ? sizes[floor(sizes.length / 2)] : undefined
    });
    const [isCartButtonDisabled, setIsCartButtonDisabled] = useState(false);
    const cartCtx = useContext(CartItemsNumberContext);

    useEffect(() => {
        setIsHovered(!md);
    }, [md, isQuickAddOpen]);

    const toggleCartButton = () => {
        setIsCartButtonDisabled(true);
        const ts = toastStart('Adding to Your Cart');
        if (isAuthenticated) {
            axios.post('/api/cart', {
                productId: id,
                quantity: 1,
                color: selectedOptions.color,
                size: selectedOptions.size
            }).then(() => {
                cartCtx.setCartItemsNumber(prevState => prevState + 1);
                toastEnd('Added to Your cart', ts);
            }).catch(() => toastEnd("Already in Your Cart", ts, true))
                .finally(() => {
                    toggleQuickAdd();
                    setIsCartButtonDisabled(false);
                    setIsHovered(false);
                });
        } else {
            const data = localStorage.getItem('cart-items');
            const items: {
                productId: string,
                quantity: number,
                color: string | null,
                size: string | null
            }[] = data !== null ? JSON.parse(data) : [];

            if (items.filter(item =>
                item.size === selectedOptions.size &&
                item.color === (!selectedOptions.color ? null : selectedOptions.color.name) &&
                item.productId === id).length === 1) {
                setTimeout(() => {
                    toastEnd("Already in Your Cart", ts, true);
                    setIsCartButtonDisabled(false);
                    toggleQuickAdd();
                    setIsHovered(false);
                }, 1000);
            } else {
                items.push({
                    productId: id,
                    quantity: 1,
                    color: (!selectedOptions.color ? null : selectedOptions.color.name),
                    size: !selectedOptions.size ? null : selectedOptions.size
                });
                localStorage.setItem('cart-items', JSON.stringify(items));
                setTimeout(() => {
                    cartCtx.setCartItemsNumber(prevState => prevState + 1);
                    toastEnd('Added to Your cart', ts);
                    setIsCartButtonDisabled(false);
                    toggleQuickAdd();
                    setIsHovered(false);
                }, 1000);
            }
        }
    }

    return (
        <LazyMotion features={domAnimation}>
            <m.div
                variants={variants}
                initial='initial'
                whileInView='visible'
                viewport={{once: true}}>
                <div onMouseEnter={() => setIsHovered(true)}
                     onMouseLeave={() => {
                         if (!isQuickAddOpen) setIsHovered(false)
                     }}
                     className='relative overflow-hidden rounded-xl'>
                    {wishlistDeleteButton && <button
                        disabled={deleteButtonDisabled}
                        onClick={() => deleteHandler!(id)}
                        onMouseEnter={() => setIsHovered(false)}
                        onMouseLeave={() => setIsHovered(true)}
                        className='disabled:bg-gray-200 hover:bg-gray-100 absolute top-2 left-2 w-10 p-1.5 bg-white rounded-xl'>
                        <XMarkIcon className='text-black '/>
                    </button>}
                    <Link prefetch={false} href={'/product/' + id}>
                        <Image className="rounded-xl"
                               src={imageLink.replace('c_crop,w_1333,h_2000', 'c_fill,w_666,h_1000')}
                               alt="Product's picture" width={666}
                               height={1000}/>
                    </Link>
                    <m.div
                        layout
                        style={{borderRadius: 12}}
                        className='flex flex-col items-center justify-center text-white divide-x divide-[#222222] text-sm absolute inset-x-0 bg-gray-500/40 backdrop-blur-md mx-1 bottom-1'
                        initial={false}
                        animate={{
                            opacity: isHovered ? 1 : 0,
                            y: isHovered ? 0 : 20
                        }} transition={{layout: {duration: 0.4}, duration: 0.2}}>
                        {!isQuickAddOpen &&
                            <m.button initial={{opacity: 0}} animate={{
                                opacity: 1
                            }}
                                      transition={{delay: 0.4}}
                                      onClick={() => toggleQuickAdd()}
                                      className='h-10 hover:bg-black w-full rounded-xl'>
                                QUICK ADD
                            </m.button>}
                        {isQuickAddOpen && (
                            <m.div initial={{opacity: 0}} animate={{opacity: 1}} transition={{delay: 0.4}}
                                   className='w-full p-2 flex flex-col gap-y-2 relative'>
                                <ChevronDownIcon onClick={() => toggleQuickAdd()}
                                                 className='w-6 h-auto absolute top-1 left-1 cursor-pointer'/>
                                {sizes.length > 0 &&
                                    <div className='flex flex-col items-center mb-1 gap-y-1'>
                                        <p className='font-medium'>Select Size</p>
                                        <div className='grid grid-cols-4 gap-1 w-full justify-center'>
                                            {sizes.map(size =>
                                                <m.span
                                                    whileTap={{scale: 0.9}}
                                                    animate={{
                                                        scale: selectedOptions.size === size ? [0.9, 1] : 1
                                                    }}
                                                    transition={{duration: 0.2, ease: 'easeIn'}}
                                                    onClick={() => setSelectedOptions(prevState =>
                                                        ({...prevState, size}))}
                                                    className={`${selectedOptions.size === size ?
                                                        'ring-[#222222] ring-2' : 'ring-[#E4E4E4] ring-1'} uppercase ring-inset rounded-lg bg-transparent transition-colors cursor-pointer px-2 py-2 justify-center flex items-center`}
                                                    key={size}>{size}</m.span>)}
                                        </div>
                                    </div>
                                }
                                <button disabled={isCartButtonDisabled} onClick={toggleCartButton}
                                        className='w-full rounded-xl h-10 ring-1 ring-white ring-inset'>ADD TO CART
                                </button>
                            </m.div>
                        )}
                    </m.div>
                </div>
                <div className='flex flex-col font-normal mt-2'>
                    <p className="text-[#B9A16B] text-sm capitalize">{categories[0].name}</p>
                    <p className="text-base">{title}</p>
                    <p className="text-[#767676] text-base">${price}</p>
                    {colors.length > 0 &&
                        <div className='flex gap-x-3 mt-1'>
                            {colors.map(color =>
                                <m.span
                                    initial={false}
                                    whileTap={{scale: 0.9}}
                                    animate={{
                                        scale: 1,
                                        border: selectedOptions.color === color ? '3px solid white' : '0px solid white'
                                    }}
                                    transition={{duration: 0.2, ease: 'easeIn'}}
                                    onClick={() => setSelectedOptions(prevState =>
                                        ({...prevState, color}))}
                                    style={{background: '#' + color.hexColorCode}}
                                    className={`${selectedOptions.color!.hexColorCode === color.hexColorCode ?
                                        'ring-2 ring-[#222222]' : ''} ${color.hexColorCode === 'FFFFFF' && selectedOptions.color!.hexColorCode !== color.hexColorCode ? 'ring-1 ring-gray-400' : ''} rounded-full cursor-pointer h-5 w-5`}
                                    key={color.hexColorCode}/>)}
                        </div>
                    }
                </div>
            </m.div>
        </LazyMotion>
    );
}