import NextAuth, {AuthOptions} from "next-auth";
import {PrismaAdapter} from "@next-auth/prisma-adapter";
import {prisma} from "@/libs/prisma";
import GoogleProvider from "next-auth/providers/google";

export const authOptions: AuthOptions = {
    adapter: PrismaAdapter(prisma),
    session: {
        strategy: 'jwt'
    },
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID!,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET!
        })
    ],
    callbacks: {
        async session({session}) {
            const cartItemsNumber = await prisma.user.findUnique({
                where: {
                    email: session.user?.email as string
                }, select: {
                    _count: {
                        select: {cart: true}
                    }
                }
            });
            return {
                ...session, user: {
                    ...session.user,
                    cartItemsNumber: cartItemsNumber!._count.cart
                }
            };
        }
    },
    debug: process.env.NODE_ENV === 'development',
    pages: {
        signIn: '/auth/login'
    }, secret: process.env.NEXTAUTH_SECRET
};
;

const handler = NextAuth(authOptions);

export {handler as GET, handler as POST};