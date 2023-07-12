'use client';

import {ReactNode} from "react";
import {motion} from "framer-motion";
import {usePathname} from "next/navigation";

export default function PageLayout({children}: { children: ReactNode }) {
    const pathname = usePathname();
    const checkoutResultPage = pathname.startsWith('/checkout/result');

    return (
        <div className='relative mx-[3.6vw] sm:mx-[5vw] lg:mx-[10vw] my-20 flex flex-col gap-y-12'>
            <motion.h1 initial={{y: 10, opacity: 0}} animate={{y: 0, opacity: 1}}
                       className='font-bold text-3xl sm:text-4xl'>{pathname === '/cart' ? 'CART' : pathname.startsWith('/checkout/result') ? 'ORDER RECEIVED' : ''}
            </motion.h1>
            <div className='flex flex-col gap-y-3'>
                <div className='flex'>
                    <div className='w-1/3 flex gap-x-2.5'>
                        <span className='text-[#222222] text-lg font-medium'>01</span>
                        <div>
                            <h1 className='text-[#222222] text-lg font-medium'>SHOPPING BAG</h1>
                            <p className='text-[#767676] text-sm'>Manage Your Items List</p>
                        </div>
                    </div>
                    <div className='w-1/3 flex gap-x-2.5'>
                        <span className={`text-[#${checkoutResultPage ? '2222222' : '767676'}] text-lg font-medium`}>02</span>
                        <div>
                            <h1 className={`text-[#${checkoutResultPage ? '2222222' : '767676'}] text-lg font-medium`}>SHIPPING AND CHECKOUT</h1>
                            <p className='text-[#767676] text-sm'>Checkout Your Items List</p>
                        </div>
                    </div>
                    <div className='w-1/3 flex gap-x-2.5'>
                        <span className={`text-[#${checkoutResultPage ? '2222222' : '767676'}] text-lg font-medium`}>03</span>
                        <div>
                            <h1 className={`text-[#${checkoutResultPage ? '2222222' : '767676'}] text-lg font-medium`}>CONFIRMATION</h1>
                            <p className='text-[#767676] text-sm'>Review and Submit Your Order</p>
                        </div>
                    </div>
                </div>
                <div className='relative w-full h-0.5 bg-[#E4E4E4]'>
                    <motion.div initial={{width: '0'}}
                                animate={{width: pathname === '/cart' ? '33.333333%' : pathname.startsWith('/checkout/result') ? '100%' : ''}}
                                className='absolute h-0.5 bg-[#222222]'/>
                </div>
            </div>
            {children}
        </div>
    );
}