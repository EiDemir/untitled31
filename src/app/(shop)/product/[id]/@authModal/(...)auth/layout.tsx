'use client';

import {useRouter} from "next/navigation";
import {motion} from "framer-motion";
import {useRef, MouseEvent, ReactNode, useEffect} from "react";

export default function Layout({children}: { children: ReactNode }) {
    const router = useRouter();
    const ref = useRef<HTMLDivElement>(null)

    useEffect(() => {
        document.body.style.overflowY = 'hidden';
    }, []);

    const handleOutsideClick = (event: MouseEvent) => {
        if (!ref.current?.contains(event.target as Node)) {
            document.body.style.overflowY = 'scroll';
            router.back();
        }
    };

    return (
        <div onClick={handleOutsideClick}
             className='flex items-center justify-center opacity-100 visible duration-500 transition-opacity backdrop-blur-none bg-black/50 fixed inset-0 z-30'>
            <motion.div ref={ref} initial={{opacity: 0, scale: 0.5}} animate={{opacity: 1, scale: 1}}
                        className='fixed rounded-xl h-11/12 md:h-2/3 w-11/12 md:w-2/3 py-20 z-40 bg-white'>
                <div className='w-max mx-auto flex gap-x-10 font-medium'>
                    <h1>Log In</h1>
                </div>
                <motion.div
                    initial={{
                        opacity: 0,
                    }}
                    animate={{
                        opacity: 1,
                    }}
                    transition={{
                        duration: 0.3,
                        ease: 'easeOut',
                        delay: 0.2
                    }}>
                    {children}
                </motion.div>
            </motion.div>
        </div>
    );
}
