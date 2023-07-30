'use client';

import Image from "next/image";
import {motion} from "framer-motion";
import {ForwardedRef, forwardRef} from "react";
import Link from "next/link";

const variants = {
    initial: (custom: number) => ({
        x: custom === 1 ? -20 : custom === -1 ? 20 : 0,
        opacity: 0,
        scale: 0.5,
        zIndex: -10,
    }),
    animate: {
        x: 0,
        opacity: 1,
        scale: 1,
        zIndex: 0,
    },
    exit: (custom: number) => ({
        x: custom === 1 ? 20 : custom === -1 ? -20 : 0,
        opacity: !custom ? 1 : 0,
        zIndex: -10,
        scale: 0.5,
        transition: {
            duration: !custom ? 0 : 0.5
        }
    })
};

const ProductItem = forwardRef(({imageLink, categories, title, price, id, colors, direction}: {
    imageLink: string,
    categories: { name: string }[],
    title: string,
    price: number,
    id: string,
    colors: { name: string, hexColorCode: string }[],
    direction: number,
}, ref: ForwardedRef<HTMLDivElement>) => {
    return (
        <motion.div
            ref={ref}
            layout
            custom={direction}
            variants={variants}
            initial='initial'
            animate='animate'
            exit='exit'
            transition={{
                type: 'spring',
                stiffness: 40
            }}
            className="gap-y-3 flex flex-col">
            <div className='relative overflow-hidden rounded-xl'>
                <Link prefetch={false} href={'/product/' + id}>
                    <Image className="rounded-xl" src={imageLink} alt="Product's picture" width={1333}
                           height={2000}/>
                </Link>
            </div>
            <div className='flex flex-col font-normal'>
                <p className="text-[#B9A16B] text-sm">{categories[0].name}</p>
                <p className="text-base">{title}</p>
                <p className="text-[#767676] text-base">${price}</p>
            </div>
        </motion.div>
    );
})

ProductItem.displayName = 'ProductItem';

export default ProductItem;