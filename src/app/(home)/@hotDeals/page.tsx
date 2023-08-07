import Products from "./Products";
import Countdown from "./Countdown";
import _ from 'lodash';
import ProductItemLoading from "@/components/ui/loading/ProductItemLoading";
import {Suspense} from "react";

export default async function Page() {
    return (
        <div className='flex flex-col gap-y-6 p-[3vw] mx-[3vw] bg-[#F5E6E0]/70 backdrop-blur-md rounded-xl drop-shadow-sm'>
            <h1 className='text-4xl font-bold text-center'>HOT DEALS</h1>
            <div className='flex lg:flex-row flex-col gap-y-10 gap-x-10 items-center'>
                <div className='transition-transform translate-y-4'>
                    <h2 className='text-2xl'>Summer Sale</h2>
                    <h2 className='text-2xl font-bold'>Up to 60% Off</h2>
                    <Countdown endDate={new Date(2023, 8, 23)}/>
                </div>
                <Suspense fallback={(
                    <div className='grid grid-cols-3 md:grid-cols-5 gap-4 w-full'>
                        {_.range(5).map(i => <ProductItemLoading key={i}/>)}
                    </div>
                )}>
                    <Products/>
                </Suspense>
            </div>
        </div>
    );
}