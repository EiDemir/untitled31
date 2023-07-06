import {ReactNode, Suspense} from "react";
import CategoryLoading from "./CategoryLoading";

export default function Template({children}: {
    children: ReactNode
}) {
    return (
        <Suspense fallback={<CategoryLoading/>}>
            {children}
        </Suspense>
    );
}