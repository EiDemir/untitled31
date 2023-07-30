import CategoryItem from "@/components/product/CategoryItem";
import {prisma} from "@/libs/prisma";
import getCurrentUser from "@/actions/getCurrentUser";

const revalidate = 3600;

async function getBestSellingProducts() {
    return prisma.product.findMany({
        select: {
            images: true,
            name: true,
            price: true,
            categories: {
                select: {
                    name: true
                }
            }, id: true,
            colors: true,
            sizes: true
        }, take: 5
    });
}

export default async function Products() {
    const products = await getBestSellingProducts();
    const user = await getCurrentUser();

    return (
        <div className='grid grid-cols-3 md:grid-cols-5 gap-4'>
            {products!.map(product => <CategoryItem
                isAuthenticated={user !== null}
                colors={product.colors}
                sizes={product.sizes}
                key={product.id}
                imageLink={product.images[0]}
                categories={product.categories}
                title={product.name}
                price={product.price}
                id={product.id}/>)}
        </div>
    )
}