import getCurrentUser from "@/actions/getCurrentUser";
import {NextResponse} from "next/server";
import {prisma} from "@/libs/prisma";

export async function DELETE(request: Request, {params}: { params: { cartItemId?: string } }) {
    const currentUser = await getCurrentUser();

    if (!currentUser) {
        return NextResponse.json({
            error: 'User Not Logged In'
        });
    }

    const {cartItemId} = params;


    if (!cartItemId) {
        return NextResponse.json({error: 'Invalid ID'});
    }

    await prisma.cartItem.delete({
        where: {
            id: cartItemId
        }
    });

    return NextResponse.json({
        message: "Product was successfully deleted from the user's cart."
    });
}