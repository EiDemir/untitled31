'use client';

import {motion} from "framer-motion";
import {useState} from "react";

export default function ChangePassword() {
    const [firstLabelStatus, setFirstLabelStatus] = useState(false);
    const [secondLabelStatus, setSecondLabelStatus] = useState(false);
    const [thirdLabelStatus, setThirdLabelStatus] = useState(false);

    return (
        <div className='w-full pt-6 lg:pt-0 lg:pl-6 flex flex-col gap-y-10'>
            <p className='text-lg font-semibold'>Change your password</p>
            <form className='flex flex-col gap-y-6 text-sm font-medium'>
                <div className="relative">
                    <input
                        className='drop-shadow-sm bg-transparent tracking-wider pr-11 pl-5 ring-[#E4E4E4] focus:ring-2 ring-2 text-[#222222] focus:ring-[#222222] border-0 w-full rounded-3xl py-3'
                        type='password'
                        name='currentPassword'
                        onFocus={() => setFirstLabelStatus(true)}
                        onBlur={(event) => setFirstLabelStatus(event.target.value.length !== 0)}
                    />
                    <motion.label
                        initial={false}
                        animate={{
                            top: firstLabelStatus ? '-10px' : '0.875rem',
                            bottom: firstLabelStatus ? '' : '0.875rem',
                            zIndex: firstLabelStatus ? 10 : -10,
                            color: firstLabelStatus ? '#222222' : '#767676'
                        }}
                        transition={{
                            duration: 0.1,
                            ease: 'easeOut'
                        }}
                        className='absolute left-5 px-1 bg-white'>Current password *
                    </motion.label>
                </div>
                <div className="relative">
                    <input
                        className='drop-shadow-sm bg-transparent tracking-wider pr-11 pl-5 ring-[#E4E4E4] ring-2 text-[#222222] focus:ring-2 focus:ring-[#222222] border-0 w-full rounded-3xl py-3'
                        type='password'
                        name='newPassword'
                        onFocus={() => setSecondLabelStatus(true)}
                        onBlur={(event) => setSecondLabelStatus(event.target.value.length !== 0)}
                    />
                    <motion.label
                        initial={false}
                        animate={{
                            top: secondLabelStatus ? '-10px' : '0.875rem',
                            bottom: secondLabelStatus ? '' : '0.875rem',
                            zIndex: secondLabelStatus ? 10 : -10,
                            color: secondLabelStatus ? '#222222' : '#767676'
                        }}
                        transition={{
                            duration: 0.1,
                            ease: 'easeOut'
                        }}
                        className='absolute left-5 px-1 bg-white'>New password *
                    </motion.label>
                </div>
                <div className="relative">
                    <input
                        className='drop-shadow-sm bg-transparent tracking-wider pr-11 pl-5 ring-[#E4E4E4] ring-2 text-[#222222] focus:ring-2 focus:ring-[#222222] border-0 w-full rounded-3xl py-3'
                        type='password'
                        name='password'
                        onFocus={() => setThirdLabelStatus(true)}
                        onBlur={(event) => setThirdLabelStatus(event.target.value.length !== 0)}
                    />
                    <motion.label
                        initial={false}
                        animate={{
                            top: thirdLabelStatus ? '-10px' : '0.875rem',
                            bottom: thirdLabelStatus ? '' : '0.875rem',
                            zIndex: thirdLabelStatus ? 10 : -10,
                            color: thirdLabelStatus ? '#222222' : '#767676'
                        }}
                        transition={{
                            duration: 0.1,
                            ease: 'easeOut'
                        }}
                        className='absolute left-5 px-1 bg-white'> Repeat new password *
                    </motion.label>
                </div>
                <button className='drop-shadow-md bg-head text-white py-3 rounded-full tracking-wide'
                        type='submit'>Confirm
                </button>
            </form>
        </div>
    );
}