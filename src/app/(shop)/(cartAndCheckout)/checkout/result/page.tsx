import {notFound} from "next/navigation";
import {CheckCircleIcon} from "@heroicons/react/24/solid";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
    apiVersion: '2022-11-15'
});

export default async function CheckoutResultPage({searchParams}: {
    searchParams: {
        session_id?: string
    }
}) {
    if (!searchParams.session_id || !searchParams.session_id.startsWith('cs_'))
        notFound();

    const checkout_session: Stripe.Checkout.Session = await
        stripe.checkout.sessions.retrieve(searchParams.session_id, {
            expand: ['payment_intent']
        });

    console.log(checkout_session);

    return (
        <div className='text-center flex flex-col justify-center gap-y-9 w-full'>
            <div className='flex flex-col gap-y-2'>
                <CheckCircleIcon className='mx-auto w-24 h-auto text-green-500'/>
                <h1 className='text-4xl text-[#222222]'>Your order is completed!</h1>
                <p className='text-[#767676] text-sm'>Thank you. Your order has been received.</p>
            </div>
            <div style={{
                backgroundImage: `url("data:image/svg+xml,%3csvg width='100%25' height='100%25' xmlns='http://www.w3.org/2000/svg'%3e%3crect width='100%25' height='100%25' fill='none' stroke='%23222222FF' stroke-width='2' stroke-dasharray='12' stroke-dashoffset='0' stroke-linecap='round'/%3e%3c/svg%3e")`
            }} className='text-start flex gap-x-16 p-12 w-2/3 mx-auto'>
                <div>
                    <p className='text-[#767676] text-sm'>Order Number</p>
                    <p>13119</p>
                </div>
                <div>
                    <p className='text-[#767676] text-sm'>Date</p>
                    <p>7/13/2023</p>
                </div>
                <div>
                    <p className='text-[#767676] text-sm'>Total</p>
                    <p>$40.10</p>
                </div>
            </div>
        </div>
    );
}