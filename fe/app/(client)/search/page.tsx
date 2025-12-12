import ProductItem from "@/components/product/product-item";
import Pagination from "@/components/ui-custom/panination";
import { getProduct, searchProduct } from "@/service/product-service";
import { redirect } from "next/navigation";

export default async function SearchPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | undefined }>;
}) {
  const title = (await searchParams).title;
  const page = (await searchParams).page;
  if (title == undefined) {
    return <></>;
  }
  const data = await searchProduct(title, page);

  if (data == undefined) {
    redirect("/");
  }
  return (
    <>
      <div className="my-5">
        <h1 className="text-center font-bold text-f text-3xl">Tìm kiếm</h1>
        <p className="text-center text-sm">
          Có <span className="font-bold">{data.totalItem} sản phẩm</span> cho
          tìm kiếm
        </p>
        <p className="mb-7.5 mt-6"></p>
      </div>
      <div className="flex justify-center flex-wrap px-36">
        {data.productModels.map((v) => {
          return <ProductItem {...v} key={v.slug} />;
        })}
      </div>
      <div>
        <Pagination
          page={parseInt(page || "1")}
          total={data.totalPage}
          url={`search?title=${title}`}
        />
      </div>
    </>
  );
}
