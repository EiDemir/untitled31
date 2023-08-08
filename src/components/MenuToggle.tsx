import {m, useCycle} from "framer-motion";
import {useEffect, useState} from "react";

const Path = (props: any) => (
    <m.path
        strokeWidth="4"
        strokeLinecap='round'
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
        <button aria-label={isOpened ? 'Close menu' : 'Open menu'} onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)} onClick={() => {
            toggleOpen();
            setColor(!isOpened ? '#222222' : color);
            toggle();
        }}
                className="fixed z-50 top-[19.5px] left-[3vw]">
            <svg style={{stroke: col}} className={`z-50 transition-colors duration-1000`} width="30" height="28"
                 viewBox="0 0 30 28">
                <Path
                    variants={{
                        closed: {d: "M 2 2.5 L 28 2.5"},
                        open: {d: "M 2 26 L 28 1.98"}
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
                        d: `M 2 14 L ${isHovered ? '28' : '16'} 14`
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
                        closed: {d: "M 2 25.5 L 28 25.5"},
                        open: {d: "M 2 2.09 L 28 26"}
                    }}
                />
            </svg>
        </button>
    );
}