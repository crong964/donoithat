"use client"
import Link from "next/link"
import { useState } from "react"

export default function Category(p: MainCateGory) {
    const [s, sS] = useState(false)
    const subCata = p.categoryChidlren.map((v) => {
        return (
            <li key={v.slug} className="px-4.5  py-2.25 text-[14px]">
                <Link className="text-text-shop font-normal" href={`/colection/${v.slug}`}>
                    {v.nameCategory}
                </Link>
            </li>
        )
    })
    return (
        <li
            onMouseLeave={() => {
                sS(false)
            }}
            onMouseEnter={() => {
                sS(true)
            }} className="relative inline-block tracking-[0.75px] text-[14px] leading-[20px] mx-3.75 ">
            <Link href={`/colection/${p.slug}`} className="  py-3.75  inline-block">{p.nameCategory}
                <svg className="inline-block size-2.5" xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 448 512">
                    <path d="M201.4 374.6c12.5 12.5 32.8 12.5 45.3 0l160-160c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L224 306.7 86.6 169.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l160 160z" /></svg>
            </Link>
            <ul className={`${s ? "" : "hidden"} min-w-55  animate-cate text-[11px] absolute bg-white h-max top-full shadow-pro`}>
                {
                    subCata
                }
            </ul>
        </li>
    )
}