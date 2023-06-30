import {CartItem} from "@/types";
import axios from "axios";
import {uniq} from "lodash";

export const getCartItemsNumber = () => {
    const data = localStorage.getItem('cart-items');

    if (!data) return 0;
    return JSON.parse(data).length;
};

export const fetchCardLocalStorage = (action: (items: CartItem[]) => void) => {
    const data = localStorage.getItem('cart-items');

    if (!data) return [];

    const cartItems: {
        productId: string,
        quantity: number,
        color: string,
        size: string
    }[] = JSON.parse(data);

    axios.get('/api/product', {
        params: {ids: uniq(cartItems.map(item => item.productId)).join(',')}
    }).then((data) => {
        const products = data.data.products;
        const userCartItems: CartItem[] = [];

        products.map((product:
                          { images: string[], name: string, price: number, quantity: number, id: string }) => {
            cartItems.map((cartItem) => {
                if (cartItem.productId === product.id)
                    userCartItems.push({
                        color: cartItem.color,
                        product: product,
                        quantity: cartItem.quantity,
                        size: cartItem.size
                    })
            });
        });

        action(userCartItems);
    }).catch(() => action([]));
};