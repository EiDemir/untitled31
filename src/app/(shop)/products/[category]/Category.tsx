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
            categories: ({ id: string, name: string } & {})[],
            name: string,
            price: number,
            id: string
        }[],
        _count: { products: number }
    }
}) {
    const searchParams = useSearchParams();
    const currentPage = parseInt(searchParams.get('page')!);
    const params = new URLSearchParams(searchParams.toString());
    params.delete('page');

    return (
        <>
            <div className='grid grid-cols-4 gap-7'>
                {products.products.map(item =>
                    <CategoryItem key={item.id} imageLink={item.images[0]} categories={item.categories}
                                  title={item.name}
                                  price={item.price} id={item.id}/>)}
            </div>
            <motion.div className='flex justify-between py-5'>
                <button disabled={currentPage === 1}
                        className='disabled:pointer-events-none font-medium text-sm text-[#222222]'>
                    <Link
                        href={`?${params.toString().length > 0 ? params.toString() + '&' : ''}page=${currentPage - 1}`}
                        prefetch={false}
                        className='flex gap-x-2 items-center'>
                        <ChevronLeftIcon className='w-5 h-auto'/>PREV
                    </Link>
                </button>
                <div className='font-medium flex gap-x-2'>
                    {_.range(1, Math.floor(products._count.products / 24) + 2)
                        .map(num => <button
                            disabled={currentPage === num}
                            className='text-center px-2 disabled:px-0'
                            key={num}>
                            <Link href={`?${params.toString().length > 0 ? params.toString() + '&' : ''}page=${num}`}
                                  prefetch={false}>
                                {num}
                                {currentPage === num && <div className='h-0.5 bg-[#222222] w-6'/>}
                            </Link>
                        </button>)}
                </div>
                <button disabled={currentPage === (Math.floor(products._count.products / 15) + 1)}
                        className='disabled:pointer-events-none font-medium text-sm text-[#222222]'>
                    <Link className='flex gap-x-2 items-center'
                          href={`?${params.toString().length > 0 ? params.toString() + '&' : ''}page=${currentPage + 1}`}
                          prefetch={false}
                    >NEXT<ChevronRightIcon className='w-5 h-auto'/>
                    </Link>
                </button>
            </motion.div>
        </>
    );
}