"use client";
import {
  CarouselNext,
  CarouselPrevious,
  MainCarousel,
} from "@/components/ui/carousel";
import { useState } from "react";

const ImageSection = () => {
  const [selected, setSelected] = useState(0);
  const length = 5;
  return (
    <>
      <div className="relative max-lg:hidden">
        <MainCarousel
          action={
            <>
              <div className="absolute left-10 top-1/2 -translate-y-1/2">
                <CarouselPrevious />
              </div>
              <div className="absolute right-10 top-1/2 -translate-y-1/2">
                <CarouselNext />
              </div>
            </>
          }
          onSected={setSelected}
        >
          {Array.from({ length: length }).map((v, i) => {
            return (
              <div
                key={i}
                className=" basis-full  grow-0 shrink-0 max-lg:pl-3.75  h-max cursor-pointer  "
              >
                <img
                  src={`/slide_${i + 1}_img.jpg`}
                  className="w-full max-lg:hidden object-cover h-auto"
                  alt=""
                  srcSet=""
                />
              </div>
            );
          })}
        </MainCarousel>
        <div className="absolute bottom-0 left-0 h-10 w-full flex items-end justify-center">
          <div className="flex gap-x-1.5">
            {Array.from({ length: length }).map((_, i) => {
              return (
                <div
                  key={i}
                  data-select={selected == i}
                  className="h-4 w-4 rounded-full data-[select=true]:bg-f border-3 data-[select=true]:border-f border-white"
                ></div>
              );
            })}
          </div>
        </div>
      </div>
      <div className="relative lg:hidden">
        <MainCarousel
          action={
            <>
              <div className="absolute left-0 top-1/2 -translate-y-1/2">
                <CarouselPrevious />
              </div>
              <div className="absolute right-0 top-1/2 -translate-y-1/2">
                <CarouselNext />
              </div>
            </>
          }
          onSected={setSelected}
        >
          {Array.from({ length: length }).map((v, i) => {
            return (
              <div
                key={i}
                className=" basis-full  grow-0 shrink-0  h-max cursor-pointer  "
              >
                <img
                  src={`/slide_${i + 1}_mb.jpg`}
                  className="w-full  object-cover h-auto"
                  alt=""
                  srcSet=""
                />
              </div>
            );
          })}
        </MainCarousel>
        <div className="absolute bottom-0 left-0 h-10 w-full flex items-end justify-center">
          <div className="flex gap-x-1.5">
            {Array.from({ length: length }).map((_, i) => {
              return (
                <div
                  key={i}
                  data-select={selected == i}
                  className="h-4 w-4 rounded-full data-[select=true]:bg-f border-3 data-[select=true]:border-f border-white"
                ></div>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
};

export default ImageSection;
