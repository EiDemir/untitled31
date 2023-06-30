import {prisma} from "@/libs/prisma";
import getCurrentUser from "@/actions/getCurrentUser";

async function getUserPersonalInfo(userEmail: string) {
    try {
        return await prisma.user.findUnique({
            where: {
                email: userEmail
            }, select: {
                name: true,
                email: true,
            }
        });
    } catch (e) {
        return null;
    }
}

export default async function PersonalInfo() {
    const user = await getCurrentUser();
    const personalInfo = await getUserPersonalInfo(user!.email);

    return (
        <div className='w-full pb-6 lg:pb-0 lg:pr-6 flex flex-col gap-y-10'>
            <p className='text-lg font-semibold'>Personal information</p>
            <form className='flex flex-col gap-y-6 text-sm font-medium'>
                <div className='flex gap-x-3'>
                    <div className="relative w-full">
                        <input
                            className='drop-shadow-sm bg-transparent tracking-wider pr-11 pl-5 ring-[#E4E4E4] ring-2 text-[#222222] focus:ring-2 focus:ring-[#222222] border-0 w-full rounded-3xl py-3'
                            type='text'
                            id='firstName'
                            name='firstName'
                            defaultValue={personalInfo!.name!}
                        />
                        <label
                            className='absolute left-5 top-[-10px] text-[#222222] px-1 bg-white' htmlFor='firstName'>First
                            Name
                        </label>
                    </div>
                    <div className="relative w-full">
                        <input
                            className='drop-shadow-sm bg-transparent tracking-wider pr-11 pl-5 ring-[#E4E4E4] ring-2 text-[#222222] focus:ring-2 focus:ring-[#222222] border-0 w-full rounded-3xl py-3'
                            type='text'
                            id='lastName'
                            name='lastName'
                        />
                        <label
                            className='absolute left-5 top-[-10px] text-[#222222] px-1 bg-white' htmlFor='lastName'>Last
                            Name
                        </label>
                    </div>
                </div>
                <div className="relative">
                    <input
                        className='drop-shadow-sm bg-transparent tracking-wider pr-11 pl-5 ring-[#E4E4E4] ring-2 text-[#222222] focus:ring-2 focus:ring-[#222222] border-0 w-full rounded-3xl py-3'
                        type='text'
                        id='displayName'
                        name='displayName'
                    />
                    <label
                        className='absolute left-5 top-[-10px] text-[#222222] px-1 bg-white' htmlFor='displayName'>Display
                        Name
                    </label>
                </div>
                <div className="relative">
                    <input
                        className='drop-shadow-sm bg-transparent tracking-wider pr-11 pl-5 ring-[#E4E4E4] ring-2 text-[#222222] focus:ring-2 focus:ring-[#222222] border-0 w-full rounded-3xl py-3'
                        type='email'
                        id='email'
                        name='email'
                        defaultValue={personalInfo!.email!}
                    />
                    <label
                        className='absolute left-5 top-[-10px] text-[#222222] px-1 bg-white' htmlFor='email'>Email
                        Address
                    </label>
                </div>
                <button
                    className='drop-shadow-md bg-head text-white py-3 rounded-full tracking-wide'
                    type='submit'>Confirm
                </button>
            </form>
        </div>
    );
}