import {prisma} from "@/libs/prisma";
import dynamic from "next/dynamic";

const BestSellingProducts = dynamic(() => import('./BestSellingProducts'), {ssr: false});

async function getBestSellingProducts() {
    return prisma.product.findMany({
        select: {
            images: true,
            name: true,
            price: true,
            category: {
                select: {
                    name: true
                }
            }, id: true
        }
    });
}

export default async function BestSellingPage() {
    const products = await getBestSellingProducts();

    return (
        <div className='flex flex-col py-16 gap-y-16 drop-shadow-sm'>
            <div className='mx-auto font-bold text-4xl'>
                Best Selling
            </div>
            <BestSellingProducts products={products}/>
        </div>
    );
}