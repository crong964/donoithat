import AddCategoryForm from "@/components/admin/category/add-category-form";
import { getCategory } from "@/service/admin/category-service";

export default async function CategoryPage() {

    return (
        <AddCategoryForm key={Date.now()} />
    )
}

