'use server'

import { api, errorResponse } from "@/lib/fetch"
import Await from "@/util/Await"
import { revalidatePath } from "next/cache"

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
        address: formData.get("address"),
        note: formData.get("note"),
        productVariants: productVariants
    }
    try {
        await api.post("/order", s)
        
    } catch (error) {
        return {
            error: true,
            message: errorResponse(error).message
        }
    }
    revalidatePath("/cart")

}