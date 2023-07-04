'use client';

import CategoryItem from "@/components/product/CategoryItem";
import {useState} from "react";
import {motion} from "framer-motion";
import axios from "axios";
import LoadingAnimation from "@/components/ui/LoadingAnimation";

export default function CategoryClient({initialProducts}: {
    initialProducts: {
        images: string[],
        category: { id: string, name: string } & {},
        name: string,
        price: number,
        id: string
    }[]
}) {
    const [products, setProducts] = useState(initialProducts);
    const [page, setPage] = useState(2);
    const [isLoading, setIsLoading] = useState(false);

    const getProducts = () => {
        setIsLoading(true);
        axios.get(`/api/products/${initialProducts[0].category.name}?take=15&page=${page}`).then((res) => {
            setProducts(products => [...products, ...res.data.products]);
            setIsLoading(false);
            setPage(prevState => prevState + 1);
        }).catch();
    };

    return (
        <div className='w-3/4'>
            <div className='grid grid-cols-3 gap-7'>
                {products.map(item =>
                    <CategoryItem key={item.id} imageLink={item.images[0]} category={item.category.name}
                                  title={item.name}
                                  price={item.price} id={item.id}/>)}
            </div>
            <motion.div className='flex justify-center py-5' onViewportEnter={getProducts}>
                {isLoading && <LoadingAnimation/>}
            </motion.div>
        </div>
    );
}