'use client';

import Image from "next/image";
import {domAnimation, LazyMotion, m} from "framer-motion";
import Link from "next/link";

export default function Footer() {
    return (
        <div className='bg-[#E4E4E4] w-full flex flex-col divide-y divide-[#CFCDCD] px-[5vw]'>
            <div className='py-14 flex flex-col gap-y-9 md:flex-row'>
                <div className='md:basis-1/4 flex flex-col justify-start text-sm gap-y-8 mr-3'>
                    <svg width="113" height="28" viewBox="0 0 113 28" fill="none"
                         xmlns="http://www.w3.org/2000/svg">
                        <circle cx="99.55" cy="13" r="13" fill="#E893CF"/>
                        <path fillRule="evenodd" clipRule="evenodd"
                              d="M15.2217 1.5H14.7551V17.53C14.7551 18.7667 14.4284 19.77 13.7751 20.54C13.1218 21.31 12.1301 21.695 10.8001 21.695C9.49342 21.695 8.51342 21.31 7.86009 20.54C7.20675 19.77 6.88009 18.7667 6.88009 17.53V1.5H0.965088V17.95C0.965088 19.49 1.21009 20.8317 1.70009 21.975C2.21342 23.1183 2.91342 24.0633 3.80009 24.81C4.71009 25.5333 5.76009 26.0817 6.95009 26.455C8.14009 26.8283 9.42342 27.015 10.8001 27.015C12.1768 27.015 13.4601 26.8283 14.6501 26.455C15.8634 26.0817 16.9134 25.5333 17.8001 24.81C18.7101 24.0633 19.4101 23.1183 19.9001 21.975C20.4134 20.8317 20.6701 19.49 20.6701 17.95V6.94843L15.2217 1.5ZM30.5461 13.75C30.5461 15.1967 30.8261 16.48 31.3861 17.6C31.9694 18.6967 32.7744 19.56 33.8011 20.19C34.8511 20.82 36.0761 21.135 37.4761 21.135C38.8528 21.135 40.0544 20.82 41.0811 20.19C41.139 20.1553 41.1962 20.1198 41.2526 20.0836L45.4901 24.3211C44.6649 24.9203 43.7553 25.4216 42.7611 25.825C41.1511 26.455 39.3894 26.77 37.4761 26.77C35.5394 26.77 33.7661 26.455 32.1561 25.825C30.5461 25.1717 29.1461 24.2617 27.9561 23.095C26.7894 21.9283 25.8794 20.5517 25.2261 18.965C24.5961 17.3783 24.2811 15.64 24.2811 13.75C24.2811 11.86 24.6078 10.1333 25.2611 8.57C25.7059 7.54235 26.2616 6.60545 26.9282 5.75928L31.2931 10.1242C30.7951 11.1771 30.5461 12.3858 30.5461 13.75ZM48.3032 21.4774L43.7892 16.9634C44.1771 16.0009 44.3711 14.9298 44.3711 13.75C44.3711 12.3033 44.0911 11.0317 43.5311 9.935C42.9711 8.815 42.1778 7.94 41.1511 7.31C40.1244 6.68 38.8994 6.365 37.4761 6.365C36.1696 6.365 35.0155 6.63933 34.0138 7.188L29.8924 3.0666C30.6237 2.59833 31.4133 2.20446 32.2611 1.885C33.8711 1.255 35.6094 0.940001 37.4761 0.940001C39.3661 0.940001 41.1044 1.255 42.6911 1.885C44.3011 2.49167 45.7011 3.36667 46.8911 4.51C48.0811 5.65334 49.0028 7.00667 49.6561 8.57C50.3094 10.1333 50.6361 11.86 50.6361 13.75C50.6361 15.64 50.3094 17.3783 49.6561 18.965C49.2964 19.8709 48.8454 20.7084 48.3032 21.4774ZM60.7262 13.505L59.2562 26H53.0262L56.9812 0.275002L67.4112 15.22L77.8762 0.275002L81.8312 26H75.6012L74.1312 13.505L67.4112 23.725L60.7262 13.505Z"
                              fill='#222222'/>
                    </svg>
                    <p className='font-normal'>
                        1418 River Drive, Suite 35 Cottonhall,<br/>CA 9622 United States
                    </p>
                    <p className='font-medium'>
                        sale@uomo.com<br/>
                        +1 246-345-0695
                    </p>
                    <div className='flex gap-x-7 items-center'>
                        <a href='#'><Image src='/icons/facebook.svg' alt='Logo' width='11' height='11'/></a>
                        <a href='#'><Image src='/icons/instagram.svg' alt='Logo' width='20' height='20'/></a>
                        <a href='#'><Image src='/icons/twitter.svg' alt='Logo' width='20' height='20'/></a>
                        <a href='#'><Image src='/icons/youtube.svg' alt='Logo' width='20' height='20'/></a>
                        <a href='#'><Image src='/icons/pinterest.svg' alt='Logo' width='20' height='20'/></a>
                    </div>
                </div>
                <div className='md:basis-1/2 grid grid-cols-2 gap-y-10 sm:grid-cols-3'>
                    <div className='flex flex-col gap-y-9'>
                        <h3 className='font-medium text-lg'>COMPANY</h3>
                        <div className='flex flex-col gap-y-5 text-sm'>
                            <p>About Us</p>
                            <p>Careers</p>
                            <p>Affiliates</p>
                            <p>Blog</p>
                            <p>Contact Us</p>
                        </div>
                    </div>
                    <div className='flex flex-col gap-y-9'>
                        <h3 className='font-medium text-lg'>SHOP</h3>
                        <div className='flex flex-col gap-y-5 text-sm'>
                            <p>New Arrivals</p>
                            <p>Accessories</p>
                            <Link href='/products/men'>Men</Link>
                            <Link href='/products/women'>Women</Link>
                            <p>Shop All</p>
                        </div>
                    </div>
                    <div className='flex flex-col gap-y-9'>
                        <h3 className='font-medium text-lg'>HELP</h3>
                        <div className='flex flex-col gap-y-5 text-sm'>
                            <p>Customer Service</p>
                            <Link href='/dashboard'>My Account</Link>
                            <p>Find a Store</p>
                            <p>Legal & Privacy</p>
                            <p>Contact</p>
                            <p>Gift Card</p>
                        </div>
                    </div>
                </div>
                <div className='md:basis-1/4 flex flex-col gap-y-9'>
                    <h3 className='font-medium text-lg'>SUBSCRIBE</h3>
                    <p className='text-sm'>Be the first to get the latest news about trends, promotions, and much
                        more!</p>
                    <LazyMotion features={domAnimation}>
                        <m.div
                            whileTap={{
                                scale: 0.9
                            }}
                            transition={{
                                ease: 'easeOut'
                            }}
                            className='rounded-full bg-white w-full h-12 flex justify-between items-center'>
                            <input type='email' placeholder='Your email address'
                                   className='border-transparent focus:border-transparent focus:ring-0 p-0 w-full text-sm my-3 mx-4 placeholder-black'/>
                            <button type='button'
                                    className='rounded-r-full px-4 h-full text-sm font-medium hover:bg-blue-500 hover:text-white'>JOIN
                            </button>
                        </m.div>
                    </LazyMotion>
                    <div>
                        <p className='font-medium mb-3'>Secure payments</p>
                        <div className='flex flex-row gap-x-10 md:gap-x-0 h-4 md:justify-between'>
                            <Image className='w-auto' src='/logos/visa.png' alt="visa's logo" height='65' width='200'/>
                            <Image className='w-auto' src='/logos/mastercard.png' alt="mastercard's logo" height='216'
                                   width='384'/>
                            <Image className='w-auto' src='/logos/paypal.png' alt="Paypal's logo" height='102'
                                   width='384'/>
                            <Image className='w-auto' src='/logos/skrill.png' alt="Skrill's logo" height='139'
                                   width='384'/>
                        </div>
                    </div>
                </div>
            </div>
            <div className='flex flex-col gap-y-5 md:flex-row justify-between md:items-center py-7'>
                <p className='text-sm'>©2023 Emir Demir</p>
                <div className='flex gap-x-5 sm:flex-row flex-col gap-y-5'>
                    <div className='flex gap-x-5'>
                        <p className='text-[#222222]'>Language</p>
                        <p>United States | English</p>
                    </div>
                    <div className='flex gap-x-5'>
                        <p className='text-[#222222]'>Currency</p>
                        <p>$ USD</p>
                    </div>
                </div>
            </div>
        </div>
    );
}