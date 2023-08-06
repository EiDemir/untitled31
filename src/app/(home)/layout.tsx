import React, {ReactNode} from "react";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import Slider from "./Slider";
import MainCategories from "./MainCategories";
import slide1 from '../../../public/slide1.jpg';

const sliderDetails = [
    {
        imageLink: slide1,
        date: 'summer 2023',
        title: 'hello new season',
        subtitle: 'limited time offer - up to 60% off & free shipping'
    },
    {
        imageLink: slide1,
        date: 'summer 2023',
        title: 'hello new season',
        subtitle: 'limited time offer - up to 60% off & free shipping'
    },
    {
        imageLink: slide1,
        date: 'summer 2023',
        title: 'hello new season',
        subtitle: 'limited time offer - up to 60% off & free shipping'
    },
    {
        imageLink: slide1,
        date: 'summer 2023',
        title: 'hello new season',
        subtitle: 'limited time offer - up to 60% off & free shipping'
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
            <main>
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