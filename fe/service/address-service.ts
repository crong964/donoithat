"use server";

import { iAddress } from "@/components/address/interface";
import { api } from "@/util/fetch";
import Await from "@/util/await";
import { revalidatePath } from "next/cache";
import { errorResponse } from "@/util/error-response";

export const getAllAddresses = async (): Promise<iAddress[]> => {
  try {
    let data = await api.get("/address");
    return data.data;
  } catch (error) {
    return [];
  }
};

export const addAddresses = async (currentState: any, formData: FormData) => {
  const data = {
    lat: parseFloat(formData.get("lat") + ""),
    lng: parseFloat(formData.get("lng") + ""),
    title: formData.get("title"),
    address: formData.get("address"),
  };
  try {
    let res = await api.post("/address", data);
  } catch (error) {
    return {
      err: true,
      mess: errorResponse(error).message || "Có lỗi",
    };
  }
  revalidatePath("/cart");
};
export const editAddresses = async (currentState: any, formData: FormData) => {
  const data = {
    lat: parseFloat(formData.get("lat") + ""),
    lng: parseFloat(formData.get("lng") + ""),
    title: formData.get("title"),
    address: formData.get("address"),
    addressId: formData.get("addressId"),
  };
  try {
    let res = await api.patch("/address", data);
  } catch (error) {
    return {
      err: true,
      mess: errorResponse(error).message || "Có lỗi",
    };
  }
  revalidatePath("/cart");
};

export const deleteAddresses = async (
  currentState: any,
  formData: FormData
) => {
  const data = {
    addressId: formData.get("addressId"),
  };
  try {
    let res = await api.delete("/address", {
      data: data,
    });
  } catch (error) {
    console.log((error as any)?.response?.data);
    return {
      error: true,
      mess: errorResponse(error).message,
    };
  }
  revalidatePath("/user/address");
};
