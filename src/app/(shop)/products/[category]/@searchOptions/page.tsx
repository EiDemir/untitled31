import {prisma} from "@/libs/prisma";
import SearchOptions from "@/app/(shop)/products/[category]/@searchOptions/SearchOptions";

async function getColors(category: string) {
    return prisma.color.findMany();
}

async function getSizes(size: string) {
    return prisma.size.findMany();
}

export default async function SearchOptionsSection({params}: {
    params: { category: string }
}) {
    const colorsPromise = getColors(params.category);
    const sizesPromise = getSizes(params.category);

    const [colors, sizes] = await Promise.all([colorsPromise, sizesPromise]);

    return <SearchOptions colors={colors} sizes={sizes}/>;
}