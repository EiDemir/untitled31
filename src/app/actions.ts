'use server';

import getCurrentUser from "@/actions/getCurrentUser";
import {revalidatePath} from "next/cache";
import {redirect} from "next/navigation";
import {prisma} from "@/libs/prisma";

const bcrypt = require('bcrypt');
const nodemailer = require('nodemailer');
const crypto = require('crypto');

const transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
        user: process.env.EMAIL_FROM,
        pass: process.env.EMAIL_PASSWORD
    }
});

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

    revalidatePath('/checkout');
    redirect('/checkout');
}

export async function addBillingAddress(data: FormData) {
    const user = await getCurrentUser();

    if (user) {
        await prisma.user.update({
            where: {
                id: user.id
            }, data: {
                billingAddress: {
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

    revalidatePath('/checkout');
    redirect('/checkout');
}

export async function addNewUser(data: FormData) {
    const [email, password, repPassword, name] =
        [data.get('email') as string, data.get('password') as string, data.get('repPassword') as string, data.get('name') as string];

    if (password !== repPassword)
        redirect('/auth/register?passwordsDontMatch=1');

    const user = await prisma.user.findUnique({
        where: {
            email: email
        }
    });

    if (user)
        redirect('/auth/register?alreadyExists=1');

    const hash = await bcrypt.hash(password, 10);

    const newUser = await prisma.user.create({
        data: {
            email,
            name,
            hashedPassword: hash,
            verificationToken: crypto.randomBytes(128).toString('hex')
        }, select: {
            verificationToken: true
        }
    });

    await transporter.sendMail({
        from: process.env.EMAIL_FROM,
        to: email,
        subject: 'Confirm Your Email',
        text: 'Please click the link below to confirm your email.',
        html: `<p>Please click <a href='https://untitled32.vercel.app/auth/verify-email?email=${email}&hash=${newUser.verificationToken}'>this link</a> below to confirm your email.</p>`
    });

    redirect('/auth/login?confirmEmail=1');
}