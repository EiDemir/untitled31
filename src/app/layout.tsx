import './globals.css';

import {Jost} from 'next/font/google'
import React, {ReactNode} from "react";
import {Toaster} from "react-hot-toast";
import AuthProvider from "@/providers/AuthProvider";
import CartProvider from "@/providers/CartProvider";

const jost = Jost({subsets: ['latin']});

export default function RootLayout({children}: { children: ReactNode }) {
    return (
        <html lang="en">
        <body className={`${jost.className}`}>
            <CartProvider>
                <AuthProvider>
                    {children}
                </AuthProvider>
            </CartProvider>
            <Toaster position='bottom-right'/>
        </body>
        </html>
    );
}
