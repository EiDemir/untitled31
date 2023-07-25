import {prisma} from "@/libs/prisma";
import getCurrentUser from "@/actions/getCurrentUser";
import {Prisma} from ".prisma/client";
import JsonObject = Prisma.JsonObject;
import AddressRadioGroup from "@/app/(shop)/(cartAndCheckout)/checkout/(checkout)/AddressRadioGroup";

async function getUserAddresses(userEmail: string) {
    try {
        return await prisma.user.findUnique({
            where: {
                email: userEmail
            }, select: {
                billingAddress: true,
                shippingAddress: true
            }
        });
    } catch (e) {
        return null;
    }
}

export default async function Page() {
    const user = await getCurrentUser();
    const addresses = await getUserAddresses(user!.email);
    const billingAddresses = addresses!.billingAddress as JsonObject[];
    const shippingAddresses = addresses!.shippingAddress as JsonObject[];

    return (
        <div className='flex flex-col h-full'>
            <div className='w-full h-full flex md:flex-row flex-col gap-5'>
                <div className='rounded-3xl h-full w-full ring-1 ring-[#E4E4E4] ring-inset'>
                    <p className='px-4 pt-4 font-medium text-lg'>BILLING ADDRESS</p>
                    {billingAddresses.length === 0 ?
                        <p className='text-center my-14'>No Billing Address</p> :
                        <div className='p-4'>
                            <AddressRadioGroup addresses={billingAddresses}/>
                        </div>}
                </div>
                <div className='rounded-3xl h-full w-full ring-1 ring-[#E4E4E4] ring-inset'>
                    <p className='px-4 pt-4 font-medium text-lg'>SHIPPING ADDRESS</p>
                    {shippingAddresses.length === 0 ?
                        <p className='text-center my-14'>No Shipping Address</p> :
                        <div className='p-4'>
                            <AddressRadioGroup addresses={shippingAddresses}/>
                        </div>}
                </div>
            </div>
            <p className='text-sm mt-5'>These addresses will be used on the checkout page by default.</p>
        </div>
    );
}