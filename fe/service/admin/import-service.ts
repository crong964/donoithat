"use server";
import {
  igetImportAdminByIdRes,
  iImportGetAdmin,
} from "@/components/import/interface";
import { iMessage } from "@/interface/message";
import { api } from "@/util/fetch";
import { revalidatePath } from "next/cache";

export const addImportAdmin = async (currentState: any, formData: FormData) => {
  let message: iMessage = { message: null, d: null, error: null };
  try {
    let post = {
      purchaseInvoiceId: formData.get("purchaseInvoiceId"),
      suplierId: formData.get("suplierId"),
      receivedDate: formData.get("receivedDate"),
      importVariantProducts: JSON.parse(
        (formData.get("importVariantProducts") as string) || "{}"
      ),
    };
    await api.post("/admin/import/", post);
    message.message = "Thành công";
    message.error = false;
    message.d = Date.now();
  } catch (error) {
    console.log((error as any)?.response?.data);
    message = { message: "Không thêm dc", d: Date.now(), error: true };
  }
  revalidatePath("/admin/import");
  return message;
};

export const getAllImportAdmin = async (): Promise<iImportGetAdmin[]> => {
  try {
    const data = await api.get("/admin/import");

    return data.data;
  } catch (error) {
    return [];
  }
};

export const getImportAdminById = async (
  importId: string
): Promise<igetImportAdminByIdRes | null> => {
  let data = null;
  try {
    data = await api.get("/admin/import/detail?importId=" + importId);
  } catch (error) {}
  return data?.data;
};
