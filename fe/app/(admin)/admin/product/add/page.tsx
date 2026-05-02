import ProtectAction from "@/components/permission/protect-action";
import AddProduct from "@/components/admin/product/add-product";

export default async function AddPage() {
  return (
    <ProtectAction permission="product.add">
      <AddProduct />
    </ProtectAction>
  );
}
