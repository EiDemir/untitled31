'use client';

import Image from "next/image";
import {m} from "framer-motion";
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

const ProductItem2 = forwardRef(({imageLink, categories, title, price, id, colors, direction}: {
    imageLink: string,
    categories: { name: string }[],
    title: string,
    price: number,
    id: string,
    colors: { name: string, hexColorCode: string }[],
    direction: number,
}, ref: ForwardedRef<HTMLDivElement>) => {
    return (
        <m.div
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
                    <Image className="rounded-xl" src={imageLink.replace('c_crop,w_1333,h_2000', 'c_fill,w_666,h_1000')} alt="Product's picture" width={666}
                           height={1000}/>
                </Link>
            </div>
            <div className='flex flex-col font-normal'>
                <p className="text-[#B9A16B] text-sm capitalize">{categories[0].name}</p>
                <p className="text-base">{title}</p>
                <p className="text-[#767676] text-base">${price}</p>
            </div>
        </m.div>
    );
})

ProductItem2.displayName = 'ProductItem2';

export default ProductItem2;