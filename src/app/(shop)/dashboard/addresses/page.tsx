import {prisma} from "@/libs/prisma";
import getCurrentUser from "@/actions/getCurrentUser";
import {Prisma} from ".prisma/client";
import JsonObject = Prisma.JsonObject;

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
        <>
            <div className='w-full h-full flex gap-x-5'>
                <div className='rounded-3xl h-full w-full ring-1 ring-[#E4E4E4] ring-inset p-4'>
                    <p className='pb-3 font-medium text-lg'>BILLING ADDRESS</p>
                    {billingAddresses.length === 0 ?
                        <p className='text-center mt-14'>No Billing Address</p> :
                        <>
                            {billingAddresses.map((billingAddress, index) =>
                                <div key={index}>
                                    <p>{billingAddress.firstName!.toString()}</p>
                                    <p>{billingAddress.noAndSt!.toString()}, {billingAddress.province!.toString()} {billingAddress.zipCode!.toString()}</p>
                                    <p>{billingAddress.country!.toString()}</p><br/>
                                    <p>{billingAddress.email!!.toString()}</p>
                                    <p>{billingAddress.phoneNumber!.toString()}</p>
                                </div>)
                            }
                        </>
                    }
                </div>
                <div className='rounded-3xl h-full w-full ring-1 ring-[#E4E4E4] ring-inset p-4'>
                    <p className='pb-3 font-medium text-lg'>SHIPPING ADDRESS</p>
                    {shippingAddresses.length === 0 ?
                        <p className='text-center mt-14'>No Shipping Address</p> :
                        <>
                            {shippingAddresses.map((shippingAddress, index) =>
                                <div key={index}>
                                    <p>{shippingAddress.firstName!.toString()}</p>
                                    <p>{shippingAddress.streetName!.toString()}, {shippingAddress.province!.toString()} {shippingAddress.zipCode!.toString()}</p>
                                    <p>{shippingAddress.country!.toString()}</p><br/>
                                    <p>{shippingAddress.phoneNumber!.toString()}</p>
                                </div>)
                            }
                        </>
                    }
                </div>
            </div>
            <p className='text-sm mt-5'>These addresses will be used on the checkout page by default.</p>
        </>
    );
}