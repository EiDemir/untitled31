import {redirect} from "next/navigation";
import axios from "axios";

export default async function Page() {
    axios.get('/api/update').then(() => {});

    redirect('/cart');
}