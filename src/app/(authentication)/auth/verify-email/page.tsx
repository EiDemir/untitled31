import {notFound, redirect} from "next/navigation";
import {prisma} from "@/libs/prisma";

export default async function Page({searchParams}: {
    searchParams: {
        email?: string,
        hash?: string
    }
}) {
    if (!searchParams.hash || !searchParams.email)
        return notFound();

    const user = await prisma.user.findUnique({
        where: {
            email: searchParams.email,
            verificationToken: searchParams.hash
        }
    });

    if (!user)
        notFound();

    await prisma.user.update({
        where: {
            email: searchParams.email
        }, data: {
            emailVerified: new Date(),
            verificationToken: null
        }
    });

    redirect('/auth/login?emailVerified=1');
}