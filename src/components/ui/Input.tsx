import {ReactNode, useEffect, useState} from "react";
import {motion} from "framer-motion";
import {UserIcon as UserSolid} from "@heroicons/react/24/solid";
import {UserIcon} from "@heroicons/react/24/outline";

export default function Input({children, label, type = 'text', required=false, name}: {
    name: string
    required?: boolean,
    children?: ReactNode,
    label: string,
    type?: string
}) {
    const [labelStatus, setLabelStatus] = useState(false);
    const [value, setValue] = useState('');

    useEffect(() => {
        if (value)
            setLabelStatus(true);
    }, [value]);

    return (
        <div className="relative">
            <input
                required={required}
                onChange={event => setValue(event.target.value)}
                value={value}
                className='bg-transparent tracking-wider pr-11 pl-5 ring-inset focus:ring-inset ring-[#E4E4E4] focus:ring-2 ring-2 text-[#222222] focus:ring-[#222222] border-0 w-full rounded-3xl py-3'
                type={type}
                name={name}
                onFocus={() => setLabelStatus(true)}
                onBlur={(event) => setLabelStatus(event.target.value.length !== 0)}
            />
            <motion.label
                initial={false}
                animate={{
                    top: labelStatus ? '-12px' : '0.76rem',
                    zIndex: labelStatus ? 10 : -10,
                    color: labelStatus ? '#222222' : '#767676'
                }}
                transition={{
                    duration: 0.1,
                    ease: 'easeOut'
                }}
                className='absolute left-5 px-1 bg-white'>{label}
            </motion.label>
            {children &&
                <span
                    className="absolute inset-y-0 right-0 flex text-[#222222] items-center mr-3">
                        {labelStatus ? <UserSolid className="h-7 w-7"/> : <UserIcon className="h-7 w-7"/>}
                                </span>
            }
        </div>
    );
}