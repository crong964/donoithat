"use client";
import Form from "next/form";

import { Button, Input, Select } from "antd";
import TextArea from "antd/es/input/TextArea";
import { CloudUpload, Eye, Trash } from "lucide-react";
import React, { useEffect, useState } from "react";
import ImagesInput from "./images-input";
import { useDispatch, useSelector } from "react-redux";
import ProductClassification from "./product-classification";
import { RootState } from "@/redux/admin/reduxRoot";
import {
  setDescriptionProduct,
  setNameProduct,
  setProductData,
  setResetProductData,
  setTypeProduct,
} from "@/redux/admin/product/productRedux";
import Category from "./category";
import Vendor from "./vendor";
import WeightProduct from "./weight-product";
import removeAccents from "@/util/remove-accents";
import { toast } from "react-toastify";
import { iProductDetail } from "@/components/product/interface-admin";
import { createClassificationFormHandleToSave, validateData } from "./ulti";
import CategorySelectInput from "./category-select-input";
import VendorComboboxInput from "./vendor-select-input";
import BackButton from "@/components/ui-custom/back-button";

export default function EditProductPage(p: iProductDetail) {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(setProductData(p));
  }, [p]);
  const nameProduct = useSelector(
    (state: RootState) => state.product.nameProduct
  );
  const description = useSelector(
    (state: RootState) => state.product.description
  );
  const product = useSelector((state: RootState) => state.product);
  const onSubmit = async (ev: React.FormEvent<HTMLFormElement>) => {
    ev.preventDefault();
    var fom = new FormData();
    const validate = validateData(product);
    if (validate.err) {
      toast.error(validate.mess);
      return;
    }
    fom.set("ImageFiles", "");
    for (let i = 0; i < product.imageurls.length; i++) {
      let element = product.imageurls[i].file;

      if (element != undefined) {
        fom.append("ImageFiles", element);
      }
    }
    try {
      let s = await fetch("/api/admin/upload", {
        method: "POST",
        body: fom,
      });
      let images: string[] = [];
      let imagesRes = (await s.json()) as string[];
      let resI = 0;
      for (let i = 0; i < product.imageurls.length; i++) {
        const element = product.imageurls[i];
        if (element.file == undefined) {
          images.push(element.url.replace("http://localhost:2000/sta/", ""));
        } else {
          images.push(imagesRes[resI]);
          resI += 1;
        }
      }

      let idOpion = Date.now() + "";
      let tmpClassifications = createClassificationFormHandleToSave(
        product.productClassifications
      );
      const productClassifications =
        product.productClassifications.length == 0
          ? [
              {
                name: "Tiêu đề",
                edit: false,
                options: [{ id: idOpion, name: "Default Title", edit: false }],
              },
            ]
          : tmpClassifications;

      const productVariants =
        product.productVariants.length == 0
          ? [
              {
                variantId: idOpion,
                variantName: "Default Title",
                price: product.mainPrice,
                quality: product.quality,
                image: 0,
              },
            ]
          : product.productVariants;

      var data = {
        productId: p.productId,
        description: product.description,
        productClassification: JSON.stringify(productClassifications),
        slug: removeAccents(product.nameProduct),
        mainPrice: product.mainPrice,
        suplier: product.vendor,
        nameProduct: product.nameProduct,
        quality: 0,
        productVariants: [
          ...productVariants.map((v) => {
            return {
              variantId: v.variantId,
              variantName: v.variantName,
              price: v.price,
              image: images[v.image],
              position: v.image,
              quality: v.quality,
              weight: product.weightProduct.value,
            };
          }),
        ],
        typeProduct: product.typeProduct,
        imageFiles: images,
      };

      let mess = await fetch("/api/admin/product", {
        method: "PATCH",
        body: JSON.stringify(data),
      });
      let messdata = await mess.json();
      if (mess.status >= 500) {
        toast.error(messdata.mess);
      } else {
        toast.success(messdata.mess);
        dispatch(setResetProductData());
      }
    } catch (error) {
      alert("lỗi");
    }
  };

  return (
    <>
      <div className="p-3">
        <BackButton></BackButton>
      </div>
      <div className="my-5 ">
        <h1 className="font-bold text-2xl">Cập nhật sản phẩm </h1>
      </div>

      <form onSubmit={onSubmit} className="flex gap-2">
        <section className="w-220">
          <div className="my-3.75 ">
            <div className=" shadow-2xl p-3.5  rounded-sm">
              <div className="mb-6">
                <label className="text-3xl font-bold">Thông tin cơ bản</label>
              </div>
              <ImagesInput />
            </div>
          </div>
          <div className="mt-12.5 shadow-2xl">
            <div className="p-5.5">
              <div className="mb-5">
                <span className="flex space-x-1">
                  <h2 className="text-lg font-bold  ">Tên sản phẩm</h2>
                  <p className="text-red-600">*</p>
                </span>
                <div className="">
                  <Input
                    required
                    value={nameProduct}
                    onChange={(v) => {
                      dispatch(setNameProduct(v.currentTarget.value));
                    }}
                    placeholder="tên sản phẩm"
                  />
                </div>
              </div>

              <div className="mb-5">
                <span className="flex space-x-1">
                  <h2 className="text-lg font-bold ">Mô tả sản phẩm</h2>
                  <p className="text-red-600">*</p>
                </span>

                <div className="">
                  <TextArea
                    onChange={(v) => {
                      let text = v.currentTarget.value;
                      dispatch(setDescriptionProduct(text));
                    }}
                    required
                    value={description}
                    placeholder="tên sản phẩm"
                  />
                </div>
              </div>

              <div className="mb-5">
                <div className="mb-4">
                  <div className="flex space-x-1">
                    <h2 className="text-lg font-bold  ">Thông tin bán hàng</h2>
                    <p className="text-red-600">*</p>
                  </div>
                </div>
                <ProductClassification />
                <WeightProduct />
              </div>
            </div>
          </div>
          <div className="mt-12.5 shadow-2xl"></div>
        </section>
        <section className="w-75">
          <div className="my-3.75 w-75 fixed top-0 ">
            <div className="pt-10">
              <ul className="flex items-center justify-end gap-x-1">
                <Button htmlType="submit" type="primary">
                  Cập nhật sản phẩm
                </Button>
              </ul>
            </div>
            <div className=" shadow-2xl p-4  rounded-lg">
              <VendorComboboxInput />
              <CategorySelectInput />
            </div>
          </div>
        </section>
      </form>
    </>
  );
}
