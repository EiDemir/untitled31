'use client';

import {useEffect, useState} from "react";
import {
    AnimatePresence, domAnimation, LazyMotion
} from "framer-motion";
import {useMediaQuery, useWindowSize} from "usehooks-ts";
import ProductItem2 from "@/components/product/ProductItem2";

export const revalidate = 60;

export default function BestSellingProducts({products}: {
    products: {
        images: string[], categories: { name: string }[],
        name: string,
        price: number,
        id: string,
        colors: { name: string, hexColorCode: string }[],
    }[]
}) {
    const {width} = useWindowSize();
    const windowWidth = [useMediaQuery('(min-width: 640px)'), useMediaQuery('(min-width: 1024px)')];
    const [[currentProducts, direction], setCurrentProducts] = useState<[number[], number]>([
        windowWidth[1] ? [0, 1, 2, 3, 4] : windowWidth[0] ? [0, 1, 2, 3] : [0, 1, 2]
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
            }, 1000);

            return () => clearTimeout(timeout);
        }
    }, [areButtonsDisabled]);

    useEffect(() => {
        const interval = setInterval(() => nextHandler(1), 4000);

        return () => clearInterval(interval);
    }, [currentProducts]);

    useEffect(() => setCurrentProducts(prevState => {
        const sec = prevState[0][1];
        const newArray = windowWidth[1] ? [...prevState[0].slice(0, 2), sec + 1, sec + 2, sec + 3] :
            windowWidth[0] ? [...prevState[0].slice(0, 2), sec + 1, sec + 2] : [...prevState[0].slice(0, 2), sec + 1];
        return [newArray, 0];
    }), [...windowWidth]);


    return (
        <div className='flex'>
            <button
                aria-label='Previous product'
                disabled={areButtonsDisabled}
                onClick={nextHandler.bind(null, -1)}
                className='sm:w-[5vw] w-[8vw] flex justify-center items-center z-10'>
                <svg width="25" height="25" viewBox="0 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                        d="M5.98282 11.6077L17.2252 0.36903C17.7185 -0.123032 18.5178 -0.123032 19.0123 0.36903C19.5056 0.861094 19.5056 1.66033 19.0123 2.15239L8.66165 12.4993L19.0111 22.8462C19.5044 23.3383 19.5044 24.1375 19.0111 24.6308C18.5178 25.1229 17.7173 25.1229 17.224 24.6308L5.98157 13.3923C5.49584 12.9053 5.49584 12.0935 5.98282 11.6077Z"
                        fill="#767676"/>
                </svg>
            </button>
            <div
                className="flex sm:w-[90vw] w-[84vw] gap-x-4 z-0">
                <LazyMotion features={domAnimation}>
                    <AnimatePresence initial={false} mode='popLayout' custom={direction}>
                        {currentProducts.map(i => {
                                const {
                                    images,
                                    categories,
                                    name,
                                    price,
                                    id,
                                    colors
                                } = products[(i % products.length + products.length) % products.length];
                                return <ProductItem2
                                    direction={direction}
                                    key={i} imageLink={images[0]}
                                    categories={categories}
                                    title={name}
                                    price={price}
                                    id={id}
                                    colors={colors}/>;
                            }
                        )}
                    </AnimatePresence>
                </LazyMotion>
            </div>
            <button
                aria-label='Next product'
                disabled={areButtonsDisabled}
                onClick={nextHandler.bind(null, 1)}
                className='sm:w-[5vw] w-[8vw] flex justify-center items-center z-10'>
                <svg width="25" height="25" viewBox="0 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                        d="M19.0169 13.3923L7.77451 24.631C7.28121 25.123 6.48197 25.123 5.98741 24.631C5.4941 24.1389 5.4941 23.3397 5.98741 22.8476L16.3381 12.5007L5.98866 2.15376C5.49535 1.66169 5.49535 0.862455 5.98866 0.369148C6.48197 -0.122915 7.28245 -0.122915 7.77576 0.369148L19.0181 11.6078C19.504 12.0948 19.504 12.9066 19.0169 13.3923Z"
                        fill="#767676"/>
                </svg>
            </button>
        </div>
    );
}