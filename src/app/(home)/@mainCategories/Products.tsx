'use client';

import CategoryItem from "@/components/product/CategoryItem";

export default function Products({products, isAuthenticated}: {
    isAuthenticated: boolean,
    products: {
        images: string[],
        name: string,
        price: number,
        categories: { name: string }[],
        id: string,
        sizes: string[],
        colors: { name: string, hexColorCode: string }[]
    }[]
}) {
    return (
        <div className='grid grid-cols-3 md:grid-cols-5 gap-4'>
            {products!.map(product => <CategoryItem
                isAuthenticated={isAuthenticated}
                colors={product.colors}
                sizes={product.sizes}
                key={product.id}
                imageLink={product.images[0]}
                categories={product.categories}
                title={product.name}
                price={product.price}
                id={product.id}/>)}
        </div>
    )
}