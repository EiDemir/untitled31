import {ReactNode} from "react";

export default function ProductLayout({children, authModal}: { children: ReactNode, authModal: ReactNode }) {
    return (
        <>
            {authModal}
            {children}
        </>
    );
}