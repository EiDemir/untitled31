import {ReactNode} from "react";
import {notFound} from "next/navigation";
import getCurrentUser from "@/actions/getCurrentUser";

export default async function Layout({children}: { children: ReactNode }) {
    const user = await getCurrentUser();

    if (!user) {
        notFound();
    }

    return (
        <div className='flex gap-x-8'>
            <div className='flex flex-col gap-y-7 w-2/3'>
                {children}
            </div>
            <div className='w-1/3 sticky top-0 flex flex-col gap-y-5'>
                <div
                    className='p-8 h-min rounded-3xl ring-1 ring-inset ring-[#222222] bg-white/50 backdrop-blur-md'>
                    <h1 className='font-medium mb-6'>YOUR ORDER</h1>
                    <div className='divide-y'>
                        <div className='font-medium py-4 text-sm flex justify-between'>
                            PRODUCT
                            <p className='pl-4'>SUBTOTAL</p>
                        </div>
                        <div className='font-medium text-[#222222] py-4 flex flex-col gap-y-4 text-sm'>
                            {user.cart.map((item, index) =>
                                <div key={index} className='flex justify-between'>
                                    <div>
                                        <p>{item.product!.name} x{item.quantity}</p>
                                        {item.color && <p className='text-[#767676]'>Color: {item.color}</p>}
                                        {item.size &&
                                            <p className='text-[#767676] capitalize'>Size: {item.size}</p>}
                                    </div>
                                    <span>${(item.quantity * item.product!.price).toFixed(2)}</span>
                                </div>)
                            }
                        </div>
                        <div className='font-medium py-4 text-sm flex justify-between'>
                            PRODUCT
                            <p className='pl-4'>SUBTOTAL</p>
                        </div>
                        <div className='font-medium py-4 text-sm flex justify-between'>
                            SUBTOTAL
                            <p className='pl-4'>$89.99</p>
                        </div>
                        <div className='font-medium py-4 text-sm flex justify-between'>
                            SHIPPING
                            <p className='pl-4 font-normal'>FREE SHIPPING</p>
                        </div>
                        <div className='font-medium py-4 text-sm flex justify-between'>
                            VAT (5%)
                            <p className='pl-4'>$12.99</p>
                        </div>
                        <div className='font-medium py-4 text-sm flex justify-between'>
                            TOTAL
                            <p className='pl-4'>$100</p>
                        </div>
                    </div>
                </div>
                <button type='button'
                        className='hover:bg-black disabled:bg-[#E4E4E4] disabled:drop-shadow-none drop-shadow-lg rounded-full h-14 bg-[#222222] font-medium text-sm text-white'>
                    PROCEED TO PAYMENT
                </button>
            </div>
        </div>
    );
}