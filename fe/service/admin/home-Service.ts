import { iHomeAdminGet } from "@/components/admin/home/interface"
import { api } from "@/util/fetch"

export const getHomeAdmin = async (): Promise<iHomeAdminGet | undefined> => {

    try {
        let data = await api.get(`/admin/home`)
        return data.data
    } catch (error) {

        return undefined
    }
}