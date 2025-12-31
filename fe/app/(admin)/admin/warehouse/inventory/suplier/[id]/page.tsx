import CreateInventoryOrderAdmin from "@/components/inventory/create-inventory-order-admin";
import BackButton from "@/components/ui-custom/back-button";
import { getInventoryAndSupliersAdmin } from "@/service/admin/inventory-service";
import { redirect } from "next/navigation";

export default async function ProvideInventoryDetail({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const id = (await params).id;
  const data = await getInventoryAndSupliersAdmin(id);
  if (!data) {
    redirect("/admin/warehouse/inventory");
  }
  const product = data.inventory;
  const supliers = data.supliers;
  return (
    <div className="p-3">
      <div className="mb-3">
        <BackButton />
      </div>
      <h2 className="text-2xl font-bold mb-3">Chi tiết sản phẩm</h2>
      <div className="flex gap-4">
        <img
          className="size-30 border object-cover border-boder"
          src={product.image}
          alt={product.productVariantName}
          srcSet=""
        />
        <div>
          <div className="flex gap-3">
            <p className="">Tên sản phẩm:</p>
            <p className="font-bold">{product.productVariantName}</p>
          </div>
          <div className="flex gap-3">
            <p className="">Tên sản phẩm:</p>
            <p className="font-bold">{product.quality}</p>
          </div>
        </div>
      </div>
      <h2 className="text-2xl font-bold my-6">Nhà cung cấp</h2>
      <table className="table-auto w-max lg:w-full text-left">
        <tr className="text-sm">
          <th className="w-1/5 text-center">Tên</th>
          <th className="w-1/5">Địa chỉ</th>
          <th className="w-1/5">Số điện thoại</th>
          <th className="w-1/5">Email</th>
          <th>Giá nhập</th>
          <th></th>
        </tr>
        {supliers.map((suplier) => {
          return (
            <CreateInventoryOrderAdmin
              key={suplier.suplierId}
              {...suplier}
              inventoryId={id}
            />
          );
        })}
      </table>
    </div>
  );
}
