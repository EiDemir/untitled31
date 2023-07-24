import Link from "next/link";
import {motion} from "framer-motion";
import {ReactNode, useState} from "react";

const item = {
    hidden: {opacity: 0, x: -20},
    show: {opacity: 1, x: 0},
    exit: {
        opacity: 0,
        x: -20
    }
};

export default function SidebarLink({href, children}: { href: string, children: ReactNode }) {
    const [isHovered, setIsHovered] = useState(false);

    return (
        <motion.p onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)}
                  className='text-lg font-semibold flex flex-col gap-y-0.5 w-max' variants={item}>
            <Link href={href}>{children}</Link>
            <span className={`transition-width ease-in-out duration-300 h-0.5 bg-black ${isHovered ? 'w-full' : 'w-2/3'}`}/>
        </motion.p>
    );
}