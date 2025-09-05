"use client"
import { PlusOutlined } from "@ant-design/icons"
import { Button, Input, Select } from "antd"
import { ArrowUpToLine, Image, Trash2, X } from "lucide-react"
import { Fragment, useEffect, useMemo, useState } from "react"
import { IPrice, IProductVariantsDetailPros } from "./interface"
import Count from "@/util/Count"
import PriceFormat from "@/util/Price"
import { useDispatch, useSelector } from "react-redux"
import { RootState } from "@/redux/admin/reduxRoot"
import {
    addProductClassifications,
    setIamgeVariants,
    setMainPriceProduct,
    setMinMaxPrice,
    setProductClassifications,
    setProductVariants,
} from "@/redux/admin/product/productRedux"
import ProductClassificationItem from "./productClassificationItem"
import ImageProduct from "./imageProduct"
import { setOpen } from "@/redux/admin/product/mediaLibraryRedux"
import MinMaxPrice from "./price"



export default function ProductClassification() {
    const productClassifications = useSelector((state: RootState) => state.product.productClassifications)
    const productVariants = useSelector((state: RootState) => state.product.productVariants)
    const imageurls = useSelector((state: RootState) => state.product.imageurls)
    const imageVariants = useSelector((state: RootState) => state.product.imageVariants)
    const mainPrice = useSelector((state: RootState) => state.product.mainPrice)
    const dispatch = useDispatch()
    const createOption = () => {
        const d = new Date()
        return {
            id: `${d.getHours()}${d.getMinutes()}${d.getSeconds()}`,
            name: ""
        }
    }

    const sl = useMemo(() => {
        let f = 1
        for (let i = 0; i < productClassifications.length; i++) {
            const element = productClassifications[i];
            f *= (element.options.length - 1)
        }
        return f
    }, [productClassifications])

    useEffect(() => {
        dispatch(setProductClassifications(JSON.parse(localStorage.getItem("temp") || "[]")))
        return () => {
        };
    }, []);

    useEffect(() => {
        if (productClassifications.length == 0) {
            dispatch(setProductVariants([]))
            return
        }
        let ls = Count(sl, productClassifications)
        if (ls.length == 0) {

            return
        }
        dispatch(setProductVariants(ls.map((v) => {
            let variants = v.split(" ")
            let variantName = ""
            let variantId = ""
            variants.forEach((v, i) => {
                let option = productClassifications[i]?.options?.[parseInt(v)]
                variantName += `${option?.name} `
                variantId += `${option?.id} `
            })
            return {
                variantId: variantId.trim(),
                variantName: variantName.trim(),
                price: 0,
                quality: "",
                image: -1
            }
        })))
    }, [sl, productClassifications])


    const [variantKey, setVariantsKey] = useState("-1")
    const [productVariantI, setProductVariantI] = useState(-1)

    const productClassificationHtml = <>
        {
            productClassifications.map((productClassification, pci) => {
                return (
                    <ProductClassificationItem data={productClassification}
                        pci={pci} key={productClassification.id} />
                )
            })
        }</>
    return (
        <div>
            <ImageProduct onchange={(i) => {
                if (productVariantI != -1) {
                    let temp = productVariants.map((v) => {
                        return { ...v }
                    })
                    temp[productVariantI].image = i
                    dispatch(setProductVariants(temp))
                    setProductVariantI(-1)
                    return
                }

                if (variantKey != "-1") {

                    let temp = { ...imageVariants }
                    temp[variantKey] = i
                    dispatch(setIamgeVariants(temp))

                    let tempProductVariants = productVariants.map((v) => {
                        let f = v.variantId.split(" ")
                        if (f[0] == variantKey) {
                            return { ...v, image: i }
                        }
                        return { ...v }
                    })
                    dispatch(setProductVariants(tempProductVariants))
                    setVariantsKey("-1")
                    return
                }
            }} />
            <div className="mb-4">
                <h1 className="text-sm font-bold">
                    Phân loại sản phầm
                </h1>
            </div>

            <div className="mb-4">
                {productClassificationHtml}
            </div>
            <div className="mb-4">
                <Button onClick={() => {
                    dispatch(addProductClassifications({
                        ...createOption(),
                        options: [createOption()]
                    }))
                }} icon={<PlusOutlined />} type="dashed" >
                    Thêm nhóm sản phẩm
                </Button>
            </div>
            <section className={`${productClassifications.length == 0 ? "my-6" : "hidden"}`}>
                <div className="flex items-center gap-x-3">
                    <div className="basis-1/12">
                        <div className="flex space-x-1">
                            <p >Giá</p>
                            <p className='text-red-600'>*</p>
                        </div>
                    </div>
                    <div className="flex-1">
                        <Input placeholder="Giá" value={PriceFormat(mainPrice + "")} required onChange={(v) => {
                            let n = parseInt(v.currentTarget.value.replaceAll(" ", ""))
                            if (v.currentTarget.value == "") {
                                dispatch(setMainPriceProduct(0))
                            }
                            if (isNaN(n)) {
                                return
                            }
                            dispatch(setMainPriceProduct(n))
                        }} />

                    </div>
                    <div className="basis-1/12">
                        <div className="flex space-x-1">
                            <span >Tồn kho</span>
                            <p className='text-red-600'>*</p>
                        </div>
                    </div>
                    <div className="flex-1">
                        <Input required placeholder="Tồn kho" />

                    </div>
                </div>
            </section>
            <section className={`${productClassifications.length == 0 ? "hidden" : "mb-4 bg-white text-sm p-2 shadow-2xl rounded-sm"}`}>
                <MinMaxPrice />
                <div className="mb-4">
                    <div className="flex items-center gap-x-3">
                        <div className="basis-4/12">
                            <span >Ảnh chung của các phân loại</span>
                        </div>
                        <ul>
                            {
                                productClassifications.length > 0 ?
                                    <Fragment>
                                        {productClassifications[0]
                                            .options.map((v, i) => {
                                                if (i >= productClassifications[0].options.length - 1) {
                                                    return
                                                }
                                                return (
                                                    <li className="py-2">
                                                        <div key={v.id} className="flex items-center gap-x-3">
                                                            <button onClick={() => {
                                                                dispatch(setOpen(true))
                                                                setVariantsKey(v.id)
                                                            }} className="size-20 border flex justify-center items-center rounded-lg">
                                                                {imageVariants[v.id] == undefined ?
                                                                    <Image size={20} /> :
                                                                    <img src={imageurls[imageVariants[v.id]]} className="w-full h-full object-cover " alt="" />}
                                                            </button>
                                                            <p className="font-bold text-2xl">{v.name}</p>
                                                        </div>
                                                    </li>
                                                )
                                            })
                                        }
                                    </Fragment> :
                                    <></>
                            }
                        </ul>
                    </div>
                </div>

                <div className="flex py-4 gap-x-3">
                    <div className="inline-block px-2 basis-1/3">
                        <div className="flex gap-x-1">
                            <p className="font-bold text-lg">Ảnh</p>
                        </div>
                    </div>
                    <div className="inline-block px-2 basis-1/3">
                        <ul className="flex gap-x-1">
                            {
                                productClassifications.map((productClassification) => {
                                    return <li key={productClassification.id} className="px-2 py-1 shadow-2xl border"> <p>{productClassification.name}</p></li>

                                })
                            }
                        </ul>
                    </div>
                    <div className="basis-2/5">
                        <p className="font-bold text-lg">Giá</p>
                    </div>
                    <div className="basis-2/5">
                        <p className="font-bold text-lg">Số lượng</p>
                    </div>
                </div>
                <ul>
                    {productVariants.
                        map((productVariant, i) => {
                            let url = imageurls[productVariant.image]
                            return (
                                <li key={productVariant.variantId} className="flex py-4 gap-x-3">
                                    <div className="basis-1/3">
                                        <span className="inline-block px-1">
                                            <button onClick={() => {
                                                dispatch(setOpen(true))
                                                setProductVariantI(i)
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
                                    <div>
                                        <Input onChange={(v) => {
                                            let f = v.currentTarget.value
                                            let temp = productVariants.map((v) => {
                                                return { ...v }
                                            })
                                            temp[i].price = parseInt(f.replaceAll(' ', ''))
                                            dispatch(setProductVariants(temp))
                                        }} placeholder="Giá sản phẩm" value={PriceFormat(productVariant.price + "")} className="basis-2/5">
                                        </Input>
                                    </div>
                                    <div>
                                        <Input onChange={(v) => {
                                            let f = v.currentTarget.value
                                            let temp = productVariants.map((v) => {
                                                return { ...v }
                                            })
                                            temp[i].quality = PriceFormat(f)
                                            dispatch(setProductVariants(temp))
                                        }} placeholder="Số lượng" value={productVariant.quality} className="basis-2/5"></Input>

                                    </div>
                                </li>
                            )
                        })}
                </ul>

            </section>
        </div>
    )
}




