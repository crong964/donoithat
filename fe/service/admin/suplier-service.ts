"use server";
import { iSuplier } from "@/components/suplier/interface";
import { CheckPhoneNumber } from "@/lib/utils";
import { errorResponse } from "@/util/error-response";
import { api } from "@/util/fetch";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export const getSuplier = async (
  suplierId: string
): Promise<iSuplier | undefined> => {
  try {
    let data = await api.get(
      "/admin/suplier/suplierbyid?suplierId=" + suplierId
    );
    return data.data;
  } catch (error) {
    return undefined;
  }
};

export const addSuplier = async (currentState: any, formData: FormData) => {
  const data = {
    suplierId: formData.get("suplierId"),
    suplierName: formData.get("suplierName"),
    suplierPhoneNumber: formData.get("suplierPhoneNumber") as string,
    suplierEmail: formData.get("suplierEmail"),
    suplierAddress: formData.get("suplierAddress"),
  };
  if (!CheckPhoneNumber(data.suplierPhoneNumber)) {
    return {
      err: true,
      mess: "Số điện thoại sai định dạng",
      d: Date.now(),
    };
  }
  try {
    await api.post("/admin/suplier", data);
  } catch (error) {
    console.log((error as any).response.data);

    return {
      err: true,
      mess: errorResponse(error).message,
      d: Date.now(),
    };
  }
  revalidatePath("/admin/suplier");
  redirect("/admin/suplier");
};

export const updateSuplier = async (currentState: any, formData: FormData) => {
  const data = {
    id: formData.get("id"),
    suplierId: formData.get("suplierId"),
    suplierName: formData.get("suplierName"),
    suplierPhoneNumber: formData.get("suplierPhoneNumber") as string,
    suplierEmail: formData.get("suplierEmail"),
    suplierAddress: formData.get("suplierAddress"),
  };
  if (!CheckPhoneNumber(data.suplierPhoneNumber)) {
    return {
      err: true,
      mess: "Số điện thoại sai định dạng",
      d: Date.now(),
    };
  }
  try {
    await api.patch("/admin/suplier", data);
  } catch (error) {
    return {
      err: true,
      mess: errorResponse(error).message,
      d: Date.now(),
    };
  }
  revalidatePath("/admin/suplier");
};

export const getSupliers = async (): Promise<iSuplier[]> => {
  try {
    let data = await api.get("/admin/suplier");
    return data.data;
  } catch (error) {
    return [];
  }
};
