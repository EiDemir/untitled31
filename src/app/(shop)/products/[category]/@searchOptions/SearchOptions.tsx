'use client';

import {motion} from "framer-motion";
import {useRouter, useSearchParams} from "next/navigation";
import {useCallback} from "react";

export default function SearchOptions({colors}: {
    colors: ({ id: string, name: string, hexColorCode: string } & {})[]
}) {
    const searchParams = useSearchParams();
    const router = useRouter();
    let selectedColors: any[];

    if (!searchParams.get('colors'))
        selectedColors = [];
    else {
        selectedColors = searchParams.get('colors')!.split(',');
    }

    const createQueryString = useCallback((name: string, value: string) => {
        const params = new URLSearchParams(searchParams.toString());
        params.delete('page');
        
        if (params.get(name))
            params.set((name), params.get(name) + ',' + value);
        else
            params.set(name, value);

        return params.toString();
    }, [searchParams])

    return (
        <div className='w-1/4 sticky top-5'>
            <h1>PRODUCT CATEGORIES</h1>
            <div>
                <h1>COLORS</h1>
                <div className='grid grid-cols-2'>
                    {colors.map(color => <div className='flex gap-x-3 items-center bg-' key={color.name}>
                        <motion.span
                            initial={false}
                            whileTap={{scale: 0.9}}
                            animate={{
                                scale: 1,
                                border: selectedColors.includes(color.hexColorCode) ? '3px solid white' : '0px solid white'
                            }}
                            transition={{duration: 0.2, ease: 'easeIn'}}
                            onClick={() => router.replace('?' + createQueryString('color', color.hexColorCode))}
                            style={{background: '#' + color.hexColorCode}}
                            className={`${selectedColors.includes(color.hexColorCode) ?
                                'ring-2 ring-[#222222]' : ''} ${color.hexColorCode === 'FFFFFF' && !selectedColors.includes(color.hexColorCode) ? 'ring-1 ring-gray-400' : ''} rounded-full cursor-pointer h-5 w-5`}
                            key={color.hexColorCode}/>
                        {color.name}
                    </div>)}
                </div>
            </div>
        </div>
    );
}