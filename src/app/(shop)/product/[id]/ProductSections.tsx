'use client';

import {useState} from "react";
import {AnimatePresence, motion} from "framer-motion";
import {range} from "lodash";
import Reviews from "@/app/(shop)/product/[id]/Reviews";

const variants = {
    enter: (direction: number) => ({
        // x: direction > 0 ? 200 : -200,
        opacity: 0
    }),
    center: {
        opacity: 1
    },

};

export default function ProductSections({productId, numberOfReviews, isAuthenticated}: {
    isAuthenticated: boolean,
    productId: string,
    numberOfReviews: number
}) {
    const [[selected, direction], setSelected] = useState([0, 0]);
    const [reviewNum, setReviewNum] = useState(numberOfReviews);
    const sectionNames = ['DESCRIPTIONS', 'ADDITIONAL INFORMATION', `REVIEWS (${reviewNum})`];

    const sections = [
        <div key={0} className='mx-auto'>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et
            dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex
            ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat
            nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit
            anim id est laborum. Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque
            laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae
            dicta sunt explicabo.
        </div>,
        <div key={1}>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et
            dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex
            ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat
            nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit
            anim id est laborum. Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque
            laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae
            dicta sunt explicabo.

            Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et
            dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex
            ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat
            nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit
            anim id est laborum. Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque
            laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae
            dicta sunt explicabo.
        </div>
    ];

    return (
        <div className='flex flex-col gap-y-10 w-full my-10 px-[3vw] sm:px-0'>
            <div
                className='w-full justify-between sm:justify-normal sm:w-max sm:mx-auto flex sm:gap-x-20 text-sm sm:text-base font-medium'>
                {range(sectionNames.length).map(index =>
                    <div key={index}>
                        <button
                            disabled={index === selected}
                            onClick={() => setSelected([index, index < selected ? -1 : 1])}>
                            {sectionNames[index]}
                        </button>
                        {selected === index &&
                            <motion.div layoutId='#' className='bg-[#222222] h-0.5 w-full'></motion.div>}
                    </div>
                )}
            </div>
            <AnimatePresence initial={false} mode='popLayout' custom={direction}>
                <motion.div
                    custom={direction}
                    key={selected}
                    variants={variants}
                    initial='enter'
                    animate='center'
                    exit='exit'
                    transition={{
                        ease: 'easeOut',
                        duration: 0.5
                    }}
                    className='z-0'
                >
                    {selected === 2 ? <Reviews numberOfReviews={numberOfReviews} changeReviewNum={() => setReviewNum(prevState => prevState + 1)}
                                               isAuthenticated={isAuthenticated}
                                               key={2} productId={productId}/> : sections[selected]}
                </motion.div>
            </AnimatePresence>
        </div>
    );
}
