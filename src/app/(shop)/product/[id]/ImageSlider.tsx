'use client';

import Image from "next/image";
import {AnimatePresence, motion} from "framer-motion";
import {useEffect, useState} from "react";
import {ChevronLeftIcon, ChevronRightIcon} from "@heroicons/react/24/solid";
import {range} from "lodash";

const variants = {
    enter: (direction: number) => ({
        x: direction > 0 ? 500 : -500,
        opacity: 0
    }),
    center: {
        x: 0,
        opacity: 1
    },
    exit: (direction: number) => ({
        x: direction < 0 ? 500 : -500,
        opacity: 0
    })
};

const swipeConfidenceThreshold = 10000;
const swipePower = (offset: number, velocity: number) => {
    return Math.abs(offset) * velocity;
};

export default function ImageSlider({images}: { images: string[] }) {
    const [[page, direction], setImage] = useState([0, 0]);
    const [areButtonsDisabled, setAreButtonsDisabled] = useState(false);

    useEffect(() => {
        if (areButtonsDisabled) {
            const timeout = setTimeout(() => {
                setAreButtonsDisabled(false);
            }, 400);

            return () => clearTimeout(timeout);
        }
    }, [areButtonsDisabled]);

    const paginate = (newDirection: number) => {
        if (!areButtonsDisabled) {
            setAreButtonsDisabled(true);
            setImage([page + newDirection, newDirection]);
        }
    };


    return (
        <div className='sm:w-7/12 flex flex-col xl:flex-row gap-x-2 gap-y-2 z-10'>
            <div
                className='justify-between xl:justify-normal px-[3.6vw] sm:px-0 order-last xl:order-first flex flex-row xl:flex-col gap-y-2 gap-x-2'>
                {range(images.length).map(index => <Image
                    onClick={() => {
                        if (!areButtonsDisabled) {
                            setAreButtonsDisabled(true);
                            setImage([index, page > index ? -1 : 1]);
                        }
                    }}
                    className={`w-[90px] sm:w-[65px] md:w-[82px] ${index !== page ? ' opacity-50 hover:opacity-100 transition-opacity duration-500 ease-in-out' : ''} cursor-pointer`}
                    key={index}
                    src={images[index].replace('c_crop,w_1333,h_2000', 'c_fill,w_333,h_500')}
                    alt="Product's image" width='1333'
                    height='2000'/>)}
            </div>

            <div className='relative w-full aspect-[1333/2000] flex items-center overflow-hidden'>
                <motion.button whileTap={{scale: 0.9}} initial={{scale: page === 0 ? 0 : 1}}
                               disabled={page === 0 || areButtonsDisabled}
                               animate={{scale: page === 0 ? 0 : 1, opacity: page === 0 ? 0 : 1}}
                               transition={{type: 'spring'}} onClick={() => paginate(-1)}
                               className='disabled:cursor-default disabled:bg-gray-300/70 backdrop-blur-md cursor-pointer z-10 absolute flex items-center justify-center left-4 bg-white/70 rounded-full w-10 h-10'>
                    <ChevronLeftIcon className='w-5'/>
                </motion.button>
                <motion.button whileTap={{scale: 0.9}} initial={{scale: page === images.length - 1 ? 0 : 1}}
                               disabled={page === images.length - 1 || areButtonsDisabled}
                               animate={{
                                   scale: page === images.length - 1 ? 0.5 : 1,
                                   opacity: page === images.length - 1 ? 0 : 1
                               }} onClick={() => paginate(1)}
                               transition={{type: 'spring'}}
                               className='disabled:cursor-default disabled:bg-gray-300/70 backdrop-blur-md cursor-pointer z-10 absolute flex items-center justify-center right-4 bg-white/70 rounded-full w-10 h-10'>
                    <ChevronRightIcon className='w-5'/>
                </motion.button>
                <AnimatePresence initial={false} custom={direction}>
                    <motion.div
                        className='absolute inset-0'
                        custom={direction}
                        key={page}
                        variants={variants}
                        initial='enter'
                        animate='center'
                        exit='exit'
                        transition={{
                            duration: 0.4, ease: 'easeOut'
                        }}
                    >
                        <Image
                            className='w-full'
                            src={images[page]}
                            alt="Product's image"
                            width='1333'
                            height='2000'/>
                    </motion.div>
                </AnimatePresence>
            </div>
        </div>
    );
}