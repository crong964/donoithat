import Navi from "@/components/layout/navi"
import ProductItem from "@/components/product/productitem"
import { getProduct } from "@/service/productService"
import Link from "next/link"

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
    return (
        <>
            <Navi />
            <div className="flex">
                <nav className="max-lg:hidden basis-1/4 px-3.75">
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
                    <section className="bg-white shadow-a rounded-sm mb-3.5">
                        <div className="px-3.25 py-2.5 ">
                            <h3 className="text-[16px] leading-5.75 font-bold">Giá</h3>
                        </div>
                        <div className="p-2.5  border-t border-boder">
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
                        </div>
                    </section>
                </nav>
                <div className="flex-1 lg:px-3.75">
                    <img src="/slide_4_img.jpg" alt="" srcSet="" />
                    <div className="max-lg:px-3.75 py-2.5 lg:py-3.75">
                        <div className="flex max-lg:flex-col lg:items-center">
                            <h1 className="text-f font-bold text-[24px] leading-7.25">Tủ kệ</h1>
                            <span className="lg:pl-7.5 text-[14px] leading-5 tracking-normal">
                                <b>15</b>
                                <span className=""> sản phẩm</span>
                            </span>
                        </div>
                    </div>
                    <div className="flex flex-wrap">
                        {data.productModels.map((v) => {
                            return <ProductItem {...v} key={v.productId} />
                        })}
                    </div>
                </div>
            </div>
        </>
    )
}