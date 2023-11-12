import {prisma} from "@/libs/prisma";
import {NextResponse} from "next/server";
import _ from "lodash";

export async function GET(request: Request, {params}: {
    params: { category: string }
}) {
    const url = new URL(request.url);
    const take = url.searchParams.get('take');
    const cursorId = url.searchParams.get('id');

    if (!take || !cursorId || !params.category)
        return NextResponse.json({});

    const colors = url.searchParams.get('color') ? url.searchParams.get('color')!.split(',') : [];
    const sizes = url.searchParams.get('size') ? url.searchParams.get('size')!.split(',') : [];
    const minPrice = url.searchParams.get('minPrice') ? parseFloat(url.searchParams.get('minPrice')!) : null;
    const maxPrice = url.searchParams.get('maxPrice') ? parseFloat(url.searchParams.get('maxPrice')!) : null;
    const sort = url.searchParams.get('sort') ?? null;

    const data = params.category !== 'all' ? await prisma.category.findUnique({
            where: {
                name: params.category
            }, select: {
                products: {
                    where: {
                        AND: [
                            {
                                sizes: {
                                    hasEvery: sizes.map(item => _.toLower(item))
                                },
                                price: (minPrice && maxPrice) ? {
                                    gte: minPrice,
                                    lte: maxPrice
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
                        colors: true,
                        sizes: true
                    }, take: parseInt(take),
                    skip: 1,
                    cursor: {
                        id: cursorId
                    }
                }, _count: {
                    select: {
                        products: {
                            where: {
                                AND: [
                                    {
                                        sizes: {
                                            hasEvery: sizes.map(item => _.toLower(item))
                                        },
                                        price: (minPrice && maxPrice) ? {
                                            gte: minPrice,
                                            lte: maxPrice
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
        }) : {
            products: await prisma.product.findMany({
                where: {
                    AND: [
                        {
                            sizes: {
                                hasEvery: sizes.map(item => _.toLower(item))
                            },
                            price: (minPrice && maxPrice) ? {
                                gte: minPrice,
                                lte: maxPrice
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
                }, take: parseInt(take),
                skip: 1,
                cursor: {
                    id: cursorId
                }
            }), _count: {
                products: await prisma.product.count({
                    where: {
                        AND: [
                            {
                                sizes: {
                                    hasEvery: sizes.map(item => _.toLower(item))
                                },
                                price: (minPrice && maxPrice) ? {
                                    gte: minPrice,
                                    lte: maxPrice
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
                })
            }
        }
    ;

    return NextResponse.json({
        products: data,
    });
}