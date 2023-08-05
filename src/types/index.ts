export type CartItem = {
    product: { images: string[], name: string, price: number, quantity: number, id: string } | null,
    color: string | null,
    size: string | null,
    quantity: number,
    id?: string
};

export type Review = {
    voteCount: number,
    id: string,
    rating: number,
    reviewText: string,
    date: Date,
    user: { image: string, name: string },
    userVoted?: { userId: string, vote: string }
};