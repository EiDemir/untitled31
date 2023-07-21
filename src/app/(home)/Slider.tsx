"use client";

import {useEffect, useRef, useState} from "react";
import {range} from "lodash";
import {AnimatePresence, motion, useScroll, useTransform} from "framer-motion";
import Image, {StaticImageData} from "next/image";

const sliderVariants = {
    initial: {
        opacity: 0,
        y: 15
    },
    animate: {
        opacity: 1,
        y: 0
    },
    exit: {
        opacity: 0,
        y: -15
    }
};

const textVariants = {
    initial: {
        opacity: 0,
    },
    animate: {
        opacity: 1,
    },
    exit: {
        opacity: 0
    }
};


export default function Slider({details}: {
    details: { imageLink: StaticImageData, date: string, title: string, subtitle: string }[]
}) {
    const [areButtonsDisabled, setAreButtonsDisabled] = useState(false);
    const [active, setActive] = useState(0);
    const ref = useRef(null);
    const {scrollY} = useScroll({target: ref});
    const imageY = useTransform(scrollY, [0, 1000], [0, 500]);

    const dotClickHandler = (dotNumber: number) => {
        if (!areButtonsDisabled) {
            setAreButtonsDisabled(true);
            setActive(dotNumber);
        }
    };

    useEffect(() => {
        if (areButtonsDisabled) {
            const timeout = setTimeout(() => {
                setAreButtonsDisabled(false);
            }, 800);

            return () => clearTimeout(timeout);
        }
    }, [areButtonsDisabled]);

    useEffect(() => {
        const interval = setInterval(() => setActive(
            prevState => (prevState + 1) % details.length), 4000);

        return () => clearInterval(interval);
    }, [active, details.length]);


    const dots = (
        <motion.div className='absolute left-[3.6vw] sm:left-[5vw] md:left-[60px] flex flex-col gap-y-4'>
            {range(details.length).map(i =>
                <motion.div
                    initial={false}
                    key={i}
                    onClick={dotClickHandler.bind(null, i)}
                    className='rounded-full cursor-pointer opacity-80 w-1.5 h-1.5 bg-white'
                    animate={{
                        scale: active === i ? 1.5 : 1,
                        opacity: active === i ? 1 : 0.5
                    }}
                    transition={{
                        duration: 0.8
                    }}
                />
            )}
        </motion.div>
    );

    return (
        <div className='relative h-screen flex items-center z-10'>
            <AnimatePresence initial={false}>
                <motion.div
                    ref={ref}
                    className='absolute inset-0 overflow-hidden'
                    variants={sliderVariants}
                    transition={{
                        duration: 0.7,
                        delayChildren: 1.2
                    }}
                    initial='initial'
                    animate='animate'
                    exit='exit'
                    key={active}
                >
                    <div className='relative items-center flex'>
                        <motion.div
                            variants={textVariants}
                            className='uppercase text-white text-left absolute right-4 left-[10vw] z-10'>
                            <div className='ml-1 flex flex-row items-center gap-x-2'>
                                <div className='h-0.5 w-10 bg-white'/>
                                <p className='text-sm font-medium'>{details[active].date}</p>
                            </div>
                            <h1 className='text-[35px] sm:text-[60px] font-bold'>{details[active].title}</h1>
                            <p className='ml-1 text-sm sm:text-base font-semibold'>{details[active].subtitle}</p>
                            <motion.button whileHover={{
                                scale: 1.1
                            }} type='button'
                                           className='rounded-full mt-5 bg-white text-sm font-medium px-11 py-[18px] flex items-center gap-x-2.5'>
                                <div className='h-0.5 w-5 bg-black'/>
                                DISCOVER NOW
                            </motion.button>
                        </motion.div>
                        <motion.div style={{y: imageY}}>
                            <Image priority className='h-screen overflow-hidden object-cover'
                                   src={details[active].imageLink}
                                   alt='Slider image'/>
                        </motion.div>
                    </div>
                </motion.div>
            </AnimatePresence>
            {dots}
        </div>
    );
}