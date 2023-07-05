import {ReactNode} from "react";
import {prisma} from "@/libs/prisma";
import {notFound} from "next/navigation";
import CategoryHeader from "@/app/(shop)/products/[category]/CategoryHeader";

async function doesCategoryExists(category: string) {
    console.log('checked');
    return prisma.category.findUnique({
        where: {
            name: category
        }, select: {
            name: true
        }
    });
}

export default async function ProductsLayout({params, searchOptions, products}: {
    params: { category: string },
    searchOptions: ReactNode,
    products: ReactNode
}) {
    const doesExist = await doesCategoryExists(params.category);

    if (!doesExist)
        notFound();

    return (
        <div className='my-3 gap-y-7 flex flex-col relative'>
            <CategoryHeader category={params.category}/>
            <div className='flex gap-x-6 sm:mx-[5vw] lg:mx-[10vw]'>
                {searchOptions}
                {products}
            </div>
        </div>
    );
}