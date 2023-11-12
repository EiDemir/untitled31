import Image from "next/image";
import {FormEvent, useEffect, useRef, useState} from "react";
import {ceil, mean, range} from 'lodash';
import axios from "axios";
import {ChevronDownIcon, ChevronUpIcon, StarIcon} from "@heroicons/react/24/solid";
import {useRouter} from "next/navigation";
import {motion} from "framer-motion";
import LoadingAnimation from "@/components/ui/LoadingAnimation";
import useSWR from "swr";
import {Review} from "@/types";
import {ErrorIcon} from "react-hot-toast";

export default function Reviews({productId, isAuthenticated, changeReviewNum, numberOfReviews}: {
    productId: string,
    isAuthenticated: boolean,
    changeReviewNum: () => void,
    numberOfReviews: number
}) {
    const {data, isLoading, mutate, error} =
        useSWR<Review[]>(`/api/product/${productId}/reviews`,
            (url: string) => axios.get(url, {params: {isAuthenticated}}).then(res => res.data.reviews));
    const [firstLabelStatus, setFirstLabelStatus] = useState(false);
    const [isAddReviewOpen, setIsAddReviewOpen] = useState(false);
    const router = useRouter();
    const [rating, setRating] = useState(0);
    const reviewTextRef = useRef<HTMLTextAreaElement>(null);
    const bottomRef = useRef<HTMLDivElement>(null);
    const [isButtonDisabled, setIsButtonDisabled] = useState(false);
    const [areVoteButtonsDisabled, setAreVoteButtonsDisabled] = useState(false);

    useEffect(() => {
        console.log(isButtonDisabled)
    }, [isButtonDisabled])

    const toggleVoteButton = (type: string, reviewId: string) => {
        if (isAuthenticated) {
            setAreVoteButtonsDisabled(true);
            axios.post('/api/product/reviews', {
                type: type === 'up' ? 'up' : 'down',
                reviewId
            }).then((res) => {
                mutate(data!.map(item => {
                    if (item.id === reviewId) {
                        item.userVoted = res.data.userVoted;
                        item.voteCount = res.data.newVoteCount;
                    }
                    return item;
                }));
            }).catch().finally(() => setAreVoteButtonsDisabled(false));
        } else {
            router.push('/auth/login');
        }
    };

    const handleAddReviewButton = (event: FormEvent) => {
        if (!isButtonDisabled) {
            event.preventDefault();
            setIsButtonDisabled(true);
            axios.post('/api/product/' + productId + '/reviews', {
                rating: rating,
                reviewText: reviewTextRef.current!.value
            }).then((res) => {
                mutate([...data!, res.data.newReview]);
                setIsAddReviewOpen(false);
                changeReviewNum();
                bottomRef.current!.scrollIntoView({block: 'nearest', behavior: 'smooth'});
            }).catch().finally(() => setIsButtonDisabled(false));
        }
    };

    return (
        <div>
            <div className='text-[#222222] w-full mb-3'><p className='text-xl align-text-top font-medium'>Reviews</p>
            </div>
            <div className='relative flex md:flex-row flex-col'>
                <div className='w-full md:w-2/3'>
                    <div className='divide-y flex flex-col md:pr-4'>
                        {isLoading && <>
                            {range(numberOfReviews).map(number =>
                                <div key={number} className='flex text-sm py-5 animate-pulse'>
                                    <div className='h-full w-20 px-4 flex flex-col gap-y-6'>
                                        <div className='rounded-full bg-slate-400 w-[43.16px] h-[43.16px]'/>
                                        <div className='flex flex-col gap-y-2 items-center'>
                                            <div className='rounded-full bg-slate-400 p-3'/>
                                            <div className='rounded-full p-1 bg-slate-400'></div>
                                            <div className='rounded-full bg-slate-400 p-3'/>
                                        </div>
                                    </div>
                                    <div className='w-full'>
                                        <div className='h-2 w-10 mt-2 rounded-full bg-slate-400'/>
                                        <div className='h-2 w-14 mt-4 rounded-full bg-slate-400'/>
                                        <div className='mt-8 flex flex-col gap-y-3'>
                                            <div className='h-2 w-full rounded-full bg-slate-400'/>
                                            <div className='h-2 w-full rounded-full bg-slate-400'/>
                                            <div className='h-2 w-1/2 rounded-full bg-slate-400'/>
                                        </div>
                                    </div>
                                </div>)
                            }
                        </>
                        }
                        {(!isLoading && error) &&
                            <div>
                                <ErrorIcon className='w-7 h-auto text-white'/>
                            </div>
                        }
                        {(!isLoading && data && data.length > 0) && data.map((review: {
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
                                               alt="User's profile picture" width='96' height='96'/>
                                        <div className='flex flex-col gap-y-1 items-center'>
                                            <button disabled={areVoteButtonsDisabled}
                                                    onClick={() => toggleVoteButton('up', review.id)} type='button'
                                                    className={`rounded-full ${review.userVoted && review.userVoted.vote === 'up' && !areVoteButtonsDisabled ? 'bg-green-400 hover:bg-green-500' : ''} transition-colors duration-500 p-1.5`}>
                                                <ChevronUpIcon
                                                    className={`w-5 h-auto ${review.userVoted && review.userVoted.vote === 'up' && !areVoteButtonsDisabled ? 'text-white' : 'text-gray-500 hover:text-green-500'} transition-colors duration-500`}/>
                                            </button>
                                            <p className='text-lg'>{review.voteCount}</p>
                                            <button disabled={areVoteButtonsDisabled}
                                                    onClick={() => toggleVoteButton('down', review.id)} type='button'
                                                    className={`rounded-full ${review.userVoted && review.userVoted.vote === 'down' && !areVoteButtonsDisabled ? 'bg-red-400 hover:bg-red-500' : ''} transition-colors duration-500 p-1.5`}>
                                                <ChevronDownIcon
                                                    className={`w-5 h-auto ${review.userVoted && review.userVoted.vote === 'down' && !areVoteButtonsDisabled ? 'text-white' : 'text-gray-500 hover:text-red-500'} transition-colors duration-500`}/>
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
                        {(!isLoading && data && data.length === 0) &&
                            <p className='flex items-center justify-center my-20'>No Reviews Yet</p>
                        }
                    </div>
                    <div ref={bottomRef}/>
                </div>
                <motion.div layout
                            transition={{
                                duration: 0.5,
                                ease: 'easeOut'
                            }}
                            className={`drop-shadow-sm w-full order-first md:order-last sticky top-20 md:w-1/3 bg-gray-200/50 backdrop-blur-md flex flex-col justify-between rounded-xl ${isAddReviewOpen ? 'h-full' : 'h-32'} p-3`}>
                    {isAddReviewOpen ?
                        <form onSubmit={handleAddReviewButton} className='flex flex-col'>
                            <motion.div initial={{opacity: 0}} animate={{opacity: 1}}
                                        transition={{delay: 0.5}}
                                        className='flex gap-x-3 items-center'>
                                <label htmlFor='rating'>Your Rating:</label>
                                <div className='flex gap-x-2'>
                                    {range(1, 6).map(number =>
                                        <StarIcon onClick={() => setRating(number)} key={number}
                                                  className={`cursor-pointer drop-shadow-sm w-7 h-auto transition-colors duration-300 ${number <= rating ? 'text-yellow-400' : 'text-white'}`}/>
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
                            <motion.button disabled={isButtonDisabled} transition={{delay: 0.5}} initial={{opacity: 0}}
                                           animate={{opacity: 1}}
                                           type='submit'
                                           className='mt-2 rounded-xl w-full bottom-3 h-12 justify-end bg-transparent hover:bg-[#222222] hover:text-white ring-inset ring-1 ring-[#222222] font-medium text-sm text-[#222222]'>
                                {isButtonDisabled ? 'ADDING REVIEW' : 'ADD REVIEW'}
                            </motion.button>
                        </form> :
                        <>
                            <motion.div initial={{opacity: 0}} animate={{opacity: 1}}
                                        transition={{delay: 0.5}}
                                        className={`flex ${isLoading ? 'my-auto justify-center' : ''}`}>
                                {isLoading ? <LoadingAnimation/> : data ?
                                    <div className='flex items-center gap-x-2 text-lg'>
                                        Average Rating: <div className='flex gap-x-2'>
                                        {range(1, 6).map(number =>
                                            <StarIcon key={number}
                                                      className={`drop-shadow-sm w-7 h-full ${number <= ceil(mean(data.map(item => item.rating))) ? 'text-yellow-400' : 'text-white'}`}/>
                                        )} </div>
                                    </div> : <div></div>}
                            </motion.div>
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