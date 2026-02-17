import { iBrand } from "@/components/brand/interface";
import { errorResponse } from "@/util/error-response";
import { api } from "@/util/fetch";
import { revalidatePath } from "next/cache";

export const getAllBrand = async (): Promise<iBrand[]> => {
  let data: iBrand[] = [];
  try {
    const res = await api.get("admin/brand");
    data = res.data;
  } catch (e) {}

  return data;
};
export const getById = async (id: string): Promise<iBrand | null> => {
  let data = null;
  try {
    let res = await api.post("admin/brand/" + id);
    data = res.data;
  } catch (e) {
    console.log(errorResponse(e));
  }

  return data;
};
export const addBrand = async (currentState: any, formData: FormData) => {
  let data = {
    brandName: (formData.get("brandName") as any) || "",
  };
  let mess = null;
  try {
    await api.post("admin/brand", data);
    mess = {
      d: Date.now(),
      error: false,
    };
  } catch (e) {
    console.log(errorResponse(e));
    mess = {
      d: Date.now(),
      error: true,
    };
  }
  revalidatePath("/admin");
  return mess;
};
