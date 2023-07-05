import CategoryScroll from "./CategoryScroll";
import {prisma} from "@/libs/prisma";
import Category from "@/app/(shop)/products/[category]/@products/Category";

async function getCategoryProducts(categoryName: string, page: number) {
    return prisma.category.findUnique({
        where: {
            name: categoryName
        }, select: {
            products: {
                select: {
                    images: true,
                    category: true,
                    name: true,
                    price: true,
                    id: true
                }, take: 15,
                skip: (page - 1) * 15,
            }, _count: {
                select: {
                    products: true
                }
            }
        }
    });
}

export default async function ProductsSection({params, searchParams}: {
    params: { category: string, page?: string },
    searchParams: { page?: string }
}) {
    const products = await getCategoryProducts(params.category,
        searchParams !== undefined && searchParams.page !== undefined ? parseInt(searchParams.page) : 1);

    if (!products) {
        return <div>NO PRODUCTS WERE FOUND.</div>;
    }

    if (searchParams.page)
        return <Category products={products}/>

    return (
        <CategoryScroll initialProducts={products.products}/>
    );
}