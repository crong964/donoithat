import OrderLink from "@/components/route/admin/home/order-link";
import { getOrderStatus } from "@/service/admin/order-service";

export default async function OrderHomeLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    const data = await getOrderStatus()
   
    
    return (
        <>
            <OrderLink ls={data}></OrderLink>
            {children}
        </>
    )
}