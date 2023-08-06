'use client';

import axios from "axios";
import {useState} from "react";
import {AnimatePresence} from "framer-motion";
import {toastEnd, toastStart} from "@/utils/toast";
import ProductItem from "@/components/product/ProductItem";

export default function WishlistClient({wishlistItems}: {
    wishlistItems: {
        images: string[],
        name: string,
        price: number,
        categories: { name: string }[],
        id: string,
        colors: { name: string, hexColorCode: string }[],
        sizes: string[]
    }[]
}) {
    const [wishlist, setWishlist] = useState(wishlistItems);
    const [isDisabled, setIsDisabled] = useState(false);
    const [isEmpty, setIsEmpty] = useState(false);

    const deleteItem = (id: string) => {
        setIsDisabled(true);
        setIsEmpty(false);
        const ts = toastStart('Deleting from Wishlist');
        axios.delete('/api/favorites/' + id)
            .then(() => {
                setWishlist(prevWishlist =>
                    prevWishlist!.filter(item => item.id !== id));

                toastEnd('Deleted from Wishlist', ts);
            })
            .finally(() => setIsDisabled(false));
    }


    if (!wishlistItems.length || (isEmpty && !wishlist.length)) return <div
        className='text-2xl h-full flex items-center justify-center'>
        Your wishlist is empty.
    </div>;

    return (
        <div className='grid grid-cols-3 gap-5 mb-1'>
            <AnimatePresence onExitComplete={() => setIsEmpty(true)}>
                {wishlist.map(wishlistItem =>
                    <ProductItem
                        wishlistDeleteButton={true}
                        colors={wishlistItem.colors}
                        sizes={wishlistItem.sizes}
                        isAuthenticated={true}
                        key={wishlistItem.id}
                        deleteButtonDisabled={isDisabled}
                        deleteHandler={deleteItem}
                        id={wishlistItem.id}
                        imageLink={wishlistItem.images[0]}
                        categories={wishlistItem.categories} title={wishlistItem.name}
                        price={wishlistItem.price}/>)}
            </AnimatePresence>
        </div>
    );
}