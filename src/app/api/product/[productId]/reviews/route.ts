import {prisma} from "@/libs/prisma";
import {NextResponse} from "next/server";
import getCurrentUser from "@/actions/getCurrentUser";

export async function GET(request: Request, {params}: { params: { productId?: string } }) {
    const {productId} = params;
    let userID: null | string = null;

    const isAuthenticated = new URL(request.url).searchParams.get('isAuthenticated');

    if (isAuthenticated === 'true') {
        const currentUser = await getCurrentUser();
        userID = currentUser!.id;
    }

    if (!productId) {
        return NextResponse.json({message:'Invalid ID'});
    }

    const reviews = await prisma.product.findUnique({
        where: {
            id: params.productId
        }, select: {
            reviews: {
                select: {
                    voteCount: true,
                    usersVoted: isAuthenticated === 'true',
                    id: true,
                    user: {
                        select: {
                            image: true,
                            name: true
                        }
                    },
                    rating: true,
                    reviewText: true,
                    date: true,
                }
            }
        }
    });

    if (!reviews)
        return NextResponse.json({reviews});

    if (isAuthenticated === 'true')
        return NextResponse.json({
            reviews: reviews.reviews.map(item => ({
                    ...item,
                    userVoted: !userID ?
                        undefined :
                        item.usersVoted.find(userVoted => userVoted.userID === userID)
                })
            )
        });
    else
        return NextResponse.json({reviews: reviews.reviews});
}

export async function POST(request: Request, {params}: { params: { productId?: string } }) {
    const {productId} = params;
    if (!productId) {
        return NextResponse.json({error: 'Invalid ID'});
    }

    const user = await getCurrentUser();
    if (!user) {
        return NextResponse.json({});
    }

    const {rating, reviewText} = await request.json();

    const newReview = await prisma.review.create({
        data: {
            productId: productId,
            reviewText,
            rating: parseFloat(rating),
            userId: user.id
        }, select: {
            voteCount: true,
            id: true,
            user: {
                select: {
                    image: true,
                    name: true
                }
            },
            rating: true,
            reviewText: true,
            date: true,
        }
    });

    return NextResponse.json({newReview});
}