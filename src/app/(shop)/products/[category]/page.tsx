import CategoryScroll from "./CategoryScroll";
import {prisma} from "@/libs/prisma";
import Category from "./Category";
import _ from 'lodash';

async function getCategoryProducts(categoryName: string, page: number, colors: string[], sizes: string[], minMaxPrice: number[], sort?: string) {
    return prisma.category.findUnique({
        where: {
            name: categoryName
        }, select: {
            products: {
                where: {
                    AND: [
                        {
                            sizes: {
                                hasEvery: sizes.map(item => _.toLower(item))
                            },
                            price: minMaxPrice.length > 0 ? {
                                gte: minMaxPrice[0],
                                lte: minMaxPrice[1]
                            } : {},
                        }, ...colors.map(color => ({
                            colors: {
                                some: {
                                    name: color
                                }
                            }
                        }))
                    ]
                },
                orderBy: sort ? {
                    price: sort === 'htl' ? 'desc' : 'asc'
                } : {},
                select: {
                    images: true,
                    category: true,
                    name: true,
                    price: true,
                    id: true
                }, take: 24,
                skip: (page - 1) * 24
            }, _count: {
                select: {
                    products: {
                        where: {
                            AND: [
                                {
                                    sizes: {
                                        hasEvery: sizes.map(item => _.toLower(item))
                                    },
                                    price: minMaxPrice.length > 0 ? {
                                        gte: minMaxPrice[0],
                                        lte: minMaxPrice[1]
                                    } : {},
                                }, ...colors.map(color => ({
                                    colors: {
                                        some: {
                                            name: color
                                        }
                                    }
                                }))
                            ]
                        }
                    }
                }
            }
        }
    });
}

export default async function ProductsSection({params, searchParams}: {
    params: { category: string, page?: string },
    searchParams: { page?: string, color?: string, size?: string, minPrice?: string, maxPrice?: string, sort?: string }
}) {
    const products = await getCategoryProducts(params.category,
        searchParams !== undefined && searchParams.page !== undefined ? parseInt(searchParams.page) : 1,
        !searchParams.color ? [] : searchParams.color.split(','),
        !searchParams.size ? [] : searchParams.size.split(','),
        !searchParams.minPrice || !searchParams.maxPrice ? [] : [parseFloat(searchParams.minPrice), parseFloat(searchParams.maxPrice)],
        searchParams.sort);

    if (!products || !products.products.length) {
        return <div>NO PRODUCTS WERE FOUND.</div>;
    }

    if (searchParams.page)
        return (
            <Category products={products}/>
        );

    return (
        <CategoryScroll initialProducts={products}/>
    );
}