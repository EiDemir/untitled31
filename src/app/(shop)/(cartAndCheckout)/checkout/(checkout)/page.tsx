import getCurrentUser from "@/actions/getCurrentUser";
import {notFound} from "next/navigation";
import {prisma} from "@/libs/prisma";
import JsonObject = Prisma.JsonObject;
import {Prisma} from ".prisma/client";
import Link from "next/link";
import AddNewAddressModal from "./AddNewAddressModal";

async function getCardItems() {
    const user = await getCurrentUser();
    if (user) {
        return user;
    } else {
        return null;
    }
}

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

export default async function Page({searchParams}: {
    searchParams: {
        addNewShippingAddress?: string,
        addNewBillingAddress?: string
    }
}) {
    const user = await getCardItems();

    if (!user) {
        notFound();
    }

    const addresses = await getUserAddresses(user?.email);
    const billingAddresses = addresses!.billingAddress as JsonObject[];
    const shippingAddresses = addresses!.shippingAddress as JsonObject[];


    return (
        <>
            {searchParams.addNewShippingAddress && searchParams.addNewShippingAddress === 'true' &&
                <AddNewAddressModal/>
            }
            <div className='flex gap-x-8'>
                <div className='flex flex-col gap-y-7 w-2/3'>
                    <div className='rounded-3xl w-full ring-1 ring-[#E4E4E4] ring-inset'>
                        <div
                            className='pl-5 pr-1.5 bg-[#E4E4E4] drop-shadow-sm h-12 font-medium text-lg rounded-3xl flex justify-between items-center'>
                            SHIPPING ADDRESS
                            {shippingAddresses.length && <Link href=''
                                                               className='cursor-pointer py-2 px-4 text-sm rounded-3xl ring-1 ring-inset ring-[#222222] hover:bg-[#222222] hover:text-white'>
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
                            <>
                                {shippingAddresses.map((shippingAddress, index) =>
                                    <div key={index}>
                                        <p>{shippingAddress.firstName!.toString()}</p>
                                        <p>{shippingAddress.streetAddress!.toString()}, {shippingAddress.stateOrProvince!.toString()} {shippingAddress.postalCode!.toString()}</p>
                                        <p>{shippingAddress.country!.toString()}</p><br/>
                                        <p>{shippingAddress.phoneNumber!.toString()}</p>
                                    </div>)
                                }
                            </>
                        }
                    </div>
                    <div className='rounded-3xl w-full ring-1 ring-[#E4E4E4] ring-inset'>
                        <div
                            className='pl-5 pr-1.5 bg-[#E4E4E4] drop-shadow-sm h-12 font-medium text-lg rounded-3xl flex justify-between items-center'>
                            BILLING ADDRESS
                            {billingAddresses.length && <Link href=''
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
                            </div> :
                            <>
                                {billingAddresses.map((billingAddress, index) =>
                                    <div key={index}>
                                        <p>{billingAddress.firstName!.toString()}</p>
                                        <p>{billingAddress.noAndSt!.toString()}, {billingAddress.stateOrProvince!.toString()} {billingAddress.postalCode!.toString()}</p>
                                        <p>{billingAddress.country!.toString()}</p><br/>
                                        <p>{billingAddress.email!!.toString()}</p>
                                        <p>{billingAddress.phoneNumber!.toString()}</p>
                                    </div>)
                                }
                            </>
                        }
                    </div>
                </div>
                <div className='w-1/3 sticky top-0 flex flex-col gap-y-5'>
                    <div
                        className='p-8 h-min rounded-3xl ring-1 ring-inset ring-[#222222] bg-white/50 backdrop-blur-md'>
                        <h1 className='font-medium mb-6'>YOUR ORDER</h1>
                        <div className='divide-y'>
                            <div className='font-medium py-4 text-sm flex justify-between'>
                                PRODUCT
                                <p className='pl-4'>SUBTOTAL</p>
                            </div>
                            <div className='font-medium text-[#222222] py-4 flex flex-col gap-y-4 text-sm'>
                                {user.cart.map((item, index) =>
                                    <div key={index} className='flex justify-between'>
                                        <div>
                                            <p>{item.product!.name} x{item.quantity}</p>
                                            {item.color && <p className='text-[#767676]'>Color: {item.color}</p>}
                                            {item.size &&
                                                <p className='text-[#767676] capitalize'>Size: {item.size}</p>}
                                        </div>
                                        <span>${(item.quantity * item.product!.price).toFixed(2)}</span>
                                    </div>)
                                }
                            </div>
                            <div className='font-medium py-4 text-sm flex justify-between'>
                                PRODUCT
                                <p className='pl-4'>SUBTOTAL</p>
                            </div>
                            <div className='font-medium py-4 text-sm flex justify-between'>
                                SUBTOTAL
                                <p className='pl-4'>$89.99</p>
                            </div>
                            <div className='font-medium py-4 text-sm flex justify-between'>
                                SHIPPING
                                <p className='pl-4 font-normal'>FREE SHIPPING</p>
                            </div>
                            <div className='font-medium py-4 text-sm flex justify-between'>
                                VAT (5%)
                                <p className='pl-4'>$12.99</p>
                            </div>
                            <div className='font-medium py-4 text-sm flex justify-between'>
                                TOTAL
                                <p className='pl-4'>$100</p>
                            </div>
                        </div>
                    </div>
                    <button type='button'
                            className='hover:bg-black disabled:bg-[#E4E4E4] disabled:drop-shadow-none drop-shadow-lg rounded-full h-14 bg-[#222222] font-medium text-sm text-white'>
                        PROCEED TO PAYMENT
                    </button>
                </div>
            </div>
        </>
    );
}