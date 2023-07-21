'use client';

import CategoryItem from "@/components/product/CategoryItem";

export default function Products({products}: {
    products: {images: string[], name: string, price: number, categories: {name: string}[], id: string}[]
}) {
    return (
        <div className='flex gap-x-6'>
            {products!.map(product => <CategoryItem
                key={product.id}
                imageLink={product.images[0]}
                categories={product.categories}
                title={product.name}
                price={product.price}
                id={product.id}/>)}
        </div>
    )
}