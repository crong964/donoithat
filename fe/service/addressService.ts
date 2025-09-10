'use server'

import { iAddress } from "@/components/address/interface"
import { api, errorResponse } from "@/lib/fetch"
import { revalidatePath } from "next/cache"


export const getAllAddresses = async (): Promise<iAddress[]> => {
    try {
        let data = await api.get("/address")
        return data.data
    } catch (error) {
        return []
    }
}

export const addAddresses = async (currentState: any, formData: FormData) => {
    const data = {
        lat: parseFloat(formData.get("lat") + ""),
        lng: parseFloat(formData.get("lng") + ""),
        title: formData.get("title"),
        address: formData.get("address"),
    }
    try {
        console.log(data);

        let res = await api.post("/address", data)


    } catch (error) {
        return {
            err: true,
            mess: errorResponse(error).message || "Có lỗi"
        }
    }
    revalidatePath("/cart")
}