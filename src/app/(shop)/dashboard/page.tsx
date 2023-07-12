import Link from "next/link";

export default async function Page() {
    return (
        <div className='text-[#222222] w-full'>
            <p>
                From your account dashboard you can view your <Link className='underline' href='/dashboard/orders'>recent orders</Link>, <Link
                className='underline' href='/dashboard/addresses'>manage your shipping and billing addresses</Link>,
                and <Link className='underline' href='/dashboard/account-details'>edit your password and account details</Link>.
            </p>
        </div>
    );
}