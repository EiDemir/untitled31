import ImageSlider from "./ImageSlider";
import ProductDetail from "./ProductDetail";
import ProductSections from "./ProductSections";
import {prisma} from "@/libs/prisma";
import {notFound} from "next/navigation";
import getCurrentUser from "@/actions/getCurrentUser";
import {Metadata} from "next";
import {cache, Suspense} from "react";
import RelatedProducts from "./RelatedProducts";

const getProduct = cache(async (productId?: string) => {
    try {
        return await prisma.product.findUnique({
            where: {
                id: productId
            }, select: {
                id: true,
                images: true,
                name: true,
                price: true,
                quantity: true,
                colors: true,
                sizes: true,
                _count: {
                    select: {
                        reviews: true
                    }
                }, categories: {
                    select: {
                        name: true
                    }
                }
            }
        });
    } catch (e: any) {
        return null;
    }
});

export async function generateMetadata({params}: { params: { id: string } }): Promise<Metadata> {
    const product = await getProduct(params.id);

    if (!product) notFound();

    return {
        title: product!.name
    };
}

export default async function Page({params}: { params: { id: string } }) {
    const productData = getProduct(params.id);
    const userData = getCurrentUser();

    const [product, user] = await Promise.all([productData, userData]);

    if (!product) notFound();

    let userInfo;

    if (!user) {
        userInfo = null
    } else {
        const cartItem = user!.cart.find((item) => item.id === params.id);

        userInfo = {
            addedToWishlist: user!.favorites.includes(params.id),
            quantity: !cartItem ? 0 : cartItem.quantity
        }
    }

    return (
        <main className='sm:px-[5vw] lg:px-[10vw] mb-10'>
            <div className='flex sm:flex-row flex-col gap-y-10 gap-x-10 my-5'>
                <ImageSlider
                    images={product.images}/>
                <ProductDetail productDetail={{
                    id: product.id,
                    name: product.name,
                    price: product.price,
                    maxQuantity: product.quantity,
                    colors: product.colors,
                    sizes: product.sizes,
                    categories: product.categories
                }} user={userInfo}/>
            </div>
            <ProductSections
                isAuthenticated={userInfo !== null}
                numberOfReviews={product._count.reviews}
                productId={product.id}
            />
            <Suspense fallback={<div className=''>

            </div>}>
                <RelatedProducts isAuthenticated={user !== null} categories={product.categories} id={product.id}/>
            </Suspense>
        </main>
    );
}