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

export default function CategoryItem({imageLink, categories, title, price, id}: {
    imageLink: string,
    categories: { name: string }[],
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
            <Link prefetch={false} href={'/product/' + id}>
                <div onMouseEnter={() => setIsHovered(true)}
                     onMouseLeave={() => setIsHovered(false)}
                     className='relative overflow-hidden rounded-xl'>
                    <Image className="rounded-xl" src={imageLink} alt="Product's picture" width={1333}
                           height={2000}/>
                    <motion.div
                        className='rounded-xl flex text-white divide-x divide-[#222222] text-sm absolute inset-x-0 bg-gray-500/40 backdrop-blur-md h-10 bottom-1 mx-1'
                        initial={false}
                        animate={{
                            opacity: isHovered ? 1 : 0,
                            y: isHovered ? 0 : 20
                        }}>
                        <button className='ttransition ease-out duration-500 w-full hover:bg-black rounded-xl'>QUICK VIEW
                        </button>
                    </motion.div>
                </div>
                <div className='flex flex-col font-normal'>
                    <p className="text-[#B9A16B] text-sm">{categories[0].name}</p>
                    <p className="text-base">{title}</p>
                    <p className="text-[#767676] text-base">${price}</p>
                </div>
            </Link>
        </motion.div>
    );
}