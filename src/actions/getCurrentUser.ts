import {getServerSession} from "next-auth/next";
import {prisma} from "@/libs/prisma";
import {authOptions} from "@/app/api/auth/[...nextauth]/route";
import {cache} from 'react';

const getCurrentUser = cache(async () => {
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
                            id: true
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