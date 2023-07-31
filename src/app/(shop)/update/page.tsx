import {redirect} from "next/navigation";

export default async function Page() {
    const response = await fetch('https://untitled32.vercel.app/api/update');

    redirect('/cart');
}