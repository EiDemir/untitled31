import Image from "next/image";

import backgroundImage from '../../public/background.svg';
import Link from "next/link";
import Header from "@/components/Header";
import getCurrentUser from "@/actions/getCurrentUser";

export default async function NotFoundPage() {
    const user = await getCurrentUser();

    return (
        <div className='h-screen'>
            <Header startWithWhite={false}/>
            <Image className='absolute object-cover h-full inset-0' src={backgroundImage}
                   alt='Background image'/>
            <main className='h-full'>
                <div className='h-full flex flex-col gap-y-4 justify-center items-center'>
                    <h1 className='text-8xl font-bold'>OOPS!</h1>
                    <h2 className='text-2xl'>Page not found</h2>
                    <p className='text-sm max-w-md text-center'>Sorry, we could not find the page you are looking for.
                        We
                        suggest that you return
                        to home page.</p>
                    <button type='button'
                            className='hover:bg-black drop-shadow-lg rounded-full h-14 bg-[#222222] font-medium text-sm text-white w-64'>
                        <Link href='/'>GO BACK</Link>
                    </button>
                </div>
            </main>
        </div>
    );
}