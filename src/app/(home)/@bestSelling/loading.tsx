export default function BestSellingLoading() {
    return (
        <div className='flex flex-col py-16 gap-y-16 w-full'>
            <div className='mx-auto font-bold text-4xl'>
                Best Selling
            </div>
            <div className='flex w-[80vw] gap-x-5 animate-pulse mx-auto'>
                <div className='gap-y-4 flex flex-col w-full'>
                    <div className='rounded-xl w-full aspect-[1333/2000] bg-slate-300'/>
                    <div className='rounded-full bg-slate-300 w-10 h-2'/>
                    <div className='rounded-full bg-slate-300 w-36 h-3'/>
                    <div className='rounded-full bg-slate-300 w-10 h-3'/>
                </div>
                <div className='gap-y-4 flex flex-col w-full'>
                    <div className='rounded-xl w-full aspect-[1333/2000] bg-slate-300'/>
                    <div className='rounded-full bg-slate-300 w-10 h-2'/>
                    <div className='rounded-full bg-slate-300 w-36 h-3'/>
                    <div className='rounded-full bg-slate-300 w-10 h-3'/>
                </div>
                <div className='gap-y-4 hidden flex-col w-full sm:flex'>
                    <div className='rounded-xl w-full aspect-[1333/2000] bg-slate-300'/>
                    <div className='rounded-full bg-slate-300 w-10 h-2'/>
                    <div className='rounded-full bg-slate-300 w-36 h-3'/>
                    <div className='rounded-full bg-slate-300 w-10 h-3'/>
                </div>
                <div className='gap-y-4 hidden flex-col w-full lg:flex'>
                    <div className='rounded-xl w-full aspect-[1333/2000] bg-slate-300'/>
                    <div className='rounded-full bg-slate-300 w-10 h-2'/>
                    <div className='rounded-full bg-slate-300 w-36 h-3'/>
                    <div className='rounded-full bg-slate-300 w-10 h-3'/>
                </div>
            </div>
        </div>
    );
}