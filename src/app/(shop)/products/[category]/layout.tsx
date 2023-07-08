import {ReactNode} from "react";
import {prisma} from "@/libs/prisma";
import {notFound} from "next/navigation";
import CategoryHeader from "@/app/(shop)/products/[category]/CategoryHeader";

async function doesCategoryExists(category: string) {
    return prisma.category.findUnique({
        where: {
            name: category
        }, select: {
            name: true
        }
    });
}

export default async function ProductsLayout({params, children, searchOptions}: {
    params: { category: string },
    searchOptions: ReactNode,
    children: ReactNode
}) {
    const doesExist = await doesCategoryExists(params.category);

    if (!doesExist)
        notFound();

    return (
        <div className='my-3 gap-y-7 flex flex-col relative'>
            <CategoryHeader category={params.category}/>
            <div className='flex gap-x-6 mx-[3.6vw] sm:mx-[5vw] md:mx-[60px]'>
                {searchOptions}
                {children}
            </div>
        </div>
    );
}