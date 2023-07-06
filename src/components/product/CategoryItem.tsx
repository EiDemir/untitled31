import Link from "next/link";
import Image from "next/image";
import {motion} from "framer-motion";
import {useState} from "react";

const variants = {
    initial: {
        opacity: 0,
        y: 20
    },
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.8,
            ease: 'easeOut'
        }
    }
};

export default function CategoryItem({imageLink, category, title, price, id}: {
    imageLink: string,
    category: string,
    title: string,
    price: number,
    id: string
}) {
    const [isHovered, setIsHovered] = useState(false);

    return (
        <motion.div
            variants={variants}
            initial='initial'
            whileInView='visible'
            viewport={{once: true}}
            className="gap-y-3 flex flex-col">
            <div onMouseEnter={() => setIsHovered(true)}
                 onMouseLeave={() => setIsHovered(false)}
                 className='relative overflow-hidden rounded-xl'>
                <Link prefetch={false} href={'/product/' + id}>
                    <Image className="rounded-xl" src={imageLink} alt="Product's picture" width={1333}
                           height={2000}/>
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
                <p className="text-[#767676] text-base">${price}</p>
            </div>
        </motion.div>
    );
}