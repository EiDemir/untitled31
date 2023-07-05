import React, {ReactNode} from "react";
import Footer from "@/components/Footer";
import Header from "@/components/Header";

export default async function ShopLayout({children}: { children: ReactNode }) {

    return (
        <>
            <header>
                <Header startWithWhite={false}/>
            </header>
            <main className='mt-14'>
                {children}
            </main>
            <footer>
                <Footer/>
            </footer>
        </>
    );
}