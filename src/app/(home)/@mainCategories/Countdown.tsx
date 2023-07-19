'use client';

import {useEffect, useState} from "react";

export default function Countdown({endDate}: { endDate: Date }) {
    const [count, setCount] = useState((endDate.getTime() - new Date().getTime()) / 1000);
    const days = Math.floor(count / (60 * 60 * 24));
    const hours = Math.floor((count - (days * 60 * 60 * 24)) / (60 * 60));
    const minutes = Math.floor(((count - (days * 60 * 60 * 24 + hours * 60 * 60)) / 60));
    const seconds = Math.floor((count - (days * 60 * 60 * 24 + hours * 60 * 60 + minutes * 60)));

    useEffect(() => {
        const interval = setInterval(() => setCount((endDate.getTime() - new Date().getTime()) / 1000), 1000);

        return () => clearInterval(interval);
    }, [count, endDate])

    return (
        <div className='flex gap-x-3'>
            <div className='flex flex-col gap-y-1'>
                <p className='text-lg font-medium text-[#222222]' suppressHydrationWarning>{days.toString().padStart(2, '0')}</p>
                <p className='text-sm text-[#767676]'>DAYS</p>
            </div>
            <div className='flex flex-col gap-y-1'>
                <p className='text-lg font-medium text-[#222222]' suppressHydrationWarning><span
                    className='font-normal'>:</span> {hours.toString().padStart(2, '0')}</p>
                <p className='text-sm pl-2 text-[#767676]'>HOURS</p>
            </div>
            <div className='flex flex-col gap-y-1'>
                <p className='text-lg font-medium text-[#222222]' suppressHydrationWarning><span
                    className='font-normal'>:</span> {minutes.toString().padStart(2, '0')}</p>
                <p className='text-sm pl-2 text-[#767676]'>MINS</p>
            </div>
            <div className='flex flex-col gap-y-1'>
                <p className='text-lg font-medium text-[#222222] w-max' suppressHydrationWarning><span
                    className='font-normal'>:</span> {seconds.toString().padStart(2, '0')}</p>
                <p className='text-sm pl-2 text-[#767676]'>SEC</p>
            </div>
        </div>
    );
}