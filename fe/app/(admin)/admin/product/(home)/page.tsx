import ProductHomeAdmin from "@/components/product/product-home-admin";
import Pagination from "@/components/ui-custom/pagination";
import { getProduct } from "@/service/admin/product-service";

export default async function ProductHomePage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | undefined }>;
}) {
  const slug = (await searchParams).slug;
  const page = (await searchParams).page;
  const product = await getProduct({ slug: slug || "all", page: page });
  if (product == null) {
    return <></>;
  }
  const items = product.productModels;
  return (
    <section className="p-7 relative">
      <div className="min-h-100 overflow-x-auto">
        <table className="table-auto w-full text-[13px] text-black!">
          <thead className=" ">
            <tr className="">
              <th className="text-center pb-2 w-50">Tình trạng</th>
              <th className="text-center pb-2 w-100">Sản phẩm</th>
              <th className="text-center pb-2">Danh mục</th>
              <th className=" pb-2">Đơn giá</th>
              <th className=" pb-2">Số lượng</th>
              <th className=" pb-2 text-right">Thao tác</th>
            </tr>
          </thead>
          <tbody>
            {items.map((p) => {
              return <ProductHomeAdmin {...p} key={p.slug} />;
            })}
          </tbody>
        </table>
      </div>
      <div>
        <Pagination
          page={parseInt(page || "1")}
          total={product.totalPage}
          url={`/admin/product?slug=${slug || "all"}`}
        />
      </div>
    </section>
  );
}
