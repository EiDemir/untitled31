'use client';

import {AnimatePresence, motion, useMotionTemplate, useMotionValue} from "framer-motion";
import {useRouter, useSearchParams} from "next/navigation";
import {useCallback, useEffect, useRef, useState} from "react";
import _ from 'lodash';
import {ChevronDownIcon} from "@heroicons/react/24/solid";
import SearchOptionBody from "@/app/(shop)/products/[category]/@searchOptions/SearchOptionBody";

export default function SearchOptions({colors, sizes}: {
    colors: ({ id: string, name: string, hexColorCode: string } & {})[],
    sizes: ({ id: string, size: string } & {})[]
}) {
    const searchParams = useSearchParams();
    const router = useRouter();
    const x = useMotionValue(0);
    const x2 = useMotionValue(0);
    const width = useMotionTemplate`${x} ${x2}`;
    const ref = useRef<HTMLDivElement>(null);
    const [isOpen, setIsOpen] = useState([false, false, false, false]);
    let selectedColors: any[];
    let selectedSizes: any[];

    useEffect(() => {
        console.log(width);
    }, [width])

    if (!searchParams.get('color'))
        selectedColors = [];
    else {
        selectedColors = searchParams.get('color')!.split(',');
    }

    if (!searchParams.get('size'))
        selectedSizes = [];
    else {
        selectedSizes = searchParams.get('size')!.split(',');
    }

    const createQueryString = useCallback((name: string, value: string) => {
        const params = new URLSearchParams(searchParams.toString());
        params.delete('page');
        const colors = params.get(name);

        if (colors)
            if (colors.split(',').includes(value))
                if (colors.split(',').length === 1)
                    params.delete(name);
                else
                    params.set(name, _.without(colors.split(','), value).join(','));
            else
                params.set(name, params.get(name) + ',' + value);
        else
            params.set(name, value);

        return params.toString();
    }, [searchParams])

    return (
        <div className='w-1/5 sticky top-20 h-max'>
            <div className='drop-shadow-sm overflow-hidden'>
                <div
                    onClick={() => setIsOpen(prevState => prevState.map((value, index) => index === 0 ? !value : value))}
                    className='z-10 cursor-pointer search-option-header mb-2.5'>PRODUCT CATEGORIES
                    <motion.span animate={{
                        rotate: isOpen[0] ? 180 : 0
                    }} transition={{duration: isOpen[0] ? 0.5 : 0.3}}><ChevronDownIcon
                        className='chevron'/></motion.span>
                </div>
                <AnimatePresence>
                    {isOpen[0] ? <SearchOptionBody className='search-option-body' key='category'>
                        <>
                            <h1 className='text-black pt-10'>KOSKESH</h1>
                        </>
                    </SearchOptionBody> : null}
                </AnimatePresence>
            </div>
            <div className='drop-shadow-sm overflow-hidden'>
                <div
                    onClick={() => setIsOpen(prevState => prevState.map((value, index) => index === 1 ? !value : value))}
                    className='z-10 cursor-pointer search-option-header my-2.5'>COLORS
                    <motion.span animate={{
                        rotate: isOpen[1] ? 180 : 0
                    }} transition={{duration: isOpen[1] ? 0.5 : 0.3}}><ChevronDownIcon
                        className='chevron'/></motion.span>
                </div>
                <AnimatePresence>
                    {isOpen[1] ? <SearchOptionBody className='search-option-body grid grid-cols-4 gap-y-4' key='color'>
                        {colors.map(color => <div className='capitalize flex flex-col gap-y-2 items-center'
                                                  key={color.name}>
                            <motion.span
                                initial={false}
                                whileTap={{scale: 0.9}}
                                animate={{
                                    scale: 1,
                                    border: selectedColors.includes(color.name) ? '3px solid white' : '0px solid white'
                                }}
                                transition={{duration: 0.2, ease: 'easeIn'}}
                                onClick={() => {
                                    router.replace('?' + createQueryString('color', color.name));
                                }}
                                style={{background: '#' + color.hexColorCode}}
                                className={`${selectedColors.includes(color.name) ?
                                    'ring-2 ring-[#222222]' : ''} ${color.hexColorCode === 'FFFFFF' && !selectedColors.includes(color.name) ? 'ring-1 ring-gray-400' : ''} rounded-full cursor-pointer h-6 w-6`}/>
                            {color.name}
                        </div>)}
                    </SearchOptionBody> : null}
                </AnimatePresence>
            </div>
            <div className='drop-shadow-sm overflow-hidden'>
                <div
                    onClick={() => setIsOpen(prevState => prevState.map((value, index) => index === 2 ? !value : value))}
                    className='z-10 cursor-pointer search-option-header my-2.5'>SIZES
                    <motion.span animate={{
                        rotate: isOpen[2] ? 180 : 0
                    }} transition={{duration: isOpen[2] ? 0.5 : 0.3}}><ChevronDownIcon
                        className='chevron'/></motion.span>
                </div>
                <AnimatePresence>
                    {isOpen[2] ? <SearchOptionBody className='search-option-body grid grid-cols-4 gap-y-3 gap-x-2 px-2'
                                                   key='size'>
                        {sizes.map(item => <motion.span
                            whileTap={{scale: 0.9}}
                            transition={{duration: 0.2, ease: 'easeIn'}}
                            onClick={() => {
                                router.replace('?' + createQueryString('size', _.toUpper(item.size)));
                            }}
                            className={`${selectedSizes.includes(_.toUpper(item.size)) ?
                                'ring-[#222222] ring-2' : 'ring-[#E4E4E4] ring-1'} uppercase ring-inset rounded-full bg-transparent transition-colors cursor-pointer py-1.5 text-center`}
                            key={item.size}>{item.size}</motion.span>)}
                    </SearchOptionBody> : null}
                </AnimatePresence>
            </div>
            <div className='drop-shadow-sm overflow-hidden'>
                <div
                    onClick={() => setIsOpen(prevState => prevState.map((value, index) => index === 3 ? !value : value))}
                    className='z-10 cursor-pointer search-option-header mt-2.5 mb-4'>PRICE
                    <motion.span animate={{
                        rotate: isOpen[3] ? 180 : 0
                    }} transition={{duration: isOpen[3] ? 0.5 : 0.3}}><ChevronDownIcon
                        className='chevron'/></motion.span>
                </div>
                <AnimatePresence>
                    {isOpen[3] ? <SearchOptionBody className='relative search-option-body mx-2 py-4'
                                                   key='size'>
                        <div ref={ref} className='absolute h-1.5 w-full bg-[#E4E4E4] rounded-full'/>
                        <motion.div className='absolute h-1.5 bg-[#222222] rounded-full'/>
                        <motion.div drag='x'
                                    style={{x}}
                                    dragConstraints={ref}
                                    dragElastic={0}
                                    transition={{
                                        bounce: 0
                                    }}
                                    className='absolute top-2.5 bg-white w-[18px] h-[18px] rounded-full ring-2 ring-[#222222] ring-inset'/>
                        <motion.div drag='x'
                                    style={{x: x2}}
                                    dragConstraints={ref}
                                    dragElastic={0}
                                    transition={{
                                        bounce: 0
                                    }}
                                    className='absolute top-2.5 right-1/2 bg-blue-500 w-[18px] h-[18px] rounded-full ring-2 ring-[#222222] ring-inset'/>
                    </SearchOptionBody> : null}
                </AnimatePresence>
            </div>
        </div>
    );
}