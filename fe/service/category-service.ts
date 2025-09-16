'use server'
import { iMainCateGory } from "@/components/category/interface"
import { api } from "@/lib/fetch"


export const getCategory = async (): Promise<iMainCateGory[]> => {
    try {
        let data = await api.get("/category")
        return data.data
    } catch (error) {

    }
    return []
}