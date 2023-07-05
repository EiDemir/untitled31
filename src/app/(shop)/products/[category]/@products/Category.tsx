'use client';

import CategoryItem from "@/components/product/CategoryItem";
import {motion} from "framer-motion";
import {ChevronLeftIcon, ChevronRightIcon} from "@heroicons/react/24/solid";
import {useSearchParams} from "next/navigation";
import _ from 'lodash';
import Link from "next/link";

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
                        className=' font-medium text-sm text-[#222222] flex items-center
                gap-x-2'>
                    <Link href={`?page=${currentPage - 1}`}>
                        <ChevronLeftIcon className='w-5 h-auto'/>PREV
                    </Link>
                </button>
                <div className='font-medium flex gap-x-2'>
                    {_.range(1, products._count.products / 15)
                        .map(num => <button
                            disabled={currentPage === num}
                            className='text-center px-2 disabled:px-0'
                            key={num}>
                            <Link href={`?page=${num}`}>
                                {num}
                                {currentPage === num && <div className='h-0.5 bg-[#222222] w-6'/>}
                            </Link>
                        </button>)}
                </div>
                <button disabled={currentPage === Math.floor(products._count.products / 15)}
                        className='font-medium text-sm text-[#222222] flex gap-x-2 items-center'>
                    <Link href={`?page=${currentPage + 1}`}
                    >NEXT<ChevronRightIcon className='w-5 h-auto'/>
                    </Link>
                </button>
            </motion.div>
        </div>
    )
        ;
}