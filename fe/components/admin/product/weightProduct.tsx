import { setWeightProduct } from "@/redux/admin/product/productRedux"
import { RootState } from "@/redux/reduxRoot"
import { Input } from "antd"
import { useDispatch, useSelector } from "react-redux"

export default function WeightProduct() {
    const weightProduct = useSelector((state: RootState) => state.product.weightProduct)
    const dispatch = useDispatch()
    return (
        <div className="mb-4">
            <div className="mb-4">
                <div className='flex space-x-1'>
                    <h1 className="text-sm font-bold">
                        Khối lượng
                    </h1>
                    <p className='text-red-600'>*</p>
                </div>
            </div>
            <div className="shadow-2xl bg-white p-2">
                <div className="flex items-center gap-x-3">
                    <div className="w-max">
                        <span className='flex space-x-1'><p>Khối lượng</p> <p className='text-red-600'>*</p></span>
                    </div>
                    <div className="flex-1">
                        <Input
                            required type='number'
                            value={weightProduct.value}
                            placeholder="0.8"
                            onChange={(v) => {
                                let text = v.currentTarget.value
                                dispatch(setWeightProduct({
                                    ...weightProduct, value: parseInt(text)
                                }))
                            }}
                        />
                    </div>
                    <div className="w-max">
                        <div className='flex space-x-1'>
                            <p >Đơn vị tính</p>
                            <p className='text-red-600'>*</p>
                        </div>
                    </div>
                    <div className="flex-1">
                        <Input onChange={(v) => {
                            let text = v.currentTarget.value
                            dispatch(setWeightProduct({
                                ...weightProduct, measure: text
                            }))
                        }}
                            required
                            value={weightProduct.measure}
                            placeholder="kg hoặc cái..." />
                    </div>
                </div>
            </div>
        </div>
    )
}