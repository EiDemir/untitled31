import {prisma} from "@/libs/prisma";
import getCurrentUser from "@/actions/getCurrentUser";
import _ from 'lodash';

async function getUserOrders(userEmail: string) {
    try {
        const data = await prisma.user.findUnique({
            where: {
                email: userEmail
            }, select: {
                orders: true
            }
        });
        return data!.orders;
    } catch (e: any) {
        return null;
    }
}

export default async function Page() {
    const user = await getCurrentUser();
    const orders = await getUserOrders(user!.email);

    const content = orders && orders?.length !== 0 ?
        <table className='rounded-3xl table-auto text-sm w-full ring-1 ring-[#E4E4E4] ring-inset'>
            <thead className='bg-[#E4E4E4]'>
            <tr className='font-medium'>
                <th className='py-4 px-7 text-start rounded-l-3xl'>ORDER</th>
                <th className='py-4 px-7 text-start'>DATE</th>
                <th className='py-4 px-7 text-start'>STATUS</th>
                <th className='py-4 px-7 text-start'>TOTAL</th>
                <th className='py-4 px-7 text-start rounded-r-3xl'>ACTIONS</th>
            </tr>
            </thead>
            <tbody className='divide-y divide-[#E4E4E4]'>
            {orders.map(order => {
                const totalItems = _.reduce(order.items, (prev, curr) => prev + curr.quantity, 0);
                const totalPrice = _.reduce(order.items, (prev, curr) => prev + curr.quantity * curr.price, 0);
                return (
                    <tr key={order.id}>
                        <td className='p-7'>#{order.id}</td>
                        <td className='p-7'>{order.date.toLocaleDateString('en-US', {
                            month: 'long',
                            day: '2-digit',
                            year: 'numeric'
                        })}</td>
                        <td className='p-7 capitalize'>{order.status}</td>
                        <td className='p-7'>${totalPrice} for {totalItems} items</td>
                        <td className='p-7'>
                            <button className='bg-black text-white w-full px-5 py-4 font-medium rounded-full'>VIEW
                            </button>
                        </td>
                    </tr>
                )
            })}
            </tbody>
        </table> : <div className='text-2xl h-full flex items-center justify-center'>
            You have no previous order.
        </div>;

    return (
        <>
            {content}
        </>
    );
}