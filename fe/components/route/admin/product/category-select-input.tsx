"use client";

import * as React from "react";

import { iMainCateGory } from "@/components/category/interface";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/admin/reduxRoot";
import { setTypeProduct } from "@/redux/admin/product/productRedux";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function CategorySelectInput() {
  const [data, setData] = React.useState<iMainCateGory[]>([]);
  const dispatch = useDispatch();
  const categorySlug = useSelector(
    (state: RootState) => state.product.categorySlug
  );

  React.useEffect(() => {
    fetch("/api/category")
      .then((v) => {
        return v.json();
      })
      .then((v) => {
        setData(v);
      });
    return () => {};
  }, []);
  const categories = data;
  return (
    <Select
      onValueChange={(v) => {
        dispatch(setTypeProduct(v));
      }}
      value={categorySlug}
    >
      <SelectTrigger className="w-70">
        <SelectValue placeholder={categorySlug || "Chọn loại sản phẩm"} />
      </SelectTrigger>
      <SelectContent>
        {categories.map((category) => {
          return (
            <SelectGroup>
              <SelectLabel>{category.nameCategory}</SelectLabel>
              {category.categoryChidlren.map((v) => {
                return (
                  <SelectItem className="pl-5" value={v.slug}>
                    {v.nameCategory}
                  </SelectItem>
                );
              })}
            </SelectGroup>
          );
        })}
      </SelectContent>
    </Select>
  );
}
