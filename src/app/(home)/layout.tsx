import React, {ReactNode} from "react";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import Slider from "@/app/(home)/Slider";
import slide1 from "../../../public/slide1.webp";
import slide2 from "../../../public/slide2.webp";
import slide3 from "../../../public/slide3.webp";
import slide4 from "../../../public/slide4.webp";

const sliderDetails = [
    {
        imageLink: slide1,
        date: 'summer 2023',
        title: 'hello new season',
        subtitle: 'limited time offer - up to 60% off & free shipping'
    },
    {
        imageLink: slide2,
        date: 'summer 2023',
        title: 'hello new season',
        subtitle: 'limited time offer - up to 60% off & free shipping'
    },
    {
        imageLink: slide3,
        date: 'summer 2023',
        title: 'hello new season',
        subtitle: 'limited time offer - up to 60% off & free shipping'
    },
    {
        imageLink: slide4,
        date: 'summer 2023',
        title: 'hello new season',
        subtitle: 'limited time offer - up to 60% off & free shipping'
    }
];

export default async function Layout({bestSelling, mainCategories}: { bestSelling: ReactNode, mainCategories: ReactNode }) {
    return (
        <>
            <header className='overflow-hidden h-screen bg-[#222222]'>
                <Header startWithWhite={true}/>
                <Slider details={sliderDetails}/>
            </header>
            <main>
                {bestSelling}
                {mainCategories}
            </main>
            <footer>
                <Footer/>
            </footer>
        </>
    );
}