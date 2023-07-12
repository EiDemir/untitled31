import {ReactNode} from "react";
import PageLayout from "./PageLayout";

export default function layout({children}: { children: ReactNode }) {
    return (
        <PageLayout>
            {children}
        </PageLayout>
    );
}