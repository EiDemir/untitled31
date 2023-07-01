import Image from "next/image";
import {FormEvent, useEffect, useRef, useState} from "react";
import _ from 'lodash';
import axios from "axios";
import {ChevronDownIcon, ChevronUpIcon, StarIcon} from "@heroicons/react/24/solid";
import {useRouter} from "next/navigation";
import {motion} from "framer-motion";

export default function Reviews({productId, isAuthenticated, changeReviewNum}: {
    productId: string,
    isAuthenticated: boolean,
    changeReviewNum: () => void
}) {
    const [reviews, setReviews] = useState<{
        voteCount: number,
        id: string,
        rating: number,
        reviewText: string,
        date: Date,
        user: { image: string, name: string },
        userVoted?: { userId: string, vote: string }
    }[]>([]);
    const [firstLabelStatus, setFirstLabelStatus] = useState(false);
    const [isAddReviewOpen, setIsAddReviewOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const average = _.mean(reviews.map(item => item.rating));
    const router = useRouter();
    const [rating, setRating] = useState(0);
    const reviewTextRef = useRef<HTMLTextAreaElement>(null);
    const bottomRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        axios.get(`/api/product/${productId}/reviews`, {params: {isAuthenticated}}).then((res) =>
            setReviews(res.data.reviews)).catch().finally(() => setIsLoading(false));
    }, [productId, isAuthenticated]);

    const toggleVoteButton = (type: string, reviewId: string) => {
        if (isAuthenticated) {
            axios.post('/api/product/reviews', {
                type: type === 'up' ? 'up' : 'down',
                reviewId
            }).then((res) => setReviews(prevState => prevState.map(item => {
                if (item.id === reviewId) {
                    item.userVoted = res.data.userVoted;
                    item.voteCount = res.data.newVoteCount;
                }
                return item;
            }))).catch().finally();
        } else {
            router.push('/auth/login');
        }
    };

    const addReviewHandler = (event: FormEvent) => {
        event.preventDefault();
        axios.post('/api/product/' + productId + '/reviews', {
            rating: rating,
            reviewText: reviewTextRef.current!.value
        }).then((data) => {
            setReviews(prevReviews => [...prevReviews, data.data.newReview])
            setIsAddReviewOpen(false);
            changeReviewNum();
            bottomRef.current!.scrollIntoView({block: 'center', behavior: 'smooth'});
        }).catch().finally();
    };

    // @ts-ignore
    return (
        <div>
            <div className='text-[#222222] w-full mb-3'><p className='text-xl align-text-top font-medium'>Reviews</p>
            </div>
            <div className='relative flex md:flex-row flex-col'>
                <div className='w-full md:w-2/3'>
                    <div className='divide-y flex flex-col md:pr-4'>
                        {reviews.map((review: {
                                voteCount: number,
                                id: string,
                                rating: number,
                                reviewText: string,
                                date: Date,
                                user: { image: string, name: string },
                                userVoted?: { userId: string, vote: string }
                            }, index) =>
                                <div key={index} className='flex text-sm py-5'>
                                    <div className='h-full w-20 px-4 flex flex-col gap-y-4'>
                                        <Image className='rounded-full w-full' src={review.user.image}
                                               alt="User's profile picture" width='40' height='40'/>
                                        <div className='flex flex-col gap-y-1 items-center'>
                                            <button onClick={() => toggleVoteButton('up', review.id)} type='button'
                                                    className={`rounded-full ${review.userVoted && review.userVoted.vote === 'up' ? 'bg-green-400 hover:bg-green-500' : ''} transition-colors duration-500 p-2`}>
                                                <ChevronUpIcon
                                                    className={`w-5 h-auto ${review.userVoted && review.userVoted.vote === 'up' ? 'text-white' : 'text-gray-500 hover:text-green-500'} transition-colors duration-500`}/>
                                            </button>
                                            <p className='text-lg'>{review.voteCount}</p>
                                            <button onClick={() => toggleVoteButton('down', review.id)} type='button'
                                                    className={`rounded-full ${review.userVoted && review.userVoted.vote === 'down' ? 'bg-red-400 hover:bg-red-500' : ''} transition-colors duration-500 p-2`}>
                                                <ChevronDownIcon
                                                    className={`w-5 h-auto ${review.userVoted && review.userVoted.vote === 'down' ? 'text-white' : 'text-gray-500 hover:text-red-500'} transition-colors duration-500`}/>
                                            </button>
                                        </div>
                                    </div>
                                    <div className='w-full'>
                                        <p className='text-[#222222]'>{review.user.name}</p>
                                        <p className='mt-1 text-[#767676]'>{new Date(review.date).toLocaleDateString('en-us', {
                                            month: 'short',
                                            day: '2-digit',
                                            year: 'numeric'
                                        })}</p>
                                        <p className='mt-5 text-[#767676]'>{review.reviewText}</p>
                                    </div>
                                </div>
                        )}
                    </div>
                    <div ref={bottomRef}/>
                </div>
                <motion.div layout
                            transition={{
                                duration: 0.5,
                                ease: 'easeOut'
                            }}
                            className={`drop-shadow-sm w-full order-first md:order-last sticky top-20 md:w-1/3 bg-gray-200/50 backdrop-blur-md flex flex-col justify-between rounded-xl ${isAddReviewOpen ? 'h-full' : 'h-40'} p-3`}>
                    {isAddReviewOpen ?
                        <form onSubmit={addReviewHandler} className='flex flex-col'>
                            <motion.div initial={{opacity: 0}} animate={{opacity: 1}}
                                        transition={{delay: 0.5}}
                                        className='flex gap-x-3 items-center'>
                                <label htmlFor='rating'>Your Rating:</label>
                                <div className='flex gap-x-2'>
                                    {_.range(1, 6).map(number =>
                                        <StarIcon onClick={() => setRating(number)} key={number}
                                                  className={`drop-shadow-sm w-7 h-auto transition-colors duration-300 ${number <= rating ? 'text-yellow-400' : 'text-white'}`}/>
                                    )}
                                </div>
                            </motion.div>
                            <motion.div initial={{opacity: 0}} animate={{opacity: 1}}
                                        transition={{delay: 0.5}} className="relative mt-4">
                                <textarea
                                    ref={reviewTextRef}
                                    required
                                    id='reviewText'
                                    className='resize-none w-full bg-white h-80 pl-3 ring-gray-500 focus:ring-inset focus:ring-1 ring-1 ring-inset text-[#222222] focus:ring-[#222222] border-0 rounded-xl py-3.5'
                                    name='reviewText'
                                    onFocus={() => setFirstLabelStatus(true)}
                                    onBlur={(event) => setFirstLabelStatus(event.target.value.length !== 0)}
                                />
                                <motion.label
                                    initial={false}
                                    animate={{
                                        top: firstLabelStatus ? '-11.5px' : '0.875rem',
                                        zIndex: 10,
                                        color: firstLabelStatus ? '#222222' : '#767676'
                                    }}
                                    transition={{
                                        duration: 0.1,
                                        ease: 'easeOut'
                                    }}
                                    htmlFor='reviewText'
                                    className={`cursor-text px-2 absolute left-3 h-max ${firstLabelStatus ? 'bg-white ring-1 ring-inset ring-[#222222] rounded-full' : 'bg-transparent'}`}>Your
                                    Review *
                                </motion.label>
                            </motion.div>
                            <motion.button transition={{delay: 0.5}} initial={{opacity: 0}} animate={{opacity: 1}}
                                           type='submit'
                                           className='mt-2 rounded-xl w-full bottom-3 h-12 justify-end bg-transparent hover:bg-[#222222] hover:text-white ring-inset ring-1 ring-[#222222] font-medium text-sm text-[#222222]'>
                                ADD REVIEW
                            </motion.button>
                        </form> :
                        <>
                            <motion.p initial={{opacity: 0}} animate={{opacity: 1}}
                                      transition={{delay: 0.5}}>Average rating: {average.toFixed(1)}</motion.p>
                            <motion.button initial={{opacity: 0}} animate={{opacity: 1}}
                                           transition={{delay: 0.7}} type='button'
                                           onClick={() => setIsAddReviewOpen(prevState => !prevState)}
                                           className='rounded-xl w-full bottom-3 h-12 justify-end bg-transparent hover:bg-[#222222] hover:text-white ring-inset ring-1 ring-[#222222] font-medium text-sm text-[#222222]'>
                                ADD REVIEW
                            </motion.button>
                        </>
                    }
                </motion.div>
            </div>
        </div>
    );
}