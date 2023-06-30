import {prisma} from "@/libs/prisma";
import _ from 'lodash';
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

export default async function AddressesPage() {
    const user = await getCurrentUser();
    const addresses = await getUserAddresses(user!.email);
    const billingAddress = addresses!.billingAddress as JsonObject;
    const shippingAddress = addresses!.shippingAddress as JsonObject;

    return (
        <>
            <div className='w-full h-full flex gap-x-5'>
                <div className='rounded-3xl h-full w-full ring-1 ring-[#E4E4E4] ring-inset p-4'>
                    <p className='pb-3 font-medium text-lg'>BILLING ADDRESS</p>
                    {_.isEmpty(billingAddress) ?
                        <p className='text-center mt-14'>No Billing Address</p> :
                        <>
                            <p>{billingAddress.name!.toString()}</p>
                            <p>{billingAddress.noAndSt!.toString()}, {billingAddress.province!.toString()} {billingAddress.zipCode!.toString()}</p>
                            <p>{billingAddress.country!.toString()}</p><br/>
                            <p>{billingAddress.email!!.toString()}</p>
                            <p>{billingAddress.phoneNumber!.toString()}</p>
                        </>
                    }
                </div>
                <div className='rounded-3xl h-full w-full ring-1 ring-[#E4E4E4] ring-inset p-4'>
                    <p className='pb-3 font-medium text-lg'>SHIPPING ADDRESS</p>
                    {_.isEmpty(shippingAddress) ?
                        <p className='text-center mt-14'>No Shipping Address</p> :
                        <>
                            <p>{shippingAddress.name!.toString()}</p>
                            <p>{shippingAddress.noAndSt!.toString()}, {shippingAddress.province!.toString()} {shippingAddress.zipCode!.toString()}</p>
                            <p>{shippingAddress.country!.toString()}</p><br/>
                            <p>{shippingAddress.email!!.toString()}</p>
                            <p>{shippingAddress.phoneNumber!.toString()}</p>
                        </>
                    }
                </div>
            </div>
            <p className='text-sm mt-5'>These addresses will be used on the checkout page by default.</p>
        </>
    );
}