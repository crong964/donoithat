import CartProduct from "@/components/route/client/cart/cart";
import { getAllAddresses } from "@/service/address-service";
import { getAllProductCart } from "@/service/cart-service";
import { getUserInfor } from "@/service/user-service";
import { redirect } from "next/navigation";

export default async function CartPage() {
  const data = await Promise.all([
    getAllProductCart(),
    getUserInfor(),
    getAllAddresses(),
  ]);
  const productVariantCarts = data[0];
  const infor = data[1];
  const addresses = data[2];
  if (infor == undefined) {
    redirect("/account/login");
  }
  return (
    <CartProduct
      numberPhone={infor.phoneNumber}
      ls={productVariantCarts}
      addresses={addresses}
    />
  );
}
