'use client';

import axios from "axios";
import {useEffect} from "react";

export default function Page() {
    useEffect(() => {
        axios.get('/api/update').then();
    }, []);

    return <div>yo</div>;
}