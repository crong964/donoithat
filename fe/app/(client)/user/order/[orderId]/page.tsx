import { getOrderById } from "@/service/order-service"
import DateFormat from "@/util/Date"
import PriceFormat from "@/util/price-format"
import Link from "next/link"
import { notFound } from "next/navigation"

export default async function OrderDetailPage({
    params,
}: {
    params: Promise<{ orderId: string }>
}) {
    const orderId = (await params).orderId
    const data = await getOrderById(orderId)
    if (data == undefined) {
        return notFound()
    }
    const order = data.order;
    const items = data.orderDetails
    const tottal = data.orderDetails.reduce((pre, cur) => {
        return pre + cur.price * cur.quality
    }, 0)
    return (
        <div className="pl-3.75">
            <h1 className="mb-3.75 text-2xl">
                Chi tiết đơn hàng
            </h1>
            <div className="space-y-3.5 mb-3.75">
                <p>Mã đơn hàng: {order.orderId}</p>
                <p>Ngày đặt: {DateFormat(order.orderTime)}</p>
                <p>Trạng thái thanh toán: {order.pay}</p>
                <p>Trạng thái giao hàng: {order.status}</p>
            </div>
            <div className="border-2 border-black p-4">
                <table className="table-auto w-full ">
                    <thead>
                        <tr>
                            <th className="text-center pb-2 w-2/5">Sản phẩm</th>
                            <th className=" pb-2">Mã sản phẩm</th>
                            <th className=" pb-2">Đơn giá</th>
                            <th className=" pb-2">Số lượng</th>
                            <th className=" pb-2 text-right">Thành tiền</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            items.map((p) => {
                                return (
                                    <tr>
                                        <td className="pb-3.75">
                                            <div className="flex h-full">
                                                <div className="basis-20 ">
                                                    <img className="min-w-20 border border-boder h-auto"
                                                        src={p.image} alt={p.variantName} srcSet="" />
                                                </div>
                                                <div className="flex-1 h-full">
                                                    <div className="grid grid-cols-1 h-full content-between gap-4 px-4.5">
                                                        <h3 className="text-[15px] max-md:line-clamp-1 leading-4.5 ">
                                                            {p.productName}
                                                        </h3>
                                                        <h4 className="text-[15px] text-[#777] max-md:line-clamp-1 leading-4.25 ">
                                                            {p.variantName}
                                                        </h4>
                                                    </div>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="text-center pb-3.75">
                                            {p.productVariantId}
                                        </td>
                                        <td className="text-center pb-3.75">
                                            {PriceFormat((p.price / 100) + "")}₫
                                        </td>
                                        <td className="text-center pb-3.75">
                                            {p.quality}
                                        </td>
                                        <td className="text-right pb-3.75">
                                            {PriceFormat((p.price * p.quality / 100) + "")}₫
                                        </td>
                                    </tr>
                                )
                            })
                        }
                        <tr>
                            <td colSpan={3} className="pt-3.75">
                                <p className="font-bold">
                                    Giá sản phẩm
                                </p>
                            </td>
                            <td colSpan={2} className="pt-3.75">
                                <p className="text-right">
                                    {PriceFormat(tottal / 100 + "")}
                                </p>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>


        </div>
    )
}