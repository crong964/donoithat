import { iProduct } from "@/components/product/interface";
import ProductHome from "@/components/product/product-home";
import {
  CarouselNext,
  CarouselPrevious,
  MainCarousel,
} from "@/components/ui/carousel";
import Link from "next/link";
import React from "react";

const PromotionSection = ({ products }: { products: iProduct[] }) => {
  return (
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
        {products.map((v, i) => {
          return <ProductHome {...v} key={v.slug} />;
        })}
      </MainCarousel>
    </section>
  );
};

export default PromotionSection;
