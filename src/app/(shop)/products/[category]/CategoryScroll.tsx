'use client';

import CategoryItem from "@/components/product/CategoryItem";
import {useEffect, useState} from "react";
import {motion} from "framer-motion";
import axios from "axios";
import LoadingAnimation from "@/components/ui/LoadingAnimation";
import {useSearchParams} from "next/navigation";

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
    const searchParams = useSearchParams();

    useEffect(() => {
        setProducts(initialProducts.products);
        setPage(1);
    }, [initialProducts]);

    const getProducts = () => {
        setIsLoading(true);
        axios.get(`/api/products/${products[0].category.name}?take=24&page=${page + 1}${searchParams.get('color') ? `&color=${searchParams.get('color')}` : ''}`).then((res) => {
            setProducts(prevState => [...prevState, ...res.data.products.products]);
            setIsLoading(false);
            setPage(prevState => prevState + 1);
        }).catch();
    };

    return (
        <div className='w-4/5'>
            <div className='grid grid-cols-4 gap-5'>
                {products.map((item) =>
                    <CategoryItem key={item.id} imageLink={item.images[0]} category={item.category.name}
                                  title={item.name}
                                  price={item.price} id={item.id}/>)}
            </div>
            {page !== Math.floor(initialProducts._count.products / 15) + 1 ?
                <motion.div className='flex justify-center py-5' onViewportEnter={getProducts}>
                    {isLoading && <LoadingAnimation/>}
                </motion.div> : <h1 className='flex justify-center py-5'>You've reached the end.</h1>}
            {/*<h1>{_.clamp(page * 15, initialProducts._count.products)} out*/}
            {/*    of {initialProducts._count.products}</h1>*/}
        </div>
    );
}