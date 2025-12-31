"use server";
import { iInventoryOrderAdmin } from "@/components/inventory/interface";
import { iMessage } from "@/interface/message";
import { errorResponse } from "@/util/error-response";
import { api } from "@/util/fetch";
import { revalidatePath } from "next/cache";

export const createInventoryOrderAdmin = async (
  currentState: any,
  formData: FormData
) => {
  let message: iMessage = { message: null, d: null, error: null };
  try {
    await api.post("/admin/inventory/order", {
      inventoryId: formData.get("inventoryId"),
      suplierId: formData.get("suplierId"),
    });
    message.error = false;
    message.message = "Thêm thành công";
  } catch (error) {
    console.log((error as any)?.response?.data);
    message.error = true;
    message.message = errorResponse(error).message || "Đã có sẵn rồi";
  }
  message.d = Date.now();
  revalidatePath("/admin/warehouse/order");
  return message;
};

export const getInventoryOrderAdmin = async (): Promise<
  iInventoryOrderAdmin[]
> => {
  let data = null;
  try {
    data = await api.get("/admin/inventory/order");
  } catch (error) {}

  return data?.data || [];
};

export const deleteInventoryOrderAdmin = async (
  currentState: any,
  formData: FormData
) => {
  let message: iMessage = { message: null, d: null, error: null };
  console.log(formData);

  try {
    await api.delete("/admin/inventory/order", {
      data: {
        inventoryId: formData.get("inventoryId"),
        suplierId: formData.get("suplierId"),
      },
    });
  } catch (error) {
    console.log((error as any)?.response?.data);
    message.error = true;
    message.message = errorResponse(error).message || "Đã có sẵn rồi";
  }
  message.d = Date.now();
  message.error = false;
  message.message = "Xóa thành công";
  revalidatePath("/admin/warehouse/order");
  return message;
};
