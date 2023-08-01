'use client';

import {ReactNode} from "react";
import {motion} from "framer-motion";
import {usePathname} from "next/navigation";

export default function PageLayout({children}: { children: ReactNode }) {
    const pathname = usePathname();
    const isCheckoutPage = pathname.startsWith('/checkout');
    const isCheckoutResultPage = pathname.startsWith('/checkout/result');

    return (
        <div className='relative mx-[5vw] lg:mx-[10vw] my-20 flex flex-col gap-y-12'>
            <motion.h1 initial={{y: 10, opacity: 0}} animate={{y: 0, opacity: 1}}
                       className='font-bold text-3xl sm:text-4xl'>{isCheckoutResultPage ? 'ORDER RECEIVED' : isCheckoutPage ? 'SHIPPING AND CHECKOUT' : 'CART'}
            </motion.h1>
            <div className='flex flex-col gap-y-3'>
                <div className='flex gap-x-4 sm:gap-x-0'>
                    <div className='w-1/3 flex sm:flex-row flex-col gap-2.5'>
                        <span className='text-[#222222] text-base sm:text-lg font-medium'>01</span>
                        <div>
                            <h1 className='text-[#222222] text-base sm:text-lg font-medium'>SHOPPING BAG</h1>
                            <p className='text-[#767676] text-sm'>Manage Your Items List</p>
                        </div>
                    </div>
                    <div className='w-1/3 flex sm:flex-row flex-col gap-2.5'>
                        <span
                            className={`text-[#${isCheckoutPage ? '2222222' : '767676'}] text-base sm:text-lg font-medium`}>02</span>
                        <div>
                            <h1 className={`text-[#${isCheckoutPage ? '2222222' : '767676'}] text-base sm:text-lg font-medium`}>SHIPPING
                                AND CHECKOUT</h1>
                            <p className='text-[#767676] text-sm'>Checkout Your Items List</p>
                        </div>
                    </div>
                    <div className='w-1/3 flex sm:flex-row flex-col gap-2.5'>
                        <span
                            className={`text-[#${isCheckoutResultPage ? '2222222' : '767676'}] text-base sm:text-lg font-medium`}>03</span>
                        <div>
                            <h1 className={`text-[#${isCheckoutResultPage ? '2222222' : '767676'}] text-base sm:text-lg font-medium`}>CONFIRMATION</h1>
                            <p className='text-[#767676] text-sm'>Your order gets received</p>
                        </div>
                    </div>
                </div>
                <div className='relative w-full h-0.5 bg-[#E4E4E4] rounded-full'>
                    <motion.div initial={{width: '0'}}
                                animate={{width: isCheckoutResultPage ? '100%' : isCheckoutPage ? '66.66%' : '33%'}}
                                className='absolute h-0.5 bg-[#222222] rounded-full'/>
                </div>
            </div>
            {children}
        </div>
    );
}