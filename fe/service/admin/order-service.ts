"use server";
import { iOrderDetail, iOrderInAdmin } from "@/components/order/interface";
import { errorResponse } from "@/util/error-response";
import { api } from "@/util/fetch";
import { revalidatePath } from "next/cache";

export const getOrders = async (p?: number): Promise<iOrderInAdmin[]> => {
  try {
    let data = undefined;
    if (p == undefined) {
      data = await api.get(`/admin/order`);
      return data.data;
    }
    data = await api.get(`/admin/order?orderStatus=${p}`);
    return data.data;
  } catch (error) {
    return [];
  }
};
export const getOrderStatus = async (): Promise<string[]> => {
  try {
    let data = await api.get(`/admin/order/status`);

    return data.data;
  } catch (error) {
    return [];
  }
};
export const getOrderById = async (
  id: string
): Promise<iOrderDetail | undefined> => {
  try {
    let data = await api.get(`/admin/order/detail?orderId=${id}`);

    return data.data;
  } catch (error) {
    console.log(errorResponse(error));

    return undefined;
  }
};

export const updateStatusOrder = async (
  currentState: any,
  formData: FormData
) => {
  const orderId = formData.get("orderId");
  const status = formData.get("status");
  try {
    const data = await api.patch("/admin/order/updateStatus", {
      orderId: orderId,
      status: status,
    });
    revalidatePath("/admin/order/updateStatus");
    return { time: Date.now(), message: data.data.message, err: false };
  } catch (error) {
    return {
      time: Date.now(),
      message: errorResponse(error).message,
      err: true,
    };
  }
};

export const updatePayOrder = async (currentState: any, formData: FormData) => {
  const orderId = formData.get("orderId");
  const Pay = formData.get("pay");
  try {
    const data = await api.patch("/admin/order/payorder", {
      orderId: orderId,
      Pay: Pay,
    });
    revalidatePath("/admin/order/payorder");
    return { time: Date.now(), message: data.data.message, err: false };
  } catch (error) {
    return {
      time: Date.now(),
      message: errorResponse(error).message,
      err: true,
    };
  }
};
