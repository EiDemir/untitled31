import {ReactNode} from "react";
import Image from "next/image";
import patternImage from "../../../../../public/pattern.svg";
import {prisma} from "@/libs/prisma";
import {notFound} from "next/navigation";

async function doesCategoryExists(category: string) {
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
        <div className='my-3 gap-y-7 flex flex-col'>
            <div
                className='rounded-xl flex items-center relative bg-[#EEEEEE] h-96 mx-[3.6vw] sm:mx-[5vw] md:mx-[60px]'>
                <div className='z-0'>
                    <Image className='rounded-xl absolute object-cover h-full inset-0' src={patternImage}
                           alt='Background image'/>
                </div>
                <div className='px-[1.4vw] sm:px-0 md:px-[calc(5vw_-_60px)] lg:px-[calc(10vw_-_60px)] z-10'>
                    <h1 className='uppercase text-8xl font-bold text-black'>{params.category}</h1>
                </div>
            </div>
            <div className='flex gap-x-6 sm:mx-[5vw] lg:mx-[10vw]'>
                {searchOptions}
                {products}
            </div>
        </div>
    );
}