import { setTypeProduct, setVendor } from "@/redux/admin/product/productRedux"
import { RootState } from "@/redux/admin/reduxRoot"
import vendors from "@/tempdata/vendors"
import { Select } from "antd"
import { memo } from "react"
import { useDispatch, useSelector } from "react-redux"

function Vendor() {
    const dispatch = useDispatch()
    const vendor = useSelector((state: RootState) => state.product.vendor)
    const select = vendors.map((v) => {
        return {
            label: <p className="">{v}</p>,
            value: v,
        }
    })
    return (
        <div className="mb-4">
            <section className="mb-1">
                <div className="flex space-x-1">
                    <p className="text-sm font-bold">
                        Vendor
                    </p>
                    <p className="text-red-600">*</p>
                </div>
            </section>
            <Select
                onChange={(v) => {
                    dispatch(setVendor(v))
                }}
                style={{ width: "100%" }}
                options={select}
                defaultValue={vendor}
            />
        </div>
    )
}

export default memo(Vendor)