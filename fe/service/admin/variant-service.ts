"use server";
import { api } from "@/util/fetch";
import Await from "@/util/Await";
import { revalidatePath } from "next/cache";
import { errorResponse } from "@/util/error-response";

export const updateVarient = async (currentState: any, formData: FormData) => {
  const data = {
    productVariantId: formData.get("productVariantId"),
    quality: formData.get("quality"),
    price: formData.get("price"),
    importPrice: formData.get("importPrice"),
  };
  try {
    await api.post("/admin/variant", data);
  } catch (error) {
    return {
      err: true,
      mess: errorResponse(error).message,
      d: Date.now(),
    };
  }
  revalidatePath("/admin/product");
};
