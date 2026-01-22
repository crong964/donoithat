import ProtectAction from "@/components/permission/protect-action";
import CategoryCombobox from "@/components/route/admin/category/category-combo-box";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { getCategoryInProduct } from "@/service/admin/category-service";
import { Plus } from "lucide-react";
import Form from "next/form";
import Link from "next/link";

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  const cate = await getCategoryInProduct();
  return (
    <ProtectAction permission="product.view">
      <div className="p-3.75">
        <h1 className="text-2xl font-bold mb-3">Danh sách sản phẩm</h1>
        <div className="flex justify-end">
          <ProtectAction permission="product.add">
            <Link href={"/admin/product/add"}>
              <Button variant={"blue"}>
                <Plus />
                Tạo sản phẩm
              </Button>
            </Link>
          </ProtectAction>
        </div>
      </div>
      <div className="px-2 space-y-3">
        <CategoryCombobox ls={cate} />
        <Form action={"/admin/product"} className="flex gap-x-3">
          <Input name="nameProduct" className="bg-white" placeholder="Tên sản phẩm" />
          <Button>Tìm kiếm</Button>
        </Form>
      </div>
      {children}
    </ProtectAction>
  );
}
