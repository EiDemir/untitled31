import {cache} from "react";
import {prisma} from "@/libs/prisma";
import CategoryItem from "@/components/product/CategoryItem";

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
                }, take: 4
            }
        }
    })
});

export default async function RelatedProducts({categories, id, isAuthenticated}: {
    isAuthenticated: boolean,
    id: string,
    categories: { name: string }[]
}) {
    console.log(categories);
    const relatedProducts = (await getRelatedProducts(categories, id))!.products;

    return (
        <div className='flex flex-col gap-y-6 z-10 bg-white px-[3vw] sm:px:0'>
            <p className='text-2xl'>RELATED <span
                className='font-bold'>PRODUCTS</span></p>
            <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-5'>
                {relatedProducts.map(product =>
                    <CategoryItem isAuthenticated={isAuthenticated} colors={product.colors} sizes={product.sizes} id=''
                                  key={product.id} imageLink={product.images[0]}
                                  categories={product.categories}
                                  title={product.name} price={product.price}/>)}
            </div>
        </div>
    );
}
