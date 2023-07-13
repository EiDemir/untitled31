'use server';

import getCurrentUser from "@/actions/getCurrentUser";
import {prisma} from "@/libs/prisma";
import {redirect} from "next/navigation";
import {cookies} from "next/headers";

export async function addShippingAddress(data: FormData) {
    const user = await getCurrentUser();

    if (user) {
        await prisma.user.update({
            where: {
                id: user.id
            }, data: {
                shippingAddress: {
                    push: {
                        firstName: data.get('firstName') as string,
                        lastName: data.get('lastName') as string,
                        country: data.get('country') as string,
                        companyName: data.get('companyName') ? data.get('companyName') as string : null,
                        streetAddress: data.get('streetAddress') as string,
                        townOrCity: data.get('townOrCity') as string,
                        postalCode: data.get('postalCode') as string,
                        stateOrProvince: data.get('stateOrProvince') as string,
                        phoneNumber: data.get('phoneNumber') as string
                    }
                }
            }
        });
    }

    redirect('/checkout');
}