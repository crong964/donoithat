import { iHomeAdminGet } from "@/components/admin/home/interface"
import { iInventory, iInventoryGet } from "@/components/admin/warehouse/inventory/interface"
import { api } from "@/util/fetch"



export const getInventoryAdmin = async (p?: iInventoryGet): Promise<{
    data: iInventory[],
    curPage: number,
    totalPage: number
}> => {
    try {
        let data = await api.get(`/admin/inventory?curpage=${p?.curPage}&inventoryName=${p?.inventoryName || ""}&onSale=${p?.onSale || "all"}`)
        return data.data
    } catch (error) {
        console.log((error as any)?.response?.data);

        return { curPage: 0, data: [], totalPage: 0 }
    }
}