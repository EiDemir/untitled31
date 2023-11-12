import {Stripe} from 'stripe';
import {NextResponse} from "next/server";
import getCurrentUser from "@/actions/getCurrentUser";
import {prisma} from "@/libs/prisma";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
    apiVersion: '2023-10-16',
    typescript: true
});

export async function POST(request: Request) {
    const user = await getCurrentUser(true);

    if (!user) {
        return NextResponse.json({});
    }

    try {
        const params: Stripe.Checkout.SessionCreateParams = {
            payment_method_types: ['card'],
            mode: 'payment',
            line_items: user.cart.map(item => ({
                quantity: item.quantity,
                price: item.product!.stripePriceID!
            })),
            success_url: `${request.headers.get('origin')}/checkout/result?session_id={CHECKOUT_SESSION_ID}`,
            cancel_url: `${request.headers.get('origin')}/checkout/result?session_id={CHECKOUT_SESSION_ID}`,
        };
        const checkoutSession: Stripe.Checkout.Session =
            await stripe.checkout.sessions.create(params);

        await prisma.order.create({
            data: {
                userId: user.id,
                items: {
                    set: user.cart.map(item => ({
                        quantity: item.quantity,
                        productId: item.product!.id,
                        color: item.color,
                        size: item.size,
                        price: item.product!.price
                    }))
                }, status: 'pending',
                stripeSessionID: checkoutSession.id
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