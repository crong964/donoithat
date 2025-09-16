import CategoryCombobox from "@/components/admin/category/category-combo-box";
import { getCategoryInProduct } from "@/service/admin/category-service";

export default async function Layout({ children }: { children: React.ReactNode }) {
    const cate = await getCategoryInProduct()
    return (
        <>
            <CategoryCombobox ls={cate} />
            {children}
        </>
    )
}