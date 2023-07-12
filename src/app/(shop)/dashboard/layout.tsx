import {redirect} from "next/navigation";
import {ReactNode} from "react";
import Dashboard from "./Dashboard";
import getCurrentUser from "@/actions/getCurrentUser";

export default async function Layout({children}: { children: ReactNode }) {
    const session = await getCurrentUser();

    if (!session) {
        redirect('/auth/login');
    }

    return (
        <Dashboard>
            {children}
        </Dashboard>
    );
}