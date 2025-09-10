'use server'
import { iLogin, iUser } from "@/components/user/interface";
import { api, errorResponse } from "@/lib/fetch";
import Await from "@/util/Await";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export const createUser = async (currentState: any, formData: FormData) => {
    const user: iUser = {
        account: formData.get("account")?.toString() || "",
        address: formData.get("address")?.toString() || "",
        fullName: formData.get("fullName")?.toString() || "",
        password: formData.get("password")?.toString() || "",
        phoneNumber: formData.get("phoneNumber")?.toString() || ""
    }
    await Await()
    try {
        let data = await api.post("/user/create", user)

    } catch (error: any) {
    
        return errorResponse(error).message
    }

    redirect(`/account/login`)
}

export const loginUser = async (currentState: any, formData: FormData) => {
    const user: iLogin = {
        account: formData.get("account")?.toString() || "",
        password: formData.get("password")?.toString() || "",
    }

    try {
        let data = await api.post("/token", user)
        const cookieStore = await cookies()
        cookieStore.set("token", data.data, {
            httpOnly: true,
            maxAge: Date.now() / 1000 + 3600 * 24 * 7,
            secure: true,
            sameSite: "strict",

        })
    } catch (error: any) {
        return errorResponse(error).message
    }

    revalidatePath("/")
    redirect(`/`)
}
export const logoutUser = async () => {
    const cookieStore = await cookies()
    cookieStore.delete("token")
    revalidatePath("/")
}

export const getUserInfor = async (): Promise<{
    fullName: string;
    account: string;
    phoneNumber: string;
    address: string
} | undefined> => {
    try {
        let data = await api.get("/token/infor")

        return data.data
    } catch (error: any) {
        return undefined
    }
}


export const updateUser = async (currentState: any, formData: FormData) => {
    const user: iLogin = {
        account: formData.get("account")?.toString() || "",
        password: formData.get("password")?.toString() || "",
    }
    return "ok"
}

export const getToken = async () => {
    const cookieStore = await cookies()
    return cookieStore.get("token")?.value
}