'use client';

import CategoryItem from "@/components/product/CategoryItem";
import {motion} from "framer-motion";
import {ChevronDownIcon, ChevronLeftIcon, ChevronRightIcon} from "@heroicons/react/24/solid";
import {useSearchParams} from "next/navigation";
import _ from 'lodash';
import Link from "next/link";
import {Menu, Transition} from "@headlessui/react";
import {Fragment} from "react";

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
    const params = new URLSearchParams(searchParams.toString());
    params.delete('page');

    return (
        <div className='w-4/5'>
            <div
                className='w-full justify-end flex text-sm font-medium mb-7'>
                <Menu as='div' className='relative inline-block z-10'>
                    <Menu.Button className='inline-flex items-center gap-x-2 hover:text-[#E893CF] text-[#222222]'>
                        DEFAULT SORTING
                        <ChevronDownIcon className='w-4 h-auto text-[#222222'/>
                    </Menu.Button>
                    <Transition
                        as={Fragment}
                        enter='transition duration-500'
                        enterFrom='transform opacity-0 -translate-y-2'
                        enterTo='transform opacity-100 translate-y-0'
                        leave='transition duration-200'
                        leaveFrom='transform opacity-100 translate-y-0'
                        leaveTo='transform opacity-0 -translate-y-2'
                    >
                        <Menu.Items
                            className='flex flex-col w-max text-sm absolute right-0 mt-2 divide-y divide-gray-100 ring-1 ring-gray-100 rounded-sm bg-white'>
                            <Menu.Item as={Link} href='/' className='px-4 py-3 my-1 hover:text-[#E893CF] text-[#222222]'>
                                Price: High to Low
                            </Menu.Item>
                            <Menu.Item as={Link} href='/' className='px-4 py-3 my-1 hover:text-[#E893CF] text-[#222222]'>
                                Price: Low to High
                            </Menu.Item>
                        </Menu.Items>
                    </Transition>
                </Menu>
            </div>
            <div className='grid grid-cols-4 gap-7'>
                {products.products.map(item =>
                    <CategoryItem key={item.id} imageLink={item.images[0]} category={item.category.name}
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
        </div>
    );
}