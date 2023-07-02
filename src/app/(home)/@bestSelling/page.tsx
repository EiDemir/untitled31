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

    return <BestSellingProducts products={products}/>
}