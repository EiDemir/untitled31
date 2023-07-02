import Image from "next/image";
import {motion} from "framer-motion";
import {ForwardedRef, forwardRef, useState} from "react";
import Link from "next/link";

const variants = {
    initial: (custom: number) => ({
        x: custom === 1 ? 300 : custom === -1 ? -300 : 0,
        opacity: 0,
        zIndex: -10,
    }),
    animate: {
        x: 0,
        opacity: 1,
        zIndex: 0,
    },
    exit: (custom: number) => ({
        x: custom === 1 ? -300 : custom === -1 ? 300 : 0,
        opacity: !custom ? 1 : 0,
        zIndex: -10,
        transition: {
            duration: !custom ? 0 : 0.5
        }
    })
};

const ProductItem = forwardRef(({imageLink, category, title, price, direction, id}: {
    imageLink: string,
    category: string,
    title: string,
    price: number,
    direction: number,
    id: string
}, ref: ForwardedRef<HTMLDivElement>) => {
    const [isHovered, setIsHovered] = useState(false);

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
                duration: 0.5,
                ease: 'easeOut'
            }}
            className="gap-y-3 flex flex-col">
            <div onMouseEnter={() => setIsHovered(true)}
                 onMouseLeave={() => setIsHovered(false)}
                 className='relative overflow-hidden rounded-xl'>
                <Link href={'/product/' + id}>
                    <Image className="rounded-xl" src={imageLink} alt="Product's picture" width={400}
                           height={485}/>
                </Link>
                <motion.div
                    className='rounded-xl flex text-white divide-x divide-[#222222] text-xs absolute inset-x-0 bg-[#222222]/50 backdrop-blur-lg h-10 bottom-1 mx-1'
                    initial={false}
                    animate={{
                        opacity: isHovered ? 1 : 0,
                        y: isHovered ? 0 : 20
                    }}>
                    <button className='transition ease-out duration-500 w-full hover:bg-black rounded-l-xl'>ADD TO CARD
                    </button>
                    <button className='transition ease-out duration-500 w-full hover:bg-black rounded-r-xl'>QUICK VIEW
                    </button>
                </motion.div>
            </div>
            <div className='flex flex-col font-normal'>
                <p className="text-[#B9A16B] text-sm">{category}</p>
                <p className="text-base">{title}</p>
                <p className="text-[#767676] text-base">#{price}</p>
            </div>
        </motion.div>
    );
})

ProductItem.displayName = 'ProductItem';

export default ProductItem;