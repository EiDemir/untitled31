import {ReactNode} from "react";

export default function Layout({children, authModal}: { children: ReactNode, authModal: ReactNode }) {
    return (
        <>
            {authModal}
            {children}
        </>
    );
}