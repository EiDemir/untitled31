import React, {ReactNode} from "react";
import Footer from "@/components/Footer";
import Header from "@/components/Header";

export default async function Layout({children}: { children: ReactNode }) {

    return (
        <>
            <header>
                <Header startWithWhite={false}/>
            </header>
            <main className='pt-14'>
                {children}
            </main>
            <footer>
                <Footer/>
            </footer>
        </>
    );
}