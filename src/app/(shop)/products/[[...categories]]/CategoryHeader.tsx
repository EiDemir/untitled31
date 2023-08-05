'use client';
import {motion} from "framer-motion";
import Link from "next/link";

const variants = {
    hidden: {opacity: 0},
    show: {
        opacity: 1, transition: {
            staggerChildren: 0.3,
            type: 'spring'
        }
    }
};

const itemVariants = {
    hidden: {
        opacity: 0,
        y: 10
    }, show: {
        opacity: 1,
        y: 0
    }
};

export default function CategoryHeader({category}: { category: string }) {
    return (
        <div className='mx-[3vw] mt-3 z-10 flex gap-y-4 flex-col'>
            <motion.h1 initial={{opacity: 0}} animate={{opacity: 1}} transition={{duration: 0.2}}
                       key={category}
                       className='uppercase text-4xl md:text-6xl font-bold text-black'>{category}</motion.h1>
            {category === 'dresses' && <motion.div variants={variants} initial='hidden' animate='show'
                                                   className='flex flex-wrap gap-y-6 gap-x-2 drop-shadow-sm'>
                <motion.div variants={itemVariants}><Link href='/products/dresses?color=black'
                                                          className='bg-gradient-to-br hover:from-purple-600 hover:to-yellow-600 from-purple-500 to-yellow-500 text-white w-max py-2 px-4 rounded-full'>New
                    Dresses</Link></motion.div>
                <motion.div variants={itemVariants}><Link href='/products/dresses?color=black'
                                                          className='bg-[#222222] hover:bg-black transition-colors duration-300 text-white w-max py-2 px-4 rounded-full'>Black
                    Dresses</Link></motion.div>
                <motion.div variants={itemVariants}><Link href='/products/dresses?color=white'
                                                          className='bg-white text-[#222222] hover:ring-2 transition-all duration-300 ring-1 ring-[#222222] w-max py-2 px-4 rounded-full'>White
                    Dresses</Link></motion.div>
            </motion.div>}
        </div>
    );
}
