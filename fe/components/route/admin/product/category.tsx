'use client'
import { iMainCateGory } from "@/components/category/interface"
import { setTypeProduct } from "@/redux/admin/product/productRedux"
import { RootState } from "@/redux/admin/reduxRoot"
import { category } from "@/tempdata/category"
import { Select } from "antd"
import { memo, useEffect, useMemo, useState } from "react"
import { useDispatch, useSelector } from "react-redux"

function Category() {
    const dispatch = useDispatch()
    const typeProduct = useSelector((state: RootState) => state.product.typeProduct)
   
    
    const [data, setData] = useState<iMainCateGory[]>([])
    useEffect(() => {
        fetch("http://localhost:2000/api/category").then((v) => {
            return v.json()
        })
            .then((v) => {
                setData(v)

            })
        return () => {

        };
    }, []);
    const select = useMemo(() => {
        let s = data.map((v) => {
            const children = v.categoryChidlren.map((vc) => {
                return {
                    label: <span>{vc.nameCategory}</span>,
                    value: vc.slug
                }
            })
            return {
                label: <span>{v.nameCategory}</span>,
                value: v.slug,
                options: children
            }
        })
        return s
    }, [data])
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