'use client';

import axios from "axios";
import getStripe from "@/utils/get-stripejs";

export default function PaymentButton() {
    const handleCheckOutHandler = () => {
        axios.post('/api/checkout_sessions').then(async (res) => {
            const stripe = await getStripe();
            const {error} = await stripe!.redirectToCheckout({
                sessionId: res.data.id,
            });
        }).catch((res) => {
            console.error(res.message)
        });
    }

    return (
        <button type='button'
                onClick={handleCheckOutHandler}
                className='hover:bg-black disabled:bg-[#E4E4E4] disabled:drop-shadow-none drop-shadow-lg rounded-full h-14 bg-[#222222] font-medium text-sm text-white'>
            PROCEED TO PAYMENT
        </button>
    )
}