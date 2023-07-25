'use client';

import {motion} from "framer-motion";
import {ReactNode, useState} from "react";

export default function AuthInput({type, name, labelText, enabledIcon, disabledIcon}: {
    type: string,
    name: string,
    labelText: string,
    enabledIcon: ReactNode,
    disabledIcon: ReactNode
}) {
    const [isLabelEnabled, setIsLabelEnabled] = useState(false);

    return (
        <div className="relative">
            <input
                className='drop-shadow-sm bg-transparent tracking-wider pr-11 pl-5 ring-[#E4E4E4] focus:ring-2 ring-2 text-[#222222] focus:ring-[#222222] border-0 w-full rounded-3xl py-3'
                type={type}
                name={name}
                onChange={(event) => {
                    if (event.target.value !== '')
                        setIsLabelEnabled(true);
                }}
                onFocus={() => setIsLabelEnabled(true)}
                onBlur={(event) => setIsLabelEnabled(event.target.value.length !== 0)}
            />
            <motion.label
                initial={false}
                animate={{
                    top: isLabelEnabled ? '-10px' : '0.875rem',
                    bottom: isLabelEnabled ? '' : '0.875rem',
                    zIndex: isLabelEnabled ? 10 : -10,
                    color: isLabelEnabled ? '#222222' : '#767676'
                }}
                transition={{
                    duration: 0.1,
                    ease: 'easeOut'
                }}
                className='absolute left-5 px-1 bg-white'>{labelText}
            </motion.label>
            <span className="absolute inset-y-0 right-0 flex text-[#222222] items-center mr-3">
                        {isLabelEnabled ? enabledIcon : disabledIcon}
                                </span>
        </div>
    );
}