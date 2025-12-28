import InventoryItem from "@/components/route/admin/warehouse/inventory/inventory-item";
import Pagination from "@/components/ui-custom/pagination";
import { Button } from "@/components/ui/button";
import { getInventoryAdmin } from "@/service/admin/inventory-service";
import priceFormat from "@/util/price-format";
import { SquarePen } from "lucide-react";
import Link from "next/link";

export default async function WarehouseProductPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | undefined }>;
}) {
  const curPage = parseInt((await searchParams).page || "1");
  const inventoryName = (await searchParams).inventoryName || "";
  const onSale = (await searchParams).onSale || "";
  const brandId = (await searchParams).brandId || "all";

  const data = await getInventoryAdmin({
    brandId: brandId,
    curPage: curPage,
    onSale: onSale,
    inventoryName: inventoryName,
  });
  const items = data.data;
  const totalPage = data.totalPage;

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
          {items.map((p) => {
            return <InventoryItem {...p} key={p.productVariantId} />;
          })}
        </tbody>
      </table>
      <div className="mt-7">
        <Pagination
          page={curPage}
          total={totalPage}
          url={`/admin/warehouse/inventory?curpage=${curPage}&inventoryName=${inventoryName}&onSale=${onSale}&brandId=${brandId}`}
        />
      </div>
    </div>
  );
}
