'use client'
import { useDispatch, useSelector } from "react-redux";
import { IProductVariant } from "@/components/route/admin/product/interface";
import { memo, useState } from "react";
import { setOpen } from "@/redux/admin/product/mediaLibraryRedux";
import { RootState } from "@/redux/admin/reduxRoot";
import { Input } from "antd";
import { ArrowUpToLine, Image, Trash2, X } from "lucide-react"
import { setIamgeVariants, setProductVariant, setProductVariants } from "@/redux/admin/product/productRedux";
import ImageProduct from "@/components/route/admin/product/image-product";
import PriceFormat from "@/util/price-format"
function ProductVariantItemInput(v: IProductVariant) {
    const dispatch = useDispatch()
    const imageVariants = useSelector((state: RootState) => state.product.imageVariants)
    const imageurls = useSelector((state: RootState) => state.product.imageurls)
    const [open, setOpen] = useState(false)
    const productVariant = v
    let url = imageurls[productVariant.image]?.url
    return (
        <>
            <ImageProduct open={open} onchange={(i) => {
                if (i != -1) {
                    let temp = { ...imageVariants }
                    dispatch(setIamgeVariants(temp))
                    let tempProductVariants: IProductVariant = { ...v, image: i }
                    dispatch(setProductVariant(tempProductVariants))
                }
                setOpen(false)
            }} />
            <li className="flex py-4 gap-x-3">
                <div className="basis-1/3">
                    <span className="inline-block px-1">
                        <button type="button" onClick={() => {
                            setOpen(true)
                        }} className="aspect-square flex cursor-pointer justify-center items-center size-25 border">
                            {url ?
                                <img src={url} className="object-cover size-full" alt="" /> :
                                <Image size={20} />
                            }

                        </button>
                    </span>
                </div>
                <div className="basis-1/3 ">
                    <span className="inline-block px-1 ">
                        {productVariant.variantName}
                    </span>
                </div>
                <div className="basis-1/5">
                    <Input onChange={(t) => {
                        let f = t.currentTarget.value
                        let temp = { ...v }
                        temp.price = parseInt(f.replaceAll(',', ''))
                        dispatch(setProductVariant(temp))
                    }} placeholder="Giá sản phẩm" value={PriceFormat(productVariant.price + "")} >
                    </Input>
                </div>
                <div className="basis-1/5">
                    <Input onChange={(t) => {
                        let f = t.currentTarget.value
                        let temp = { ...v }
                        temp.quality = parseInt(f.replaceAll(',', '')) + ""
                        dispatch(setProductVariant(temp))
                    }} placeholder="Số lượng" value={PriceFormat(productVariant.quality + "")} />

                </div>
            </li>
        </>
    )
}

export default memo(ProductVariantItemInput)