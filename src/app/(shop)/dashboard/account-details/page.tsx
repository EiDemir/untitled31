import ChangePassword from "@/app/(shop)/dashboard/ChangePassword";
import {Suspense} from "react";
import PersonalInfo from "./PersonalInfo";


export default async function Page() {
    const personalInfoLoading = <div className='w-full lg:pr-6 flex flex-col gap-y-10'>
        <p className='text-lg font-semibold'>Personal information</p>
        <form className='flex flex-col gap-y-6 text-sm font-medium'>
            <div className='flex gap-x-3'>
                <div className='bg-[#E4E4E4] w-full rounded-3xl py-6'/>
                <div className='bg-[#E4E4E4] w-full rounded-3xl py-6'/>
            </div>
            <div className='pr-11 pl-5 bg-[#E4E4E4] w-full rounded-3xl py-6'/>
            <div className='pr-11 pl-5 bg-[#E4E4E4] w-full rounded-3xl py-6'/>
            <div className='pr-11 pl-5 bg-[#E4E4E4] w-full rounded-3xl py-6'/>
        </form>
    </div>;

    return (
        <div className='grid divide-y lg:divide-y-0 lg:grid-cols-2 lg:divide-x px-1 lg:mx-0'>
            <Suspense fallback={personalInfoLoading}>
                <PersonalInfo/>
            </Suspense>
            <ChangePassword/>
        </div>
    );
}