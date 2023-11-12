import {AuthOptions} from "next-auth";
import {PrismaAdapter} from "@next-auth/prisma-adapter";
import {prisma} from "@/libs/prisma";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";

const bcrypt = require('bcrypt');

export const authOptions: AuthOptions = {
    adapter: PrismaAdapter(prisma),
    session: {
        strategy: 'jwt'
    },
    providers: [
        CredentialsProvider({
            credentials: {
                email: {type: 'email'},
                password: {type: 'password'}
            }, async authorize(credentials) {
                if (!credentials)
                    return null;

                const user = await prisma.user.findUnique({
                    where: {
                        email: credentials.email
                    }, include: {
                        accounts: {
                            select: {
                                provider: true
                            }
                        }
                    }
                });

                if (!user)
                    throw new Error('No user with the given email was found.');

                if (user.accounts.length === 1)
                    throw new Error(`A ${user.accounts[0].provider} account associated with this email was found. Please sign in with ${user.accounts[0].provider}.`);

                const doMatch = await bcrypt.compare(credentials.password, user.hashedPassword);

                if (!doMatch)
                    throw new Error('Passwords do not match.');

                if (!user.emailVerified)
                    throw new Error('Your email is not verified.');

                return user;
            }
        }),
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID!,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET!
        })
    ],
    callbacks: {
        signIn() {
            return true;
        },
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