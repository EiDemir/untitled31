import {Suspense} from "react";
import ProductItemLoading from "@/components/ui/loading/ProductItemLoading";
import _ from 'lodash';
import ProductsSection from "./ProductsSection";
import SortingOptions from "./SortingOptions";

export default async function Page({params, searchParams}: {
    params: { categories?: string[], page?: string },
    searchParams: { page?: string, color?: string, size?: string, minPrice?: string, maxPrice?: string, sort?: string }
}) {

    return (
        <div className='md:w-4/5'>
            <SortingOptions searchParams={searchParams}/>
            <Suspense key={JSON.stringify(searchParams)} fallback={
                <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5'>
                    {_.range(24).map(num => <ProductItemLoading key={num}/>)}
                </div>
            }>
                <ProductsSection params={params} searchParams={searchParams}/>
            </Suspense>
        </div>
    );
}
