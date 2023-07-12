import {Stripe} from 'stripe';
import {NextResponse} from "next/server";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
    apiVersion: '2022-11-15',
    typescript: true
});

export async function POST(request: Request) {
    const {amount} = await request.json();
    console.log(amount);

    try {
        const params: Stripe.Checkout.SessionCreateParams = {
            payment_method_types: ['card'],
            mode: 'payment',
            line_items: [
                {
                    quantity: 1,
                    price: 'price_1NSqg1KwvhWlYEOICFgRNWxe'
                }
            ],
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