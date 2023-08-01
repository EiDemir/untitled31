import {CartItem} from "@/types";
import axios from "axios";
import _ from "lodash";

export const getCartItemsNumber = () => {
    const data = localStorage.getItem('cart-items');

    if (!data) return 0;
    return JSON.parse(data).length;
};

export const fetchCardLocalStorage = (action: (items: CartItem[]) => void) => {
    const data = localStorage.getItem('cart-items');

    if (!data) return null;

    const cartItems: {
        productId: string,
        quantity: number,
        color: string | null,
        size: string | null
    }[] = JSON.parse(data);

    axios.get('/api/product', {
        params: {ids: _.uniq(cartItems.map(item => item.productId)).join(',')}
    }).then((data) => {
        const products = data.data.products;
        const userCartItems: CartItem[] = [];

        products.map((product:
                          {
                              images: string[],
                              name: string,
                              price: number,
                              quantity: number,
                              id: string,
                              sizes: string[],
                              colors: { name: string, hexColorCode: string }[]
                          }) => {
            cartItems.map(item => {
                if (item.productId === product.id)
                    if (((!item.size && !product.colors) || (item.size && product.sizes.includes(item.size)))
                        && (((!item.color && !product.sizes) || (item.color && product.colors.find(product => product.name === item.color)))))
                        userCartItems.push({
                            product: {
                                price: product.price,
                                images: product.images,
                                name: product.name,
                                quantity: product.quantity,
                                id: product.id
                            }, color: item.color,
                            size: item.size,
                            quantity: item.quantity
                        });
            });
        });

        localStorage.setItem('cart-items', JSON.stringify(userCartItems.map(cartItem => ({
            productId: cartItem.product!.id,
            quantity: cartItem.quantity,
            color: cartItem.color,
            size: cartItem.size
        }))));
        action(userCartItems);
    }).catch(() => action([]));
};