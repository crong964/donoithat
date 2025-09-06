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
        console.log("ooooooooooooooooooooo00000000000oooo");
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
        cookieStore.set("token", data.data)
    } catch (error: any) {
        return errorResponse(error).message
    }

    revalidatePath("/")
    redirect(`/`)
}

export const testLogin = async () => {
    try {
        let data = await api.get("/admin/token")

        return data.data
    } catch (error: any) {
        return errorResponse(error).message
    }
}
export const getToken = async () => {
    const cookieStore = await cookies()
    return cookieStore.get("token")?.value
}