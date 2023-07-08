'use client';

import Image from "next/image";
import patternImage from "../../../../../public/pattern.svg";
import {motion} from "framer-motion";

export default function CategoryHeader({category}: { category: string }) {
    return (
        <div
            className='rounded-xl flex items-center relative bg-[#F5E6E0] h-96 mx-[3.6vw] sm:mx-[5vw] md:mx-[60px]'>
            <div className='z-0'>
                <Image className='rounded-xl absolute object-cover h-full inset-0' src={patternImage}
                       alt='Background image'/>
            </div>
            <div className='px-[1.4vw] sm:px-0 md:px-[calc(5vw_-_60px)] lg:px-[calc(10vw_-_60px)] z-10'>
                <motion.h1 initial={{y: 10, opacity: 0}} animate={{y: 0, opacity: 1}} transition={{duration: 0.2}} key={category}
                           className='uppercase text-8xl font-bold text-black'>{category}</motion.h1>
            </div>
        </div>
    );
}