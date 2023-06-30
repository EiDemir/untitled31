import {motion, useCycle} from "framer-motion";
import {useEffect, useState} from "react";

const Path = (props: any) => (
    <motion.path
        strokeWidth="2"
        {...props}
    />
);

export const MenuToggle = ({toggle, color}: { toggle: () => void, color: string }) => {
    const [isHovered, setIsHovered] = useState(false);
    const [col, setColor] = useState(color);
    const [isOpened, toggleOpen] = useCycle(false, true);

    useEffect(() => {
        setColor(color);
    }, [color])

    return (
        <button onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)} onClick={() => {
            toggleOpen();
            setColor(!isOpened ? '#222222' : color);
            toggle();
        }}
                className="fixed z-50 top-[23px] left-[3.6vw] sm:left-[5vw] md:left-[60px]">
            <svg style={{stroke: col}} className={`z-50 transition-colors duration-1000`} width="22" height="19"
                 viewBox="0 0 22 19">
                <Path
                    variants={{
                        closed: {d: "M 2 2.5 L 20 2.5"},
                        open: {d: "M 3 16.5 L 17 2.5"}
                    }}
                />
                <Path
                    variants={{
                        closed: {
                            opacity: 1,
                        },
                        open: {opacity: 0}
                    }}
                    animate={{
                        d: `M 2 9.423 L ${isHovered ? '20' : '12'} 9.423`
                    }}
                    transition={{
                        opacity: {
                            duration: 0.2
                        }, x: {
                            duration: 0.5
                        }
                    }}
                />
                <Path
                    variants={{
                        closed: {d: "M 2 16.346 L 20 16.346"},
                        open: {d: "M 3 2.5 L 17 16.346"}
                    }}
                />
            </svg>
        </button>
    );
}