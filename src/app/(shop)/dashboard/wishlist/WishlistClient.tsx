'use client';

import {Product} from "@prisma/client";
import WishlistItem from "@/components/product/WishlistItem";
import axios from "axios";
import {useState} from "react";
import {AnimatePresence} from "framer-motion";
import {toastEnd, toastStart} from "@/utils/toast";

export default function WishlistClient({wishlistItems}: { wishlistItems: Product[] }) {
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


    if (!wishlistItems.length || (isEmpty && !wishlist.length)) return <div className='text-2xl h-full flex items-center justify-center'>
        Your wishlist is empty.
    </div>;

    return (
        <div className='grid grid-cols-3 gap-5'>
            <AnimatePresence onExitComplete={() => setIsEmpty(true)}>
                {wishlist.map(wishlistItem =>
                    <WishlistItem
                        key={wishlistItem.id}
                        deleteButtonDisabled={isDisabled}
                        deleteHandler={deleteItem}
                        id={wishlistItem.id}
                        imageLink={wishlistItem.images[0]}
                        category='Tops' title={wishlistItem.name}
                        price={wishlistItem.price.toString()}/>)}
            </AnimatePresence>
        </div>
    );
}