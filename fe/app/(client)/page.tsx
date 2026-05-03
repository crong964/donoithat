import Home from "@/components/client/home/home";
import Test from "@/components/client/home/test";
import { getCategory } from "@/service/category-service";
import { getProduct } from "@/service/product-service";

export default async function HomePage() {
  const data = await getProduct({ slug: "all", page: "1" });
  const categories = await getCategory();

  if (data == null || data.productModels == null) {
    return <Test></Test>;
  }
  return (
    <Home
      categories={categories.filter((v) => v.categoryImage != undefined)}
      products={data}
    />
  );
}
