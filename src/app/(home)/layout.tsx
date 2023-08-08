import React, {ReactNode} from "react";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import Slider from "./Slider";
import MainCategories from "./MainCategories";
import slide1 from '../../../public/slide1.webp';
import slide2 from '../../../public/slide2.webp';
import slide3 from '../../../public/slide3.webp';

export const dynamic = 'force-static';

const sliderDetails = [
    {
        imageLink: slide1,
        title: ['Summer', "Lovin'"],
        subtitle: 'Trendy Outfits for the Sunny Days'
    },
    {
        imageLink: slide2,
        title: ['Seamless', 'Style'],
        subtitle: 'Experience the Ease of Online Shopping!'
    },
    {
        imageLink: slide3,
        title: ['New', 'Collections'],
        subtitle: 'Shop the Hottest New Collections'
    }
];

export default async function Layout({bestSelling, hotDeals}: {
    bestSelling: ReactNode,
    hotDeals: ReactNode
}) {
    return (
        <>
            <header className='overflow-hidden h-screen bg-[#222222]'>
                <Header startWithWhite={false}/>
                <Slider details={sliderDetails}/>
            </header>
            <main className='bg-gradient-to-b from-white to-[#E4E4E4] overflow-x-hidden'>
                <MainCategories/>
                {hotDeals}
                {bestSelling}
            </main>
            <footer>
                <Footer/>
            </footer>
        </>
    );
}