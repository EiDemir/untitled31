import {useAnimate, usePresence, motion} from "framer-motion";
import {ReactNode, useEffect} from "react";

export default function SearchOptionBody({children, className}: { children: ReactNode, className: string }) {
    const [isPresent, safeToRemove] = usePresence();
    const [scope, animate] = useAnimate();

    useEffect(() => {
        if (isPresent) {
            const enterAnimation = async () => {
                await animate(scope.current, {
                    y: [-230, 0],
                    pointerEvents: 'auto',
                    opacity: [0, 1]
                }, {
                    bounce: 0,
                    duration: 0.5
                });
            };

            enterAnimation();
        } else {
            const exitAnimation = async () => {
                await animate(scope.current, {
                    y: -230,
                    pointerEvents: 'none',
                    opacity: 0
                }, {
                    bounce: 0,
                    duration: 0.3,
                });

                safeToRemove();
            };

            exitAnimation();
        }
    }, [isPresent]);

    return (
        <motion.div layout className={className} ref={scope}>
            {children}
        </motion.div>
    );
}