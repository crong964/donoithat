"use server";

import { iEmployee } from "@/components/employee/interface";
import { iRole } from "@/components/role/interface";
import { errorResponse } from "@/util/error-response";
import { api } from "@/util/fetch";
import { revalidatePath } from "next/cache";

export const getEmployees = async (): Promise<iEmployee[]> => {
  let data: iEmployee[] = [];
  try {
    const res = await api.get("admin/employee/");
    data = res.data;
  } catch (error) {}
  return data;
};
export const getRole = async (): Promise<iRole[]> => {
  let data: iRole[] = [];
  try {
    const res = await api.get("admin/employee/role");
    data = res.data;
  } catch (error) {}
  return data;
};

export const addEmployee = async (currentState: any, formData: FormData) => {
  const data = {
    account: formData.get("account"),
    fullName: formData.get("fullName"),
    password: formData.get("password"),
    phoneNumber: formData.get("phoneNumber"),
    roleId: formData.get("roleId"),
  };
  let message = null;
  try {
    const res = await api.post("admin/employee/", data);
    message = { message: res.data, d: Date.now(), error: false };
    revalidatePath("/");
  } catch (error: any) {
    console.log(error?.response?.data);

    console.log(errorResponse(error).message);
    message = {
      message: errorResponse(error).message,
      d: Date.now(),
      error: true,
    };
  }
  return message;
};

export const updateEmployee = async (currentState: any, formData: FormData) => {
  const data = {
    account: formData.get("account"),
    fullName: formData.get("fullName"),
    password: formData.get("password") || "",
    phoneNumber: formData.get("phoneNumber"),
    roleId: formData.get("roleId"),
    userId: formData.get("userId"),
  };
  let message = null;
  try {
    const res = await api.patch("admin/employee/", data);
    message = { message: res.data, d: Date.now(), error: false };
  } catch (error) {
    console.log(errorResponse(error).message);
    message = {
      message: errorResponse(error).message,
      d: Date.now(),
      error: true,
    };
  }
  return message;
};
