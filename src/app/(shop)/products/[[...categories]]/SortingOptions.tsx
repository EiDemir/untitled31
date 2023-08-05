'use client';

import {Menu, Transition} from "@headlessui/react";
import {ChevronDownIcon} from "@heroicons/react/24/solid";
import {Fragment, useState} from "react";
import {useRouter} from "next/navigation";

export default function SortingOptions({searchParams}: {
    searchParams: { page?: string, color?: string, size?: string, minPrice?: string, maxPrice?: string, sort?: string }
}) {
    const router = useRouter();
    const [selectedOption, setSelectedOption] = useState(!searchParams.sort ? 'Default Sorting' : searchParams.sort === 'htl' ? 'Price: High to Low' : 'Price: Low to High');

    return (
        <div
            className='w-full justify-end flex text-sm font-medium mb-7'>
            <Menu as='div' className='relative inline-block z-10'>
                <Menu.Button className='inline-flex items-center gap-x-2 hover:text-[#E893CF] text-[#222222]'>
                    {selectedOption}
                    <ChevronDownIcon className='w-4 h-auto text-[#222222'/>
                </Menu.Button>
                <Transition
                    as={Fragment}
                    enter='transition duration-500'
                    enterFrom='transform opacity-0 -translate-y-2'
                    enterTo='transform opacity-100 translate-y-0'
                    leave='transition duration-200'
                    leaveFrom='transform opacity-100 translate-y-0'
                    leaveTo='transform opacity-0 -translate-y-2'
                >
                    <Menu.Items
                        className='flex flex-col w-max text-sm absolute right-0 mt-2 divide-y divide-gray-100 ring-1 ring-gray-100 rounded-sm bg-white'>
                        <Menu.Item as='button' id='0' onClick={() => {
                            setSelectedOption('DEFAULT SORTING');
                            const params = new URLSearchParams(searchParams);
                            params.delete('sort');
                            router.replace('?' + params.toString());
                        }} className='px-4 py-3 my-1 hover:text-[#E893CF] text-[#222222]'>
                            Default Sorting
                        </Menu.Item>
                        <Menu.Item as='button' id='1' onClick={() => {
                            setSelectedOption('Price: High to Low');
                            const params = new URLSearchParams(searchParams);
                            params.set('sort', 'htl');
                            router.replace('?' + params.toString());
                        }} className='px-4 py-3 my-1 hover:text-[#E893CF] text-[#222222]'>
                            Price: High to Low
                        </Menu.Item>
                        <Menu.Item as='button' id='2' onClick={() => {
                            setSelectedOption('Price: Low to High');
                            const params = new URLSearchParams(searchParams);
                            params.set('sort', 'lth');
                            router.replace('?' + params.toString());
                        }} className='px-4 py-3 my-1 hover:text-[#E893CF] text-[#222222]'>
                            Price: Low to High
                        </Menu.Item>
                    </Menu.Items>
                </Transition>
            </Menu>
        </div>
    );
}