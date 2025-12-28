"use server";

import {
  igetImportAdminByIdRes,
  iImportGetAdmin,
} from "@/components/import/interface";
import Await from "@/util/await";
import { api } from "@/util/fetch";
import { revalidatePath } from "next/cache";

export const addImportAdmin = async (currentState: any, formData: FormData) => {
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
  } catch (error) {
    console.log((error as any)?.response?.data);
    return { message: "Không thêm dc", d: Date.now(), error: true };
  }
  revalidatePath("/admin/import");
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
): Promise<igetImportAdminByIdRes | undefined> => {
  try {
    const data = await api.get("/admin/import/detail?importId=" + importId);
    return data.data;
  } catch (error) {
    return undefined;
  }
};
