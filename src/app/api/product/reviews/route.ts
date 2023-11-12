import {prisma} from "@/libs/prisma";
import {NextResponse} from "next/server";
import getCurrentUser from "@/actions/getCurrentUser";
import {cookies} from "next/headers";

export async function POST(request: Request) {
    const user = await getCurrentUser();

    if (!user) {
        return NextResponse.json({});
    }

    console.log(cookies().set('sentANewReq', 'yes'));

    const {reviewId, type} = await request.json();

    const voteType = type === 'up' ? 'up' : 'down';

    const review = await prisma.review.findUnique({
        where: {
            id: reviewId
        }, select: {
            usersVoted: true
        }
    });

    if (!review) {
        return NextResponse.json({}, {status: 404});
    }

    let updatedReview: { voteCount: number, usersVoted: { userID: string, vote: string }[] };

    const userVoted = review.usersVoted.find(item => item.userID === user.id);

    if (userVoted) {
        if (userVoted.vote === voteType) {
            updatedReview = await prisma.review.update({
                where: {
                    id: reviewId
                }, data: {
                    voteCount: voteType === 'up' ? {
                        decrement: 1
                    } : {
                        increment: 1
                    },
                    usersVoted: {
                        deleteMany: {
                            where: {
                                userID: user.id
                            }
                        }
                    }
                }, select: {
                    voteCount: true,
                    usersVoted: true
                }
            });
        } else {
            updatedReview = await prisma.review.update({
                where: {
                    id: reviewId
                }, data: {
                    voteCount: voteType === 'up' ? {
                        increment: 2
                    } : {
                        decrement: 2
                    },
                    usersVoted: {
                        updateMany: {
                            where: {
                                userID: user.id
                            }, data: {
                                vote: voteType
                            }
                        }
                    }
                }, select: {
                    voteCount: true,
                    usersVoted: true
                }
            })
        }
    } else {
        updatedReview = await prisma.review.update({
            where: {
                id: reviewId
            }, data: {
                voteCount: voteType === 'up' ? {
                    increment: 1
                } : {
                    decrement: 1
                },
                usersVoted: {
                    push: {userID: user.id, vote: voteType}
                }
            }, select: {
                voteCount: true,
                usersVoted: true
            }
        });
    }

    return NextResponse.json({
        newVoteCount: updatedReview.voteCount,
        userVoted: updatedReview.usersVoted.find(item => item.userID === user.id)
    })
}