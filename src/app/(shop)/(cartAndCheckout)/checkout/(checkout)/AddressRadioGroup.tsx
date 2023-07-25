'use client';

import {Prisma} from ".prisma/client";
import JsonObject = Prisma.JsonObject;
import {RadioGroup} from "@headlessui/react";
import {useState} from "react";
import {CheckCircleIcon} from "@heroicons/react/24/outline";

export default function AddressRadioGroup({addresses}: { addresses: JsonObject[] }) {
    const [address, setAddress] = useState(0);

    return (
        <RadioGroup value={address} onChange={setAddress} className='flex flex-col gap-y-5'>
            {addresses.map((address, index) =>
                <RadioGroup.Option value={index} key={index}>
                    {({checked}) => (
                        <div className={`px-4 tracking-wide ${checked ? 'bg-[#E893CF] text-[#222222] py-10' : 'hover:bg-gray-300 p-4 ring-1 ring-[#E893CF] ring-inset cursor-pointer'} transition-all duration-500 items-center justify-between flex rounded-3xl gap-x-3`}>
                            <div className='font-medium'>
                                <p className='font-bold'>{address.firstName!.toString()} {address.lastName!.toString()}</p>
                                {address.companyName && <p>shippingAddress.companyName.toString()</p>}
                                <p>{address.streetAddress!.toString()}</p>
                                <p>{address.townOrCity!.toString()}, {address.stateOrProvince!.toString()} {address.postalCode!.toString()}</p>
                                <p>{address.phoneNumber!.toString()}</p>
                            </div>
                            {checked && <CheckCircleIcon className='text-[#222222] w-8 h-auto'/>}
                        </div>
                    )}
                </RadioGroup.Option>)
            }
        </RadioGroup>
    );
}