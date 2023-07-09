'use client';

import {AnimatePresence, motion} from "framer-motion";
import {useRouter, useSearchParams} from "next/navigation";
import {useCallback, useState} from "react";
import _ from 'lodash';
import {ChevronDownIcon} from "@heroicons/react/24/solid";
import SearchOptionBody from "@/app/(shop)/products/[category]/@searchOptions/SearchOptionBody";

export default function SearchOptions({colors, sizes}: {
    colors: ({ id: string, name: string, hexColorCode: string } & {})[],
    sizes: ({ id: string, size: string } & {})[]
}) {
    const searchParams = useSearchParams();
    const router = useRouter();
    const [isOpen, setIsOpen] = useState([false, false, false]);
    let selectedColors: any[];
    let selectedSizes: any[];

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
                <div onClick={() => setIsOpen(prevState => [!prevState[0], prevState[1], prevState[2]])}
                     className='z-10 cursor-pointer search-option-header mb-2'>PRODUCT CATEGORIES
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
                <div onClick={() => setIsOpen(prevState => [prevState[0], !prevState[1], prevState[2]])}
                     className='z-10 cursor-pointer search-option-header my-2'>COLORS
                    <motion.span animate={{
                        rotate: isOpen[1] ? 180 : 0
                    }} transition={{duration: isOpen[1] ? 0.5 : 0.3}}><ChevronDownIcon
                        className='chevron'/></motion.span>
                </div>
                <AnimatePresence>
                    {isOpen[1] ? <SearchOptionBody className='search-option-body' key='color'>
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
                <div onClick={() => setIsOpen(prevState => [prevState[0], prevState[1], !prevState[2]])}
                     className='z-10 cursor-pointer search-option-header my-2'>SIZES
                    <motion.span animate={{
                        rotate: isOpen[2] ? 180 : 0
                    }} transition={{duration: isOpen[2] ? 0.5 : 0.3}}><ChevronDownIcon
                        className='chevron'/></motion.span>
                </div>
                <AnimatePresence>
                    {isOpen[2] ? <SearchOptionBody className='search-option-body' key='size'>
                        {sizes.map(item => <motion.span
                            whileTap={{scale: 0.9}}
                            transition={{duration: 0.2, ease: 'easeIn'}}
                            onClick={() => {
                                router.replace('?' + createQueryString('size', _.toUpper(item.size)));
                            }}
                            className={`${selectedSizes.includes(_.toUpper(item.size)) ?
                                'ring-[#222222] ring-2' : 'ring-[#E4E4E4] ring-1'} uppercase ring-inset rounded-full bg-transparent transition-colors cursor-pointer py-1.5 w-14 text-center`}
                            key={item.size}>{item.size}</motion.span>)}
                    </SearchOptionBody> : null}
                </AnimatePresence>
            </div>
        </div>
    );
}