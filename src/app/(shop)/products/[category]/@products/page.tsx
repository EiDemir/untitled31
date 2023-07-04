import CategoryClient from "./CategoryClient";
import {prisma} from "@/libs/prisma";

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
                skip: (page - 1) * 15
            }
        }
    });
}

export default async function ProductsSection({params, searchParams}: {
    params: { category: string, page?: string },
    searchParams?: { page?: string }
}) {
    const products = await getCategoryProducts(params.category,
        searchParams !== undefined && searchParams.page !== undefined ? parseInt(searchParams.page) : 1);

    if (!products) {
        return <div>NO PRODUCTS WERE FOUND.</div>;
    }

    return (
        <CategoryClient initialProducts={products.products}/>
    );
}