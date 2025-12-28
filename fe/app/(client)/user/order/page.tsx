import { getOrders } from "@/service/order-service"
import DateFormat from "@/util/date"
import Link from "next/link"

export default async function OrderPage() {
    const data = await getOrders()
    return (
        <div className="overflow-x-auto">
            <table className="table-auto w-max lg:w-full">
                <thead>
                    <tr>
                        <th className="pl-3 pb-2">Mã số đơn hàng</th>
                        <th className="pl-3 pb-2">Ngày đặt</th>
                        <th className="pl-3 pb-2">Trạng thái vận chuyên</th>
                        <th className="pl-3 pb-2">Trạng thái thanh toán</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        data.map((v) => {
                            return (
                                <tr>
                                    <td className="pl-3 pb-2 text-center">
                                        <Link href={`/user/order/${v.orderId}` as any}>
                                            {v.orderId}
                                        </Link>
                                    </td>
                                    <td className="text-center pl-3 pb-2">{DateFormat(v.orderTime)}</td>
                                    <td className="text-center pl-3 pb-2">{v.status}</td>
                                    <td className="text-center pl-3 pb-2">{v.pay}</td>
                                </tr>
                            )
                        })
                    }
                </tbody>
            </table>
        </div>
    )
}