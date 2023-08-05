import {MagnifyingGlassIcon} from "@heroicons/react/24/outline";
import {Popover} from "@headlessui/react";
import {useEffect, useState} from "react";
import axios from "axios";
import {motion} from "framer-motion";
import Link from "next/link";
import Image from "next/image";

export default function SearchBox({className}: {className?: string}) {
    const [value, setValue] = useState('');
    const [results, setResults] = useState<{
        products: { name: string, id: string, images: string[], price: number }[],
        categories: { name: string }[]
    }>({
        products: [],
        categories: []
    });

    useEffect(() => {
        if (value.trim().length > 0) {
            const timeout = setTimeout(() => {
                axios.get('/api/search/' + value).then((res) =>
                    setResults({
                        products: res.data.products,
                        categories: res.data.categories
                    }));
            }, 500);

            return () => clearTimeout(timeout);
        }
    }, [value])

    return (
        <Popover className={'w-3/4 relative ' + className}>
            <Popover.Button
                className='rounded-full text-left pl-12 z-10 cursor-text text-black w-full min-w-[300px] bg-gray-200/50 backdrop-blur-md py-3'>
                <MagnifyingGlassIcon
                    className='absolute top-2.5 left-3 text-[#222222] z-20 w-6 h-6'/>
                Search
            </Popover.Button>
            <Popover.Panel
                as={motion.div}
                initial={{opacity: 0}}
                animate={{opacity: 100}}
                className='absolute top-0 z-20 h-96 rounded-md bg-white shadow-2xl text-black w-full divide-y overflow-y-auto'>
                {({close}) => (
                    <>
                        <MagnifyingGlassIcon
                            className='absolute top-2.5 left-3 text-[#222222] z-20 w-6 h-6'/>
                        <input
                            value={value}
                            onChange={(event) => setValue(event.target.value)}
                            autoFocus
                            className='focus:ring-0 rounded-t-md placeholder-[#222222] text-left pl-12 z-10 cursor-text text-black w-full min-w-[300px] text-sm py-3 border-none'
                            placeholder='Search'/>
                        <div className='p-5'>
                            {results.categories.length > 0 && (
                                <div>
                                    <h4 className='text-gray-500 mb-3'>Categories</h4>
                                    <div className='flex gap-2'>
                                        {results.categories.map(category =>
                                            <Link onClick={() => {
                                                setValue('');
                                                setResults({
                                                    products: [],
                                                    categories: []
                                                });
                                                close();
                                            }} href={'/products/' + category.name}
                                                  key={category.name}
                                                  className='rounded-full ring-1 ring-[#222222] text-[#222222] py-2 px-4 hover:bg-gray-200 capitalize'>
                                                {category.name}
                                            </Link>
                                        )}
                                    </div>
                                </div>
                            )}
                            {results.products.length > 0 && (
                                <div>
                                    <h4 className='text-gray-500 my-3'>Products</h4>
                                    <div className='flex flex-col gap-y-3'>
                                        {results.products.map(product =>
                                            <Link onClick={() => {
                                                setValue('');
                                                setResults({
                                                    products: [],
                                                    categories: []
                                                });
                                                close();
                                            }} href={'/product/' + product.id}
                                                  key={product.id}
                                                  className='rounded-md p-2 text-black h-20 flex gap-x-3 items-center transition-colors duration-200 hover:bg-gray-100'>
                                                <Image className='h-full w-auto' src={product.images[0].replace('c_crop,w_1333,h_2000', 'c_fill,w_333,h_500')}
                                                       alt="Product's image" width='333' height='500'/>
                                                <p>{product.name}</p>
                                            </Link>
                                        )}
                                    </div>
                                </div>
                            )}
                        </div>
                    </>
                )}
            </Popover.Panel>
        </Popover>
    );
}