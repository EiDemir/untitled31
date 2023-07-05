import {prisma} from "@/libs/prisma";
import SearchOptions from "@/app/(shop)/products/[category]/@searchOptions/SearchOptions";

async function getColors(category: string) {
    return prisma.color.findMany();
}

export default async function SearchOptionsSection({params}: {
    params: { category: string }
}) {
    const colors = await getColors(params.category);

    return <SearchOptions colors={colors}/>;
}