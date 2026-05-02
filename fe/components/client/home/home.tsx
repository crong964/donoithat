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
import CategorySection from "./category-section";
import NewProductSection from "./new-product-section";
import PromotionSection from "./promotion-section";

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
      <CategorySection />
      <LuxuryProduct products={product} />
      <CouponSection />
      <PromotionSection products={product} />
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
      <NewProductSection products={product} />
    </>
  );
}
