import {prisma} from "@/libs/prisma";
import WishlistClient from "@/app/(shop)/dashboard/wishlist/WishlistClient";
import getCurrentUser from "@/actions/getCurrentUser";

async function getUserWishlist(userEmail: string) {
    try {
        const data = await prisma.user.findUnique({
            where: {
                email: userEmail
            }, select: {
                wishlist: {
                    select: {
                        images: true,
                        name: true,
                        price: true,
                        categories: {
                            select: {
                                name: true
                            }
                        }, id: true,
                        colors: true,
                        sizes: true
                    }
                }
            }
        });
        return data!.wishlist;
    } catch (e) {
        return null;
    }
}

export default async function Page() {
    const user = await getCurrentUser();
    const wishlist = await getUserWishlist(user!.email);


    if (!wishlist) return;
    return <WishlistClient wishlistItems={wishlist}/>;
}