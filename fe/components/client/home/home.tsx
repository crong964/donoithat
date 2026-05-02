import { iMainCateGory } from "@/components/category/interface";
import Coupon from "@/components/coupon/coupon";
import { iGetProduct } from "@/components/product/interface";
import ProductHome from "@/components/product/product-home";
import ProductItem from "@/components/product/product-item";
import {
  CarouselNext,
  CarouselPrevious,
  MainCarousel,
} from "@/components/ui/carousel";
import Link from "next/link";
import LuxuryProduct from "./luxury-product";
import CouponSection from "./coupon-section";
import ImageSection from "./image-section";

export default function Home(data: {
  products: iGetProduct;
  categories: iMainCateGory[];
}) {
  if (data == null || data.products == null) {
    return <></>;
  }
  const product = data.products.productModels;
  return (
    <>
      <ImageSection />
      <section className="mt-7.5 pb-17.5 px-3.75">
        <MainCarousel>
          {Array.from({ length: 4 }).map((v, i) => {
            return (
              <div
                key={i}
                className="group basis-9/13 lg:basis-1/4  grow-0  shrink-0 px-2 h-max cursor-pointer relative "
              >
                <div className=" overflow-hidden h-50 rounded-sm">
                  <img
                    src={`/categorybanner_${i + 1}_img.jpg`}
                    className="w-full h-full object-cover transform  group-hover:scale-110 duration-500 "
                    alt=""
                    srcSet=""
                  />
                </div>
                <div className="w-full pointer-events-none  z-0 absolute bottom-0   left-0 px-5 py-2.5">
                  <div className="text-center text-[18px] leading-5  font-bold text-f">
                    Phòng khách
                  </div>
                  <div className="text-center">xem ngay</div>
                </div>
              </div>
            );
          })}
        </MainCarousel>
      </section>
      <LuxuryProduct products={product} />
      <CouponSection />
      <section className="lg:px-3.75 pb-17.5 relative">
        <div className="mb-5 max-lg:px-3.75">
          <h2 className="text-[18px] lg:text-[24px] font-bold leading-7.25 text-f">
            <Link href="#">Back To School - Up To 60%</Link>
          </h2>
        </div>
        <MainCarousel
          action={
            <>
              <div className="absolute top-0 right-0 pr-3 flex space-x-2 lg:space-x-2.5 ">
                <CarouselPrevious />
                <CarouselNext />
              </div>
            </>
          }
        >
          {product.map((v, i) => {
            return <ProductHome {...v} key={v.slug} />;
          })}
        </MainCarousel>
      </section>
      <section className="pb-17.5">
        <div className="px-3.75 min-h-40">
          <div
            style={{
              backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url("/categorize_img.jpg")`,
            }}
            className="w-full bg-contain lg:px-5 py-1.75 flex items-center "
          >
            <div className="px-3.75 basis-1/6 max-lg:hidden">
              <div className="text-white flex-col flex items-end">
                <p className="text-[18px] leading-6.25 font-semibold mb-2">
                  Xu hướng tìm kiếm
                </p>
                <div>
                  <Link
                    style={{ lineHeight: "normal" }}
                    className="uppercase text-[13px] font-medium py-1.25 px-3.75 rounded-2xl bg-f"
                    href="/"
                  >
                    xem ngay
                  </Link>
                </div>
              </div>
            </div>
            <div className="lg:basis-5/6 overflow-x-hidden">
              <div className="lg:px-3.75  lg:mx-3.75">
                <MainCarousel className="flex justify-between list-none">
                  {data.categories.map((_, i) => {
                    return (
                      <li
                        key={_.slug}
                        className=" max-lg:basis-1/3 my-2 basis-33 grow-0 shrink-0"
                      >
                        <Link
                          href={`/collections/${_.slug}`}
                          className="flex cursor-pointer flex-col justify-around items-center px-3.75"
                        >
                          <picture className="mx-1.25">
                            <figure className="bg-white hover:shadow-cate-hover duration-500 rounded-full p-1">
                              <img
                                src={_.categoryImage}
                                className="aspect-square object-cover rounded-full"
                                alt={_.nameCategory}
                                srcSet=""
                              />
                            </figure>
                          </picture>
                          <div className=" text-white my-3.5">
                            <p className="text-sm text-center">
                              {_.nameCategory}
                            </p>
                          </div>
                        </Link>
                      </li>
                    );
                  })}
                </MainCarousel>
              </div>
            </div>
          </div>
        </div>
      </section>
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
              {product
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
    </>
  );
}
