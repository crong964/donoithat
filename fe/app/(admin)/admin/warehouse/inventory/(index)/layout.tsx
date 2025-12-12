import ActionInventoryHeader from "@/components/route/admin/warehouse/inventory/action-inventory-header";
import { getBrand } from "@/service/admin/brand-service";

export default async function InventoryLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const da = await getBrand();
  return (
    <>
      <div className="p-3.75">
        <h1 className="text-4xl font-bold">Hàng tồn kho</h1>
      </div>
      <ActionInventoryHeader ls={da} />
      {children}
    </>
  );
}
