import { setTypeProduct } from "@/redux/admin/product/productRedux"
import { RootState } from "@/redux/reduxRoot"
import { category } from "@/tempdata/category"
import { Select } from "antd"
import { memo } from "react"
import { useDispatch, useSelector } from "react-redux"

function Category() {
    const dispatch = useDispatch()
    const typeProduct = useSelector((state: RootState) => state.product.typeProduct)
    const select = category.map((v) => {
        const children = v.con.map((vc) => {
            return {
                label: <span>{vc.name}</span>,
                value: vc.id
            }
        })
        return {
            label: <span>{v.name}</span>,
            value: v.id,
            options: children
        }
    })
    return (
        <div className="mb-4">
            <section className="mb-1">
                <div className="flex space-x-1">
                    <p className="text-sm font-bold">
                        Loại sản phầm
                    </p>
                    <p className="text-red-600">*</p>
                </div>
            </section>
            <Select
                onChange={(v) => {
                    dispatch(setTypeProduct(v))
                }}
                style={{ width: "100%" }}
                options={select}
                defaultValue={typeProduct}
            />
        </div>
    )
}

export default memo(Category)