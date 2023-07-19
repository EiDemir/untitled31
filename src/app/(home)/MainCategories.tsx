'use client';

export default function MainCategories() {
    return (
        <div className='flex gap-x-4 h-96 mt-16 mx-[10vw]'>
            <div className='w-1/2 bg-[#F2F3F7] rounded-xl h-full'>
            </div>
            <div className='w-1/2 h-full flex flex-col gap-y-4'>
                <div className='h-1/2 bg-[#E5E2DD] w-full rounded-xl'>

                </div>
                <div className='h-1/2 w-full flex gap-x-4'>
                    <div className='bg-[#E7E6E4] w-1/2 rounded-xl'>

                    </div>
                    <div className='bg-[#F5E6E0] w-1/2 rounded-xl'>

                    </div>
                </div>
            </div>
        </div>
    );
}