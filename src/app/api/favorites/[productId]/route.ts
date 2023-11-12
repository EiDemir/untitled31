import getCurrentUser from "@/actions/getCurrentUser";
import {NextResponse} from "next/server";
import {prisma} from "@/libs/prisma";

export async function PUT(request: Request, {params}: { params: { productId?: string } }) {
    const currentUser = await getCurrentUser();

    if (!currentUser) {
        return NextResponse.json({});
    }

    const {productId} = params;

    if (!productId) {
        return NextResponse.json({error: 'Invalid ID'});
    }

    const newWishlist = await prisma.user.update({
        where: {
            email: currentUser.email
        }, data: {
            wishlist: {
                connect: {
                    id: productId
                }
            }
        }, select: {
            wishlist: true
        }
    });

    return NextResponse.json(newWishlist);
}

export async function DELETE(request: Request, {params}: { params: { productId?: string } }) {
    const currentUser = await getCurrentUser();

    if (!currentUser) {
        return NextResponse.json({});
    }

    const {productId} = params;

    if (!productId) {
        return NextResponse.json({error: 'Invalid ID'});
    }

    const newWishlist = await prisma.user.update({
        where: {
            email: currentUser.email
        }, data: {
            wishlist: {
                disconnect: {
                    id: productId
                }
            }
        }, select: {
            wishlist: true
        }
    });

    return NextResponse.json(newWishlist);
}