'use client';

import _ from "lodash";
import ProductItemLoading from "@/components/ui/loading/ProductItemLoading";

export default function CategoryLoading() {
    return (
        <div className='w-3/4 grid grid-cols-3 gap-7'>
            {_.range(15).map(num => <ProductItemLoading key={num}/>)}
        </div>
    );
}