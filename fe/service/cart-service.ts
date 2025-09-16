'use server'
import { iProductVariantCart } from "@/components/product/interface";
import { api, errorResponse } from "@/lib/fetch"
import { revalidatePath } from "next/cache";


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
        revalidatePath("/cart")
        return {
            err: false,
            mess: data.data.message
        }
    } catch (error) {
        return {
            err: true,
            mess: errorResponse(error).message || "Có lỗi"
        }
    }

}
export const getAllProductCart = async (): Promise<iProductVariantCart[]> => {
    try {
        let data = await api.get("/cart")
        return data.data
    } catch (error) {
        return []
    }

}

export const deleteProductCart = async (currentState: any, formData: FormData) => {
    const productVariantId = formData.get("productVariantId")
    try {
        let data = await api.delete("/cart", {
            data: {
                productVariantId: productVariantId
            }
        })

    } catch (error) {
        return {
            err: true,
            mess: "Xóa thất bại"
        }
    }
    revalidatePath("/cart")

}


export const updateProductCart = async (currentState: any, formData: FormData) => {
    const productVariantId = formData.get("productVariantId")
    const quality = formData.get("quality")
    try {
        let data = await api.patch("/cart", {
            productVariantId: productVariantId,
            quality: quality
        })

    } catch (error) {
        return {
            err: true,
            mess: "Cập nhật thất bại"
        }
    }
    revalidatePath("/cart")

}