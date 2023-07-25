import {redirect} from "next/navigation";
import getCurrentUser from "@/actions/getCurrentUser";
import {
    LockClosedIcon as LockSolid,
    EnvelopeIcon as EnvelopeSolid,
    UserIcon as UserSolid
} from "@heroicons/react/24/solid";
import {EnvelopeIcon, LockClosedIcon, UserIcon, ExclamationCircleIcon} from "@heroicons/react/24/outline";
import AuthInput from "@/app/(authentication)/auth/AuthInput";
import {addNewUser} from "@/app/actions";

export default async function Page({searchParams}: {
    searchParams: {
        alreadyExists?: string
    }
}) {
    const session = await getCurrentUser();

    if (session) {
        redirect('/');
    }

    return <div
        className='max-w-[450px] px-5 sm:px-0 mx-auto mt-10 text-sm font-medium'>
        {searchParams.alreadyExists === '1' &&
            <h1 className='mb-5 w-full rounded-lg p-3 bg-red-500 text-white flex gap-x-3 items-center'>
                <ExclamationCircleIcon className='h-8 w-auto'/>
                A user with the given email is already registered.</h1>}
        <form className='flex flex-col gap-y-5' action={addNewUser} autoComplete='off'>
            <AuthInput type='text' name='name' labelText='Full Name *'
                       enabledIcon={<UserSolid className="h-7 w-7"/>}
                       disabledIcon={<UserIcon className="h-7 w-7"/>}/>
            <AuthInput type='email' name='email' labelText='Email *'
                       enabledIcon={<EnvelopeSolid className="h-7 w-7"/>}
                       disabledIcon={<EnvelopeIcon className="h-7 w-7"/>}/>
            <AuthInput type='password' name='password' labelText='Password *'
                       enabledIcon={<LockSolid className="h-7 w-7"/>}
                       disabledIcon={<LockClosedIcon className="h-7 w-7"/>}/>
            <AuthInput type='password' name='repPassword' labelText='Confirm Password *'
                       enabledIcon={<LockSolid className="h-7 w-7"/>}
                       disabledIcon={<LockClosedIcon className="h-7 w-7"/>}/>

            <p className='text-[#767676] text-sm'>Your personal data will be used to support your experience
                throughout this website, to manage access to your account, and for other purposes described in our
                privacy policy.</p>

            <button
                className='drop-shadow-md bg-head text-white py-3 rounded-full tracking-wide'
                type='submit'>Register
            </button>
        </form>
    </div>;
}
