'use client';

import {motion} from "framer-motion";
import {
    LockClosedIcon as LockSolid,
    UserIcon as UserSolid,
    EnvelopeIcon as EnvelopeSolid
} from "@heroicons/react/24/solid";
import {EnvelopeIcon, LockClosedIcon, UserIcon} from "@heroicons/react/24/outline";
import {useState} from "react";

export default function Register() {
    const [firstLabelStatus, setFirstLabelStatus] = useState(false);
    const [secondLabelStatus, setSecondLabelStatus] = useState(false);
    const [thirdLabelStatus, setThirdLabelStatus] = useState(false);
    const [fourthLabelStatus, setFourthLabelStatus] = useState(false);

    return (
        <div
            className='max-w-[450px] px-5 sm:px-0 mx-auto mt-10 text-sm font-medium'>
            <form className='flex flex-col gap-y-5'>
                <div className="relative">
                    <input
                        className='drop-shadow-sm bg-transparent tracking-wider pr-11 pl-5 ring-[#E4E4E4] focus:ring-2 ring-2 text-[#222222] focus:ring-[#222222] border-0 w-full rounded-3xl py-3'
                        type='text'
                        name='username'
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
                        className='absolute left-5 px-1 bg-white'>Username
                    </motion.label>
                    <span
                        className="absolute inset-y-0 right-0 flex text-[#222222] items-center mr-3">
                        {firstLabelStatus ? <UserSolid className="h-7 w-7"/> : <UserIcon className="h-7 w-7"/>}
                                </span>
                </div>

                <div className="relative">
                    <input
                        className='drop-shadow-sm bg-transparent tracking-wider pr-11 pl-5 ring-[#E4E4E4] focus:ring-2 ring-2 text-[#222222] focus:ring-[#222222] border-0 w-full rounded-3xl py-3'
                        type='email'
                        name='email'
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
                        className='absolute left-5 px-1 bg-white'>Email *
                    </motion.label>
                    <span
                        className="absolute inset-y-0 right-0 flex text-[#222222] items-center mr-3">
                        {secondLabelStatus ? <EnvelopeSolid className="h-7 w-7"/> : <EnvelopeIcon className="h-7 w-7"/>}
                                </span>
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
                        className='absolute left-5 px-1 bg-white'>Password *
                    </motion.label>
                    <span
                        className="absolute inset-y-0 right-0 flex text-[#222222] items-center mr-3">
                        {thirdLabelStatus ? <LockSolid className="h-7 w-7"/> : <LockClosedIcon className="h-7 w-7"/>}

                                        </span>
                </div>

                <div className="relative">
                    <input
                        className='drop-shadow-sm bg-transparent tracking-wider pr-11 pl-5 ring-[#E4E4E4] ring-2 text-[#222222] focus:ring-2 focus:ring-[#222222] border-0 w-full rounded-3xl py-3'
                        type='password'
                        name='repPassword'
                        onFocus={() => setFourthLabelStatus(true)}
                        onBlur={(event) => setFourthLabelStatus(event.target.value.length !== 0)}
                    />
                    <motion.label
                        initial={false}
                        animate={{
                            top: fourthLabelStatus ? '-10px' : '0.875rem',
                            bottom: fourthLabelStatus ? '' : '0.875rem',
                            zIndex: fourthLabelStatus ? 10 : -10,
                            color: fourthLabelStatus ? '#222222' : '#767676'
                        }}
                        transition={{
                            duration: 0.1,
                            ease: 'easeOut'
                        }}
                        className='absolute left-5 px-1 bg-white'>Confirm Password *
                    </motion.label>
                    <span
                        className="absolute inset-y-0 right-0 flex text-[#222222] items-center mr-3">
                        {fourthLabelStatus ? <LockSolid className="h-7 w-7"/> : <LockClosedIcon className="h-7 w-7"/>}

                                        </span>
                </div>

                <p className='text-[#767676] text-sm'>Your personal data will be used to support your experience
                    throughout this website, to manage access to your account, and for other purposes described in our
                    privacy policy.</p>

                <motion.button whileTap={{scale: 0.9}}
                               transition={{
                                   ease: 'easeOut'
                               }}
                               className='drop-shadow-md bg-head text-white py-3 rounded-full tracking-wide'
                               type='submit'>Register
                </motion.button>
            </form>
        </div>
    );
}