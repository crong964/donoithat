import { api } from "@/lib/fetch"


export const getCategory = async () => {
    let data = await api.get("/category")
    return data.data as MainCateGory[]
}