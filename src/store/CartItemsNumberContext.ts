import {createContext, Dispatch, SetStateAction} from "react";

export const CartItemsNumberContext = createContext<{
    cartItemsNumber: number,
    setCartItemsNumber: Dispatch<SetStateAction<number>>
}>({
    cartItemsNumber: 0,
    setCartItemsNumber: () => {
    }
});