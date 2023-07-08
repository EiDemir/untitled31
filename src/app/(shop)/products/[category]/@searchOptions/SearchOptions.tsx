'use client';

import {AnimatePresence, motion} from "framer-motion";
import {useRouter, useSearchParams} from "next/navigation";
import {useCallback, useState} from "react";
import _ from 'lodash';
import {ChevronDownIcon} from "@heroicons/react/24/solid";
import SearchOptionBody from "@/app/(shop)/products/[category]/@searchOptions/SearchOptionBody";

export default function SearchOptions({colors}: {
    colors: ({ id: string, name: string, hexColorCode: string } & {})[]
}) {
    const searchParams = useSearchParams();
    const router = useRouter();
    const [isOpen, setIsOpen] = useState([false, false, false]);
    let selectedColors: any[];

    if (!searchParams.get('color'))
        selectedColors = [];
    else {
        selectedColors = searchParams.get('color')!.split(',');
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
        <div className='w-1/5 sticky top-5'>
            <motion.div layout='position'
                        className='min-h-[40px] relative rounded-t-[19.8px] my-3 flex flex-col gap-y-1.5 drop-shadow-sm overflow-hidden'>
                <div onClick={() => setIsOpen(prevState => [!prevState[0], prevState[1], prevState[2]])}
                     className='z-10 cursor-pointer search-option-header'>PRODUCT CATEGORIES
                    <motion.span animate={{
                        rotate: isOpen[0] ? 180 : 0
                    }}><ChevronDownIcon
                        className='chevron'/></motion.span>
                </div>
                <AnimatePresence>
                    {isOpen[0] ? <SearchOptionBody className='z-0 search-option-body' key='category'>
                        <>
                        </>
                    </SearchOptionBody> : null}
                </AnimatePresence>
            </motion.div>
            <motion.div layout='position'
                        className='min-h-[40px] relative rounded-t-[19.8px] my-3 flex flex-col gap-y-1.5 drop-shadow-sm overflow-hidden'>
                <div onClick={() => setIsOpen(prevState => [prevState[0], !prevState[1], prevState[2]])}
                     className='z-10 cursor-pointer search-option-header'>COLORS
                    <motion.span animate={{
                        rotate: isOpen[1] ? 180 : 0
                    }}><ChevronDownIcon
                        className='chevron'/></motion.span>
                </div>
                <AnimatePresence>
                    {isOpen[1] ? <SearchOptionBody className='z-0 search-option-body' key='color'>
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
                                    'ring-2 ring-[#222222]' : ''} ${color.hexColorCode === 'FFFFFF' && !selectedColors.includes(color.name) ? 'ring-1 ring-gray-400' : ''} rounded-full cursor-pointer h-6 w-6`}
                                key={color.hexColorCode}/>
                            {color.name}
                        </div>)}
                    </SearchOptionBody> : null}
                </AnimatePresence>
            </motion.div>
            <motion.div layout='position'
                        className='min-h-[40px] relative rounded-t-[19.8px] my-3 flex flex-col gap-y-1.5 drop-shadow-sm overflow-hidden'>
                <div onClick={() => setIsOpen(prevState => [prevState[0], prevState[1], !prevState[2]])}
                     className='z-10 cursor-pointer search-option-header'>SIZES
                    <motion.span animate={{
                        rotate: isOpen[2] ? 180 : 0
                    }}><ChevronDownIcon
                        className='chevron'/></motion.span>
                </div>
                <AnimatePresence>
                    {isOpen[2] ? <SearchOptionBody className='z-0 search-option-body' key='category'>
                        <>
                        </>
                    </SearchOptionBody> : null}
                </AnimatePresence>
            </motion.div>
        </div>
    );
}