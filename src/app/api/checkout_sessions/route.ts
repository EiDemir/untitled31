import {Stripe} from 'stripe';
import {NextResponse} from "next/server";
import getCurrentUser from "@/actions/getCurrentUser";
import {prisma} from "@/libs/prisma";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
    apiVersion: '2022-11-15',
    typescript: true
});

export async function POST(request: Request) {
    const user = await getCurrentUser();

    if (!user) {
        return NextResponse.error();
    }

    const userCart = await prisma.user.findUnique({
        where: {
            id: user.id
        }, select: {
            cart: {
                include: {
                    product: true
                }
            }
        }
    });

    const order = await prisma.order.create({
        data: {
            userId: user.id,
            items: {
                set: userCart!.cart.map(item => ({
                    quantity: item.quantity,
                    productId: item.productId as string,
                    color: item.color,
                    size: item.size,
                    price: item.product!.price
                }))
            }, status: ''
        }
    });
    await prisma.user.update({
        where: {
            id: user.id
        }, data: {
            cart: {
                deleteMany: {}
            }
        }
    });

    try {
        const params: Stripe.Checkout.SessionCreateParams = {
            payment_method_types: ['card'],
            mode: 'payment',
            line_items: userCart!.cart.map(item => ({
                quantity: item.quantity,
                price: item.product!.stripePriceID!
            })),
            success_url: `${request.headers.get('origin')}/checkout/result?session_id={CHECKOUT_SESSION_ID}`,
            cancel_url: `${request.headers.get('origin')}/checkout/result?session_id={CHECKOUT_SESSION_ID}`,
        };
        const checkoutSession: Stripe.Checkout.Session =
            await stripe.checkout.sessions.create(params);

        return NextResponse.json(checkoutSession);
    } catch (err) {
        console.log(err);
        const errorMessage =
            err instanceof Error ? err.message : 'Internal server error';
        return NextResponse.json({statusCode: 500, message: errorMessage}, {
            status: 500
        });
    }
}