import ActionInventoryHeader from "@/components/route/admin/warehouse/inventory/action-inventory-header";
import { Button } from "@/components/ui/button";
import { getAllBrand } from "@/service/admin/brand-service";
import { Plus } from "lucide-react";
import Link from "next/link";

export default async function InventoryLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const da = await getAllBrand();
  return (
    <>
      <div className="p-3.75">
        <h1 className="text-2xl font-bold mb-3">Hàng tồn kho</h1>
        <Link href={"/admin/warehouse/inventory/add"}>
          <Button variant={"blue"}>
            <Plus />
            Thêm sản phẩm
          </Button>
        </Link>
      </div>
      <ActionInventoryHeader ls={da} />
      {children}
    </>
  );
}
