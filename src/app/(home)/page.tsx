import dynamic from "next/dynamic";

const BestSellingProducts = dynamic(() => import('./BestSellingProducts'), {ssr: false})

export default function HomePage() {
    return (
        <BestSellingProducts/>
    )
}
