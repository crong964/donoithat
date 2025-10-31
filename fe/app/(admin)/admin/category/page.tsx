import AddCategoryForm from "@/components/route/admin/category/add-category-form";

export default async function CategoryPage() {

    return (
        <AddCategoryForm key={Date.now()} />
    )
}

