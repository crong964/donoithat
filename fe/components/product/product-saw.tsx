'use client'
import ProductHome from "./product-home"
import { MainCarousel } from "../ui/carousel"
import { JSX, useEffect, useState } from "react"
import { iProduct } from "./interface"
import Link from "next/link"

export default function ProductSaw() {
    const [ls, setLs] = useState<{ [key: string]: iProduct }>({})
    useEffect(() => {
        setLs(JSON.parse(localStorage.getItem("ls") || "{}"))
        return () => {
        };
    }, []);

    const productls: JSX.Element[] = []

    for (const key in ls) {
        if (Object.prototype.hasOwnProperty.call(ls, key)) {
            const element = ls[key];
            productls.push(
                <ProductHome {...element} key={element.slug} />
            )
        }
    }
    return (
        <section className="lg:px-3.75  pb-17.5">
            <div className="mb-5">
                <h2 className="text-[24px] font-bold leading-7.25 text-f">
                    <Link href="#" >Sản phẩm đã xem</Link>
                </h2>
            </div>
            <MainCarousel >
                {productls}
            </MainCarousel>
        </section>
    )
}