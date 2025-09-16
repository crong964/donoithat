'use client'
import Link from "next/link";
import { iProductVariantCart } from "./interface";
import PriceFormat from "@/util/Price";
import CartProductRemoveButton from "@/components/client/product/cart-product-remove-button";
import { useActionState } from "react";
import { updateProductCart } from "@/service/cart-service";
import Form from "next/form";

export default function ProductCart(p: iProductVariantCart) {
    const [message, formAction, pending] = useActionState(updateProductCart, null)
    return (
        <div className="w-full flex relative px-2.5 py-3.75">
            <CartProductRemoveButton productVariantId={p.productVariantId} />
            <div className="basis-20 ">
                <Link href={"/"}>
                    <img className="min-w-20 border border-boder h-auto"
                        src={p.image} alt="" srcSet="" />
                </Link>
            </div>
            <div className="flex-1 px-4.5">
                <Link href={`/product/${p.productId}`} className="mb-2.5 font-medium">
                    <h3 className="text-[15px] max-md:line-clamp-1 leading-4.5 ">
                        {p.productVariantName}
                    </h3>
                    <h4 className="text-[12px] text-[#777] max-md:line-clamp-1 leading-4.25 ">
                        {p.variantName}
                    </h4>
                </Link>
                <div>
                    <p>
                        <span className="text-[14px] text-[#8f9bb3] leading-5 font-semibold">
                            {PriceFormat((p.price) + "")}₫</span>
                    </p>
                </div>
            </div>
            <div className="basis-20">
                <div>
                    <h3 className="text-[16px] leading-5.75 font-bold">
                        {PriceFormat((parseInt(p.price + "") * p.quality) + "")}₫
                    </h3>
                </div>
                <div className="flex mt-2.25 mb-0.75">
                    <Form action={formAction} className="cursor-pointer">
                        <input type="hidden" name="productVariantId" value={p.productVariantId} />
                        <input type="hidden" name="quality" value={p.quality - 1} />
                        <button className="size-7 border-1 cursor-pointer border-boder flex items-center justify-center">
                            <svg focusable="false" className="size-2 " viewBox="0 0 10 2" role="presentation">
                                <path d="M10 0v2H0V0z"></path>
                            </svg>
                        </button>
                    </Form>

                    <div className="size-7 border-1 border-boder flex items-center justify-center">
                        <p className="text-[15px] leading-5.5 font-medium">{p.quality}</p>
                    </div>
                    <Form action={formAction} >
                        <input type="hidden" name="productVariantId" value={p.productVariantId} />
                        <input type="hidden" name="quality" value={p.quality + 1} />
                        <button type="submit" className="size-7 border-1 cursor-pointer border-boder flex items-center justify-center">
                            <svg focusable="false" className="size-2 " viewBox="0 0 10 10" role="presentation">
                                <path d="M6 4h4v2H6v4H4V6H0V4h4V0h2v4z"></path>
                            </svg>
                        </button>
                    </Form>
                </div>
            </div>
        </div>
    )
}