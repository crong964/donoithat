import CartProduct from "@/components/client/cart/Cart";
import { getAllAddresses } from "@/service/addressService";
import { getAllProductCart } from "@/service/cartService";
import { getUserInfor } from "@/service/userService";
import { redirect } from "next/navigation";


export default async function CartPage() {
    const data = await Promise.all([getAllProductCart(), getUserInfor(), getAllAddresses()])
    const productVariantCarts = data[0]
    const infor = data[1]
    const addresses = data[2]
    if (infor == undefined) {
        redirect("/account/login")
    }
    return (
        <CartProduct
            numberPhone={infor.phoneNumber}
            ls={productVariantCarts}
            addresses={addresses} />
    )
}