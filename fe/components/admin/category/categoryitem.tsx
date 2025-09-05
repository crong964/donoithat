'use client'

import { useDispatch, useSelector } from "react-redux"
import { ICcategoryItem } from "./interface"
import { setIdEdit } from "@/redux/admin/category/categoryRedux"
import { RootState } from "@/redux/admin/reduxRoot"
import { Wrench } from "lucide-react"

export default function CategoryItem(p: {
    data: ICcategoryItem, i: number
}) {
    const dispatch = useDispatch()
    const i = useSelector((state: RootState) => state.category.i)
    const categoryItem = p.data
    return (
        <div onClick={() => {
            dispatch(setIdEdit(p.i))
        }} key={categoryItem.id} className="mb-4 relative bg-white p-2 cursor-pointer shadow-form rounded-sm">
            {
                i == p.i ?
                    <div className="absolute top-0 right-0 p-2">
                        <Wrench size={15}/>
                    </div> :
                    <></>
            }
            <section className="flex items-center">
                <header className="py-2 text-sm basis-3/12">
                    <p>Tên loại sản phẩm</p>
                </header>
                <div className="flex-1 px-2">
                    <span >{categoryItem.name}</span>
                </div>
            </section>
            <section className="flex items-center mt-4">
                <span className="py-2 text-sm basis-3/12">Danh sách phụ </span>
                <div className="flex-1">
                    <div className="flex flex-wrap gap-1">
                        {
                            categoryItem.con
                                .map((option) => {
                                    return <span key={option.id} className="px-2 rounded-sm shadow-2xl border"> {option.name}</span>
                                })
                        }
                    </div>
                </div>
            </section>
        </div>
    )
}