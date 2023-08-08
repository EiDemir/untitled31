'use client';

import {domAnimation, LazyMotion, m} from "framer-motion";
import Image from "next/image";
import men from '../../../public/men.jpg';
import women from '../../../public/women.jpg';
import Link from "next/link";

export default function MainCategories() {
    return (
        <div
            className='flex md:flex-row flex-col gap-x-4 gap-y-4 h-[800px] md:h-[500px] py-10 lg:mx-[7vw] mx-[3vw]'>
            <LazyMotion features={domAnimation}>
                <m.div initial={{opacity: 0, x: -20}} whileInView={{
                    opacity: 1, x: 0, transition: {
                        duration: 0.5
                    }
                }} viewport={{once: true}} whileHover={{scale: 1.05, zIndex: 10}}
                       transition={{
                           duration: 0.2
                       }}
                       className='cursor-pointer md:w-1/2 bg-[#F4CAA6] rounded-xl h-full relative drop-shadow-sm overflow-hidden'>
                    <Link href='/products/women'>
                        <div
                            className='absolute bottom-4 left-4 md:bottom-7 md:left-7 flex flex-col gap-y-1 text-[#222222] z-10'>
                            <p className='text-sm'>HOT LIST</p>
                            <h1 className='font-medium text-lg md:text-2xl'><span
                                className='font-bold'>WOMEN</span> COLLECTION
                            </h1>
                            <p className='text-sm font-medium'>SHOP NOW</p>
                        </div>
                        <Image className='absolute right-0 h-full w-min object-cover' src={women}
                               alt='Women Collection'
                        />
                    </Link>
                </m.div>
                <div className='md:w-1/2 h-full flex flex-col gap-y-4'>
                    <m.div initial={{opacity: 0, x: 20}}
                           whileInView={{opacity: 1, x: 0}} viewport={{once: true}}
                           whileHover={{scale: 1.05}}
                           transition={{
                               duration: 0.2
                           }}
                           className='cursor-pointer h-3/4 bg-[#B9E2E5] w-full rounded-xl relative drop-shadow-sm overflow-hidden'>
                        <Link href='/products/men'>
                            <div
                                className='absolute bottom-4 left-4 md:bottom-7 md:left-7 flex flex-col gap-y-1 text-[#222222] z-10'>
                                <p className='text-sm'>HOT LIST</p>
                                <h1 className='font-medium text-lg md:text-2xl'><span
                                    className='font-bold'>MEN</span> COLLECTION</h1>
                                <p className='text-sm font-medium'>SHOP NOW</p>
                            </div>
                            <Image className='absolute right-0 h-full w-min object-cover' src={men} alt='Men Collection'
                            />
                        </Link>
                    </m.div>
                    <div className='h-1/4 w-full flex gap-x-4'>
                        <m.div initial={{opacity: 0, x: 20}}
                               whileInView={{opacity: 1, x: 0}} viewport={{once: true}}
                               whileHover={{scale: 1.05}} transition={{
                            duration: 0.2
                        }}
                               className='cursor-pointer bg-[#E7E6E4] w-1/3 rounded-xl relative drop-shadow-sm overflow-hidden'>
                            <Link href='/products/kids'
                                  className='flex items-center justify-center h-full'>
                                <div
                                    className='flex flex-col gap-y-1 text-[#222222] items-center'>
                                    <h1 className='font-medium text-lg lg:text-2xl'><span
                                        className='font-bold'>KIDS</span>
                                    </h1>
                                    <p className='text-xs lg:text-sm font-medium'>SHOP NOW</p>
                                </div>
                            </Link>
                        </m.div>
                        <m.div initial={{opacity: 0, x: 20}} whileInView={{opacity: 1, x: 0}} viewport={{once: true}}
                               whileHover={{scale: 1.05}} transition={{
                            duration: 0.2
                        }}
                               className='cursor-pointer bg-[#F5E6E0] w-1/3 rounded-xl relative drop-shadow-sm overflow-hidden'>
                            <Link href='/'
                                  className='flex items-center justify-center h-full'>
                                <div
                                    className='flex flex-col gap-y-1 text-[#222222] items-center'>
                                    <h1 className='font-medium text-lg lg:text-2xl'><span
                                        className='font-bold'>BEAUTY</span>
                                    </h1>
                                    <p className='text-xs lg:text-sm font-medium'>SHOP NOW</p>
                                </div>
                            </Link>
                        </m.div>
                        <m.div initial={{opacity: 0, x: 20}}
                               whileInView={{opacity: 1, x: 0}} viewport={{once: true}}
                               whileHover={{scale: 1.05}} transition={{
                            duration: 0.2
                        }}
                               className='cursor-pointer bg-[#F5E6E0] w-1/3 rounded-xl relative drop-shadow-sm overflow-hidden'>
                            <Link href='/products/shoes'
                                  className='flex items-center justify-center h-full'>
                                <div className='flex flex-col gap-y-1 text-[#222222] items-center'>
                                    <h1 className='font-medium text-lg lg:text-2xl'><span
                                        className='font-bold'>SHOES</span>
                                    </h1>
                                    <p className='text-xs lg:text-sm font-medium'>SHOP NOW</p>
                                </div>
                            </Link>
                        </m.div>
                    </div>
                </div>
            </LazyMotion>
        </div>
    );
}