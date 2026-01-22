import ProtectAction from "@/components/permission/protect-action";
import AddProduct from "@/components/route/admin/product/add-product";

export default async function AddPage() {
  return (
    <ProtectAction permission="product.add">
      <AddProduct />
    </ProtectAction>
  );
}
