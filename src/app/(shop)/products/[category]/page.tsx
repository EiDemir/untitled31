import ProductsSection from "./ProductsSection";
import {Suspense} from "react";
import ProductItemLoading from "@/components/ui/loading/ProductItemLoading";
import _ from 'lodash';

export default function Page({params, searchParams}: {
    params: { category: string, page?: string },
    searchParams: { page?: string, color?: string, size?: string, minPrice?: string, maxPrice?: string, sort?: string }
}) {
    return (
        <Suspense key={JSON.stringify(searchParams)} fallback={
            <div className='w-4/5 grid grid-cols-4 gap-5'>
                {_.range(24).map(num => <ProductItemLoading key={num}/>)}
            </div>
        }>
            <ProductsSection params={params} searchParams={searchParams}/>
        </Suspense>
    );
}