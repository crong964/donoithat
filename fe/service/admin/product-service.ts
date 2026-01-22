"use server";
import { iBrand } from "@/components/brand/interface";
import {
  iGetProduct,
  iProductDetail,
} from "@/components/product/interface-admin";
import { errorResponse } from "@/util/error-response";
import { api } from "@/util/fetch";

export const getProduct = async (
  p?: { slug: string; page?: string; nameProduct?: string } | undefined,
): Promise<iGetProduct | undefined> => {
  try {
    let data = await api.get(
      `/admin/product?slug=${p?.slug}&page=${p?.page || 1}&nameProduct=${
        p?.nameProduct || ""
      }`,
    );

    return data.data;
  } catch (error: any) {
    console.log(error?.response?.data);
    console.log(errorResponse(error));
    return undefined;
  }
};

export const getProductBySlug = async (
  slug: string,
): Promise<iProductDetail | undefined> => {
  try {
    let data = await api.get(`/admin/product/getProductBySlug?slug=${slug}`);
    return data.data;
  } catch (error) {
    return undefined;
  }
};

export const getAllBrandToBuy = async (): Promise<iBrand[]> => {
  let data: iBrand[] = [];
  try {
    const res = await api.get("admin/product/brand");
    data = res.data;
  } catch (e) {}

  return data;
};

export const updateStatusProduct = async (
  currentState: any,
  formData: FormData,
) => {
  const productId = formData.get("productId");
  let data = 0;
  try {
    let g = await api.patch("/admin/product/status", {
      productId: productId,
    });
    data = g.data.newValue;
  } catch (error) {
    return {
      message: errorResponse(error).message,
      d: Date.now(),
      error: true,
    };
  }

  return { d: Date.now(), error: false, newValue: data };
};

export const deleteProduct = async (currentState: any, formData: FormData) => {
  const productId = formData.get("productId");

  try {
    let data = await api.delete("/admin/product", {
      data: {
        productId: productId,
      },
    });
  } catch (error) {
    console.log((error as any).response?.data);

    return {
      message: errorResponse(error).message,
      d: Date.now(),
      error: true,
    };
  }
  return { d: Date.now(), error: false };
};
