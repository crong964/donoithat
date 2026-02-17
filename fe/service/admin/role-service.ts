"use server";
import { iRole } from "@/components/role/interface";
import Await from "@/util/await";
import { errorResponse } from "@/util/error-response";
import { api } from "@/util/fetch";
import { revalidatePath } from "next/cache";

export const getAllRole = async (): Promise<iRole[]> => {
  let data = [];
  try {
    let res = await api.get("/admin/role/");

    data = res.data;
  } catch (error) {
    console.log((error as any).response?.data);
  }
  return data;
};

export const getRolebyId = async (id: string): Promise<iRole | null> => {
  let data = null;
  try {
    let res = await api.delete("/admin/role/" + id);
    data = res.data;
  } catch (error) {
    console.log((error as any).response?.data);
  }
  return data;
};

export const addRole = async (currentState: any, formData: FormData) => {
  const roleName = formData.get("roleName");
  const permission = formData.get("permission");

  try {
    await api.post("/admin/role", {
      roleName,
      permission,
    });
  } catch (error) {
    console.log((error as any).response);

    return {
      message: errorResponse(error).message,
      d: Date.now(),
      error: true,
    };
  }
  revalidatePath("/admin");
  return { d: Date.now(), error: false };
};

export const updateRole = async (currentState: any, formData: FormData) => {
  const roleName = formData.get("roleName");
  const permission = formData.get("permission");
  const roleId = formData.get("roleId");
  try {
    await api.patch("/admin/role", {
      roleName,
      permission,
      roleId,
    });
  } catch (error) {
    console.log((error as any).response?.data);

    return {
      message: errorResponse(error).message,
      d: Date.now(),
      error: true,
    };
  }
  revalidatePath("/admin");
  return { d: Date.now(), error: false };
};

export const deleteRole = async (currentState: any, formData: FormData) => {
  const roleId = formData.get("roleId");
  try {
    await api.delete("/admin/role", {
      data: {
        roleId,
      },
    });
  } catch (error) {
    console.log((error as any).response?.data);
    return {
      message: errorResponse(error).message,
      d: Date.now(),
      error: true,
    };
  }
  revalidatePath("/admin");
  return { d: Date.now(), error: false };
};
