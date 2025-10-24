import Navi, { iNavi } from "@/components/layout/navi"
import ProductItem from "@/components/product/product-item"
import Pagination from "@/components/ui-custom/panination"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { getProduct } from "@/service/product-service"
import Link from "next/link"
import React from "react"

export default async function Colection(params:
    {
        params: Promise<{ slug: string }>,
        searchParams: Promise<{ [key: string]: string | undefined }>
    }) {
    const param = await params.params
    const searchParams = await params.searchParams
    const data = await getProduct({ slug: param.slug, page: searchParams.page })
    if (data == null || data.productModels == undefined) {
        return <></>
    }
    const ls: iNavi[] = [
        { name: "Danh mục", url: "/collections/all" }, { name: param.slug == null || param.slug == "all" ? "Tất cả sản phẩm" : data.nameCate, url: `/collections/${param.slug}` }]
    var s: Record<string, string> = {}
    data.productModels.map((v) => {
        return s[v.suplier] = ""
    })
    var suplierHtml: React.JSX.Element[] = []
    for (const key in s) {
        if (!Object.hasOwn(s, key)) continue;
        suplierHtml.push(
            <li id={key + 1} className="hover:border-f w-full cursor-pointer">
                <label htmlFor={key} >
                    <span className="pl-6.25 relative">
                        <input id={key} className="size-4 accent-f absolute top-0 left-0 border border-boder " type="checkbox" />
                    </span>
                    <span className="w-full max-w"> {key}</span>
                </label>
            </li>
        )

    }
    return (
        <>
            <Navi ls={ls} />
            <div className="flex">
                <aside className="max-lg:hidden basis-1/4 px-3.75">
                    <section className="bg-white shadow-a rounded-sm mb-3.5">
                        <div className="px-3.25 py-2.5 ">
                            <h3 className="text-[16px] leading-5.75 font-bold">Danh mục sản phẩm </h3>
                        </div>
                        <div className="p-2.5  border-t border-boder">
                            <ul className="text-[14px] font-medium tracking-letter leading-7">
                                <li><Link href="#">Được mua nhiều gần đây</Link></li>
                                <li><Link href="#">Sản phẩm mới</Link></li>
                                <li><Link href="#">Tất cả sản phẩm</Link></li>
                            </ul>
                        </div>
                    </section>

                    <Accordion
                        type="multiple"
                        className="w-full"
                    >
                        <AccordionItem value="item-1" className="bg-white shadow-a rounded-sm mb-3.5">
                            <AccordionTrigger className="px-3.25 py-2.5 ">
                                <h3 className="text-[16px] leading-5.75 font-bold">Danh mục sản phẩm </h3>
                            </AccordionTrigger>
                            <AccordionContent className="p-2.5  border-t border-boder">
                                <ul className="text-[14px] font-medium tracking-letter leading-7">
                                    <li><Link href="#">Được mua nhiều gần đây</Link></li>
                                    <li><Link href="#">Sản phẩm mới</Link></li>
                                    <li><Link href="#">Tất cả sản phẩm</Link></li>
                                </ul>
                            </AccordionContent>
                        </AccordionItem>
                        <AccordionItem className="bg-white shadow-a rounded-sm mb-3.5" value="item-2">
                            <AccordionTrigger className="px-3.25 py-2.5 ">
                                <h3 className="text-[16px] leading-5.75 font-bold">Nhà cung cấp</h3>
                            </AccordionTrigger>
                            <AccordionContent className="p-2.5  border-t border-boder">
                                <ul className="text-[14px] font-normal tracking-letter leading-7">
                                    {suplierHtml}
                                </ul>
                            </AccordionContent>
                        </AccordionItem>
                        <AccordionItem value="item-3" className="bg-white shadow-a rounded-sm mb-3.5">
                            <AccordionTrigger className="px-3.25 py-2.5 ">
                                <h3 className="text-[16px] leading-5.75 font-bold">Giá</h3>
                            </AccordionTrigger>
                            <AccordionContent className="p-2.5  border-t border-boder">
                                <ul className="text-[14px] font-normal tracking-letter leading-7">
                                    <li className="hover:border-f w-full cursor-pointer">
                                        <label htmlFor="1" >
                                            <span className="pl-6.25 relative">
                                                <input id="1" className="size-4 accent-f absolute top-0 left-0 border border-boder " type="checkbox" />
                                            </span>
                                            <span className="w-full max-w"> Dưới 1,000,000 đ</span>
                                        </label>
                                    </li>
                                </ul>
                            </AccordionContent>
                        </AccordionItem>
                    </Accordion>

                </aside>
                <div className="flex-1 lg:px-3.75">
                    <img src="/slide_4_img.jpg" alt="" srcSet="" />
                    <div className="max-lg:px-3.75 py-2.5 lg:py-3.75">
                        <div className="flex max-lg:flex-col lg:items-center">
                            <h1 className="text-f font-bold text-[24px] leading-7.25">{data.nameCate || "Tất cả sản phẩm"}</h1>
                            <span className="lg:pl-7.5 text-[14px] leading-5 tracking-normal">
                                <b>{data.totalItem}</b>
                                <span className=""> sản phẩm</span>
                            </span>
                        </div>
                    </div>
                    <div className="flex flex-wrap">
                        {data.productModels.map((v) => {
                            return <ProductItem {...v} key={v.slug} />
                        })}
                    </div>
                    <div>
                        <Pagination page={parseInt(searchParams.page || "1")}
                            total={data.totalPage}
                            url={param.slug == null ? "/collections/all?" : `/collections/${param.slug}?`} />
                    </div>
                </div>
            </div>
        </>
    )
}