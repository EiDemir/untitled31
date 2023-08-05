import {range} from "lodash";

export default function Loading() {
    return (
        <div className='flex gap-x-5 animate-pulse'>
            {range(3).map(item =>
                <div key={item} className='flex flex-col w-full'>
                    <div className='rounded-xl bg-slate-400 w-full aspect-[666/1000] mb-5'/>
                    <div className='bg-slate-400 rounded-full mb-4 h-2 w-6'/>
                    <div className='bg-slate-400 rounded-full mb-4 h-2 w-20'/>
                    <div className='bg-slate-400 rounded-full mb-1 h-2 w-8'/>
                </div>
            )}
        </div>
    );
}