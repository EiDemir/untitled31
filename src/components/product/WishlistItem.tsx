import Image from "next/image";
import {motion} from "framer-motion";
import {useState} from "react";
import {XMarkIcon} from "@heroicons/react/24/outline";

export default function WishlistItem(
    {imageLink, category, title, price, id, deleteHandler, deleteButtonDisabled}: {
        imageLink: string,
        category: string,
        title: string,
        price: string,
        id: string,
        deleteHandler: (id: string) => void,
        deleteButtonDisabled: boolean
    }) {
    const [isHovered, setIsHovered] = useState(false);

    return (
        <motion.div
            layout
            initial={{opacity: 0}}
            animate={{opacity: 1}}
            exit={{opacity: 0}}
            className="gap-y-3 flex flex-col">
            <div onMouseEnter={() => setIsHovered(true)}
                 onMouseLeave={() => setIsHovered(false)}
                 className='relative overflow-hidden rounded-xl'>
                <button
                    disabled={deleteButtonDisabled}
                    onClick={() => deleteHandler(id)}
                    onMouseEnter={() => setIsHovered(false)}
                    onMouseLeave={() => setIsHovered(true)}
                    className='disabled:bg-gray-400 absolute top-2 left-2 w-10 p-1.5 bg-white rounded-xl'>
                    <XMarkIcon className='text-black '/>
                </button>
                <Image className="aspect-[3/4] object-cover rounded-xl" src={imageLink.replace('c_crop,w_1333,h_2000', 'c_fill,w_666,h_1000')} alt="Product's picture" width={666}
                       height={1000}/>
                <motion.div
                    className='rounded-xl flex text-white divide-x divide-[#222222] text-xs absolute inset-x-0 bg-[#222222]/50 backdrop-blur-lg h-10 bottom-1 mx-1'
                    initial={false}
                    animate={{
                        opacity: isHovered ? 1 : 0,
                        y: isHovered ? 0 : 20
                    }}>
                    <button className='transition ease-out duration-500 w-full hover:bg-black rounded-md'>ADD TO CARD</button>
                </motion.div>
            </div>
            <div className='flex flex-col font-normal'>
                <p className="text-[#B9A16B] text-sm capitalize">{category}</p>
                <p className="text-base">{title}</p>
                <p className="text-[#767676] text-base">{price}</p>
            </div>
        </motion.div>
    );
}