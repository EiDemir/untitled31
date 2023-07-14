import Addresses from "./Addresses";
import {Suspense} from "react";

export default function Page({searchParams}: {
    searchParams: {
        addNewShippingAddress?: string,
        addNewBillingAddress?: string
    }
}) {
    return (
        <Suspense key={JSON.stringify(searchParams)} fallback={
            <>
                <div className='rounded-3xl w-full ring-1 ring-[#E4E4E4] bg-black ring-inset h-44'>
                </div>
                <div className='rounded-3xl w-full ring-1 ring-[#E4E4E4] bg-black ring-inset h-44'>
                </div>
            </>
        }>
            <Addresses searchParams={searchParams}/>
        </Suspense>
    );
}