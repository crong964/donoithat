import Home from "@/components/client/home/home";
import { getProduct } from "@/service/productService";

export default async function HomePage() {
  const data = await getProduct({ slug: "all", page: "1" })
  if (data == null || data.productModels == null) {
    return <></>
  }
  return (
    <Home {...data}></Home>
  );
}
