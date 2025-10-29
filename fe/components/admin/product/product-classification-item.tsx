"use client"
import { PlusOutlined } from "@ant-design/icons"
import { Button, Input } from "antd"
import { ArrowUpToLine, Trash2, X } from "lucide-react"
import { Fragment, useEffect, useMemo, useState } from "react"
import { IPrice, IProductClassification, } from "./interface"
import { useDispatch, useSelector } from "react-redux"
import {
    addOptionInProductClassifications,

    editOptionInProductClassifications,
    editProductClassifications,
    removeOptionInProductClassifications,
    removeProductClassifications,

} from "@/redux/admin/product/productRedux"



export default function ProductClassificationItem(p: {
    data: IProductClassification, pci: number
}) {

    const productClassification = p.data
    const pci = p.pci
    const [collapse, setCollapses] = useState<boolean>(false)
    const createOption = () => {
        return {
            id: `${Date.now()}`,
            name: "",
            edit: true
        }
    }
    const dispatch = useDispatch()
    return (
        <div key={productClassification.id} className="mb-4 bg-white p-2 shadow-2xl rounded-sm">
            <div className="flex ">
                <span className="py-2 text-sm basis-3/12">
                    {
                        productClassification.name.length == 0 ?
                            "Phần loại" : productClassification.name
                    }
                </span>
                <div className="flex-1 px-2">
                    {
                        collapse ?
                            <button type="button" className="cursor-pointer w-full text-left" onClick={() => {
                                setCollapses(false)
                            }} >
                                <span className="font-bold">{productClassification.name}</span>
                            </button> :
                            <Input placeholder="Nhập"
                                value={productClassification.name}
                                onChange={(v) => {
                                    dispatch(editProductClassifications({
                                        data: v.currentTarget.value,
                                        pci: pci
                                    }))
                                }} />
                    }

                </div>
            </div>
            <div className="flex">
                <span className="py-2 text-sm basis-3/12">Tùy chọn </span>
                <div className="flex-1">
                    <div className="flex flex-wrap">
                        {
                            collapse ?
                                <button onClick={() => {
                                    setCollapses(false)
                                }} className="flex flex-wrap gap-x-2 w-full cursor-pointer">
                                    {
                                        productClassification.options
                                            .filter((_, i) => {
                                                return i != productClassification.options.length - 1
                                            })
                                            .map((option) => {
                                                return <span key={option.id} className="px-2 rounded-sm shadow-2xl border"> {option.name}</span>
                                            })
                                    }
                                </button> :
                                <>
                                    {
                                        productClassification
                                            .options
                                            .map((option, oi) => {
                                                return (
                                                    <div key={`${productClassification.id} ${option.id}`} className="basis-1/2 p-2.5">
                                                        <div className="flex gap-x-3">
                                                            <Input
                                                                value={option.name}
                                                                onChange={(v) => {
                                                                    let tempoption = { ...option }
                                                                    tempoption.name = v.currentTarget.value
                                                                    if (productClassification.options.length == oi + 1) {
                                                                        dispatch(addOptionInProductClassifications({
                                                                            data: createOption(),
                                                                            pci: pci
                                                                        }))

                                                                    }
                                                                    dispatch(editOptionInProductClassifications({
                                                                        data: tempoption.name,
                                                                        oi: oi,
                                                                        pci: pci
                                                                    }))


                                                                }} placeholder="Nhập" />
                                                            {
                                                                productClassification.options.length != oi + 1 && option.edit ?
                                                                    <Button
                                                                        onClick={() => {
                                                                            dispatch(removeOptionInProductClassifications({
                                                                                oi: oi,
                                                                                pci: pci
                                                                            }))
                                                                        }} icon={
                                                                            <Trash2 size={12} />
                                                                        }>
                                                                    </Button> : <></>
                                                            }
                                                        </div>
                                                    </div>
                                                )
                                            })
                                    }
                                </>
                        }

                    </div>
                    <div className=" p-2.5 flex justify-between">
                        {
                            collapse ?
                                <Fragment /> :
                                <Fragment>
                                    {p.data.edit ?
                                        <Button onClick={() => {
                                            dispatch(removeProductClassifications(p.data.id))
                                        }}>
                                            <Trash2 size={14} />
                                        </Button> :
                                        <Fragment />}
                                    <Button onClick={() => {
                                        setCollapses(true)
                                    }} icon={<ArrowUpToLine size={14} />}>

                                    </Button>
                                </Fragment>
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}




