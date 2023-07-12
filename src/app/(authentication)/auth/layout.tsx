'use client';

import {ReactNode} from "react";
import {motion} from "framer-motion";
import {usePathname} from "next/navigation";
import Link from "next/link";

export default function Layout({children}: { children: ReactNode }) {
    const pathname = usePathname();

    return (
        <>
            <div className='w-max flex mx-auto gap-x-10 font-medium'>
                <div>
                    <Link href='/auth/login' replace>LOGIN</Link>
                    {pathname === '/auth/login' &&
                        <motion.div layoutId='#auth' className='bg-[#222222] h-0.5 w-full'></motion.div>}
                </div>
                <div>
                    <Link href='/auth/register' replace>REGISTER</Link>
                    {pathname === '/auth/register' &&
                        <motion.div layoutId='#auth' className='bg-[#222222] h-0.5 w-full'></motion.div>}
                </div>
            </div>
            <motion.div
                initial={{
                    opacity: 0,
                    scale: 0.9
                }}
                animate={{
                    opacity: 1,
                    scale: 1
                }}
                transition={{
                    duration: 0.3,
                    ease: 'easeOut'
                }}
                key={pathname}
            >
                {children}
            </motion.div>
        </>
    );
}