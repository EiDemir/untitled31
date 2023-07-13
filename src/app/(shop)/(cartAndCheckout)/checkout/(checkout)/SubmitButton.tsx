import {experimental_useFormStatus as useFormStatus} from 'react-dom'
import LoadingAnimation from "@/components/ui/LoadingAnimation";


export default function SubmitButton() {
    const {pending} = useFormStatus();

    return (
        <button type='submit'
                disabled={pending}
                className='gap-x-2 flex items-center justify-center hover:bg-black disabled:bg-[#222222]/70 disabled:drop-shadow-none drop-shadow-lg rounded-full h-14 bg-[#222222] font-medium text-white'>
            {pending ? <>
                <LoadingAnimation color='FFFFFF'/>
                ADDING ADDRESS
            </> : 'ADD ADDRESS'}
        </button>
    );
}