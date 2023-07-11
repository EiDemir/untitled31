import {prisma} from "@/libs/prisma";
import SearchOptions from "@/app/(shop)/products/[category]/@searchOptions/SearchOptions";

async function getColors(category: string) {
    return prisma.color.findMany();
}

async function getSizes(category: string) {
    return prisma.size.findMany();
}

async function getMinAndMaxPrices(category: string) {
    return prisma.product.aggregate({
        where: {
            category: {
                name: category
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

    return <SearchOptions colors={colors} sizes={sizes} minMaxPrices={minMaxPrices}/>;
}