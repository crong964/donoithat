import ProtectAction from "@/components/permission/protect-action";
import EditProductPage from "@/components/route/admin/product/edit-product";
import { getProductBySlug } from "@/service/admin/product-service";

export default async function ProductDetailAdminPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const data = await getProductBySlug((await params).slug);
  if (data == undefined) {
    return <></>;
  }

  return (
    <ProtectAction permission="product.update">
      <EditProductPage {...data} />
    </ProtectAction>
  );
}
