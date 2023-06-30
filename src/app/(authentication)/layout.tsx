import React, {ReactNode} from "react";
import Header from "@/components/Header";

export default async function ShopLayout({children}: { children: ReactNode }) {

    return (
        <div className='h-screen'>
            <header>
                <Header startWithWhite={false}/>
            </header>
            <main className='h-screen pt-48'>
                {children}
            </main>
        </div>
    );
}