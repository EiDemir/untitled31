'use client';

import Login from "@/components/auth/Login";
import {useEffect} from "react";
import {useRouter} from "next/navigation";

export default function Modal() {
    const router = useRouter();

    useEffect(() => {
        router.refresh();
    }, []);

    return (
        <Login/>
    );
}