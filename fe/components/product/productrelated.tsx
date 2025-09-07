import Link from "next/link"
import { iProduct } from "./interface"
import { MainCarousel } from "../ui/carousel"
import ProductHome from "./producthome"

export default function ProductRelated(p: { ls: iProduct[] }) {
    const relatedProducts = p.ls
    return (
        <section className="lg:px-3.75 mt-10 pb-17.5">
            <div className="mb-5">
                <h2 className="text-[24px] font-bold leading-7.25 text-f">
                    <Link href="#" >Xem thêm sản phẩm cùng loại</Link>
                </h2>
            </div>
            <MainCarousel >
                {relatedProducts
                    .map((v) => {
                        return (
                            <ProductHome {...v} key={v.slug} />
                        )
                    })}
            </MainCarousel>
        </section>
    )
}