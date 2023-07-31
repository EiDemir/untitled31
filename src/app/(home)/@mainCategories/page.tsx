import Products from "./Products";
import Countdown from "./Countdown";
import _ from 'lodash';
import ProductItemLoading from "@/components/ui/loading/ProductItemLoading";
import {Suspense} from "react";

export const dynamic = 'force-static';

export default async function Page() {
    return (
        <div className='flex flex-col gap-y-6 px-[3vw] py-10 bg-[#F5E6E0]'>
            <h3 className='text-4xl font-bold text-center'>HOT DEALS</h3>
            <div className='flex lg:flex-row flex-col gap-y-10 gap-x-10 items-center'>
                <div className='transition-transform translate-y-4'>
                    <h5 className='text-2xl'>Summer Sale</h5>
                    <h5 className='text-2xl font-bold'>Up to 60% Off</h5>
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