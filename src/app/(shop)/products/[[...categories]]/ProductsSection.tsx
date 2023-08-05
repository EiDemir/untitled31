import CategoryScroll from "./CategoryScroll";
import {prisma} from "@/libs/prisma";
import Category from "./Category";
import _ from 'lodash';
import getCurrentUser from "@/actions/getCurrentUser";

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
                    categories: true,
                    name: true,
                    price: true,
                    id: true,
                    sizes: true,
                    colors: true
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

async function getAllProducts(page: number, colors: string[], sizes: string[], minMaxPrice: number[], sort?: string) {
    const countPromise = prisma.product.count({
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
    });
    const productsPromise = prisma.product.findMany({
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
            categories: true,
            name: true,
            price: true,
            id: true,
            sizes: true,
            colors: true
        }, take: 24,
        skip: (page - 1) * 24
    });
    const [products, _count] = await Promise.all([productsPromise, countPromise]);
    return {
        products, _count: {
            products: _count
        }
    };
}

export default async function ProductsSection({params, searchParams}: {
    params: { categories?: string[], page?: string },
    searchParams: { page?: string, color?: string, size?: string, minPrice?: string, maxPrice?: string, sort?: string }
}) {
    const user = await getCurrentUser();
    console.log(params.categories);
    const products = params.categories ? await getCategoryProducts(params.categories[0],
        searchParams !== undefined && searchParams.page !== undefined ? parseInt(searchParams.page) : 1,
        !searchParams.color ? [] : searchParams.color.split(','),
        !searchParams.size ? [] : searchParams.size.split(','),
        !searchParams.minPrice || !searchParams.maxPrice ? [] : [parseFloat(searchParams.minPrice), parseFloat(searchParams.maxPrice)],
        searchParams.sort) : await getAllProducts(searchParams !== undefined && searchParams.page !== undefined ? parseInt(searchParams.page) : 1,
        !searchParams.color ? [] : searchParams.color.split(','),
        !searchParams.size ? [] : searchParams.size.split(','),
        !searchParams.minPrice || !searchParams.maxPrice ? [] : [parseFloat(searchParams.minPrice), parseFloat(searchParams.maxPrice)],
        searchParams.sort);

    if (!products || !products.products.length) {
        return <div>NO PRODUCTS WERE FOUND.</div>;
    }

    if (searchParams.page)
        return (
            <Category isAuthenticated={user !== null} products={products}/>
        );

    return (
        <CategoryScroll isAuthenticated={user !== null} allProducts={true} initialProducts={products}/>
    );
}