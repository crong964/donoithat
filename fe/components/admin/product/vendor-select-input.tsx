
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select"
import { setVendor } from "@/redux/admin/product/productRedux"
import { RootState } from "@/redux/admin/reduxRoot"
import vendors from "@/tempdata/vendors"
import React from "react"
import { memo } from "react"
import { useDispatch, useSelector } from "react-redux"

function Vendor() {
    const dispatch = useDispatch()
    const vendor = useSelector((state: RootState) => state.product.vendor)
   
    return (
        <div className="mb-4">
            <Select value={vendor} onValueChange={(v) => {
                dispatch(setVendor(v))
            }}>
                <SelectTrigger className="w-70">
                    <SelectValue placeholder="Chọn nhà cung ứng" />
                </SelectTrigger>
                <SelectContent>
                    <SelectGroup>
                        <SelectLabel>Nhà cung ứng</SelectLabel>
                        {
                            vendors.map((vendorItem) => {
                                return (
                                    <SelectItem value={vendorItem}>{vendorItem}</SelectItem>
                                )
                            })
                        }
                    </SelectGroup>
                </SelectContent>
            </Select>
        </div>
    )
}

export default memo(Vendor)