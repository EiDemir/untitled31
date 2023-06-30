import getCurrentUser from "@/actions/getCurrentUser";
import Cart from "@/app/(shop)/cart/Cart";

async function getCardItems() {
    const user = await getCurrentUser();
    if (user) {
        return user.cart;
    } else {
        return;
    }
}

export default async function CartPage() {
    const cartItems = await getCardItems();

    return (
        <Cart cartItems={cartItems}/>
    );
}