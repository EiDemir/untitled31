import {redirect} from "next/navigation";
import axios from "axios";

export const dynamic = 'force-dynamic';

export default async function Page() {
    axios.get('/api/update').then(() => {});

    redirect('/cart');
}