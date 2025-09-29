'use server'

import { iOrder, iOrderDetail, iOrderInAdmin } from "@/components/order/interface"
import { api, } from "@/util/fetch"
import Await from "@/util/Await"
import { revalidatePath } from "next/cache"
import { errorResponse } from "@/util/error-response"

export const addOrder = async (currentState: any, formData: FormData) => {
    const quality = formData.getAll("quality")
    const productVariantId = formData.getAll("productVariantId")
    const productVariants = []
    for (let i = 0; i < productVariantId.length; i++) {
        const element = productVariantId[i];
        productVariants.push({
            productVariantId: element,
            quality: quality[i]
        })
    }
    const s = {
        addressId: formData.get("addressId"),
        note: formData.get("note"),
        productVariants: productVariants
    }
    try {
        await api.post("/order", s)

    } catch (error) {
        console.log((error as any).response.data);

        return {
            error: true,
            message: errorResponse(error).message
        }
    }
    revalidatePath("/cart")

}

export const getOrders = async (): Promise<iOrder[]> => {
    try {
        let data = await api.get("/order")
        return data.data
    } catch (error) {
        return []
    }
}

export const getOrderById = async (orderId: string): Promise<iOrderDetail | undefined> => {
    try {
        let data = await api.get("/order/detail?orderId=" + orderId)
        return data.data
    } catch (error) {
        return undefined
    }
}