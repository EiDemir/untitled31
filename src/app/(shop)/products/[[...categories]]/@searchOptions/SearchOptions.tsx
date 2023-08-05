'use client';

import {AnimatePresence, motion} from "framer-motion";
import {useRouter, useSearchParams} from "next/navigation";
import {useCallback, useEffect, useState} from "react";
import _ from 'lodash';
import {ChevronDownIcon} from "@heroicons/react/24/solid";
import SearchOptionBody from "./SearchOptionBody";
import {Slider} from "@mui/base";

export default function SearchOptions({colors, sizes, minMaxPrices}: {
    colors: ({ id: string, name: string, hexColorCode: string } & {})[],
    sizes: ({ id: string, size: string } & {})[],
    minMaxPrices: { _max: { price: number | null }, _min: { price: number | null } }
}) {
    const searchParams = useSearchParams();
    const router = useRouter()
    const [value, setValue] = useState({isTouched: false, values: [minMaxPrices._min.price!, minMaxPrices._max.price!]})
    const [isOpen, setIsOpen] = useState([false, false, false, false]);
    let selectedColors: any[];
    let selectedSizes: any[];

    useEffect(() => {
        if (value.isTouched) {
            const timeout = setTimeout(() => {
                const params = new URLSearchParams(searchParams.toString());
                params.delete('page');
                params.set('minPrice', value.values[0].toString());
                params.set('maxPrice', value.values[1].toString())
                router.replace('?' + params);
            }, 1000);

            return () => clearTimeout(timeout);
        }
    }, [value])

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

    return (
        <div className='md:w-1/5 md:sticky top-20 h-max'>
            <div className='drop-shadow-sm overflow-hidden'>
                <div
                    onClick={() => setIsOpen(prevState => prevState.map((value, index) => index === 0 ? !value : value))}
                    className='z-10 cursor-pointer search-option-header'>PRODUCT CATEGORIES
                    <motion.span animate={{
                        rotate: isOpen[0] ? 180 : 0
                    }} transition={{duration: isOpen[0] ? 0.5 : 0.3}}><ChevronDownIcon
                        className='chevron'/></motion.span>
                </div>
                <AnimatePresence>
                    {isOpen[0] ? <SearchOptionBody className='search-option-body' key='category'>
                        <>
                            <h1 className='text-black pt-10'></h1>
                        </>
                    </SearchOptionBody> : null}
                </AnimatePresence>
            </div>
            <div className='drop-shadow-sm overflow-hidden'>
                <div
                    onClick={() => setIsOpen(prevState => prevState.map((value, index) => index === 1 ? !value : value))}
                    className='z-10 cursor-pointer search-option-header'>COLORS
                    <motion.span animate={{
                        rotate: isOpen[1] ? 180 : 0
                    }} transition={{duration: isOpen[1] ? 0.5 : 0.3}}><ChevronDownIcon
                        className='chevron'/></motion.span>
                </div>
                <AnimatePresence>
                    {isOpen[1] ? <SearchOptionBody className='search-option-body grid grid-cols-5 md:grid-cols-3 lg:grid-cols-4 gap-y-4' key='color'>
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
                    className='z-10 cursor-pointer search-option-header'>SIZES
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
                                'ring-[#222222] ring-2' : 'ring-[#E4E4E4] ring-1'} uppercase ring-inset rounded-lg bg-transparent transition-colors cursor-pointer py-1.5 text-center`}
                            key={item.size}>{item.size}</motion.span>)}
                    </SearchOptionBody> : null}
                </AnimatePresence>
            </div>
            <div className='drop-shadow-sm overflow-hidden'>
                <div
                    onClick={() => setIsOpen(prevState => prevState.map((value, index) => index === 3 ? !value : value))}
                    className='z-10 cursor-pointer search-option-header'>PRICE
                    <motion.span animate={{
                        rotate: isOpen[3] ? 180 : 0
                    }} transition={{duration: isOpen[3] ? 0.5 : 0.3}}><ChevronDownIcon
                        className='chevron'/></motion.span>
                </div>
                <AnimatePresence>
                    {isOpen[3] ? <SearchOptionBody className='relative search-option-body'
                                                   key='size'>
                        <div className='px-3.5'>
                            <Slider
                                min={minMaxPrices._min.price!}
                                max={minMaxPrices._max.price!}
                                onChange={(event, newValue) => setValue({
                                    isTouched: true,
                                    values: newValue as number[]
                                })}
                                slotProps={{
                                    root: {className: 'cursor-pointer inline-block relative w-full h-1.5'},
                                    track: {className: 'absolute h-1.5 bg-[#222222]'},
                                    rail: {className: 'absolute h-1.5 bg-[#E4E4E4] w-full rounded-full'},
                                    thumb: {className: 'hover:scale-125 transition -ml-[9px] -mt-1.5 bg-white absolute w-[18px] h-[18px] ring-2 ring-[#222222] rounded-full'}
                                }}
                                value={value.values}/>
                        </div>
                        <div className='flex justify-between mt-3 mx-1'>
                            <p className='text-[#767676] text-sm'>Min Price: <span
                                className='text-[#222222]'>${value.values[0]}</span>
                            </p>
                            <p className='text-[#767676] text-sm'>Max Price: <span
                                className='text-[#222222]'>${value.values[1]}</span></p>
                        </div>
                    </SearchOptionBody> : null}
                </AnimatePresence>
            </div>
        </div>
    );
}
