'use server'
import { iHomeAdminGet } from "@/components/route/admin/home/interface"
import { iInventory, iInventoryGet } from "@/components/inventory/interface"
import { api } from "@/util/fetch"
import Await from "@/util/Await"



export const getInventoryAdmin = async (p?: iInventoryGet): Promise<{
    data: iInventory[],
    curPage: number,
    totalPage: number
}> => {
    try {
        let data = await api.get(`/admin/inventory?curpage=${p?.curPage}&inventoryName=${p?.inventoryName}&onSale=${p?.onSale}&brandId=${p?.brandId}`)
        return data.data
    } catch (error) {
        console.log((error as any)?.response?.data);

        return { curPage: 0, data: [], totalPage: 0 }
    }
}


export const addInventoryAdmin = async (currentState: any, formData: FormData) => {
    await Await()
    const avatarImage = formData.get("avatarImage") as File
    if (avatarImage == null || avatarImage.size == 0) {
        return { message: "Ko có ảnh", d: Date.now(), error: true }
    }
    return
    var images: string | undefined = ""
    try {
        images = (await api.post("/admin/image/upload", avatarImage) as (string[] | undefined))?.[0]
    } catch (error) {

    }
    if (images == undefined) {
        return { message: "Chưa có ảnh" }
    }
    const data = {
        productVariantName: formData.get("productVariantName"),
        brandId: formData.get("brandId"),
        weight: formData.get("weight"),
        importPrice: formData.get("importPrice"),
        price: formData.get("price"),
        quality: formData.get("quality"),
        imageFiles: images
    }
    return ""
} 