'use client';

import CategoryItem from "@/components/product/CategoryItem";

export default function CategoryClient({products}: {
    products: {
        images: string[],
        category: { id: string, name: string } & {},
        name: string,
        price: number,
        id: string
    }[]
}) {
    return (
        <div className='w-3/4 grid grid-cols-3 gap-7'>
            {products.map(item =>
                <CategoryItem key={item.id} imageLink={item.images[0]} category={item.category.name}
                              title={item.name}
                              price={item.price} id={item.id}/>)}
        </div>
    );
}