import React, { JSX, useMemo } from "react";
import { Input } from "../ui/input";
import { Check, Image } from "lucide-react";
import { IProductVariant } from "../route/admin/product/interface";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/admin/reduxRoot";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "../ui/sheet";
import PriceFormat from "@/util/price-format";
import { Button } from "../ui/button";
import HighlightedText from "../ui-custom/highlighted-text";
import {
  resetProductVariant,
  setProductVariant,
  setSingleProductVariant,
} from "@/redux/admin/product/productRedux";
import {
  cancelSelectInventory,
  selectInventory,
} from "@/redux/admin/product/inventoryRedux";

const ProductVariantSingleInput = (v: IProductVariant) => {
  const dispatch = useDispatch();
  const inventorys = useSelector(
    (state: RootState) => state.inventory.inventorys
  );
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

            let temp = {
              productVariantId: inventory.productVariantId,
              quality: inventory.quality + "",
              price: inventory.price,
              pathImage: inventory.image,
            };

            dispatch(
              setSingleProductVariant({
                ...temp,
                image: 0,
                variantId: "",
                variantName: "",
              })
            );
            dispatch(
              selectInventory({
                productVariantId: inventory.productVariantId,
                variantId: "",
              })
            );
          }}
          key={inventory.productVariantId}
          className="relative border-2 cursor-pointer rounded-2xl  flex gap-2 p-2"
        >
          <img src={inventory.image} className="aspect-square h-20" alt="" />
          <HighlightedText
            mainText={inventory.productVariantName}
            requireText={""}
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
  }, [inventorys]);

  let url = v.pathImage;
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
        <div className="my-10"></div>
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="blue">Chọn hàng trong kho</Button>
          </SheetTrigger>
          <SheetContent>
            <SheetHeader>
              <SheetTitle>Chọn sản phẩm</SheetTitle>
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
            dispatch(setSingleProductVariant(temp));
          }}
          placeholder="Giá sản phẩm"
          value={PriceFormat(0 || v.price + "")}
        />
      </div>
      <div className="basis-1/5">
        <Input
          onChange={(t) => {
            let f = t.currentTarget.value;
            let temp = { ...v };
            temp.quality = parseInt(f.replaceAll(",", "")) + "";
            dispatch(setSingleProductVariant(temp));
          }}
          placeholder="Số lượng"
          value={PriceFormat(0 || v.quality + "")}
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
};

export default ProductVariantSingleInput;
