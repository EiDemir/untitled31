'use client';

import {ReactNode, useState} from "react";
import _ from "lodash";
import {usePathname} from "next/navigation";
import {motion} from "framer-motion";
import Link from "next/link";
import {signOut} from "next-auth/react";

const DASHBOARD_SECTIONS = [
    ['Dashboard', '/dashboard'],
    ['Orders', '/dashboard/orders'],
    ['Addresses', '/dashboard/addresses'],
    ['Account Details', '/dashboard/account-details'],
    ['Wishlist', '/dashboard/wishlist']
];

export default function Dashboard({children}: { children: ReactNode }) {
    const pathname = usePathname();
    const [isHovered, setIsHovered] = useState(false);
    const title = DASHBOARD_SECTIONS[_.findIndex(DASHBOARD_SECTIONS, (section) => section[1] === pathname)][0];

    return (
        <div className='mx-[3vw] lg:mx-[10vw] my-20 flex flex-col gap-y-12'>
            <div className='flex justify-between items-center'>
                <motion.h1 initial={{y: 10, opacity: 0}} animate={{y: 0, opacity: 1}} key={title}
                           className='font-bold text-3xl sm:text-4xl'>{title.toUpperCase()}</motion.h1>
                <button type='button'
                        onClick={() => signOut()}
                        className='hover:bg-black drop-shadow-lg rounded-full h-14 bg-[#222222] font-medium text-sm text-white w-32'>
                    LOG OUT
                </button>
            </div>

            <div className='overflow-hidden flex flex-col gap-x-3 gap-y-16 sm:flex-row'>
                <ul className='overflow-x-scroll scroll-m-0 h-14 sm:h-min text-white sm:text-[#222222] sm:w-1/4 flex flex-row justify-between flex-nowrap sm:flex-col gap-y-7 bg-[#222222] sm:bg-transparent sm:rounded-none rounded-full overflow-hidden'>
                    {_.range(DASHBOARD_SECTIONS.length).map(index => {
                        const isCurrent = pathname === DASHBOARD_SECTIONS[index][1];

                        return (
                            <li key={index} className='sm:drop-shadow-none drop-shadow-lg text-sm font-medium uppercase w-full sm:w-min sm:text-start text-center'>
                                <Link
                                    onClick={(event) => event.currentTarget.scrollIntoView({block: 'nearest'})}
                                    className={`relative flex flex-col h-full w-full sm:h-7 ${isCurrent ? 'text-[#E893CF] sm:bg-transparent bg-black' : ''}`}
                                    onMouseEnter={isCurrent ? () => setIsHovered(true) : () => {
                                    }}
                                    onMouseLeave={isCurrent ? () => setIsHovered(false) : () => {
                                    }}
                                    href={DASHBOARD_SECTIONS[index][1]}>
                                    <p className='sm:px-0 text-center px-4 my-auto mx-auto w-max'>
                                        {DASHBOARD_SECTIONS[index][0]}
                                    </p>
                                    {isCurrent &&
                                        <>
                                            <motion.div initial={{width: 0}}
                                                        animate={{width: isHovered ? '100%' : '75%'}}
                                                        className='bg-[#E893CF] h-0.5 hidden sm:block'/>
                                            <motion.div layoutId='underline' className='bottom-0 absolute block sm:hidden bg-[#E893CF] w-full h-0.5'/>
                                        </>
                                    }
                                </Link>
                            </li>
                        );
                    })}
                </ul>
                <div className='sm:w-3/4'>
                    {children}
                </div>
            </div>
        </div>
    );
}