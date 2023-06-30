import Login from "@/components/auth/Login";
import {redirect} from "next/navigation";
import getCurrentUser from "@/actions/getCurrentUser";

export default async function LoginPage() {
    const session = await getCurrentUser();

    if (session) {
        redirect('/');
    }

    return (
        <Login/>
    );
}