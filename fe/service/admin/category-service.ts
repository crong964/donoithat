'use server'
import { iMainCateGory } from "@/components/category/interface"
import { api } from "@/lib/fetch"


export const getCategoryInProduct = async (): Promise<iMainCateGory[]> => {
    try {
        let data = await api.get("/admin/category/product")
        return data.data
    } catch (error) {
        return []
    }

}