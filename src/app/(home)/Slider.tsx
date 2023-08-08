"use client";

import {useEffect, useRef, useState} from "react";
import {range} from "lodash";
import {AnimatePresence, domAnimation, LazyMotion, m, useScroll, useTransform} from "framer-motion";
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
    details: { imageLink: StaticImageData, title: string[], subtitle: string }[]
}) {
    const [areButtonsDisabled, setAreButtonsDisabled] = useState(false);
    const [active, setActive] = useState(0);
    const ref = useRef(null);
    const {scrollY} = useScroll({target: ref, offset: ['start start', 'end start']});
    const imageY = useTransform(scrollY, [0, 1000], [0, 300]);
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
            }, 1500);

            return () => clearTimeout(timeout);
        }
    }, [areButtonsDisabled]);

    useEffect(() => {
        const interval = setInterval(() => setActive(
            prevState => (prevState + 1) % details.length), 6000);

        return () => clearInterval(interval);
    }, [active, details.length]);


    const dots = (
        <m.div
            className='absolute w-max mx-auto max-md:inset-x-0 max-md:bottom-[4vw] md:left-[3vw] flex md:flex-col gap-8 md:gap-4'>
            {range(details.length).map(i =>
                <m.button
                    aria-label={i === 0 ? 'Open first slide' : (i === 1) ? 'Open second slide' : 'Open third slide'}
                    disabled={areButtonsDisabled}
                    initial={false}
                    key={i}
                    onClick={dotClickHandler.bind(null, i)}
                    className='rounded-full cursor-pointer opacity-80 w-2 h-2 md:w-1.5 md:h-1.5 bg-black'
                    animate={{
                        scale: active === i ? 1.5 : 1,
                        opacity: active === i ? 1 : 0.5
                    }}
                    transition={{
                        duration: 0.8
                    }}
                />
            )}
        </m.div>
    );

    return (
        <div className='relative h-screen w-screen flex items-center z-10'>
            <LazyMotion features={domAnimation}>
                <AnimatePresence initial={false}>
                    <m.div
                        ref={ref}
                        className='absolute inset-0 overflow-hidden'
                        variants={sliderVariants}
                        transition={{
                            duration: 0.7,
                            delayChildren: 0.8
                        }}
                        initial='initial'
                        animate='animate'
                        exit='exit'
                        key={active}
                    >
                        <div className='relative items-center flex'>
                            <m.div
                                variants={textVariants}
                                className={`${active === 0 || active === 2 ? 'text-black' : 'text-white'} text-left absolute right-4 left-[3vw] md:left-[7vw] z-10`}>
                                <h1 className='text-6xl md:text-[120px] font-bold'>{details[active].title[0]}<br/>{details[active].title[1]}<span
                                    className={`${active === 0 ? 'text-[#222222] md:text-[#F6A452]' : 'text-[#E893CF]'}`}>.</span>
                                </h1>
                                <p className='uppercase ml-1 text-sm md:text-base font-semibold mt-6 md:mt-16'>{details[active].subtitle}</p>
                                <m.button onClick={() => router.push('/products/summer')} whileHover={{
                                    scale: 1.1
                                }} type='button'
                                          className={`rounded-full mt-5 ${active === 0 ? 'from-[#E893CF] bg-gradient-to-r to-[#F6A452] text-white' : 'bg-white text-[#222222]'} text-sm font-medium px-6 md:px-11 py-[10px] md:py-[18px] flex items-center gap-x-2.5`}>
                                    <div className={`h-0.5 w-5 ${active === 0 ? 'bg-white' : 'bg-[#222222]'}`}/>
                                    DISCOVER NOW
                                </m.button>
                            </m.div>
                            <m.div style={{y: imageY}} className='relative'>
                                {active === 0 && <svg
                                    className='absolute hidden md:block top-0 -left-7 md:left-0 h-[75vh] md:h-[90vh] min-h-[500px] md:min-h-[700px] w-auto'
                                    version="1.2"
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
                                </svg>}
                                <Image priority className='h-screen overflow-hidden object-cover'
                                       style={{objectPosition: '80% 50%'}}
                                       src={details[active].imageLink}
                                       alt='Slider image' unoptimized={true}/>
                            </m.div>
                        </div>
                    </m.div>
                </AnimatePresence>
                {dots}
            </LazyMotion>
        </div>
    );
}
