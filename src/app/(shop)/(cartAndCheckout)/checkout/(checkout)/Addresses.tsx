import getCurrentUser from "@/actions/getCurrentUser";
import {prisma} from "@/libs/prisma";
import JsonObject = Prisma.JsonObject;
import {Prisma} from ".prisma/client";
import Link from "next/link";
import AddNewAddressModal from "./AddNewAddressModal";
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

export default async function Addresses({searchParams}: {
    searchParams: {
        addNewShippingAddress?: string,
        addNewBillingAddress?: string
    }
}) {
    const user = await getCurrentUser()
    const addresses = await getUserAddresses(user!.email);
    const billingAddresses = addresses!.billingAddress as JsonObject[];
    const shippingAddresses = addresses!.shippingAddress as JsonObject[];

    return (
        <>
            {searchParams.addNewShippingAddress && searchParams.addNewShippingAddress === 'true' &&
                <AddNewAddressModal type='shipping'/>
            }
            {searchParams.addNewBillingAddress && searchParams.addNewBillingAddress === 'true' &&
                <AddNewAddressModal type='billing'/>
            }
            <div className='rounded-3xl w-full ring-1 ring-[#E4E4E4] ring-inset'>
                <div
                    className='pl-5 pr-1.5 bg-[#E4E4E4] drop-shadow-sm h-12 font-medium text-[#222222] text-lg rounded-3xl flex justify-between items-center'>
                    SHIPPING ADDRESS
                    {shippingAddresses.length && <Link href='?addNewShippingAddress=true'
                                                       className='cursor-pointer py-2 px-5 text-sm rounded-3xl ring-1 ring-inset ring-[#222222] hover:bg-[#222222] hover:text-white'>
                        ADD NEW ADDRESS
                    </Link>}
                </div>
                {shippingAddresses.length === 0 ?
                    <div className='text-center my-14 flex flex-col gap-y-2'>You have no shipping address yet!
                        <Link href='?addNewShippingAddress=true'
                              className='py-2 px-4 text-sm text-white rounded-3xl w-max mx-auto hover:bg-black bg-[#222222]'>
                            ADD ONE
                        </Link>
                    </div> :
                    <div className='p-5'>
                        <AddressRadioGroup addresses={shippingAddresses}/>
                    </div>
                }
            </div>
            <div className='rounded-3xl w-full ring-1 ring-[#E4E4E4] ring-inset'>
                <div
                    className='pl-5 pr-1.5 bg-[#E4E4E4] drop-shadow-sm h-12 font-medium text-[#222222] text-lg rounded-3xl flex justify-between items-center'>
                    BILLING ADDRESS
                    {billingAddresses.length > 0 && <Link href='?addNewBillingAddress=true'
                                                          className='py-2 px-4 text-sm rounded-3xl ring-1 ring-[#222222] ring-inset hover:bg-[#222222] hover:text-white'>
                        ADD NEW ADDRESS
                    </Link>}
                </div>
                {billingAddresses.length === 0 ?
                    <div className='text-center my-14 flex flex-col gap-y-2'>You have no billing address yet!
                        <Link href='?addNewBillingAddress=true'
                              className='cursor-pointer py-2 px-4 text-sm text-white rounded-3xl w-max mx-auto hover:bg-black bg-[#222222]'>
                            ADD ONE
                        </Link>
                    </div>
                    :
                    <div className='p-5'>
                        <AddressRadioGroup addresses={billingAddresses}/>
                    </div>
                }
            </div>
        </>
    );
}