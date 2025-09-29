'use client'
import { searchProduct } from "@/service/product-service";
import Form from "next/form";
import { useActionState, useEffect, useState } from "react";
import { iGetProduct } from "@/components/product/interface";
import priceFormat from "@/util/price-format";
import Link from "next/link";


export default function Search() {
    const [name, setName] = useState("")
    const [data, setData] = useState<iGetProduct>({
        nameCate: "",
        page: 0,
        productModels: [],
        totalItem: 0,
        totalPage: 0
    })
    const [focus, setFocus] = useState(false)
    useEffect(() => {
        if (name.length <= 0) {
            return
        }
        const f = setTimeout(async () => {
            try {
                let json = await fetch("/api/product/search-quickly?name=" + name, {
                    method: "GET",
                })
                let data = await json.json() as iGetProduct
                setData(data)
            } catch (error) {

            }
        }, 300);
        return () => {
            clearTimeout(f)
        };
    }, [name]);
    const items = data.productModels
    return (
        <search className="ml-5 pr-6.25 flex-1">
            {
                !focus ? <></> : (
                    <div onClick={() => setFocus(false)}
                        className="fixed top-0 left-0  z-40 w-screen h-screen">
                    </div>
                )
            }
            <div className="max-w-170 mx-auto ">
                <div onClick={() => setFocus(true)}
                    className="relative">
                    <Form action="/search" className="bg-white py-0.75 pl-3.75 flex rounded-sm">
                        <input onChange={(v) => setName(v.currentTarget.value)} type="text"
                            name="title"
                            autoComplete="off"
                            placeholder="Tìm kiếm sản phẩm..."
                            className="text-black font-light text-sm focus:outline-none flex-1" />
                        <button className="bg-f w-17.5 h-8.75 mx-[2px] rounded-sm">
                            <svg version="1.1" className="w-4.5 fill-white  mx-auto"
                                xmlns="http://www.w3.org/2000/svg"
                                x="0px" y="0px" viewBox="0 0 24 27"  >
                                <path d="M10,2C4.5,2,0,6.5,0,12s4.5,10,10,10s10-4.5,10-10S15.5,2,10,2z M10,19c-3.9,0-7-3.1-7-7s3.1-7,7-7s7,3.1,7,7S13.9,19,10,19z"></path><rect x="17" y="17" transform="matrix(0.7071 -0.7071 0.7071 0.7071 -9.2844 19.5856)" width="4" height="8"></rect></svg>
                        </button>
                    </Form>
                    {focus && name.length > 0 ?
                        <>
                            <div className="absolute pt-2 z-9999 top-full w-170 left-0 ">
                                <div className="w-full min-h-15 max-h-100 overflow-y-auto bg-white text-black shadow-pro px-5">
                                    {
                                        items.map((v) => {
                                            return (
                                                <Link onClick={() => {
                                                    setTimeout(() => {
                                                        setFocus(false)
                                                    }, 100);
                                                }} href={`/product/${v.slug}`} className="hover:text-f py-3 flex">
                                                    <div className="flex-1">
                                                        <p className="leading-3.25 mb-1.25 mt-2.5 text-[13px]">{v.nameProduct}</p>
                                                        <p className="leading-3.75  text-[12px]">{priceFormat(v.mainPrice + "")}₫</p>
                                                    </div>
                                                    <div className="w-10">
                                                        <img className="size-10" src={v.imageUrl} alt={v.nameProduct} srcSet="" />
                                                    </div>
                                                </Link>
                                            )
                                        })
                                    }

                                </div>
                            </div>
                        </>
                        :
                        <>
                        </>
                    }
                </div>

                <div className="max-lg:hidden text-[12px] text-white h-5 leading-[17px]">
                    <ul className="flex mt-2.5 gap-5">
                        <li className="flex items-center gap-1.25">
                            <img src="/header_03_policy_1_ico.png" className="h-5" alt="" srcSet="" />
                            <p> Giao hàng toàn quốc</p>
                        </li>
                        <li className="flex items-center gap-1.25">
                            <img src="/header_03_policy_2_ico.png" className="h-5" alt="" srcSet="" />
                            <p>Hệ thống cửa hàng BAYA</p>
                        </li>
                        <li className="flex items-center gap-1.25">
                            <img src="/header_03_policy_3_ico.png" className="h-5" alt="" srcSet="" />
                            <p>Hotline: 1900 63 64 76 (9-21h)</p>
                        </li>

                    </ul>
                </div>
            </div>
        </search>

    )
}