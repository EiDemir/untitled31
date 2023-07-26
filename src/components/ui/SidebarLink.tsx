import {motion} from "framer-motion";
import {ReactNode, useState} from "react";
import {useRouter} from "next/navigation";

const item = {
    closed: {opacity: 0, x: -30},
    open: {opacity: 1, x: 0}
};

export default function SidebarLink({href, children, onClick}: {
    href: string,
    children: ReactNode,
    onClick: () => void
}) {
    const [isHovered, setIsHovered] = useState(false);
    const router = useRouter();

    return (
        <motion.p onClick={() => {
            onClick();
            router.push(href);
        }} onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)}
                  className='text-lg font-semibold flex flex-col gap-y-0.5 w-max' variants={item}>
            {children}
            <span
                className={`transition-width ease-in-out duration-300 h-0.5 bg-black ${isHovered ? 'w-full' : 'w-2/3'}`}/>
        </motion.p>
    );
}