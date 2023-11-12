import getCurrentUser from "@/actions/getCurrentUser";
import {NextResponse} from "next/server";

export async function GET(request: Request, {params}: { params: { productId?: string } }) {
    const currentUser = await getCurrentUser();

    if (!currentUser) {
        return NextResponse.json({message: 'unauthenticated'});
    }

    const {productId} = params;

    if (!productId) {
        return NextResponse.json({error:'Invalid ID'});
    }

    const cartItem =
        currentUser.cart.find((cartItem) => cartItem.id === productId);

    return NextResponse.json({
        isInWishlist: currentUser.favorites.includes(productId),
        quantity: cartItem?.quantity ?? 0
    });
}