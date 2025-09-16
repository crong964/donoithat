"use client"
import Form from 'next/form'

import { Button, Input, Select } from "antd"
import TextArea from "antd/es/input/TextArea"
import { CloudUpload, Eye, Trash } from "lucide-react"
import React, { useState } from "react"
import ImagesInput from "./images-input"
import { useDispatch, useSelector } from "react-redux"
import ProductClassification from "./product-classification"
import { RootState } from "@/redux/admin/reduxRoot"
import { setDescriptionProduct, setNameProduct, setTypeProduct } from "@/redux/admin/product/productRedux"
import Category from './category'
import Vendor from './vendor'
import WeightProduct from './weight-product'


export default function AddProduct() {

    const nameProduct = useSelector((state: RootState) => state.product.nameProduct)
    const productVariants = useSelector((state: RootState) => state.product.productVariants)
    const description = useSelector((state: RootState) => state.product.description)
    const product = useSelector((state: RootState) => state.product)
    const onSubmit = (ev: React.FormEvent<HTMLFormElement>) => {
        ev.preventDefault()
        product.description
        product.imageFiles
        product.nameProduct
        product.vendor
        product.typeProduct
        product.productVariants
        product.productClassifications
        product.weightProduct.measure
        product.weightProduct.value
        product.maxPrice
        product.minPrice
        product.mainPrice

       
    }
    const dispatch = useDispatch()
    return (
        <>
            <div className="my-5 ">
                <h1 onClick={() => {

                }} className="font-bold text-2xl">Thêm sản phẩm </h1>

            </div>

            <form onSubmit={onSubmit} className="flex gap-2">
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
                    <div className="mt-12.5 shadow-2xl">

                    </div>
                </section>
                <section>
                    <div className="my-3.75 w-75 sticky top-0 right-0">
                        <div className="pt-10">
                            <ul className="flex items-center justify-end gap-x-1">
                                <Button icon={<Eye size={14} />}>
                                    Xem
                                </Button>

                                <Button htmlType='submit' onClick={() => {

                                }} type="primary">
                                    Câp nhật
                                </Button>

                            </ul>
                        </div>
                        <div className=" shadow-2xl p-4  rounded-lg">
                            <Vendor />
                            <Category />
                        </div>
                    </div>
                </section>
            </form>
        </>
    )
}

