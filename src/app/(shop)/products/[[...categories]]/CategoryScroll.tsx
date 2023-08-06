'use client';

import ProductItem from "@/components/product/ProductItem";
import {useEffect, useState} from "react";
import {motion} from "framer-motion";
import axios from "axios";
import LoadingAnimation from "@/components/ui/LoadingAnimation";
import {usePathname, useSearchParams} from "next/navigation";
import _ from 'lodash';

export default function CategoryScroll({initialProducts, isAuthenticated, allProducts}: {
    allProducts: boolean,
    initialProducts: {
        products: {
            images: string[],
            categories: ({ id: string, name: string } & {})[],
            name: string,
            price: number,
            id: string,
            sizes: string[],
            colors: { name: string, hexColorCode: string }[]
        }[],
        _count: { products: number }
    }, isAuthenticated: boolean
}) {
    const [products, setProducts] = useState(initialProducts.products);
    const [page, setPage] = useState(1);
    const [isLoading, setIsLoading] = useState(false);
    const pathname = usePathname();
    const searchParams = useSearchParams();

    useEffect(() => {
        setProducts(initialProducts.products);
        setPage(1);
    }, [initialProducts]);

    const getProducts = () => {
        setIsLoading(true);
        let category;
        if (allProducts) category = 'all';
        else category = pathname.split('/')[2];
        axios.get(`/api/products/${category}?take=24&id=${_.last(products)!.id}${searchParams.get('color') ? `&color=${searchParams.get('color')}` : ''}${searchParams.get('minPrice') ? `&minPrice=${searchParams.get('minPrice')}` : ''}${searchParams.get('maxPrice') ? `&maxPrice=${searchParams.get('maxPrice')}` : ''}${searchParams.get('sort') ? `&sort=${searchParams.get('sort')}` : ''}`).then((res) => {
            setProducts(prevState => [...prevState, ...res.data.products.products]);
            setIsLoading(false);
            setPage(prevState => prevState + 1);
        }).catch();
    };

    return (
        <>
            <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5'>
                {products.map((item) =>
                    <ProductItem isAuthenticated={isAuthenticated} colors={item.colors} sizes={item.sizes}
                                 key={item.id} imageLink={item.images[0]} categories={item.categories}
                                 title={item.name}
                                 price={item.price} id={item.id}/>)}
            </div>
            {page !== Math.floor(initialProducts._count.products / 24) + 1 ?
                <motion.div className='flex justify-center py-5' onViewportEnter={getProducts}>
                    {isLoading && <LoadingAnimation/>}
                </motion.div> : <h1 className='flex justify-center py-5'>You've reached the end.</h1>}
            {/*<h1>{_.clamp(page * 15, initialProducts._count.products)} out*/}
            {/*    of {initialProducts._count.products}</h1>*/}
        </>
    );
}
