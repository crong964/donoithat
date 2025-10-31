import Pagination from "@/components/ui-custom/panination"
import { getInventoryAdmin } from "@/service/admin/inventory-service"
import priceFormat from "@/util/price-format"

export default async function WarehouseProductPage(
    { searchParams }: { searchParams: Promise<{ [key: string]: string | undefined }> }
) {
    const curPage = parseInt((await searchParams).page || "1")
    const inventoryName = (await searchParams).inventoryName || ""
    const onSale = (await searchParams).onSale || ""
    const brandId = (await searchParams).brandId || "all"

    const data = await getInventoryAdmin({
        brandId: brandId,
        curPage: curPage,
        onSale: onSale,
        inventoryName: inventoryName
    })
    const items = data.data
    const totalPage = data.totalPage


    return (
        <div className="p-2">
            <table className="table-auto w-full text-[13px] text-black!">
                <thead className=" ">
                    <tr className="">
                        <th className="text-center pb-2 w-30">Hàng lên kệ</th>
                        <th className="text-center pb-2 w-100">Sản phẩm</th>
                        <th className="text-center pb-2">Hãng</th>
                        <th className=" pb-2">Đơn giá</th>
                        <th className=" pb-2">Số lượng</th>
                        <th className=" pb-2 ">Thao tác</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        items.map((p) => {
                            return (
                                <tr key={p.productVariantId} className="">
                                    <td className="text-center pb-2 ">
                                        <span data-show={p.onSale} className="px-3 rounded-2xl py-1.5 data-[show=false]:bg-red-600 data-[show=true]:bg-green-600 text-white">
                                            {p.onSale == "true" ? "Đang bán" : "Chưa bán"}
                                        </span>
                                    </td>
                                    <td className=" pb-2">
                                        <div className="flex items-center gap-4">
                                            <img className="w-20 border border-boder h-auto"
                                                src={p.image} alt={p.productVariantName} srcSet="" />
                                            <p>{p.productVariantName}</p>
                                        </div>
                                    </td>
                                    <td className="text-center pb-2">{p.brandName}</td>
                                    <td className="text-center pb-2">{priceFormat(p.price + "")}</td>
                                    <td className="text-center pb-2">{p.quality}</td>
                                    <td className="text-center pb-2 ">Thao tác</td>
                                </tr>
                            )
                        })
                    }

                </tbody>
            </table>
            <div className="mt-7">
                <Pagination page={curPage}
                    total={totalPage}
                    url={`/admin/warehouse/inventory?curpage=${curPage}&inventoryName=${inventoryName}&onSale=${onSale}&brandId=${brandId}`} />
            </div>
        </div>
    )
}