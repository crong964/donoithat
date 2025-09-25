'use server'
import { iMainCateGory } from "@/components/category/interface"
import { iOrderInAdmin } from "@/components/order/interface"
import { api } from "@/util/fetch"


export const getOrders = async (p?: number): Promise<iOrderInAdmin[]> => {
    try {
        let data = undefined
        if (p == undefined) {
            data = await api.get(`/admin/order`)
            return data.data
        }
        data = await api.get(`/admin/order?orderStatus=${p}`)
        return data.data
    } catch (error) {
        return []
    }
}

