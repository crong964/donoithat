import SuplierAdminEditForm from "@/components/admin/suplier/edit-suplier-form"
import { getSuplier } from "@/service/admin/suplier-service"
import { redirect } from "next/navigation"

export default async function SuplierAdminEditPage({ searchParams }: { searchParams: Promise<{ suplierId: string | undefined }> }) {
    const suplierId = (await searchParams).suplierId
    if (suplierId == undefined) {
        return redirect("/admin/suplier")
    }
    const data = await getSuplier(suplierId)
    if (data == undefined) {
        redirect("/admin/suplier")
    }
   
    
    return <SuplierAdminEditForm {...data} />
}