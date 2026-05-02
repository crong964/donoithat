"use client";
import { useDispatch, useSelector } from "react-redux";
import { IProductVariant } from "@/components/admin/product/interface";
import { JSX, memo, useMemo, useState } from "react";

import { RootState } from "@/redux/admin/reduxRoot";

import { Check, Image } from "lucide-react";
import {
  resetProductVariant,
  setIamgeVariants,
  setProductVariant,
} from "@/redux/admin/product/productRedux";
import ImageProduct from "@/components/admin/product/image-product";
import PriceFormat from "@/util/price-format";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  cancelSelectInventory,
  selectInventory,
} from "@/redux/admin/product/inventoryRedux";
import HighlightedText from "../ui-custom/highlighted-text";
function ProductVariantItemInput(v: IProductVariant) {
  const dispatch = useDispatch();
  const imageurls = useSelector((state: RootState) => state.product.imageurls);
  const inventorys = useSelector(
    (state: RootState) => state.inventory.inventorys
  );
  const productVariant = v;
  let url = imageurls[productVariant.image]?.url;
  const inventorysSelected = useMemo(() => {
    let html: JSX.Element[] = [];
    for (const key in inventorys) {
      if (!Object.hasOwn(inventorys, key)) continue;

      const inventory = inventorys[key]?.data;
      const selected = inventorys[key]?.selected;
      const variantId = inventorys[key]?.variantId;
      if (
        inventory == undefined ||
        selected == undefined ||
        variantId == undefined
      )
        continue;

      html.push(
        <button
          type="button"
          onClick={() => {
            if (selected) {
              dispatch(resetProductVariant(variantId));
            }
            if (v.productVariantId) {
              dispatch(cancelSelectInventory(v.productVariantId));
            }

            let temp = { ...v };
            temp.productVariantId = inventory.productVariantId;
            temp.quality = inventory.quality + "";
            temp.price = inventory.price;
            temp.pathImage = inventory.image;

            dispatch(setProductVariant(temp));
            dispatch(
              selectInventory({
                productVariantId: inventory.productVariantId,
                variantId: v.variantId,
              })
            );
          }}
          key={inventory.productVariantId}
          className="relative border-2 cursor-pointer rounded-2xl  flex gap-2 p-2"
        >
          <img src={inventory.image} className="aspect-square h-20" alt="" />
          <HighlightedText
            mainText={inventory.productVariantName}
            requireText={v.variantName}
          />

          <div
            data-selected={selected}
            className="data-[selected]:block data-[selected=false]:hidden absolute top-0 right-0 "
          >
            <Check />
          </div>
        </button>
      );
    }

    return html;
  }, [inventorys, v.variantName]);

  return (
    <li className="flex py-4 gap-x-3 relative">
      <div className="basis-1/3">
        <span className="inline-block px-1">
          <div className="aspect-square flex cursor-pointer justify-center items-center size-25 border">
            {url || v.pathImage ? (
              <img
                src={url || v.pathImage}
                className="object-cover size-full"
                alt=""
              />
            ) : (
              <Image size={20} />
            )}
          </div>
        </span>
      </div>
      <div className="basis-1/3 ">
        <span className="inline-block px-1 ">{productVariant.variantName}</span>
        <div className="my-10"></div>
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="blue">Chọn hàng trong kho</Button>
          </SheetTrigger>
          <SheetContent>
            <SheetHeader>
              <SheetTitle>Chọn sản phẩm</SheetTitle>
              <SheetDescription>{v.variantName}</SheetDescription>
            </SheetHeader>
            <div className="mt-1 px-2 space-y-2.5 overflow-y-auto">
              {inventorysSelected}
            </div>
            <SheetFooter>
              <SheetClose asChild>
                <Button variant="outline">Close</Button>
              </SheetClose>
            </SheetFooter>
          </SheetContent>
        </Sheet>
      </div>
      <div className="basis-1/5">
        <Input
          onChange={(t) => {
            let f = t.currentTarget.value;
            let temp = { ...v };
            temp.price = parseInt(f.replaceAll(",", ""));
            dispatch(setProductVariant(temp));
          }}
          placeholder="Giá sản phẩm"
          value={PriceFormat(productVariant.price + "")}
        />
      </div>
      <div className="basis-1/5">
        <Input
          onChange={(t) => {
            let f = t.currentTarget.value;
            let temp = { ...v };
            temp.quality = parseInt(f.replaceAll(",", "")) + "";
            dispatch(setProductVariant(temp));
          }}
          placeholder="Số lượng"
          value={PriceFormat(productVariant.quality + "")}
        />
      </div>
      <div
        data-selected={v.productVariantId != undefined}
        className="data-[selected]:block data-[selected=false]:hidden absolute -top-1 right-0 text-green-500"
      >
        <Check />
      </div>
    </li>
  );
}

export default memo(ProductVariantItemInput);
