import Register from "@/components/auth/Register";
import {redirect} from "next/navigation";
import getCurrentUser from "@/actions/getCurrentUser";

export default async function RegisterPage() {
    const session = await getCurrentUser();

    if (session) {
        redirect('/');
    }

    return <Register/>
}