
import Link from "next/link";
import { getCategory } from "@/service/category-service";
import { getUserInfor } from "@/service/user-service";
import { getAllProductCart } from "@/service/cart-service";
import HeaderNavi from "./header-navi";

export default async function Header() {
  let datas = await Promise.all([
    getCategory(),
    getUserInfor(),
    getAllProductCart(),
  ]);
  let category = datas[0];
  let user = datas[1];
  const productVariantCarts = datas[2];
  return (
    <>
      <Link href="/" className="flex justify-center">
        <img
          src="/topbar_img.jpg"
          className="max-w-450 w-full h-auto"
          alt=""
          srcSet=""
        />
      </Link>
      <HeaderNavi category={category} ls={productVariantCarts} user={user} />
    </>
  );
}
