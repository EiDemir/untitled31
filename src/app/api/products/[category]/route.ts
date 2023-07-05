import {prisma} from "@/libs/prisma";
import {NextResponse} from "next/server";

export async function GET(request: Request, {params}: {
    params: { category: string }
}) {
    7
    const url = new URL(request.url);
    const take = url.searchParams.get('take');
    const page = url.searchParams.get('page');

    if (!take || !page || !params.category)
        return NextResponse.error();

    const data = await prisma.category.findUnique({
        where: {
            name: params.category
        }, select: {
            products: {
                select: {
                    images: true,
                    category: true,
                    name: true,
                    price: true,
                    id: true
                },
                take: 15,
                skip: (parseInt(page) - 1) * parseInt(take)
            }
        }
    });

    return NextResponse.json({
        products: data!.products,
    });
}