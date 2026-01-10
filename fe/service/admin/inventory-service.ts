"use server";
import { iInventory, iInventoryGet } from "@/components/inventory/interface";
import { api } from "@/util/fetch";
import { errorResponse } from "@/util/error-response";
import {
  iProductVariantAndSuplier,
  iProductVariantById,
} from "@/components/variant/interface";
import { revalidatePath } from "next/cache";
import { iMessage } from "@/interface/message";

export const getInventoryAdmin = async (
  p?: iInventoryGet
): Promise<{
  data: iInventory[];
  curPage: number;
  totalPage: number;
}> => {
  try {
    let data = await api.get(
      `/admin/inventory?curpage=${p?.curPage}&inventoryName=${p?.inventoryName}&onSale=${p?.onSale}&brandId=${p?.brandId}`
    );
    return data.data;
  } catch (error) {
    console.log((error as any)?.response?.data);

    return { curPage: 0, data: [], totalPage: 0 };
  }
};

export const getInventoryByIdAdmin = async (
  id: string
): Promise<iProductVariantById | null> => {
  let data = null;
  try {
    data = await api.get(`/admin/inventory/${id}`);
  } catch (error) {}
  return data?.data;
};

export const addInventoryAdmin = async (
  currentState: any,
  formData: FormData
) => {
  const avatarImage = formData.get("avatarImage") as File;

  var fom = new FormData();
  fom.set("ImageFiles", "");

  if (avatarImage == null || avatarImage.size == 0) {
    return { message: "Ko có ảnh", d: Date.now(), error: true };
  }
  fom.append("ImageFiles", avatarImage);

  var images: string | undefined = "";
  try {
    const dataImages = await api.post("/admin/image/upload", fom);
    images = dataImages.data[0];
  } catch (error) {
    console.log(errorResponse(error).message);
  }
  if (images == undefined) {
    return { message: "Chưa có ảnh", d: Date.now(), error: true };
  }
  const data = {
    productVariantName: formData.get("productVariantName"),
    brandId: formData.get("brandId"),
    weight: formData.get("weight"),
    importPrice: formData.get("importPrice"),
    price: formData.get("price"),
    quality: formData.get("quality"),
    imageFile: images,
  };
  try {
    await api.post("/admin/inventory", data);
  } catch (error) {
    console.log(errorResponse(error));
    console.log((error as any)?.response?.data);

    return { message: "Không thêm dc", d: Date.now(), error: true };
  }

  return { message: "Không thêm dc", d: Date.now(), error: false };
};

export const editInventoryAdmin = async (
  currentState: any,
  formData: FormData
) => {
  const avatarImage = formData.get("avatarImage") as File;

  var fom = new FormData();
  fom.set("ImageFiles", "");
  var images: string = "";

  if (avatarImage != null && avatarImage.size != 0) {
    fom.append("ImageFiles", avatarImage);

    try {
      const dataImages = await api.post("/admin/image/upload", fom);
      images = dataImages.data[0];
    } catch (error) {
      console.log(errorResponse(error).message);
    }
  }

  const data = {
    productVariantId: formData.get("productVariantId"),
    productVariantName: formData.get("productVariantName"),
    brandId: formData.get("brandId"),
    weight: formData.get("weight"),
    importPrice: formData.get("importPrice"),
    price: formData.get("price"),
    quality: formData.get("quality"),
    imageFile: images,
  };
  try {
    await api.patch("/admin/inventory", data);
  } catch (error) {
    console.log(errorResponse(error));
    console.log((error as any)?.response?.data);

    return { message: "Không thêm dc", d: Date.now(), error: true };
  }
  revalidatePath("/admin");
  return { message: "Không thêm dc", d: Date.now(), error: false };
};

export const deleteInventoryAdmin = async (
  currentState: any,
  formData: FormData
) => {
  const productVariantId = formData.get("productVariantId");
  try {
    await api.delete("/admin/inventory", { data: { productVariantId } });
  } catch (error) {
    console.log((error as any)?.response?.data);
  }
  return { message: "Không thêm dc", d: Date.now(), error: false };
};

export const getInventoryAndSupliersAdmin = async (
  productId: string
): Promise<iProductVariantAndSuplier | null> => {
  let data = null;
  try {
    data = await api.get(
      "/admin/inventory/suplier?productVariantId=" + productId
    );
  } catch (error) {
    console.log(errorResponse(error));
    console.log((error as any)?.response?.data);
  }

  return data?.data;
};
