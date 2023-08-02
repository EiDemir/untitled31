import Addresses from "./Addresses";

export default function Page({searchParams}: {
    searchParams: {
        addNewShippingAddress?: string,
        addNewBillingAddress?: string
    }
}) {
    return (
        <Addresses searchParams={searchParams}/>
    );
}