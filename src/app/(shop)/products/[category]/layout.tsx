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

export default async function Layout({params, children, searchOptions}: {
    params: { category: string },
    searchOptions: ReactNode,
    children: ReactNode
}) {
    const doesExist = await doesCategoryExists(params.category);

    if (!doesExist)
        notFound();

    return (
        <div className='my-3 gap-y-5 flex flex-col'>
            <CategoryHeader category={params.category}/>
            <div className='relative flex md:flex-row flex-col gap-x-6 mx-[3vw]'>
                {searchOptions}
                {children}
            </div>
        </div>
    );
}
