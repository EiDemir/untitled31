'use client';

import {motion} from "framer-motion";
import Image from "next/image";
import {useRouter} from "next/navigation";

export default function MainCategories() {
    const router = useRouter();

    return (
        <div
            className='flex md:flex-row flex-col gap-x-4 gap-y-4 h-[700px] md:h-[500px] my-16 md:mx-[10vw] mx-[3.6vw] sm:mx-[5vw]'>
            <motion.div onClick={() => router.push('/products/women')} whileHover={{scale: 1.1, zIndex: 10}}
                        transition={{
                            duration: 0.2
                        }}
                        className='cursor-pointer md:w-1/2 bg-[#E7E6E4] rounded-xl h-full relative drop-shadow-sm overflow-hidden'>
                <div
                    className='absolute bottom-4 left-4 md:bottom-7 md:left-7 flex flex-col gap-y-1 text-[#222222] z-10'>
                    <p className='text-sm'>HOT LIST</p>
                    <h5 className='font-medium text-lg md:text-2xl'><span className='font-bold'>WOMEN</span> COLLECTION
                    </h5>
                    <p className='text-sm font-medium'>SHOP NOW</p>
                </div>
                <Image className='absolute right-0 h-full w-auto' width={936} height={1404}
                       src='https://firebasestorage.googleapis.com/v0/b/sthh-9a6e2.appspot.com/o/05-31-23Studio3_KS_IM_14-39-47_53_BCCDQ43909_Gold_1789_SG_468x%402x.webp?alt=media&token=c98f9ef8-bbdf-4c0e-ab30-7dd29233700c'
                       alt='Women Collection'
                />
            </motion.div>
            <div className='md:w-1/2 h-full flex flex-col gap-y-4'>
                <motion.div whileHover={{scale: 1.1}} transition={{
                    duration: 0.2
                }}
                            className='cursor-pointer h-1/2 bg-[#EAE8E7] w-full rounded-xl relative drop-shadow-sm overflow-hidden'>
                    <div
                        className='absolute bottom-4 left-4 md:bottom-7 md:left-7 flex flex-col gap-y-1 text-[#222222] z-10'>
                        <p className='text-sm'>HOT LIST</p>
                        <h5 className='font-medium text-lg md:text-2xl'><span
                            className='font-bold'>MEN</span> COLLECTION</h5>
                        <p className='text-sm font-medium'>SHOP NOW</p>
                    </div>
                    <Image className='absolute right-0 h-auto w-1/2' width={936} height={1404}
                           src='https://firebasestorage.googleapis.com/v0/b/sthh-9a6e2.appspot.com/o/06-15-23Studio6_TK_DJ_11-21-49_10_SPDN2483M_White_24332_SG_468x%402x.webp?alt=media&token=c54c7be9-2aec-4b63-a0b5-b3e38cb890c9'
                           alt='Men Collection'
                    />
                </motion.div>
                <div className='h-1/2 w-full flex gap-x-4'>
                    <motion.div whileHover={{scale: 1.1}} transition={{
                        duration: 0.2
                    }} className='cursor-pointer bg-[#E7E6E4] w-1/2 rounded-xl relative drop-shadow-sm overflow-hidden'>
                        <div
                            className='absolute bottom-4 left-4 md:bottom-7 md:left-7 flex flex-col gap-y-1 text-[#222222] z-10'>
                            <p className='text-sm'>HOT LIST</p>
                            <h5 className='font-medium text-lg md:text-2xl'><span
                                className='font-bold'>KIDS</span> COLLECTION
                            </h5>
                            <p className='text-sm font-medium'>SHOP NOW</p>
                        </div>
                        <Image className='absolute right-0 h-full w-auto' width={936} height={1404}
                               src='https://firebasestorage.googleapis.com/v0/b/sthh-9a6e2.appspot.com/o/07-03-23Studio8_KT_DB_13-58-35_31_5BRB91830NV_White_P_8534_DG_468x%402x.webp?alt=media&token=a183ac32-b4f1-4ca3-a6ac-2e43e7ef22d1'
                               alt='Kids collection'/>
                    </motion.div>
                    <motion.div whileHover={{scale: 1.1}} transition={{
                        duration: 0.2
                    }} className='cursor-pointer bg-[#F5E6E0] w-1/2 rounded-xl relative drop-shadow-sm'>
                        <div
                            className='absolute bottom-4 left-4 md:bottom-7 md:left-7 flex flex-col gap-y-1 text-[#222222]'>
                            <p className='text-sm'>HOT LIST</p>
                            <h5 className='font-medium text-lg md:text-2xl'><span
                                className='font-bold'>BEAUTY</span> COLLECTION
                            </h5>
                            <p className='text-sm font-medium'>SHOP NOW</p>
                        </div>
                    </motion.div>
                </div>
            </div>
        </div>
    );
}