import {motion} from "framer-motion";
import {ReactNode} from "react";

export default function SearchOptionBody({children, className}: { children: ReactNode, className: string }) {
    return (
        <motion.div initial={{height: 0, opacity: 0, pointerEvents: 'none'}} animate={{
            height: 'auto', pointerEvents: 'auto', opacity: 1, transition: {
                duration: 0.5,
                bounce: 0
            }
        }} exit={{
            height: 0,
            opacity: 0,
            pointerEvents: 'none',
            transition: {
                duration: 0.3,
                bounce: 0
            },
        }} className={className}>
            {children}
        </motion.div>
    );
}