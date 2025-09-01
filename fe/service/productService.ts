import { iGetProduct } from "@/components/product/interface"
import { api } from "@/lib/fetch"
import { queryObjects } from "v8"


export const getProduct = async (p?: { slug: string, page?: string } | undefined): Promise<iGetProduct | undefined> => {

    let data = await api.get(`/product?slug=${p?.slug}&page=${p?.page || 1}`)


    return data.data
}