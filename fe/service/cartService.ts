'use server'
import { api, errorResponse } from "@/lib/fetch"
import Await from "@/util/Await";


export const addProductCart = async (currentState: any, formData: FormData) => {
    var productVariantId = formData.get("productVariantId");
    var quality = formData.get("quality") as string
    if (quality == null || productVariantId == null) {
        return {
            err: true,
            mess: "Thiếu thông tin"
        }
    }


    try {
        let data = await api.post("/cart", {
            "productVariantId": productVariantId,
            "quality": parseInt(quality || "0")
        })
        return {
            err: false,
            mess: "ok"
        }
    } catch (error) {
        return {
            err: true,
            mess: errorResponse(error).message || "Có lỗi"
        }
    }

}