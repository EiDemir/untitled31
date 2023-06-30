'use client';

import {useEffect, useMemo, useRef, useState} from "react";
import {
    AnimatePresence,
    motion,
    useAnimationFrame,
    useMotionValue,
    useScroll,
    useSpring,
    useTransform,
    useVelocity
} from "framer-motion";
import {wrap} from "@motionone/utils";
import {Rubik_Marker_Hatch} from "next/font/google";
import {useMediaQuery} from "usehooks-ts";
import ProductItem from "@/components/product/ProductItem";

interface ParallaxProps {
    children: string;
    baseVelocity: number;
    className: string
}

const font = Rubik_Marker_Hatch({
    weight: '400',
    subsets: ['latin']
});

function ParallaxText({children, baseVelocity = 100, className}: ParallaxProps) {
    const baseX = useMotionValue(0);
    const {scrollY} = useScroll();
    const scrollVelocity = useVelocity(scrollY);
    const smoothVelocity = useSpring(scrollVelocity, {
        damping: 50,
        stiffness: 400
    });
    const velocityFactor = useTransform(smoothVelocity, [0, 1000], [0, 5], {
        clamp: false
    });

    const x = useTransform(baseX, (v) => `${wrap(-20, -45, v)}%`);

    const directionFactor = useRef<number>(1);
    useAnimationFrame((t, delta) => {
        let moveBy = directionFactor.current * baseVelocity * (delta / 1000);

        if (velocityFactor.get() < 0) {
            directionFactor.current = -1;
        } else if (velocityFactor.get() > 0) {
            directionFactor.current = 1;
        }

        moveBy += directionFactor.current * moveBy * velocityFactor.get();

        baseX.set(baseX.get() + moveBy);
    });

    return (
        <div className={`parallax ${className} ${font.className}`}>
            <motion.div className="scroller" style={{x}}>
                <span>{children} </span>
                <span>{children} </span>
                <span>{children} </span>
                <span>{children} </span>
                <span>{children} </span>
                <span>{children} </span>
                <span>{children} </span>
                <span>{children} </span>
            </motion.div>
        </div>
    );
}

export default function BestSellingProducts() {
    const windowWidth = [useMediaQuery('(min-width: 640px)'), useMediaQuery('(min-width: 1024px)')];
    const [[currentProducts, direction], setCurrentProducts] = useState<[number[], number]>([
        windowWidth[1] ? [0, 1, 2, 3] : windowWidth[0] ? [0, 1, 2] : [0, 1]
        , 0]);
    const [areButtonsDisabled, setAreButtonsDisabled] = useState(false);

    const nextHandler = (direction: number) => {
        setAreButtonsDisabled(true);
        setCurrentProducts(prevState => [prevState[0].map(number => number + direction), direction]);
    };

    useEffect(() => {
        if (areButtonsDisabled) {
            const timeout = setTimeout(() => {
                setAreButtonsDisabled(false);
            }, 500);

            return () => clearTimeout(timeout);
        }
    }, [areButtonsDisabled]);

    useEffect(() => {
        const interval = setInterval(() => nextHandler(1), 4000);

        return () => clearInterval(interval);
    }, [currentProducts]);

    useEffect(() => setCurrentProducts(prevState => {
        const sec = prevState[0][1];
        const newArray = windowWidth[1] ? [...prevState[0].slice(0, 2), sec + 1, sec + 2] :
            windowWidth[0] ? [...prevState[0].slice(0, 2), sec + 1] : prevState[0].slice(0, 2);
        return [newArray, 0];
    }), [...windowWidth]);

    const bestSellingProducts = [
        {
            imageLink: '/best-selling/1.jpg', category: 'Tops', title: 'Lorem Ipsum', price: '$100'
        }, {
            imageLink: '/best-selling/2.jpg', category: 'Tops', title: 'Dolor Sit Amet', price: '$80'
        }, {
            imageLink: '/best-selling/3.jpg', category: 'Tops', title: 'Consectetur Adipiscing', price: '$90'
        }, {
            imageLink: '/best-selling/4.jpg', category: 'Tops', title: 'Donec Efficitur', price: '$150'
        }, {
            imageLink: '/best-selling/5.jpg', category: 'Tops', title: 'Luctus Scelerisque', price: '$130'
        }, {
            imageLink: '/best-selling/6.jpg', category: 'Tops', title: 'Aliquam Pretium', price: '$150'
        }, {
            imageLink: '/best-selling/7.jpg', category: 'Tops', title: 'Ante Dapibus', price: '$60'
        }, {
            imageLink: '/best-selling/8.jpg', category: 'Tops', title: 'Porttitor Lacus', price: '$100'
        }
    ];


    return <div className='flex flex-col py-16 gap-y-16 drop-shadow-sm'>
        <section className='flex flex-col justify-center'>
            <ParallaxText className='' baseVelocity={-5}>Best Selling</ParallaxText>
        </section>
        <div className='flex'>
            <button
                disabled={areButtonsDisabled}
                onClick={nextHandler.bind(null, -1)}
                className='w-[10vw] my-auto flex justify-end pr-5 z-10'>
                <svg width="25" height="25" viewBox="0 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                        d="M5.98282 11.6077L17.2252 0.36903C17.7185 -0.123032 18.5178 -0.123032 19.0123 0.36903C19.5056 0.861094 19.5056 1.66033 19.0123 2.15239L8.66165 12.4993L19.0111 22.8462C19.5044 23.3383 19.5044 24.1375 19.0111 24.6308C18.5178 25.1229 17.7173 25.1229 17.224 24.6308L5.98157 13.3923C5.49584 12.9053 5.49584 12.0935 5.98282 11.6077Z"
                        fill="#767676"/>
                </svg>
            </button>
            <div
                className="flex w-[80vw] gap-x-5 z-0">
                <AnimatePresence initial={false} mode='popLayout' custom={direction}>
                    {currentProducts.map(i => {
                            const {
                                imageLink,
                                category,
                                title,
                                price
                            } = bestSellingProducts[(i % bestSellingProducts.length + bestSellingProducts.length) % bestSellingProducts.length];
                            return <ProductItem
                                direction={direction}
                                key={i} imageLink={imageLink}
                                category={category}
                                title={title}
                                price={price}/>;
                        }
                    )}
                </AnimatePresence>
            </div>
            <button
                disabled={areButtonsDisabled}
                onClick={nextHandler.bind(null, 1)}
                className='w-[10vw] my-auto flex justify-start pl-5 z-10'>
                <svg width="25" height="25" viewBox="0 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                        d="M19.0169 13.3923L7.77451 24.631C7.28121 25.123 6.48197 25.123 5.98741 24.631C5.4941 24.1389 5.4941 23.3397 5.98741 22.8476L16.3381 12.5007L5.98866 2.15376C5.49535 1.66169 5.49535 0.862455 5.98866 0.369148C6.48197 -0.122915 7.28245 -0.122915 7.77576 0.369148L19.0181 11.6078C19.504 12.0948 19.504 12.9066 19.0169 13.3923Z"
                        fill="#767676"/>
                </svg>
            </button>
        </div>
    </div>
}