import {notFound} from "next/navigation";
import Stripe from "stripe";
import {prisma} from "@/libs/prisma";
import SuccessfulPaymentIcon
    from "@/app/(shop)/(cartAndCheckout)/checkout/(checkoutResult)/result/SuccessfulPaymentIcon";
import _ from "lodash";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
    apiVersion: '2023-10-16'
});

async function getOrder(stripeSessionID: string) {
    return prisma.order.findUnique({
        where: {
            stripeSessionID
        }
    });
}

export default async function Page({searchParams}: {
    searchParams: {
        session_id?: string
    }
}) {
    if (!searchParams.session_id || !searchParams.session_id.startsWith('cs_'))
        notFound();

    const order = await getOrder(searchParams.session_id);
    if (!order) notFound();
    if (order.status === 'paid') notFound();

    let checkout_session: Stripe.Checkout.Session;
    let totalPrice;

    try {
        checkout_session = await
            stripe.checkout.sessions.retrieve(searchParams.session_id);

        if (checkout_session.payment_status === 'paid')
            await prisma.order.update({
                where: {
                    id: order.id
                }, data: {
                    status: 'paid'
                }
            });
        totalPrice = _.reduce(order.items, (prev, curr) => prev + curr.quantity * curr.price, 0);
    } catch (e) {
        notFound();
    }

    return (
        <div className='text-center flex flex-col justify-center gap-y-9 w-full'>
            <div className='flex flex-col gap-y-2'>
                <div className='mx-auto w-24 h-24 text-green-500'>
                    <SuccessfulPaymentIcon/>
                </div>
                <h1 className='text-4xl text-[#222222]'>Your order is completed!</h1>
                <p className='text-[#767676] text-sm'>Thank you. Your order has been received.</p>
            </div>
            <div style={{
                backgroundImage: `url("data:image/svg+xml,%3csvg width='100%25' height='100%25' xmlns='http://www.w3.org/2000/svg'%3e%3crect width='100%25' height='100%25' fill='none' stroke='%23222222FF' stroke-width='2' stroke-dasharray='12' stroke-dashoffset='0' stroke-linecap='round'/%3e%3c/svg%3e")`
            }} className='text-start flex gap-x-16 p-12 w-2/3 mx-auto'>
                <div>
                    <p className='text-[#767676] text-sm'>Order Number</p>
                    <p>#{order.id}</p>
                </div>
                <div>
                    <p className='text-[#767676] text-sm'>Date</p>
                    <p>{order.date.toLocaleDateString('en-US', {
                        month: 'long',
                        day: '2-digit',
                        year: 'numeric'
                    })}</p>
                </div>
                <div>
                    <p className='text-[#767676] text-sm'>Total</p>
                    <p>${totalPrice}</p>
                </div>
            </div>
        </div>
    );
}