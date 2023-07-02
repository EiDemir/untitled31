import ImageSlider from "@/app/(shop)/product/[id]/ImageSlider";
import ProductDetail from "@/app/(shop)/product/[id]/ProductDetail";
import ProductSections from "@/app/(shop)/product/[id]/ProductSections";
import {prisma} from "@/libs/prisma";
import {notFound} from "next/navigation";
import getCurrentUser from "@/actions/getCurrentUser";

async function getProduct(productId?: string) {
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
                }, category: {
                    select: {
                        name: true
                    }
                }
            }
        });
    } catch (e: any) {
        return null;
    }
}

export default async function ProductPage({params}: { params: { id: string } }) {
    const productData = getProduct(params.id);
    const userData = getCurrentUser();

    const [product, user] = await Promise.all([productData, userData]);

    if (!product) {
        notFound();
    }

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
        <main className='sm:px-[5vw] lg:px-[10vw]'>
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
                    category: product.category.name
                }}
                               user={userInfo}/>
            </div>
            <ProductSections
                isAuthenticated={userInfo !== null}
                numberOfReviews={product._count.reviews}
                productId={product.id}
            />
        </main>
    );
}