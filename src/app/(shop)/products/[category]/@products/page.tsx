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
    searchParams?: { [key: string]: string | undefined }
}) {
    const products = await getCategoryProducts(params.category, parseInt(!searchParams?.page ? '1' : searchParams.page));

    if (!products) {
        return <div>NO PRODUCTS WERE FOUND.</div>;
    }

    return (
        <CategoryClient products={products.products}/>
    );
}