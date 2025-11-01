"use client"


import TextArea from "antd/es/input/TextArea"
import React, { useEffect, useState } from "react"
import ImagesInput from "./images-input"
import { useDispatch, useSelector } from "react-redux"
import ProductClassification from "./product-classification"
import { RootState } from "@/redux/admin/reduxRoot"
import { setDescriptionProduct, setNameProduct, setResetProductData, setTypeProduct } from "@/redux/admin/product/productRedux"

import WeightProduct from './weight-product'
import removeAccents from '@/util/remove-accents'
import { toast } from 'react-toastify'
import { createClassificationFormHandleToSave, validateData } from './ulti'
import VendorSelectInput from './vendor-select-input'
import CategorySelectInput from './category-select-input'
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import InventorySearchInput from "@/components/inventory/inventory-search-input"
import { iBrand } from "@/components/brand/interface"


export default function AddProduct() {

    const nameProduct = useSelector((state: RootState) => state.product.nameProduct)
    const description = useSelector((state: RootState) => state.product.description)
    const product = useSelector((state: RootState) => state.product)
    
    useEffect(() => {
        dispatch(setResetProductData())
        return () => {

        };
    }, []);
    const onSubmit = async (ev: React.FormEvent<HTMLFormElement>) => {
        ev.preventDefault()
        const validate = validateData(product)
        if (validate.err) {
            toast.error(validate.mess)
            return
        }
        var fom = new FormData();
        fom.set("ImageFiles", "")
        for (let i = 0; i < product.imageurls.length; i++) {
            const element = product.imageurls[i].file;
            if (element != undefined) {
                fom.append("ImageFiles", element)
            }

        }

        try {
            let s = await fetch("/api/admin/upload", {
                method: "POST",
                body: fom
            })
            let images = await s.json()
            let idOpion = Date.now() + ""
            // tạo 1 cái ms và nó ko dc chỉnh sửa, và loại bỏ lựa chọn cuối
            let tmpClassifications = createClassificationFormHandleToSave(product.productClassifications)

            const productClassifications = product.productClassifications.length == 0 ?
                [{ name: "Tiêu đề", edit: false, options: [{ id: idOpion, name: "Default Title", edit: false }] }] : tmpClassifications

            const productVariants = product.productVariants.length == 0 ? [
                {
                    variantId: idOpion,
                    variantName: "Default Title",
                    price: product.mainPrice,
                    quality: product.quality,
                    image: 0,
                }
            ] : product.productVariants

            var data = {
                "description": product.description,
                "productClassification": JSON.stringify(productClassifications),
                "slug": removeAccents(product.nameProduct),
                "mainPrice": product.mainPrice,
                "suplier": product.vendor,
                "nameProduct": product.nameProduct,
                "quality": 0,
                "productVariants": [
                    ...productVariants.map((v) => {
                        return {
                            "variantId": v.variantId,
                            "variantName": v.variantName,
                            "price": v.price,
                            "image": images[v.image],
                            "position": v.image,
                            "quality": v.quality,
                            "weight": product.weightProduct.value
                        }
                    })
                ],
                "typeProduct": product.typeProduct,
                "imageFiles": images
            }

            let mess = await fetch("/api/admin/product", {
                method: "POST",
                body: JSON.stringify(data)
            })
            let messdata = await mess.json()
            if (mess.status >= 500) {
                toast.error(messdata.mess)
            } else {
                toast.success(messdata.mess)
                dispatch(setResetProductData())
            }
        } catch (error) {
            alert("lỗi")
        }


    }
    const dispatch = useDispatch()
    return (
        <>
            <div className="my-5 ">
                <h1 className="font-bold text-2xl">Thêm sản phẩm </h1>
            </div>

            <form onSubmit={onSubmit} className="flex gap-2 relative">
                <section className="w-220">
                    <div className="my-3.75 ">
                        <div className=" shadow-2xl p-3.5  rounded-sm">
                            <div className="mb-6">
                                <label className="text-3xl font-bold">
                                    Thông tin cơ bản
                                </label>
                            </div>
                            <ImagesInput />
                        </div>
                    </div>
                    <div className="mt-12.5 shadow-2xl">
                        <div className="p-5.5">
                            <div className="mb-5">
                                <span className='flex space-x-1'>
                                    <h2 className="text-lg font-bold  ">Tên sản phẩm</h2>
                                    <p className='text-red-600'>*</p>
                                </span>
                                <div className="">
                                    <Input required value={nameProduct} onChange={(v) => {
                                        dispatch(setNameProduct(v.currentTarget.value))
                                    }} placeholder="tên sản phẩm" />
                                </div>
                            </div>

                            <div className="mb-5">
                                <span className='flex space-x-1'>
                                    <h2 className="text-lg font-bold ">Mô tả sản phẩm</h2>
                                    <p className='text-red-600'>*</p>
                                </span>

                                <div className="">
                                    <TextArea
                                        onChange={(v) => {
                                            let text = v.currentTarget.value
                                            dispatch(setDescriptionProduct(text))
                                        }} required
                                        value={description}
                                        placeholder="tên sản phẩm" />
                                </div>
                            </div>

                            <div className="mb-5">
                                <div className="mb-4">
                                    <div className='flex space-x-1'>
                                        <h2 className="text-lg font-bold  ">Thông tin bán hàng</h2>
                                        <p className='text-red-600'>*</p>
                                    </div>
                                </div>
                                <ProductClassification />
                                <WeightProduct />
                            </div>
                        </div>

                    </div>

                </section>
                <section className='w-75'>
                    <div className="my-3.75 fixed top-0 ">
                        <div className="pt-10">
                            <ul className="flex items-center justify-end gap-x-1">
                                <Button type="submit" variant="blue">
                                    Thêm sản phẩm
                                </Button>

                            </ul>
                        </div>
                        <div className=" shadow-2xl p-4 mb-4  rounded-lg">
                            <VendorSelectInput />
                            <CategorySelectInput />
                        </div>
                        <InventorySearchInput />
                    </div>
                </section>
            </form>
        </>
    )
}

