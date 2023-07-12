'use client';

import {useRouter} from "next/navigation";
import {MouseEvent, useRef} from "react";
import {motion} from "framer-motion";

export default function AddNewAddressModal() {
    const router = useRouter();
    const ref = useRef<HTMLDivElement>(null)

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
                        className='fixed rounded-xl h-2/3 w-2/3 py-20 z-40 bg-white'>
                <h1>Add new address</h1>
            </motion.div>
        </div>
    );
}