import {prisma} from "@/libs/prisma";
import SearchOptions from "@/app/(shop)/products/[category]/@searchOptions/SearchOptions";
import {Suspense} from "react";
import SearchOptionsLoading from "@/app/(shop)/products/[category]/@searchOptions/SearchOptionsLoading";

async function getColors(category: string) {
    return prisma.color.findMany();
}

async function getSizes(category: string) {
    return prisma.size.findMany();
}

async function getMinAndMaxPrices(category: string) {
    return prisma.product.aggregate({
        where: {
            categories: {
                some: {
                    name: category
                }
            }
        }, _min: {
            price: true
        }, _max: {
            price: true
        }
    })
}

export default async function SearchOptionsSection({params}: {
    params: { category: string }
}) {
    const colorsPromise = getColors(params.category);
    const sizesPromise = getSizes(params.category);
    const minMaxPromise = getMinAndMaxPrices(params.category);

    const [colors, sizes, minMaxPrices] = await Promise.all([colorsPromise, sizesPromise, minMaxPromise]);

    return (
        <Suspense fallback={<SearchOptionsLoading/>}>
            <SearchOptions colors={colors} sizes={sizes} minMaxPrices={minMaxPrices}/>
        </Suspense>
    );
}