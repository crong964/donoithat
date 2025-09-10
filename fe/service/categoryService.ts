'use server'
import { api } from "@/lib/fetch"


export const getCategory = async (): Promise<MainCateGory[]> => {
    try {
        let data = await api.get("/category")
        return data.data
    } catch (error) {

    }
    return []
}