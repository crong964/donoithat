import ActionInventoryHeader from "@/components/admin/warehouse/inventory/action-inventory-header";
import InventoryHearderLayout from "@/components/admin/warehouse/inventory/inventory-hearder-layout";
import { getAllBrand } from "@/service/admin/brand-service";

export default async function InventoryLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const da = await getAllBrand();

  return (
    <>
      <InventoryHearderLayout />
      <ActionInventoryHeader ls={da} />
      {children}
    </>
  );
}
