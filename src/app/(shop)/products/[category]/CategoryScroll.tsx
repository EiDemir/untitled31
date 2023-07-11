'use client';

import CategoryItem from "@/components/product/CategoryItem";
import {Fragment, useEffect, useState} from "react";
import {motion} from "framer-motion";
import axios from "axios";
import LoadingAnimation from "@/components/ui/LoadingAnimation";
import {useRouter, useSearchParams} from "next/navigation";
import {ChevronDownIcon} from "@heroicons/react/24/solid";
import {Menu, Transition} from "@headlessui/react";
import _ from 'lodash';

export default function CategoryScroll({initialProducts}: {
    initialProducts: {
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
    const [products, setProducts] = useState(initialProducts.products);
    const [page, setPage] = useState(1);
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();
    const searchParams = useSearchParams();

    useEffect(() => {
        setProducts(initialProducts.products);
        setPage(1);
    }, [initialProducts]);

    const getProducts = () => {
        setIsLoading(true);
        axios.get(`/api/products/${products[0].category.name}?take=24&id=${_.last(products)!.id}${searchParams.get('color') ? `&color=${searchParams.get('color')}` : ''}${searchParams.get('minPrice') ? `&minPrice=${searchParams.get('minPrice')}` : ''}${searchParams.get('maxPrice') ? `&maxPrice=${searchParams.get('maxPrice')}` : ''}${searchParams.get('sort') ? `&sort=${searchParams.get('sort')}` : ''}`).then((res) => {
            setProducts(prevState => [...prevState, ...res.data.products.products]);
            setIsLoading(false);
            setPage(prevState => prevState + 1);
        }).catch();
    };

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
                            <Menu.Item as='button' onClick={() => {
                                const params = new URLSearchParams(searchParams.toString());
                                params.set('sort', 'htl');
                                router.replace('?' + params.toString());
                            }} className='px-4 py-3 my-1 hover:text-[#E893CF] text-[#222222]'>
                                Price: High to Low
                            </Menu.Item>
                            <Menu.Item as='button' onClick={() => {
                                const params = new URLSearchParams(searchParams.toString());
                                params.set('sort', 'lth');
                                router.replace('?' + params.toString());
                            }} className='px-4 py-3 my-1 hover:text-[#E893CF] text-[#222222]'>
                                Price: Low to High
                            </Menu.Item>
                        </Menu.Items>
                    </Transition>
                </Menu>
            </div>
            <div className='grid grid-cols-4 gap-5'>
                {products.map((item, index) =>
                    <CategoryItem key={index} imageLink={item.images[0]} category={item.category.name}
                                  title={item.name}
                                  price={item.price} id={item.id}/>)}
            </div>
            {page !== Math.floor(initialProducts._count.products / 24) + 1 ?
                <motion.div className='flex justify-center py-5' onViewportEnter={getProducts}>
                    {isLoading && <LoadingAnimation/>}
                </motion.div> : <h1 className='flex justify-center py-5'>You've reached the end.</h1>}
            {/*<h1>{_.clamp(page * 15, initialProducts._count.products)} out*/}
            {/*    of {initialProducts._count.products}</h1>*/}
        </div>
    );
}