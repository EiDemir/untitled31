import {NextResponse} from "next/server";
import {prisma} from "@/libs/prisma";

export async function GET(request: Request) {
    const ids = new URL(request.url).searchParams.get('ids');

    if (!ids) {
        return NextResponse.json({});
    }

    const products = await prisma.product.findMany({
        where: {
            id: {
                in: ids.split(',')
            }
        }, select: {
            images: true,
            name: true,
            price: true,
            quantity: true,
            colors: true,
            sizes: true,
            id: true
        }
    });

    return NextResponse.json({products});
}