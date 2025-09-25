import EditCategoryForm from "@/components/admin/category/edit-category-form";
import { getCategoryById } from "@/service/admin/category-service";
import { redirect } from "next/navigation";

export default async function EditCategory({ params }: { params: Promise<{ id: string }> }) {
    const id = (await params).id
    const data = await getCategoryById(id)
    if (data == undefined) {
        redirect("/admin/category")
    }

    return <EditCategoryForm key={Math.random()} {...data} />
}