'use client';

import CategoryItem from "@/components/product/CategoryItem";
import {motion} from "framer-motion";
import {ChevronLeftIcon, ChevronRightIcon} from "@heroicons/react/24/solid";
import {useRouter, useSearchParams} from "next/navigation";
import _ from 'lodash';

export default function Category({products}: {
    products: {
        products: {
            images: string[],
            category: { id: string, name: string } & {},
            name: string,
            price: number,
            id: string
        }[],
        _count: { products: number }
    }
}) {
    const searchParams = useSearchParams();
    const router = useRouter();
    const currentPage = parseInt(searchParams.get('page')!);

    return (
        <div className='w-3/4'>
            <div className='grid grid-cols-3 gap-7'>
                {products.products.map(item =>
                    <CategoryItem key={item.id} imageLink={item.images[0]} category={item.category.name}
                                  title={item.name}
                                  price={item.price} id={item.id}/>)}
            </div>
            <motion.div className='flex justify-between py-5'>
                <button disabled={currentPage === 1}
                        onClick={() => {
                            scrollTo(0, 0);
                            router.replace(`?page=${currentPage - 1}`, {scroll: false});
                        }}
                        className=' font-medium text-sm text-[#222222] flex items-center
                gap-x-2'>
                    <ChevronLeftIcon className='w-5 h-auto'/>PREV
                </button>
                <div className='font-medium flex gap-x-2'>
                    {_.range(1, products._count.products / 15)
                        .map(num => <button
                            disabled={currentPage === num}
                            onClick={() => {
                                scrollTo(0, 0);
                                router.replace(`?page=${num}`, {scroll: false})
                            }}
                            className='text-center px-2 disabled:px-0'
                            key={num}>
                            {num}
                            {currentPage === num && <div className='h-0.5 bg-[#222222] w-6'/>}
                        </button>)}
                </div>
                <button disabled={currentPage === Math.floor(products._count.products / 15)}
                        onClick={() => {
                            scrollTo(0, 0);
                            router.replace(`?page=${currentPage + 1}`, {scroll: false});
                        }}
                        className='font-medium text-sm text-[#222222] flex gap-x-2 items-center'>
                    NEXT<ChevronRightIcon className='w-5 h-auto'/>
                </button>
            </motion.div>
        </div>
    )
        ;
}