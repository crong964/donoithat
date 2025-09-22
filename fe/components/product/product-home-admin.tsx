'use client'
import PriceFormat from "@/util/price-format";
import { Switch } from "../ui/switch";
import { iProduct } from "./interface-admin";
import { Badge } from "../ui/badge";
import { PencilLine, SquarePen } from "lucide-react";
import Link from "next/link";
import { Fragment, useActionState } from "react";
import { Button } from "../ui/button";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import Form from "next/form";
import { updateVarient } from "@/service/admin/variant-service";
import SubmitButton from "../button/submit-buttom";
import VariantsHomeItem from "../variant/variant-home-item";

export default function ProductHomeAdmin(p: iProduct) {
    const total = p.productVariants.reduce((pre, cur) => {
        return pre + cur.quality
    }, 0)

    return (
        <Fragment>
            <tr className="border-t border-black pt-2 ">
                <td >
                    <div className="space-x-3 flex items-center justify-center">
                        <Switch checked={p.status == 1} />
                        <div>
                            {p.status ? "Công khai" : "Ẩn"}
                        </div>
                    </div>
                </td>
                <td className="py-3.75">
                    <div className="flex h-full space-x-2 items-center">
                        <div className="basis-20 ">
                            <img className="min-w-20 border border-boder h-auto"
                                src={p.imageUrl} alt={p.nameProduct} srcSet="" />
                        </div>
                        <div className="flex-1 h-full">
                            <h3 className=" max-md:line-clamp-1 leading-4.5 ">
                                {p.nameProduct}
                            </h3>
                        </div>
                    </div>
                </td>
                <td className="text-center">
                    {p.categoryName != "" ?
                        <Link href={`/admin/product?slug=${p.categorySlug}`}>
                            <Badge variant={"secondary"}>{p.categoryName}</Badge>
                        </Link> :
                        ""}
                </td>
                <td className="text-center pb-3.75">
                    {PriceFormat((p.mainPrice) + "")}₫
                </td>
                <td className="text-center pb-3.75">
                    {total}
                </td>
                <td>
                    <div className="flex space-x-2.5 justify-end">

                        <Link href={`/admin/product/${p.slug}`} >
                            <SquarePen />
                        </Link>
                    </div>
                </td>
            </tr>
            <tr>
                <td colSpan={6} className="my-6" >
                    <Collapsible className="group/collapsible">
                        <CollapsibleTrigger asChild>
                            <div className="my-5 text-center">
                                <Button variant={"outline"}>
                                    Mở rộng {p.productVariants.length}
                                </Button>
                            </div>
                        </CollapsibleTrigger>
                        <CollapsibleContent asChild>
                            <div className="grid grid-cols-2">
                                {
                                    p.productVariants.map((v) => {
                                        return (
                                            <VariantsHomeItem key={v.productVariantId} {...v} />
                                        )
                                    })
                                }
                            </div>
                        </CollapsibleContent>
                    </Collapsible>
                </td>
            </tr>


        </Fragment>
    )
}