import {ReactNode} from "react";
import PageLayout from "./PageLayout";

export default function Layout({children}: { children: ReactNode }) {
    return (
        <PageLayout>
            {children}
        </PageLayout>
    );
}