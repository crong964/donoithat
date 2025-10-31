'use client'

import { useDispatch, useSelector } from "react-redux"
import { setCategory, setIdEdit } from "@/redux/admin/category/categoryRedux"
import { RootState } from "@/redux/admin/reduxRoot"
import { Wrench } from "lucide-react"
import { iMainCateGory } from "@/components/category/interface"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { memo } from "react"

function CategoryItem(p: {
    data: iMainCateGory,
}) {
    const path = usePathname()
    const mainCategory = p.data
    const categoryItem = p.data.categoryChidlren
    const s = mainCategory.categoryId != undefined && path.indexOf(mainCategory.categoryId) >= 0
    return (
        <Link href={`/admin/category/${s ? "" : mainCategory.categoryId}`}
            key={mainCategory.id}
            className="mb-4 flex space-x-2 relative w-full bg-white p-2 cursor-pointer shadow-form rounded-sm" >
            {
                mainCategory.categoryId != undefined && path.indexOf(mainCategory.categoryId) >= 0 ?
                    <div className="absolute top-0 right-0 p-2" >
                        <Wrench size={15} />
                    </div> :
                    <> </>
            }
            <div className="basis-2/12" >
                {
                    mainCategory.categoryImage ?
                        <img src={mainCategory.categoryImage} alt={mainCategory.nameCategory} srcSet="" /> : <></>
                }
            </div>
            < div className="flex-1" >
                <section className="flex items-center" >
                    <header className="py-2 text-sm basis-3/12" >
                        <p>Tên loại sản phẩm </p>
                    </header>
                    < div className="flex-1 px-2" >
                        <span>{mainCategory.nameCategory} </span>
                    </div>
                </section>

                < section className="flex items-center mt-4" >
                    <span className="py-2 text-sm basis-3/12" > Danh sách phụ </span>
                    < div className="flex-1 px-3" >
                        <div className="flex flex-wrap gap-1" >
                            {
                                categoryItem
                                    .map((option,i) => {
                                        return (
                                            <span key={i} className="px-2 rounded-sm shadow-2xl border" > {option.nameCategory} </span>
                                        )
                                    })
                            }
                        </div>
                    </div>
                </section>
            </div>

        </Link>
    )
}

export default memo(CategoryItem)