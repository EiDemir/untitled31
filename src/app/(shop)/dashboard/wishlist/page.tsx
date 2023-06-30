import {prisma} from "@/libs/prisma";
import WishlistClient from "@/app/(shop)/dashboard/wishlist/WishlistClient";
import getCurrentUser from "@/actions/getCurrentUser";

async function getUserWishlist(userEmail: string) {
    try {
        const data = await prisma.user.findUnique({
            where: {
                email: userEmail
            }, select: {
                wishlist: true
            }
        });
        return data!.wishlist;
    } catch (e) {
        return null;
    }
}

export default async function WishlistPage() {
    const user = await getCurrentUser();
    const wishlist = await getUserWishlist(user!.email);


    if (!wishlist) return;
    return <WishlistClient wishlistItems={wishlist}/>;
}