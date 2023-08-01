export type CartItem = {
    product: { images: string[], name: string, price: number, quantity: number, id: string } | null,
    color: string | null,
    size: string | null,
    quantity: number,
    id?: string
};