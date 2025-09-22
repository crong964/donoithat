import { setCategory } from "@/redux/admin/category/categoryRedux"
import { RootState } from "@/redux/admin/reduxRoot"
import removeAccents from "@/util/remove-accents"
import { Button, Input } from "antd"
import { Ban, Settings, SquarePlus, Trash } from "lucide-react"
import { useDispatch, useSelector } from "react-redux"

export default function AddCategoryForm() {
    const mainCategory = useSelector((state: RootState) => state.category)
    const action = useSelector((state: RootState) => state.category.action)
    const con = mainCategory.categoryItem.map((v) => {
        return { ...v }
    })
    const dispatch = useDispatch()
    if (action != 'add') {
        return <></>
    }
    return (
        <>
            <header>
                <h1 className="text-2xl font-bold">
                    <p>Thêm thể loại mới</p>
                </h1>
            </header>
            <main className=" bg-white p-2 rounded-sm shadow-form">
                <section className="my-3.75">
                    <div className="flex">
                        <div className="basis-3/12">
                            <p>Tên loại chính</p>
                        </div>
                        <div className="flex-1">
                            <Input onChange={(v) => {
                                let text = v.currentTarget.value
                                dispatch(setCategory({
                                    categoryItem: con,
                                    id: removeAccents(text),
                                    name: text
                                }))

                            }} value={mainCategory.name} />
                        </div>
                    </div>
                </section>
                <section className="my-3.75">
                    <div className="flex">
                        <div className="basis-3/12">
                            <p>Slug</p>
                        </div>
                        <div className="flex-1">
                            <Input onChange={(v) => {
                                let text = v.currentTarget.value
                                dispatch(setCategory({
                                    categoryItem: con,
                                    id: text,
                                    name: mainCategory.name
                                }))
                            }} value={mainCategory.id} />
                        </div>
                    </div>
                </section>
                <section>
                    <div className="flex">
                        <div className="basis-3/12">
                            <p>Tên loại phụ</p>
                        </div>
                        <div className="flex-1">
                            {
                                con.map((v, i) => {
                                    return (
                                        <div className="flex">
                                            <Input key={i} onChange={(tv) => {
                                                let text = tv.currentTarget.value
                                                if (i == con.length - 1) {
                                                    con.push({ id: i + 1 + "", name: "" })
                                                }
                                                v.name = text
                                                v.id = removeAccents(v.name)
                                                dispatch(setCategory({
                                                    categoryItem: con,
                                                    id: mainCategory.id,
                                                    name: mainCategory.name
                                                }))
                                            }} placeholder="Nhập" value={v.name} />
                                            <Button icon={<Trash />}>
                                            </Button>
                                        </div>
                                    )
                                })
                            }
                        </div>

                    </div>
                </section>
                <footer className="mt-3.75">
                    <ul className="flex justify-between">
                        <li>
                            <Button icon={<Ban size={15} />} type="default" variant="solid" color="danger">
                                Hủy
                            </Button>
                        </li>
                        <li>
                            <Button icon={<SquarePlus size={15} />} type="primary" >
                                Thêm
                            </Button>
                        </li>

                    </ul>
                </footer>
            </main>
        </>
    )
}