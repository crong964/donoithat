'use client'
import { iBrand } from "@/components/brand/interface"
import SubmitButton from "@/components/button/submit-buttom"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { InputGroup, InputGroupAddon, InputGroupButton, InputGroupInput, InputGroupText } from "@/components/ui/input-group"
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Spinner } from "@/components/ui/spinner"
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip"
import { addInventoryAdmin } from "@/service/admin/inventory-service"
import data from "@/tempdata/data"
import priceFormat from "@/util/price-format"

import { DiamondPlus, HandCoins, Image, OctagonAlert, Shirt, Weight } from 'lucide-react';
import Form from "next/form"
import { ChangeEvent, ChangeEventHandler, useActionState, useEffect, useState } from "react"
import { toast } from "react-toastify"
export default function AddInventory(p: { ls: iBrand[] }) {
    const brads = p.ls
    const [url, setUrl] = useState("")
    const [mess, actionAdd, pedding] = useActionState(addInventoryAdmin, null)
    const [data, setData] = useState({
        productVariantName: "",
        weight: "",
        importPrice: "",
        quality: "",
        price: ""
    })
    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { value, name } = e.target
        setData({ ...data, [name]: value })
    }
    useEffect(() => {
        if ((mess as any)?.error == true) {
            toast.error((mess as any)?.message)
        }
    }, [mess])
    return (
        <>
            <div className="p-3.75">
                <h1 className="text-4xl font-bold">
                    Thêm sản phẩm mới
                </h1>
            </div>
            <Form action={actionAdd}>
                <div className="flex">
                    <div className="size-75 p-3">
                        <label htmlFor="avatarImage">
                            {
                                url == "" ?
                                    <Image strokeWidth={0.75} size={300} /> :
                                    <img src={url} alt="" className="w-full size-75 object-contain" />
                            }
                        </label>
                        <input onChange={(v) => {
                            const file = v.currentTarget.files?.[0]
                            if (file == undefined) {
                                return
                            }
                            const url = URL.createObjectURL(file)
                            setUrl(url)
                        }} type="file"
                            name="avatarImage"
                            id="avatarImage"

                            className="hidden!" />
                    </div>
                    <div className="pt-10">
                        <div className="grid grid-cols-2 gap-6 mb-6">
                            <InputGroup className="col-span-2">
                                <InputGroupAddon>
                                    <InputGroupText>
                                        <Shirt />
                                    </InputGroupText>
                                </InputGroupAddon>
                                <InputGroupInput
                                    value={data.productVariantName}
                                    onChange={handleChange}
                                    required
                                    name="productVariantName"
                                    placeholder="Chăn 10cm x 20cm 20cm" />
                                <InputGroupAddon align="inline-end">
                                    <Tooltip >
                                        <TooltipTrigger asChild>
                                            <InputGroupButton className="rounded-full" size="icon-xs">
                                                <OctagonAlert />
                                            </InputGroupButton>
                                        </TooltipTrigger>
                                        <TooltipContent side="right">
                                            Tên phẩm nên có đặc điểm nhận biết
                                        </TooltipContent>
                                    </Tooltip>
                                </InputGroupAddon>
                            </InputGroup>

                            <Select name="brandId" >
                                <SelectTrigger className="w-70">
                                    <SelectValue placeholder={"Chọn nhãn hàng"} />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectGroup>
                                        <SelectLabel>Nhãn hàng</SelectLabel>
                                        {
                                            brads.map((vendorItem) => {
                                                return (
                                                    <SelectItem value={vendorItem.brandId}>{vendorItem.brandName}</SelectItem>
                                                )
                                            })
                                        }
                                    </SelectGroup>
                                </SelectContent>
                            </Select>

                            <InputGroup>
                                <InputGroupAddon>
                                    <InputGroupText>
                                        <Weight />
                                    </InputGroupText>
                                </InputGroupAddon>
                                <InputGroupInput
                                    value={data.weight}
                                    onChange={handleChange}
                                    name="weight"
                                    required
                                    placeholder="Cân nặng" />
                                <InputGroupAddon align="inline-end">
                                    <InputGroupText>Kg</InputGroupText>
                                </InputGroupAddon>
                            </InputGroup>

                            <InputGroup>
                                <InputGroupAddon>
                                    <HandCoins />
                                </InputGroupAddon>
                                <InputGroupInput
                                    value={priceFormat(data.importPrice)}
                                    onChange={handleChange}
                                    required
                                    name="importPrice"
                                    placeholder="Giá nhập" />
                                <InputGroupAddon align="inline-end">
                                    <Tooltip >
                                        <TooltipTrigger asChild>
                                            <InputGroupText>VND</InputGroupText>
                                        </TooltipTrigger>
                                        <TooltipContent side="right">
                                            Giá hàng hóa nhập
                                        </TooltipContent>
                                    </Tooltip>
                                </InputGroupAddon>
                            </InputGroup>

                            <InputGroup>
                                <InputGroupAddon>
                                    <InputGroupText>
                                        <HandCoins />
                                    </InputGroupText>
                                </InputGroupAddon>
                                <InputGroupInput
                                    value={priceFormat(data.price)}
                                    type="text"
                                    onChange={handleChange}
                                    required
                                    name="price"
                                    placeholder="Giá bán" />
                                <InputGroupAddon align="inline-end">
                                    <Tooltip >
                                        <TooltipTrigger asChild>
                                            <InputGroupText>VNĐ</InputGroupText>
                                        </TooltipTrigger>
                                        <TooltipContent side="right" className="bg-red-600 text-sm fill-red-600">
                                            Giá bán
                                        </TooltipContent>
                                    </Tooltip>
                                </InputGroupAddon>
                            </InputGroup>

                            <InputGroup className="col-span-2">
                                <InputGroupAddon>
                                    <InputGroupText>
                                        <DiamondPlus />
                                    </InputGroupText>
                                </InputGroupAddon>
                                <InputGroupInput
                                    value={priceFormat(data.quality)}
                                    type="text"
                                    onChange={handleChange}
                                    required
                                    name="quality"
                                    placeholder="Số lượng hiện có" />
                                <InputGroupAddon align="inline-end">
                                    <Tooltip >
                                        <TooltipTrigger asChild>
                                            <InputGroupText>
                                                <OctagonAlert />
                                            </InputGroupText>
                                        </TooltipTrigger>
                                        <TooltipContent side="right" className="bg-red-600 text-sm fill-red-600">
                                            Số lượng sản phẩm hiện có
                                        </TooltipContent>
                                    </Tooltip>
                                </InputGroupAddon>
                            </InputGroup>
                        </div>
                        {
                            pedding ?
                                <Button variant={"blue"} type="button"> <Spinner /> Thêm....</Button> :
                                <Button variant={"blue"} type="submit">Thêm</Button>
                        }
                    </div>
                </div>

            </Form>
        </>
    )
}