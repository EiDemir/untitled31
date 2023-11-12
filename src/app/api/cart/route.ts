import getCurrentUser from "@/actions/getCurrentUser";
import {NextResponse} from "next/server";
import {prisma} from "@/libs/prisma";

export async function POST(request: Request) {
    const currentUser = await getCurrentUser();

    if (!currentUser) {
        return NextResponse.json({});
    }

    const {productId, quantity, color, size} = await request.json();

    if (color === '' || size === '') {
        return NextResponse.json({});
    }

    const newCartItem = await prisma.cartItem.create({
        data: {
            productId,
            userId: currentUser.id,
            quantity,
            color: color === 'null' ? null : color.name,
            size: size === 'null' ? null : size
        }
    });

    return NextResponse.json({})
}

export async function PUT(request: Request) {
    const currentUser = await getCurrentUser();

    if (!currentUser) {
        return NextResponse.error();
    }

    const {cartItemId, quantity} = await request.json();

    const updatedCartItem = await prisma.cartItem.update({
        where: {
            id: cartItemId
        }, data: {
            quantity: quantity
        }
    });

    return NextResponse.json({});
}