"use server";
import { iLogin, iUser } from "@/components/user/interface";
import { api } from "@/util/fetch";
import Await from "@/util/await";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { errorResponse } from "@/util/error-response";

export const createUser = async (currentState: any, formData: FormData) => {
  const user: iUser = {
    account: formData.get("account")?.toString() || "",
    address: formData.get("address")?.toString() || "",
    fullName: formData.get("fullName")?.toString() || "",
    password: formData.get("password")?.toString() || "",
    phoneNumber: formData.get("phoneNumber")?.toString() || "",
  };
  await Await();
  try {
    let data = await api.post("/user/create", user);
  } catch (error: any) {
    return {
      d: Date.now(),
      mess: errorResponse(error).message,
      err: true,
    };
  }

  redirect(`/account/login`);
};

export const loginUser = async (currentState: any, formData: FormData) => {
  const user: iLogin = {
    account: formData.get("account")?.toString() || "",
    password: formData.get("password")?.toString() || "",
  };

  try {
    let data = await api.post("/token", user);
    const cookieStore = await cookies();
    cookieStore.set("token", data.data, {
      httpOnly: true,
      maxAge: Date.now() / 1000 + 3600 * 24 * 7,
      secure: true,
      sameSite: "strict",
    });
  } catch (error: any) {
    return errorResponse(error).message;
  }

  revalidatePath("/");
};
export const logoutUser = async () => {
  const cookieStore = await cookies();
  cookieStore.delete("token");
  revalidatePath("/");
};

export const getUserInfor = async (): Promise<{
  fullName: string;
  account: string;
  phoneNumber: string;
  address: string;
} | null> => {
  let data = null;
  try {
    data = await api.get("/token/infor");
  } catch (error: any) {}

  return data?.data;
};

export const updateUser = async (currentState: any, formData: FormData) => {
  const user = {
    fullName: formData.get("fullName")?.toString() || "",
  };
  try {
    await api.patch("/user", user);
  } catch (error) {
    return {
      err: true,
      message: errorResponse(error).message,
      d: Date.now(),
    };
  }
  return revalidatePath("/");
};

export const getToken = async () => {
  const cookieStore = await cookies();
  return cookieStore.get("token")?.value;
};
