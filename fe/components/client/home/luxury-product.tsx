import { iProduct } from "@/components/product/interface";
import ProductHome from "@/components/product/product-home";
import {
  CarouselNext,
  CarouselPrevious,
  MainCarousel,
} from "@/components/ui/carousel";
import Link from "next/link";

const LuxuryProduct = ({ products }: { products: iProduct[] }) => {
  return (
    <section className="pb-7.5 relative lg:px-3.75">
      <div className=" lg:px-1.75 py-3.75 bg-collection1-bg rounded-sm">
        <div className="px-6 lg:px-3 flex items-center space-x-2.5 mb-3.75">
          <span className="relative flex size-3">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-f opacity-75"></span>
            <span className="relative inline-flex size-3 rounded-full bg-f"></span>
          </span>
          <Link
            href="#"
            className="text-[18px] lg:text-[24px] font-bold leading-4.5 lg:leading-7"
          >
            Đồ bếp nhập khẩu cao cấp
          </Link>
        </div>
        <MainCarousel
          action={
            <>
              <div className="absolute flex space-x-2.5 top-0 right-0 pr-7.5 pt-3.75 max-lg:hidden">
                <CarouselPrevious />
                <CarouselNext />
              </div>
            </>
          }
        >
          {products.map((v, i) => {
            return <ProductHome {...v} key={v.slug} />;
          })}
        </MainCarousel>
        <div className="flex text-[14px] mt-3.75 leading-4 justify-center">
          <Link
            href="/collections"
            className="py-3 px-1.25 flex space-x-4 justify-center rounded-sm items-center bg-white min-w-80"
          >
            <span> Xem tất cả</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              className="inline-block fill-black"
              viewBox="0 0 16 16"
            >
              <path
                fillRule="evenodd"
                d="M1 8a7 7 0 1 0 14 0A7 7 0 0 0 1 8m15 0A8 8 0 1 1 0 8a8 8 0 0 1 16 0M4.5 7.5a.5.5 0 0 0 0 1h5.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3a.5.5 0 0 0 0-.708l-3-3a.5.5 0 1 0-.708.708L10.293 7.5z"
              />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default LuxuryProduct;
