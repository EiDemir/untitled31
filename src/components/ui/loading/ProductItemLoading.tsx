export default function ProductItemLoading() {
    return (
        <div className='gap-y-3 flex-col w-full flex'>
            <div className='rounded-xl w-full aspect-[1333/2000] bg-slate-300'/>
            <div className='rounded-full bg-slate-300 w-10 h-2'/>
            <div className='rounded-full bg-slate-300 w-36 h-3'/>
            <div className='rounded-full bg-slate-300 w-10 h-3'/>
            <div className='flex gap-x-3 pt-px'>
                <div className='bg-slate-300 w-5 h-5 rounded-full'/>
                <div className='bg-slate-300 w-5 h-5 rounded-full'/>
                <div className='bg-slate-300 w-5 h-5 rounded-full'/>
            </div>
        </div>
    );
}