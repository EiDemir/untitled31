import dynamic from "next/dynamic";
import {prisma} from "@/libs/prisma";

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

export default async function HomePage() {
    const products = await getBestSellingProducts();

    return (
        <BestSellingProducts products={products}/>
    )
}
