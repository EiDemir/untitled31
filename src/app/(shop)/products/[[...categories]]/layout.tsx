import {ReactNode} from "react";
import {prisma} from "@/libs/prisma";
import {notFound} from "next/navigation";
import CategoryHeader from "./CategoryHeader";

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
    params: { categories?: string[] },
    searchOptions: ReactNode,
    children: ReactNode
}) {
    const doesExist = params.categories ? await doesCategoryExists(params.categories[0]) : true;

    if (!doesExist)
        notFound();

    return (
        <div className='my-3 gap-y-10 flex flex-col'>
            <CategoryHeader category={params.categories ? params.categories[0] : 'ALL PRODUCTS'}/>
            <div className='relative flex md:flex-row flex-col gap-x-6 mx-[3vw]'>
                {searchOptions}
                {children}
            </div>
        </div>
    );
}
