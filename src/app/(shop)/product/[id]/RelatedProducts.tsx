import {cache} from "react";
import {prisma} from "@/libs/prisma";
import ProductItem from "@/components/product/ProductItem";

const getRelatedProducts = cache(async (categories: { name: string }[], id: string) => {
    return prisma.category.findUnique({
        where: {
            name: categories.reverse()[0].name
        }, select: {
            products: {
                where: {
                    id: {
                        not: id
                    }
                }, include: {
                    categories: true
                }, take: 5
            }
        }
    })
});

export default async function RelatedProducts({categories, id, isAuthenticated}: {
    isAuthenticated: boolean,
    id: string,
    categories: { name: string }[]
}) {
    const relatedProducts = (await getRelatedProducts(categories, id))!.products;

    return (
        <div className='flex flex-col gap-y-6 z-10 bg-white px-[3vw] md:px-0'>
            <p className='text-2xl'>RELATED <span
                className='font-bold'>PRODUCTS</span></p>
            <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4'>
                {relatedProducts.map(product =>
                    <ProductItem isAuthenticated={isAuthenticated} colors={product.colors} sizes={product.sizes} id={product.id}
                                 key={product.id} imageLink={product.images[0]}
                                 categories={product.categories}
                                 title={product.name} price={product.price}/>)}
            </div>
        </div>
    );
}
