"use client";

import {useEffect, useRef, useState} from "react";
import {range} from "lodash";
import {AnimatePresence, motion, useScroll, useTransform} from "framer-motion";
import Image, {StaticImageData} from "next/image";
import {useRouter} from "next/navigation";

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
    details: { imageLink: StaticImageData, title: string, subtitle: string }[]
}) {
    const [areButtonsDisabled, setAreButtonsDisabled] = useState(false);
    const [active, setActive] = useState(0);
    const ref = useRef(null);
    const {scrollY} = useScroll({target: ref});
    const imageY = useTransform(scrollY, [0, 1000], [0, 500]);
    const router = useRouter();

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
        <motion.div
            className='absolute w-max mx-auto max-md:inset-x-0 max-md:bottom-[3vw] md:left-[3vw] flex md:flex-col gap-4'>
            {range(details.length).map(i =>
                <motion.div
                    initial={false}
                    key={i}
                    onClick={dotClickHandler.bind(null, i)}
                    className='rounded-full cursor-pointer opacity-80 w-1.5 h-1.5 bg-black'
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
        <div className='relative h-screen w-screen flex items-center z-10'>
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
                            className='uppercase text-black text-left absolute right-4 left-[3vw] md:left-[7vw] z-10'>
                            <h1 className='text-3xl md:text-5xl lg:text-6xl font-bold'>{details[active].title}</h1>
                            <p className='ml-1 text-sm sm:text-base font-semibold'>{details[active].subtitle}</p>
                            <motion.button onClick={() => router.push('/products/summer')} whileHover={{
                                scale: 1.1
                            }} type='button'
                                           className='rounded-full mt-5 bg-gradient-to-r from-[#E893CF] to-[#D7943D] text-white text-sm font-medium px-11 py-[18px] flex items-center gap-x-2.5'>
                                <div className='h-0.5 w-5 bg-white'/>
                                DISCOVER NOW
                            </motion.button>
                        </motion.div>
                        <motion.div style={{y: imageY}} className='relative'>
                            <svg className='absolute top-0 left-0 h-1/2 sm:h-full min-h-[300px] w-auto' version="1.2"
                                 xmlns="http://www.w3.org/2000/svg" viewBox="0 0 5320 2900" width="5320"
                                 height="2900">
                                <defs>
                                    <clipPath clipPathUnits="userSpaceOnUse" id="cp1">
                                        <path
                                            d="m2709-112.44c0 0 260.94 869.72-52 1191-312.94 321.29-756.03 181.23-817 599-60.97 417.78 339.34 756.49-365 974-704.34 217.51-1522.04 400.75-1826-269-303.96-669.74 209-2782 209-2782z"/>
                                    </clipPath>
                                </defs>
                                <g id="obj">
                                </g>
                                <g id="bg">
                                    <g clipPath="url(#cp1)">
                                        <path id="Shape 4" className="s0"
                                              d="m2709-112.4c0 0 260.9 869.7-52 1191-312.9 321.2-756 181.2-817 599-61 417.7 339.3 756.5-365 974-704.3 217.5-1522 400.7-1826-269-304-669.8 209-2782 209-2782z"/>
                                        <path id="Shape 2" className="s1"
                                              d="m-94.9 529c222.5-93.6 522.5-60.5 731.1 68.5 208.6 129.1 440 154 697.4 78.4 257.4-75.6 520.8-42.4 747.4 88.9 226.7 131.3 484.9 159.6 761.2 86.4"/>
                                        <path id="Shape 2 copy" className="s1"
                                              d="m-79.4 405.7c222.4-93.6 522.4-60.5 731.1 68.6 208.6 129 440 153.9 697.4 78.3 257.4-75.6 520.7-42.4 747.4 88.9 226.7 131.3 484.9 159.6 761.2 86.4"/>
                                        <path id="Shape 2 copy 2" className="s1"
                                              d="m-64.7 280.3c222.5-93.6 522.4-60.5 731.1 68.5 208.6 129.1 440 154 697.4 78.4 257.4-75.6 520.7-42.4 747.4 88.9 226.7 131.3 484.9 159.6 761.2 86.4"/>
                                        <path id="Shape 2 copy 2" className="s1"
                                              d="m-49.2 157c222.4-93.6 522.4-60.5 731 68.6 208.7 129 440.1 153.9 697.5 78.3 257.4-75.6 520.7-42.4 747.4 88.9 226.7 131.3 484.9 159.6 761.2 86.4"/>
                                        <path id="Shape 2 copy 3" className="s1"
                                              d="m-31.8 35c222.4-93.6 522.4-60.5 731 68.5 208.6 129.1 440 153.9 697.4 78.4 257.5-75.6 520.8-42.5 747.4 88.9 226.7 131.3 484.9 159.5 761.2 86.3"/>
                                        <path id="Shape 2 copy 3" className="s1"
                                              d="m-16.4-88.3c222.4-93.6 522.4-60.5 731.1 68.5 208.6 129.1 440 154 697.4 78.4 257.4-75.6 520.7-42.4 747.4 88.9 226.7 131.3 484.9 159.5 761.2 86.3"/>
                                        <path id="Shape 2 copy 3" className="s1"
                                              d="m-1.6-213.7c222.4-93.6 522.4-60.5 731 68.5 208.6 129.1 440 153.9 697.4 78.4 257.4-75.6 520.8-42.5 747.4 88.9 226.7 131.3 484.9 159.5 761.2 86.3"/>
                                        <path id="Shape 2 copy 3" className="s1"
                                              d="m13.8-337c222.4-93.6 522.4-60.5 731.1 68.5 208.6 129.1 440 154 697.4 78.4 257.4-75.6 520.7-42.5 747.4 88.9 226.7 131.3 484.9 159.5 761.2 86.3"/>
                                    </g>
                                </g>
                            </svg>
                            <Image priority className='h-screen overflow-hidden object-cover'
                                   src={details[active].imageLink}
                                   alt='Slider image' unoptimized={true}/>
                        </motion.div>
                    </div>
                </motion.div>
            </AnimatePresence>
            {dots}
        </div>
    );
}
