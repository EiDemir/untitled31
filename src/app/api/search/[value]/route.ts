import {prisma} from "@/libs/prisma";
import {NextResponse} from "next/server";

export async function GET(request: Request, {params}: {
    params: { value: string }
}) {
    const productsPromise = prisma.product.findMany({
        where: {
            name: {
                contains: params.value,
                mode: 'insensitive'
            }
        }, select: {
            name: true,
            id: true,
            images: true,
            price: true
        }, take: 5
    });

    const categoriesPromise = prisma.category.findMany({
        where: {
            name: {
                startsWith: params.value,
                mode: 'insensitive'
            }
        }, select: {
            name: true
        }, take: 5
    });

    const [products, categories] = await Promise.all([productsPromise, categoriesPromise]);

    return NextResponse.json({
        products: products,
        categories: categories
    });
}