import {prisma} from "@/libs/prisma";
import Products from "./Products";
import Countdown from "./Countdown";

const revalidate = 3600;

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
        }, take: 4
    });
}

export default async function Page() {
    const products = await getBestSellingProducts();

    return (
        <div className='flex flex-col gap-y-6 px-[10vw] py-10 bg-[#F5E6E0]'>
            <h3 className='text-4xl font-bold text-center'>HOT DEALS</h3>
            <div className='flex gap-x-10 items-center'>
                <div className='transition-transform translate-y-4'>
                    <h5 className='text-2xl'>Summer Sale</h5>
                    <h5 className='text-2xl font-bold'>Up to 60% Off</h5>
                    <Countdown endDate={new Date(2023, 8, 23)}/>
                </div>
                <Products products={products}/>
            </div>
        </div>
    );
}