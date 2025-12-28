import CategoryCombobox from "@/components/route/admin/category/category-combo-box";
import { Button } from "@/components/ui/button";
import { getCategoryInProduct } from "@/service/admin/category-service";
import { Plus } from "lucide-react";
import Link from "next/link";

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  const cate = await getCategoryInProduct();
  return (
    <>
      <div className="p-3.75">
        <h1 className="text-2xl font-bold mb-3">Danh sách sản phẩm</h1>
        <Link href={"/admin/product/add"}>
          <Button variant={"blue"}>
            <Plus />
            Tạo sản phẩm
          </Button>
        </Link>
      </div>
      <CategoryCombobox ls={cate} />
      {children}
    </>
  );
}
