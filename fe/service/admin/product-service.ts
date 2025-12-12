"use server";
import {
  iGetProduct,
  iProductDetail,
} from "@/components/product/interface-admin";
import { errorResponse } from "@/util/error-response";
import { api } from "@/util/fetch";
import { revalidatePath } from "next/cache";

export const getProduct = async (
  p?: { slug: string; page?: string } | undefined
): Promise<iGetProduct | undefined> => {
  try {
    let data = await api.get(
      `/admin/product?slug=${p?.slug}&page=${p?.page || 1}`
    );
    return data.data;
  } catch (error) {
    return undefined;
  }
};

export const getProductBySlug = async (
  slug: string
): Promise<iProductDetail | undefined> => {
  try {
    let data = await api.get(`/admin/product/getProductBySlug?slug=${slug}`);
    return data.data;
  } catch (error) {
    return undefined;
  }
};

export const updateStatusProduct = async (
  currentState: any,
  formData: FormData
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
