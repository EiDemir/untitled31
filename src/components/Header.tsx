'use client';

import {domAnimation, LazyMotion, m, useMotionValueEvent, useScroll} from "framer-motion";
import {MenuToggle} from "@/components/MenuToggle";
import {useContext, useEffect, useRef, useState} from "react";
import {useDimensions} from "@/hooks/use-dimensions";
import Link from "next/link";
import {HeartIcon, ShoppingBagIcon, UserIcon} from "@heroicons/react/24/outline";
import {
    HeartIcon as HeartSolid,
    ShoppingBagIcon as BagSolid,
    UserIcon as UserSolid
} from "@heroicons/react/24/solid";
import {useSession} from "next-auth/react";
import {usePathname} from "next/navigation";
import {getCartItemsNumber} from "@/utils/localStorage";
import {CartItemsNumberContext} from "@/store/CartItemsNumberContext";
import SearchBox from "@/components/SearchBox";
import SidebarLink from "@/components/ui/SidebarLink";

const item = {
    closed: {opacity: 0, x: -30},
    open: {opacity: 1, x: 0}
};

const list = {
    closed: {
        transition: {
            staggerChildren: 0.05, staggerDirection: -1
        }
    }, open: {
        transition: {
            staggerChildren: 0.07,
            delayChildren: 0.2
        }
    }
};

const sidebar = {
    open: (height = 1000) => ({
        backgroundColor: '#E893CF',
        clipPath: `circle(${height * 2 + 200}px at 0px 0px)`,
        transition: {
            type: "spring",
            stiffness: 20,
            restDelta: 2
        }
    }),
    closed: {
        backgroundColor: '#FFFFFF',
        clipPath: `circle(0px at 0px 0px)`,
        transition: {
            delay: 0.5,
            type: "spring",
            stiffness: 400,
            damping: 40
        }
    }
}

export default function Header({startWithWhite}: {
    startWithWhite: boolean
}) {
    const {status, data} = useSession();
    const cartCtx = useContext(CartItemsNumberContext);
    const pathname = usePathname();
    const [isOpen, setIsOpen] = useState(false);
    const [isLight, setIsLight] = useState(startWithWhite);
    const [isTransparent, setIsTransparent] = useState(true);
    const containerRef = useRef(null);
    const {height} = useDimensions(containerRef);
    const scroll = useScroll();

    const [isHovered2, setIsHovered2] = useState(false);
    const [isHovered3, setIsHovered3] = useState(false);
    const [isHovered4, setIsHovered4] = useState(false);

    useEffect(() => {
        if (status === 'authenticated') {
            // @ts-ignore
            cartCtx.setCartItemsNumber(data!.user!.cartItemsNumber)
        } else if (status === 'unauthenticated') {
            cartCtx.setCartItemsNumber(getCartItemsNumber());
        }
    }, [status])

    useMotionValueEvent(scroll.scrollY, 'change', (latestValue) => {
        if (latestValue > 10) {
            if (startWithWhite)
                setIsLight(false);
            setIsTransparent(false);
        } else if (latestValue < 10) {
            if (startWithWhite)
                setIsLight(true);
            setIsTransparent(true);
        }
    });

    const menuHandler = () => {
        setIsOpen(prevState => !prevState);
        document.body.style.overflowY = !isOpen ? 'hidden' : 'scroll';
    };

    const iconClasses = `w-5 h-auto text-${isLight ? 'white' : '[#222222]'}`;


    return (
        <LazyMotion features={domAnimation}>
            <m.div>
                <div
                    onClick={menuHandler}
                    className={`${isOpen ? 'opacity-100 visible' : 'opacity-0 hidden'} duration-500 transition-opacity backdrop-blur-none bg-black/50 fixed inset-0 z-30`}/>
                <m.div initial={false}
                       animate={isOpen ? 'open' : 'closed'}
                       custom={height}
                       ref={containerRef}>
                    <m.div className="background z-40" variants={sidebar}/>
                    <m.div
                        className={`fixed z-[100] my-20 w-full px-7 md:px-10 ${isOpen ? '' : 'pointer-events-none'}`}
                        variants={{
                            open: {
                                opacity: 1,
                                transition: {
                                    delay: 0.2
                                }
                            }, closed: {
                                opacity: 0
                            }
                        }}>
                        <SearchBox className='block sm:hidden w-full'/>
                    </m.div>
                    <m.div
                        className={`fixed text-[#222222] z-50 mx-7 md:mx-10 mt-40 sm:mt-20 ${isOpen ? '' : 'pointer-events-none'}`}
                        variants={list}>
                        <m.h1 className='text-5xl font-bold mb-4' variants={item}>
                            CATEGORIES
                        </m.h1>
                        <div className='flex flex-col gap-y-3 overflow-y-auto'>
                            <SidebarLink onClick={menuHandler} href='/products'>ALL PRODUCTS</SidebarLink>
                            <SidebarLink onClick={menuHandler} href='/products/summer'>SUMMER PRODUCTS</SidebarLink>
                            <SidebarLink onClick={menuHandler} href='/products/women'>WOMEN</SidebarLink>
                            <SidebarLink onClick={menuHandler} href='/products/men'>MEN</SidebarLink>
                            <SidebarLink onClick={menuHandler} href='/products/kids'>KIDS</SidebarLink>
                            <SidebarLink onClick={menuHandler} href='/products/shirts'>SHIRTS</SidebarLink>
                            <SidebarLink onClick={menuHandler} href='/products/t-shirts'>T-SHIRTS</SidebarLink>
                            <SidebarLink onClick={menuHandler} href='/products/dresses'>DRESSES</SidebarLink>
                            <SidebarLink onClick={menuHandler} href='/products/sunglasses'>SUNGLASSES</SidebarLink>
                            <SidebarLink onClick={menuHandler} href='/products/shoes'>SHOES</SidebarLink>
                            <SidebarLink onClick={menuHandler} href='/products/hoodies'>HOODIES</SidebarLink>
                            <SidebarLink onClick={menuHandler} href='/products/sweaters'>SWEATERS</SidebarLink>
                        </div>
                    </m.div>
                    <MenuToggle color={isLight ? 'white' : '#222222'} toggle={menuHandler}/>
                </m.div>
                <div className='fixed top-0 right-0 left-0 z-20'>
                    <nav
                        className={`w-full ${isTransparent ? '' : 'bg-white/50 backdrop-blur-lg'} transition-colors duration-500 relative text-sm text-${isLight ? 'white' : '[#222222]'} font-medium flex justify-between items-center h-[66px] pt-0 px-[3vw] gap-x-3`}>
                        <Link aria-label='Go to home page' href='/' prefetch={false} className='ml-12 my-auto'>
                            <svg className='max-w-full min-w-0' width="113" height="28" viewBox="0 0
                        113 28" fill="none"
                                 xmlns="http://www.w3.org/2000/svg">
                                <circle cx="99.55" cy="13" r="13" fill="#E893CF"/>
                                <path fillRule="evenodd" clipRule="evenodd"
                                      d="M15.2217 1.5H14.7551V17.53C14.7551 18.7667 14.4284 19.77 13.7751 20.54C13.1218 21.31 12.1301 21.695 10.8001 21.695C9.49342 21.695 8.51342 21.31 7.86009 20.54C7.20675 19.77 6.88009 18.7667 6.88009 17.53V1.5H0.965088V17.95C0.965088 19.49 1.21009 20.8317 1.70009 21.975C2.21342 23.1183 2.91342 24.0633 3.80009 24.81C4.71009 25.5333 5.76009 26.0817 6.95009 26.455C8.14009 26.8283 9.42342 27.015 10.8001 27.015C12.1768 27.015 13.4601 26.8283 14.6501 26.455C15.8634 26.0817 16.9134 25.5333 17.8001 24.81C18.7101 24.0633 19.4101 23.1183 19.9001 21.975C20.4134 20.8317 20.6701 19.49 20.6701 17.95V6.94843L15.2217 1.5ZM30.5461 13.75C30.5461 15.1967 30.8261 16.48 31.3861 17.6C31.9694 18.6967 32.7744 19.56 33.8011 20.19C34.8511 20.82 36.0761 21.135 37.4761 21.135C38.8528 21.135 40.0544 20.82 41.0811 20.19C41.139 20.1553 41.1962 20.1198 41.2526 20.0836L45.4901 24.3211C44.6649 24.9203 43.7553 25.4216 42.7611 25.825C41.1511 26.455 39.3894 26.77 37.4761 26.77C35.5394 26.77 33.7661 26.455 32.1561 25.825C30.5461 25.1717 29.1461 24.2617 27.9561 23.095C26.7894 21.9283 25.8794 20.5517 25.2261 18.965C24.5961 17.3783 24.2811 15.64 24.2811 13.75C24.2811 11.86 24.6078 10.1333 25.2611 8.57C25.7059 7.54235 26.2616 6.60545 26.9282 5.75928L31.2931 10.1242C30.7951 11.1771 30.5461 12.3858 30.5461 13.75ZM48.3032 21.4774L43.7892 16.9634C44.1771 16.0009 44.3711 14.9298 44.3711 13.75C44.3711 12.3033 44.0911 11.0317 43.5311 9.935C42.9711 8.815 42.1778 7.94 41.1511 7.31C40.1244 6.68 38.8994 6.365 37.4761 6.365C36.1696 6.365 35.0155 6.63933 34.0138 7.188L29.8924 3.0666C30.6237 2.59833 31.4133 2.20446 32.2611 1.885C33.8711 1.255 35.6094 0.940001 37.4761 0.940001C39.3661 0.940001 41.1044 1.255 42.6911 1.885C44.3011 2.49167 45.7011 3.36667 46.8911 4.51C48.0811 5.65334 49.0028 7.00667 49.6561 8.57C50.3094 10.1333 50.6361 11.86 50.6361 13.75C50.6361 15.64 50.3094 17.3783 49.6561 18.965C49.2964 19.8709 48.8454 20.7084 48.3032 21.4774ZM60.7262 13.505L59.2562 26H53.0262L56.9812 0.275002L67.4112 15.22L77.8762 0.275002L81.8312 26H75.6012L74.1312 13.505L67.4112 23.725L60.7262 13.505Z"
                                      fill={isLight ? '#FFFFFF' : '#222222'}/>
                            </svg>
                        </Link>
                        <ul className="lg:flex hidden items-center gap-x-7 whitespace-nowrap">
                            <li><Link href='/products/women'>NEW IN</Link></li>
                            <li><Link href='/products/women'>WOMEN</Link></li>
                            <li><Link href='/products/men'>MEN</Link></li>
                            <li><Link href='/products/kids'>KIDS</Link></li>
                            <li><Link href='/products/beauty'>BEAUTY</Link></li>
                        </ul>
                        <div className="flex justify-self-end justify-between items-center gap-x-4 md:2/3 lg:w-1/2">
                            <SearchBox className='hidden sm:block'/>
                            {
                                status === 'loading' &&
                                <>
                                    <div
                                        className={`p-3 mx-0.5 sm:mx-1.5 rounded-full animate-pulse ${isLight ? 'bg-[#FFFFFF]' : 'bg-[#222222]'}`}/>
                                    <div
                                        className={`block sm:hidden p-3 rounded-full animate-pulse ${isLight ? 'bg-[#FFFFFF]' : 'bg-[#222222]'}`}/>
                                    <div
                                        className={`hidden sm:block rounded-full animate-pulse w-24 h-12 ${isLight ? 'bg-[#FFFFFF]' : 'bg-[#222222]'}`}/>
                                </>
                            }

                            {
                                status === 'unauthenticated' &&
                                <>
                                    {
                                        !pathname.startsWith('/auth/') &&
                                        <>
                                            <Link prefetch={false} href='/cart' className='relative p-2 cursor-pointer'
                                                  onMouseEnter={() => setIsHovered4(true)}
                                                  onMouseLeave={() => setIsHovered4(false)}>
                                                {!isHovered4 ? <ShoppingBagIcon className={iconClasses}/> :
                                                    <BagSolid className={iconClasses}/>}
                                                <span
                                                    /*
                                                    // @ts-ignore */
                                                    className='text-xs font-medium text-white absolute -bottom-0 -right-0 bg-[#E893CF] w-4 h-4 rounded-full flex items-center pl-1'>{cartCtx.cartItemsNumber}</span>
                                            </Link>
                                            <Link aria-label='Go to dashboard' href='/auth/login'
                                                  className='block sm:hidden cursor-pointer'
                                                  onMouseEnter={() => setIsHovered2(true)}
                                                  onMouseLeave={() => setIsHovered2(false)}>
                                                {!isHovered2 ? <UserIcon className={iconClasses}/> :
                                                    <UserSolid className={iconClasses}/>}
                                            </Link>
                                            <Link href='/auth/login'
                                                  className={`hidden sm:block ${isLight ? 'bg-[#FFFFFF] text-[#222222]' : 'bg-[#222222] text-[#FFFFFF] hover:bg-black'} rounded-full text-center text-base py-3 w-24 font-semibold tracking-wide`}>Log
                                                in
                                            </Link>
                                        </>
                                    }
                                </>
                            }

                            {status === 'authenticated' &&
                                <>
                                    <Link href='/dashboard/wishlist' className='cursor-pointer hidden sm:block'
                                          onMouseEnter={() => setIsHovered3(true)}
                                          onMouseLeave={() => setIsHovered3(false)}>
                                        {!isHovered3 ? <HeartIcon className={iconClasses}/> :
                                            <HeartSolid className={iconClasses}/>}
                                    </Link>
                                    <Link prefetch={false} href='/cart' className='relative p-2 cursor-pointer'
                                          onMouseEnter={() => setIsHovered4(true)}
                                          onMouseLeave={() => setIsHovered4(false)}>
                                        {!isHovered4 ? <ShoppingBagIcon className={iconClasses}/> :
                                            <BagSolid className={iconClasses}/>}
                                        <span
                                            className='text-xs font-medium text-white absolute -bottom-0.5 -right-0.5 bg-[#E893CF] rounded-full flex items-center text-center px-1.5 py-px'>{cartCtx.cartItemsNumber}</span>
                                    </Link>
                                    <Link href='/dashboard'
                                          className='cursor-pointer'
                                          onMouseEnter={() => setIsHovered2(true)}
                                          onMouseLeave={() => setIsHovered2(false)}>
                                        {!isHovered2 ? <UserIcon className={iconClasses}/> :
                                            <UserSolid className={iconClasses}/>}
                                    </Link>
                                </>
                            }
                        </div>
                    </nav>
                </div>
            </m.div>
        </LazyMotion>
    );
}