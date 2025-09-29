'use client'
import Link from "next/link"
import { useParams, useRouter, useSearchParams } from "next/navigation"



export default function OrderLink(p: { ls: string[] }) {
    const pathname = useSearchParams().get("type")
    const status = p.ls
    return (
        <div className="my-3.75  px-2">
            <ul className="bg-a rounded-2xl flex">
                <Link className="" href={`/admin/order`}>
                    <p className={`${pathname == undefined ? "border-b-f" : "border-b-white"} border-b-4 text-center py-4 hover:text-f font-normal`}>
                        Tất cả đơn hàng
                    </p>
                </Link>
                {status.map((v, i) => {
                    return (
                        <li className="flex-1 bg-a ">
                            <Link key={v} className="" href={`/admin/order?type=${i}`}>
                                <p className={`${pathname == `${i}` ? "border-b-f" : "border-b-white"} border-b-4 text-center py-4 hover:text-f font-normal`}>
                                    {v}
                                </p>
                            </Link>
                        </li>
                    )
                })}
            </ul>
        </div>
    )
}