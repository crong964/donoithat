import ProtectAction from "@/components/permission/protect-action";
import AddCategoryForm from "@/components/route/admin/category/add-category-form";

export default async function CategoryPage() {
  return (
    <ProtectAction permission="categery.add">
      <AddCategoryForm key={Date.now()} />
    </ProtectAction>
  );
}
