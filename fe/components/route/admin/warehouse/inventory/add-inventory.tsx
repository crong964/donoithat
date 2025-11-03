'use client'
import { iBrand } from "@/components/brand/interface"
import { Input } from "@/components/ui/input"
import { InputGroup, InputGroupAddon, InputGroupButton, InputGroupInput, InputGroupText } from "@/components/ui/input-group"
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip"
import data from "@/tempdata/data"
import { Form } from "antd"
import { HandCoins, Image, OctagonAlert, Shirt, Weight } from 'lucide-react';
import { useState } from "react"
export default function AddInventory(p: { ls: iBrand[] }) {
    const brads = p.ls
    const [url, setUrl] = useState("")
    return (
        <>
            <div className="p-3.75">
                <h1 className="text-4xl font-bold">
                    Thêm sản phẩm mới
                </h1>
            </div>
            <Form action={""}>
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
                            console.log(file.type);

                            const url = URL.createObjectURL(file)
                            setUrl(url)
                        }} type="file"
                            name="avatarImage"
                            id="avatarImage"
                            className="hidden!" />
                    </div>
                    <div className="pt-10">
                        <div className="grid grid-cols-2 gap-6">
                            <InputGroup className="col-span-2">
                                <InputGroupAddon>
                                    <InputGroupText>
                                        <Shirt />
                                    </InputGroupText>
                                </InputGroupAddon>
                                <InputGroupInput name="productVariantName" placeholder="Chăn 10cm x 20cm 20cm" />
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
                                <InputGroupInput name="weight" placeholder="Cân nặng" />
                                <InputGroupAddon align="inline-end">
                                    <InputGroupText>Kg</InputGroupText>
                                </InputGroupAddon>
                            </InputGroup>

                            <InputGroup>
                                <InputGroupAddon>
                                    <HandCoins />
                                </InputGroupAddon>
                                <InputGroupInput name="importPrice" placeholder="Giá nhập" />
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
                                <InputGroupInput name="price" placeholder="Giá bán" />
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


                        </div>
                    </div>
                </div>

            </Form>
        </>
    )
}