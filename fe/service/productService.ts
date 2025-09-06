import { iGetProduct, iProductDetail } from "@/components/product/interface"
import { api } from "@/lib/fetch"


export const getProduct = async (p?: { slug: string, page?: string } | undefined): Promise<iGetProduct | undefined> => {

    let data = await api.get(`/product?slug=${p?.slug}&page=${p?.page || 1}`)


    return data.data
}

export const getProductBySlug = async (slug: string): Promise<iProductDetail | undefined> => {

    let data = await api.get(`/product/getProductBySlug?slug=${slug}`)
    

    return data.data
}