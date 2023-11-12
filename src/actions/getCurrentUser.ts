import {getServerSession} from "next-auth/next";
import {prisma} from "@/libs/prisma";
import {cache} from 'react';
import {authOptions} from "@/app/auth";

const getCurrentUser = cache(async (includeStripeId = false) => {
    const session = await getServerSession(authOptions);

    if (!session?.user?.email) return null;

    const user = await prisma.user.findUnique({
        where: {
            email: session.user.email
        }, include: {
            cart: {
                select: {
                    product: {
                        select: {
                            images: true,
                            name: true,
                            price: true,
                            quantity: true,
                            id: true,
                            stripePriceID: includeStripeId
                        }
                    }, color: true,
                    size: true,
                    quantity: true,
                    id: true
                }
            }
        }
    });

    if (!user) return null;

    return {
        email: session.user.email,
        id: user.id,
        favorites: user.wishlistIDs,
        cart: user.cart
    }
});

export default getCurrentUser;