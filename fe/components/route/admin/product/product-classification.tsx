"use client";
import { PlusOutlined } from "@ant-design/icons";
import { Button, Input, Select } from "antd";
import { ArrowUpToLine, Image, Trash2, X } from "lucide-react";
import { Fragment, useEffect, useMemo, useState } from "react";
import { IPrice, IProductVariantsDetailPros } from "./interface";
import Count from "@/util/Count";
import PriceFormat from "@/util/price-format";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/admin/reduxRoot";
import {
  addProductClassifications,
  setIamgeVariants,
  setMainPriceProduct,
  setMinMaxPrice,
  setProductClassifications,
  setProductVariant,
  setProductVariants,
  setQuality,
} from "@/redux/admin/product/productRedux";
import ProductClassificationItem from "./product-classification-item";
import ImageProduct from "./image-product";

import MinMaxPrice from "./price";
import { createOption } from "./ulti";
import ProductVariantItemInput from "@/components/variant/product-variant-item-input";
import ProductVariantSingleInput from "@/components/variant/product-variant-single-input";

export default function ProductClassification() {
  const productClassifications = useSelector(
    (state: RootState) => state.product.productClassifications
  );
  const productVariants = useSelector(
    (state: RootState) => state.product.productVariants
  );
  const tmpEdit = useSelector(
    (state: RootState) => state.product.productVariantsInEdit
  );
  const imageVariants = useSelector(
    (state: RootState) => state.product.imageVariants
  );
  const mainPrice = useSelector((state: RootState) => state.product.mainPrice);
  const quality = useSelector((state: RootState) => state.product.quality);
  const dispatch = useDispatch();

  const [open, setOpen] = useState(false);
  const [variantKey, setVariantsKey] = useState("-1");
  const [productVariantI, setProductVariantI] = useState(-1);

  useEffect(() => {
    dispatch(
      setProductClassifications(
        JSON.parse(localStorage.getItem("temp") || "[]")
      )
    );
    return () => {};
  }, []);

  useEffect(() => {
    let time = setTimeout(() => {
      dispatch(setProductVariants([]));
      let f = 1;
      for (let i = 0; i < productClassifications.length; i++) {
        const element = productClassifications[i];
        f *= element.options.length - 1;
      }
      const sl = f;
      let ls = Count(sl, productClassifications);
      if (ls.length == 0) {
        return;
      }
      dispatch(
        setProductVariants(
          ls.map((v) => {
            let variants = v.split(" ");
            let variantName = "";
            let variantId = "";
            variants.forEach((v, i) => {
              let option = productClassifications[i]?.options?.[parseInt(v)];
              variantName += `${option?.name} `;
              variantId += `${option?.id} `;
            });
            variantId = variantId.trim();
            variantName = variantName.trim();
            return {
              variantId: variantId.trim(),
              variantName: variantName.trim(),
              price: tmpEdit[variantId]?.price || 0,
              quality: tmpEdit[variantId]?.quality || "0",
              image: tmpEdit[variantId]?.image || -1,
            };
          })
        )
      );
    }, 400);
    return () => {
      clearTimeout(time);
    };
  }, [productClassifications, tmpEdit]);

  const productClassificationHtml = useMemo(() => {
    let html = [
      productClassifications.map((productClassification, pci) => {
        return (
          <ProductClassificationItem
            data={productClassification}
            pci={pci}
            key={productClassification.id}
          />
        );
      }),
    ];
    return html;
  }, [productClassifications]);
  return (
    <div>
      <ImageProduct
        open={open}
        onchange={(i) => {
          if (productVariantI != -1) {
            let temp = productVariants.map((v) => {
              return { ...v };
            });
            temp[productVariantI].image = i;
            dispatch(setProductVariants(temp));
            setProductVariantI(-1);
            setOpen(false);
            return;
          }

          if (variantKey != "-1" && i != -1) {
            let temp = { ...imageVariants };
            temp[variantKey] = i;
            dispatch(setIamgeVariants(temp));

            productVariants.forEach((v) => {
              let f = v.variantId.split(" ");
              if (f[0] == variantKey) {
                dispatch(setProductVariant({ ...v, image: i }));
              }
            });

            setVariantsKey("-1");
            setOpen(false);
            return;
          }
          setOpen(false);
        }}
      />
      <div className="mb-4">
        <h1 className="text-sm font-bold">Phân loại sản phầm</h1>
      </div>

      <div className="mb-4">{productClassificationHtml}</div>
      <div className="mb-4">
        <Button
          onClick={() => {
            dispatch(
              addProductClassifications({
                ...createOption(),
                options: [createOption()],
              })
            );
          }}
          icon={<PlusOutlined />}
          type="dashed"
        >
          Thêm nhóm sản phẩm
        </Button>
      </div>
      <section
        className={`${productClassifications.length == 0 ? "my-6" : "hidden"}`}
      >
        <ProductVariantSingleInput {...productVariants[0]} />
      </section>
      <section
        className={`${
          productClassifications.length == 0
            ? "hidden"
            : "mb-4 bg-white text-sm p-2 shadow-2xl rounded-sm"
        }`}
      >
        <MinMaxPrice />

        <div className="flex py-4 gap-x-3">
          <div className="inline-block px-2 basis-1/3">
            <div className="flex gap-x-1">
              <p className="font-bold text-lg">Ảnh</p>
            </div>
          </div>
          <div className="inline-block px-2 basis-1/3">
            <ul className="flex gap-x-1">
              {productClassifications.map((productClassification) => {
                return (
                  <li
                    key={productClassification.id}
                    className="px-2 py-1 shadow-2xl border"
                  >
                    <p>{productClassification.name}</p>
                  </li>
                );
              })}
            </ul>
          </div>
          <div className="basis-1/5">
            <p className="font-bold text-lg">Giá</p>
          </div>
          <div className="basis-1/5">
            <p className="font-bold text-lg">Số lượng</p>
          </div>
        </div>
        <ul>
          {productVariants.map((productVariant) => {
            return (
              <ProductVariantItemInput
                key={productVariant.variantId}
                {...productVariant}
              />
            );
          })}
        </ul>
      </section>
    </div>
  );
}
