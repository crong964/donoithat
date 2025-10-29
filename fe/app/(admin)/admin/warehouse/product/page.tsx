import { getInventoryAdmin } from "@/service/admin/inventory-service"
import priceFormat from "@/util/price-format"

export default async function WarehouseProductPage() {
    const data = await getInventoryAdmin()
    const items = data.data
    return (
        <div className="p-2">
            <table className="table-auto w-full text-[13px] text-black!">
                <thead className=" ">
                    <tr className="">
                        <th className="text-center pb-2 w-50">Hàng lên kệ</th>
                        <th className="text-center pb-2 w-100">Sản phẩm</th>
                        <th className="text-center pb-2">Hãng</th>
                        <th className=" pb-2">Đơn giá</th>
                        <th className=" pb-2">Số lượng</th>
                        <th className=" pb-2 text-right">Thao tác</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        items.map((p) => {
                            return (
                                <tr className="">
                                    <td className="text-center pb-2 w-50">{p.show}</td>
                                    <td className=" pb-2 w-100">
                                        <div className="flex items-center gap-4">
                                            <img className="w-20 border border-boder h-auto"
                                                src={p.image} alt={p.productVariantName} srcSet="" />
                                            <p>{p.productVariantName}</p>
                                        </div>
                                    </td>
                                    <td className="text-center pb-2">{p.brandName}</td>
                                    <td className="text-center pb-2">{priceFormat(p.price + "")}</td>
                                    <td className="text-center pb-2">{p.quality}</td>
                                    <td className="text-center pb-2 text-right">Thao tác</td>
                                </tr>
                            )
                        })
                    }

                </tbody>
            </table>
        </div>
    )
}