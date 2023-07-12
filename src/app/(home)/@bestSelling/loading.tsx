import _ from 'lodash';
import ProductItemLoading from "@/components/ui/loading/ProductItemLoading";

export default function Loading() {
    return (
        <div className='flex flex-col py-16 gap-y-16 w-full'>
            <div className='mx-auto font-bold text-4xl'>
                Best Selling
            </div>
            <div className='flex w-[80vw] gap-x-5 animate-pulse mx-auto'>
                {_.range(4).map((num) => <ProductItemLoading key={num}/>)}
            </div>
        </div>
    );
}