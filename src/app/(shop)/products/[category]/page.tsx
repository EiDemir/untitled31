import CategoryScroll from "./CategoryScroll";
import {prisma} from "@/libs/prisma";
import Category from "./Category";

async function getCategoryProducts(categoryName: string, page: number, colors: string[]) {
    return prisma.category.findUnique({
        where: {
            name: categoryName
        }, select: {
            products: {
                where: {
                    AND: colors.map(color => ({
                        colors: {
                            some: {
                                name: color
                            }
                        }
                    })),
                },
                select: {
                    images: true,
                    category: true,
                    name: true,
                    price: true,
                    id: true,
                }, take: 24,
                skip: (page - 1) * 24,
            }, _count: {
                select: {
                    products: {
                        where: {
                            AND: colors.map(color => ({
                                colors: {
                                    some: {
                                        name: color
                                    }
                                }
                            })),
                        }
                    }
                }
            }
        }
    });
}

export default async function ProductsSection({params, searchParams}: {
    params: { category: string, page?: string },
    searchParams: { page?: string, color?: string }
}) {
    const products = await getCategoryProducts(params.category,
        searchParams !== undefined && searchParams.page !== undefined ? parseInt(searchParams.page) : 1, !searchParams.color ? [] : searchParams.color.split(','));

    if (!products || !products.products.length) {
        return <div>NO PRODUCTS WERE FOUND.</div>;
    }

    if (searchParams.page)
        return <Category products={products}/>

    return (
        <CategoryScroll initialProducts={products}/>
    );
}