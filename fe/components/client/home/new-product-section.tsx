import { iProduct } from "@/components/product/interface";
import ProductItem from "@/components/product/product-item";
import Link from "next/link";

const NewProductSection = ({ products }: { products: iProduct[] }) => {
  return (
    <section className="lg:px-3.75 pb-17.5">
      <div className="flex max-lg:flex-col justify-between lg:items-center mb-5">
        <div className="max-lg:mb-3.5">
          <h1 className="text-[24px] leading-7.25 font-bold text-f">
            Sản phẩm nổi bật
          </h1>
        </div>
        <div className="">
          <ul className=" font-bold h-auto flex items-center">
            <li>
              <Link
                href="#"
                className="px-4 py-2.5 text-[14px] leading-5  rounded-full border text-white bg-f"
              >
                Sản phẩm mới
              </Link>
            </li>
            <li>
              <Link
                href="#"
                className="px-4 py-2.5 text-[14px] leading-5 rounded-full text-[#787878] border border-[#eae4e8] ml-5"
              >
                Sofa New Arrival
              </Link>
            </li>
          </ul>
        </div>
      </div>
      <div className="flex flex-wrap ">
        <div className="max-lg:hidden basis-1/5 min-h-[650px] pb-2">
          <img
            src="/home_coll_1_banner.jpg"
            className="w-full  object-cover h-full"
            alt=""
            srcSet=""
          />
        </div>
        <div className=" lg:basis-4/5  ">
          <div className="flex flex-wrap h-full ">
            {products
              .filter((_, i) => {
                return i < 10;
              })
              .map((v, i) => {
                return <ProductItem key={v.slug} {...v}></ProductItem>;
              })}
          </div>
        </div>
      </div>
      <div className="mt-6.25 text-center">
        <Link
          href="/collections"
          className="px-6.25 py-2.5 tracking-wider border text-center text-f border-f text-sm hover:text-white rounded-sm hover:bg-f "
        >
          Xem tất cả <strong>Sản phẩm mới </strong>
        </Link>
      </div>
    </section>
  );
};

export default NewProductSection;
