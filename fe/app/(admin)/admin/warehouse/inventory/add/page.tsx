import AddInventory from "@/components/route/admin/warehouse/inventory/add-inventory";
import { Select } from "@/components/ui/select";
import { getAllBrand } from "@/service/admin/brand-service";
import Form from "next/form";

export default async function InventoryAddPage() {
  const da = await getAllBrand();
  return (
    <>
      <AddInventory ls={da}></AddInventory>
    </>
  );
}
