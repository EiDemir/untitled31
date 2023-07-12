'use client';

import _ from "lodash";
import ProductItemLoading from "@/components/ui/loading/ProductItemLoading";

export default function Loading() {
    return (
        <div className='w-4/5 grid grid-cols-4 gap-5'>
            {_.range(24).map(num => <ProductItemLoading key={num}/>)}
        </div>
    );
}