'use client'
import { category } from "@/tempdata/category"
import CategoryItem from "./categoryitem"
import { Input } from "antd"
import { useDispatch, useSelector } from "react-redux"
import { RootState } from "@/redux/admin/reduxRoot"
import { setCategory } from "@/redux/admin/category/categoryRedux"
import removeAccents from "@/util/RemoveAccents"
import AddCategoryForm from "./addCategoryForm"
import EditCategoryForm from "./editCategoryForm"


export default function Categories() {

    return (
        <>
            <div className="flex px-10 gap-3">
                <section className="basis-1/2">
                    <div className="">
                        <header>
                            <h1 className="font-bold text-2xl">
                                Danh sách loại sản phẩm
                            </h1>
                        </header>
                        <main>
                            {category.map((v, i) => {
                                return <CategoryItem data={v} i={i} key={v.id} />
                            })}
                        </main>
                    </div>
                </section>
                <section className="flex-1 shrink grow px-2">
                    <div className="w-full  sticky pb-10 top-0 right-0">
                        <AddCategoryForm />
                        <EditCategoryForm />
                    </div>
                </section>
            </div>
        </>
    )
}