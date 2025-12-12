import CategoryHeaderLayout from "@/components/route/admin/category/categery-hearder-layout";
import CategoryItem from "@/components/route/admin/category/category-item";
import {
  getCategory,
  getCategoryInProduct,
} from "@/service/admin/category-service";

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  const data = await getCategory();
  const category = data;
  return (
    <>
      <div className="flex px-10 gap-3">
        <section className="basis-1/2">
          <div className="">
            <CategoryHeaderLayout />
            <main>
              {category.map((v, i) => {
                return <CategoryItem key={v.categoryId || i} data={v} />;
              })}
            </main>
          </div>
        </section>
        <section className="flex-1 shrink grow px-2">
          <div className="w-full  sticky pb-10 top-0 right-0">{children}</div>
        </section>
      </div>
    </>
  );
}
