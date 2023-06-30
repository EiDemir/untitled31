'use client';

import {signIn} from "next-auth/react";
import {LockClosedIcon, UserIcon} from "@heroicons/react/24/outline";
import {LockClosedIcon as LockSolid, UserIcon as UserSolid} from "@heroicons/react/24/solid";
import Image from "next/image";
import {motion} from "framer-motion";

import googleLogo from '../../../public/logos/google-logo.png';
import {useState} from "react";
import Link from "next/link";
import {useRouter} from "next/navigation";

export default function Login() {
    const [firstLabelStatus, setFirstLabelStatus] = useState(false);
    const [secondLabelStatus, setSecondLabelStatus] = useState(false);
    const router = useRouter();

    return (
        <div
            className='max-w-[450px] px-5 sm:px-0 mt-10 mx-auto text-sm font-medium'>
            <form className='flex flex-col gap-y-5'>
                <div className="relative">
                    <input
                        className='drop-shadow-sm bg-transparent tracking-wider pr-11 pl-5 ring-[#E4E4E4] focus:ring-2 ring-2 text-[#222222] focus:ring-[#222222] border-0 w-full rounded-3xl py-3'
                        type='text'
                        name='id'
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
                        className='absolute left-5 px-1 bg-white'>Username or email address *
                    </motion.label>
                    <span
                        className="absolute inset-y-0 right-0 flex text-[#222222] items-center mr-3">
                        {firstLabelStatus ? <UserSolid className="h-7 w-7"/> : <UserIcon className="h-7 w-7"/>}
                                </span>
                </div>

                <div className="relative">
                    <input
                        className='drop-shadow-sm bg-transparent tracking-wider pr-11 pl-5 ring-[#E4E4E4] ring-2 text-[#222222] focus:ring-2 focus:ring-[#222222] border-0 w-full rounded-3xl py-3'
                        type='password'
                        name='password'
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
                        className='absolute left-5 px-1 bg-white'>Password *
                    </motion.label>
                    <span
                        className="absolute inset-y-0 right-0 flex text-[#222222] items-center mr-3">
                        {secondLabelStatus ? <LockSolid className="h-7 w-7"/> : <LockClosedIcon className="h-7 w-7"/>}

                                        </span>
                </div>


                <div className="flex justify-between mx-4">
                    <div className="flex gap-x-2 items-center">
                        <input id="remember" type="checkbox"
                               className="border-white shadow-none checked:bg-head ring-inset checked:ring-head w-4 h-4 rounded-sm bg-transparent ring-2 checked:ring-0 ring-[#E4E4E4] border-0"/>
                        <label htmlFor="remember" className="tracking-wide text-[#767676]">Remember
                            me</label>
                    </div>

                    <button onClick={() => {
                    }} className="tracking-wide">Forgot password?
                    </button>
                </div>
                <motion.button whileTap={{scale: 0.9}}
                               transition={{
                                   ease: 'easeOut'
                               }}
                               className='drop-shadow-md bg-head text-white py-3 rounded-full tracking-wide'
                               type='submit'>LOG IN
                </motion.button>
            </form>
            <div className="flex items-center my-3 mx-4">
                <div className="h-px w-full bg-[#E4E4E4]"/>
                <p className="px-2 leading-none">or</p>
                <div className="h-px w-full bg-[#E4E4E4]"/>
            </div>
            <motion.button whileTap={{scale: 0.9}}
                           transition={{
                               ease: 'easeOut'
                           }} onClick={() => signIn('google')}
                           className="drop-shadow-md relative py-3 flex w-full items-center text-white rounded-full bg-[#4285F4]">
                <Image className="h-11 absolute w-auto" src={googleLogo} alt="Google's logo"/>
                <h1 className="m-auto tracking-wide">SIGN IN WITH GOOGLE</h1>
            </motion.button>
            <p className='text-center mt-4 text-[#767676]'>No account yet? <Link onClick={() => router.refresh()}
                                                                                 className='underline text-head'
                                                                                 href='/auth/register'>Create
                Account</Link>
            </p>
        </div>
    );
}