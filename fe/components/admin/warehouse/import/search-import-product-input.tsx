"use client";
import { iImportProduct } from "@/components/inventory/interface";
import PaginationSingle from "@/components/ui-custom/pagination-single";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import React, { useEffect, useState } from "react";
interface iSearchImportProductPros {
  importProducts: iImportProduct[];
  selectImportProduct: (importProducts: iImportProduct[]) => void;
}
const SearchImportProduct = ({
  importProducts,
  selectImportProduct,
}: iSearchImportProductPros) => {
  const [openSearchName, setOpenSearchName] = useState(false);

  const [query, setQuery] = useState<{
    page: number;
    name: string;
  }>({
    name: "",
    page: 1,
  });
  const [importProductSearchs, setImportProductSearchs] = useState<
    iImportProduct[]
  >([]);

  const onChangeOpen = (open: boolean) => {
    setOpenSearchName(open);
    if (!open) {
      setQuery({
        name: "",
        page: 1,
      });
      setImportProductSearchs([]);
    }
  };
  useEffect(() => {
    if (query.name.length <= 0) {
      return;
    }
    const f = setTimeout(async () => {
      try {
        let json = await fetch(
          `/api/admin/inventory/search?name=${query.name}&page=${query.page}`
        );
        const data = await json.json();
        setImportProductSearchs(data);
      } catch (error) {}
    }, 300);
    return () => {
      clearTimeout(f);
    };
  }, [query]);

  return (
    <Popover onOpenChange={onChangeOpen} open={openSearchName}>
      <PopoverTrigger asChild>
        <Button variant={"blue"} className="w-full text-left h-10">
          <p className="w-full text-left">Tìm kiếm sản phẩm</p>
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80 gap-y-3 flex flex-col">
        <div>
          <Input
            className="h-10 "
            placeholder="tìm sản phẩm nhập kho"
            value={query.name}
            onChange={(e) => {
              let text = e.currentTarget.value;
              setQuery({
                name: text,
                page: 1,
              });
            }}
          />
        </div>
        {importProductSearchs.length <= 0 && (
          <div className="flex justify-center items-center">
            Chưa có sản phẩm
          </div>
        )}
        <ul className="h-80 overflow-y-auto space-y-2">
          {importProductSearchs
            .filter((v) => {
              let g = true;
              importProducts.forEach((importProduct) => {
                if (v.productVariantId == importProduct.productVariantId) {
                  g = false;
                }
              });
              return g;
            })
            .map((importProductSearch) => {
              return (
                <li
                  key={importProductSearch.productVariantId}
                  onClick={() => {
                    let templist: iImportProduct[] = [
                      ...importProducts,
                      {
                        ...importProductSearch,
                        quality: 0,
                        importPrice: 0,
                      },
                    ];
                    selectImportProduct(templist);
                  }}
                  className="flex gap-3 items-start cursor-pointer hover:bg-a p-1"
                >
                  <img
                    className="w-15 h-auto"
                    src={importProductSearch.imagePath}
                  />
                  <p className="text-sm">
                    {importProductSearch.productVariantName}
                  </p>
                </li>
              );
            })}
        </ul>
        {importProductSearchs.length > 0 && (
          <PaginationSingle
            curPage={query.page}
            disableNext={importProductSearchs.length < 10}
            onNext={(next) => {
              setQuery({
                name: query.name,
                page: next,
              });
            }}
            onPre={(pre) => {
              setQuery({
                name: query.name,
                page: pre,
              });
            }}
          />
        )}
      </PopoverContent>
    </Popover>
  );
};

export default SearchImportProduct;
