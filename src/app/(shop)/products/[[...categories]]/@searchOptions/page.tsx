import {prisma} from "@/libs/prisma";
import SearchOptions from "./SearchOptions";
import {Suspense} from "react";
import SearchOptionsLoading from "./SearchOptionsLoading";

async function getColors(categories?: string[]) {
    return prisma.color.findMany();
}

async function getSizes(categories?: string[]) {
    return prisma.size.findMany();
}

async function getMinAndMaxPrices(categories?: string[]) {
    return prisma.product.aggregate({
        where: {
            categories: {
                some: categories ? {
                    name: categories[0]
                } : {}
            }
        }, _min: {
            price: true
        }, _max: {
            price: true
        }
    })
}

export default async function SearchOptionsSection({params}: {
    params: { categories?: string[] }
}) {
    const colorsPromise = getColors(params.categories);
    const sizesPromise = getSizes(params.categories);
    const minMaxPromise = getMinAndMaxPrices(params.categories);

    const [colors, sizes, minMaxPrices] = await Promise.all([colorsPromise, sizesPromise, minMaxPromise]);

    return (
        <Suspense fallback={<SearchOptionsLoading/>}>
            <SearchOptions colors={colors} sizes={sizes} minMaxPrices={minMaxPrices}/>
        </Suspense>
    );
}