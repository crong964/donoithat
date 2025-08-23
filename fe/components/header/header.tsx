"use client"
import Category from "../category/category"
import Search from "./search"
import Sign from "./sign"
import Cart from "./Cart"
import { AlignLeft, AlignRight } from "lucide-react"
import Sidebar from "./Sidebar"
import { category } from "@/tempdata/category"

export default function Header() {
    return (
        <>
            <a href="/">
                <img src="/topbar_img.jpg" className="w-full h-auto" alt="" srcSet="" />
            </a>
            <div className="">
                <div className="bg-f pt-2.5 pb-2.5 lg:pt-4.5 lg:pb-3.5">
                    <div className="max-w-350  mx-auto gap-5 flex max-lg:items-center max-lg:px-1.75">
                        <div className="max-lg:flex-1">
                            <div className="max-lg:flex items-center">
                                <Sidebar />
                                <div className="w-[150px] h-[60px] lg:h-[70px] px-3.75">
                                    <a href="/" className="size-full">
                                        <img src="/logo.png" className="h-full w-auto" alt="" srcSet="" />
                                    </a>
                                </div>
                            </div>
                        </div>
                        <div className=" lg:flex-1 px-3.75  fill-white">
                            <div className="flex  items-center text-white  font-normal">
                                <div className="hidden flex-1 lg:block">
                                    <Search />
                                </div>
                                <Sign />
                                <Cart />
                            </div>
                        </div>
                    </div>
                    <div className="lg:hidden">
                        <Search />
                    </div>
                </div>
                <div className="max-lg:hidden max-w-350 mx-auto  uppercase px-3.75">
                    <ul className="text-f fill-f font-medium flex flex-wrap gap-0.75 justify-center">
                        {category.map((v) => {
                            return (
                                <Category id={v.id} subCa={v.con} name={v.name} key={v.id} />
                            )
                        })}
                    </ul>
                </div>
            </div>
        </>
    )
}