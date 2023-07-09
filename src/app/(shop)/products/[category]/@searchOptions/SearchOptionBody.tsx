import {motion} from "framer-motion";
import {ReactNode} from "react";

export default function SearchOptionBody({children, className}: { children: ReactNode, className: string }) {
    return (
        <motion.div initial={{height: 0, pointerEvents: 'none', opacity: 0, y: -10}} animate={{
            height: 'auto', pointerEvents: 'auto', opacity: 1, y: 0, transition: {
                duration: 0.5,
                bounce: 0
            }
        }} exit={{
            height: 0,
            y: -10,
            pointerEvents: 'none',
            opacity: 0,
            transition: {
                duration: 0.3,
                bounce: 0
            },
        }} className={className}>
            {children}
        </motion.div>
    );
}