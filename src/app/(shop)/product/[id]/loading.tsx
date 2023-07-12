export default function Loading() {
    return (
        <main className='sm:px-[5vw] lg:px-[10vw] animate-pulse'>
            <div className='flex sm:flex-row flex-col gap-y-10 gap-x-10 my-5'>
                <div className='sm:w-7/12 flex flex-col xl:flex-row gap-x-2 gap-y-2 z-10'>
                    <div
                        className='justify-between xl:justify-normal px-[3.6vw] sm:px-0 order-last xl:order-first flex flex-row xl:flex-col gap-y-2 gap-x-2'>
                        <div className='bg-slate-400 aspect-[1333/2000] w-[90px] sm:w-[65px] md:w-[72px]'/>
                        <div className='bg-slate-400 aspect-[1333/2000] w-[90px] sm:w-[65px] md:w-[72px]'/>
                        <div className='bg-slate-400 aspect-[1333/2000] w-[90px] sm:w-[65px] md:w-[72px]'/>
                        <div className='bg-slate-400 aspect-[1333/2000] w-[90px] sm:w-[65px] md:w-[72px]'/>
                    </div>
                    <div className='bg-slate-400 w-full aspect-[1333/2000]'/>
                </div>
                <div className='px-[3.6vw] sm:px-0 sm:w-5/12 z-20 flex flex-col'>
                    <div className='rounded-full bg-slate-400 mb-10 h-3 w-28'/>
                    <div className='rounded-full bg-slate-400 h-5 mb-4 w-64'/>
                    <div className='rounded-full bg-slate-400 h-5 w-16 mb-12'/>
                    <div className='flex flex-col gap-y-3 mb-8'>
                        <div className='rounded-full bg-slate-400 h-3 w-full'/>
                        <div className='rounded-full bg-slate-400 h-3 w-full'/>
                        <div className='rounded-full bg-slate-400 h-3 w-full'/>
                        <div className='rounded-full bg-slate-400 h-3 w-1/2'/>
                    </div>
                    <div className='rounded-full flex gap-x-5'>
                        <div className='bg-slate-400 w-28 h-14 rounded-full'/>
                        <div className='bg-slate-400 rounded-full h-14 w-64'/>
                    </div>
                    <div className='h-px bg-gray-200 self-center w-full my-7'/>
                    <div className='rounded-full bg-slate-400 h-3 w-40 mb-14'/>
                    <div className='h-3 w-14 rounded-full bg-slate-400 mb-2.5'/>
                    <div className='h-3 w-52 rounded-full bg-slate-400 mb-2.5'/>
                    <div className='h-3 w-40 rounded-full bg-slate-400'/>
                </div>
            </div>
        </main>
    );
}