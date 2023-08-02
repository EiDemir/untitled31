export default function Loading() {
    return (
        <>
            <div className='rounded-3xl w-full ring-1 ring-[#E4E4E4] ring-inset'>
                <div
                    className='pl-5 pr-1.5 bg-[#E4E4E4] drop-shadow-sm h-12 font-medium text-[#222222] text-lg rounded-3xl flex justify-between items-center'>
                    SHIPPING ADDRESS
                    <div
                        className='cursor-pointer py-2 px-5 text-sm rounded-3xl ring-1 ring-inset ring-[#222222] hover:bg-[#222222] hover:text-white'>
                    </div>
                </div>
                <div className='p-5 animate-pulse flex flex-col gap-y-5'>
                    <div className='rounded-3xl w-full h-[128px] bg-slate-300'/>
                    <div className='rounded-3xl w-full h-[128px] bg-slate-300'/>
                    <div className='rounded-3xl w-full h-[128px] bg-slate-300'/>
                </div>
            </div>
            <div className='rounded-3xl w-full ring-1 ring-[#E4E4E4] ring-inset'>
                <div
                    className='pl-5 pr-1.5 bg-[#E4E4E4] drop-shadow-sm h-12 font-medium text-[#222222] text-lg rounded-3xl flex justify-between items-center'>
                    BILLING ADDRESS
                    <div
                        className='cursor-pointer py-2 px-5 text-sm rounded-3xl ring-1 ring-inset ring-[#222222] hover:bg-[#222222] hover:text-white'>
                    </div>
                </div>
                <div className='p-5 animate-pulse flex flex-col gap-y-5'>
                    <div className='rounded-3xl w-full h-[128px] bg-slate-300'/>
                    <div className='rounded-3xl w-full h-[128px] bg-slate-300'/>
                    <div className='rounded-3xl w-full h-[128px] bg-slate-300'/>
                </div>
            </div>
        </>
    );
}