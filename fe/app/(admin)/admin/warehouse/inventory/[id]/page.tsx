import EditInventory from "@/components/route/admin/warehouse/inventory/edit-inventory";
import { getAllBrand } from "@/service/admin/brand-service";
import { getInventoryByIdAdmin } from "@/service/admin/inventory-service";
import { redirect } from "next/navigation";

export default async function InventoryDetail({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const id = (await params).id;
  const data = await getInventoryByIdAdmin(id);
  const brand = await getAllBrand();
  if (data == undefined) {
    redirect("/admin/warehouse/");
  }
  return <EditInventory data={data} ls={brand} />;
}
