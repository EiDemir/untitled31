import {prisma} from "@/libs/prisma";
import dynamic from "next/dynamic";
import {cache} from "react";

const BestSellingProducts = dynamic(() => import('./BestSellingProducts'), {ssr: false});

const getBestSellingProducts = cache(async () => {
    return prisma.product.findMany({
        select: {
            images: true,
            name: true,
            price: true,
            colors: true,
            categories: {
                select: {
                    name: true
                }
            }, id: true
        }, take: 8,
        skip: 8
    });
});

export default async function Page() {
    const products = await getBestSellingProducts();

    return (
        <div className='flex flex-col pt-12 gap-y-12 drop-shadow-sm'>
            <div className='mx-auto font-bold text-4xl'>
                Best Selling
            </div>
            <div
                className='h-[calc(_calc(_calc(80vw_-_20px)_*_0.75018755)_+_74px)] sm:h-[calc(_calc(_calc(80vw_-_40px)_*_0.50012503)_+_76px)] lg:h-[calc(_calc(_calc(80vw_-_60px)_*_0.37509377)_+_77px)]'>
                <BestSellingProducts products={products}/>
            </div>
        </div>
    );
}