'use client';

import {ReactNode, useState} from "react";
import {CartItemsNumberContext} from "@/store/CartItemsNumberContext";

export default function CartProvider({children}: { children: ReactNode }) {
    const [cartItemsNumber, setCartItemsNumber] = useState(0);

    const value = {
        cartItemsNumber,
        setCartItemsNumber
    };

    return (
        <CartItemsNumberContext.Provider value={value}>
            {children}
        </CartItemsNumberContext.Provider>
    );
};