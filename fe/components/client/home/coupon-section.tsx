import Coupon from "@/components/coupon/coupon";
import { MainCarousel } from "@/components/ui/carousel";
import React from "react";

const CouponSection = () => {
  return (
    <section className="pb-10 lg:pb-17.5 ">
      <MainCarousel>
        {Array.from({ length: 4 }).map((v, i) => {
          return (
            <div
              key={i}
              className="basis-11/12 grow-0 shrink-0 lg:basis-1/4 px-1.75 "
            >
              <Coupon />
            </div>
          );
        })}
      </MainCarousel>
    </section>
  );
};

export default CouponSection;
