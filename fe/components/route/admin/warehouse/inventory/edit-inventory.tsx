'use client'
import { iBrand } from "@/components/brand/interface"
import { Button } from "@/components/ui/button"
import { InputGroup, InputGroupAddon, InputGroupButton, InputGroupInput, InputGroupText } from "@/components/ui/input-group"
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Spinner } from "@/components/ui/spinner"
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip"
import priceFormat from "@/util/price-format"
import z from "zod"
import { DiamondPlus, HandCoins, Image, OctagonAlert, Shirt, Weight } from 'lucide-react';
import Form from "next/form"
import { ChangeEvent, FormEvent, useActionState, useEffect, useMemo, useState } from "react"
import { toast } from "react-toastify"
import { Field, FieldDescription, FieldGroup, FieldLabel } from "@/components/ui/field"
import { iProductVariantById } from "@/components/variant/interface"
import { editInventoryAdmin } from "@/service/admin/inventory-service"
export default function EditInventory(p: { ls: iBrand[], data: iProductVariantById }) {
    const brads = useMemo(() => {
        return p.ls
    }, [p.ls])


    const variant = useMemo(() => {
        return p.data
    }, [p.data])
    const [url, setUrl] = useState(variant.image)
    const [mess, actionEdit, pedding] = useActionState(editInventoryAdmin, null)
    const [data, setData] = useState({
        productVariantId: variant.productVariantId,
        productVariantName: variant.productVariantName,
        weight: variant.weight,
        importPrice: variant.importPrice,
        quality: variant.quality,
        price: variant.price,
        avatarImage: undefined,
        brandId: variant.brandId
    })
    const [alertF, setAlertF] = useState({
        productVariantName: false,
        weight: false,
        importPrice: false,
        quality: false,
        price: false,
        brandId: false
    })
    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { value, name } = e.target
        setData({ ...data, [name]: value })
    }
    const handleChangeNumber = (e: ChangeEvent<HTMLInputElement>) => {
        const { value, name } = e.target
        let g = parseInt(value.replaceAll(",", ""))
        setData({ ...data, [name]: isNaN(g) ? "" : g })
    }
    const handleFocus = (e: ChangeEvent<HTMLInputElement>) => {
        const { name } = e.target
        setAlertF({ ...alertF, [name]: false })
    }
    const handleForm = async (e: FormEvent<HTMLFormElement>) => {
        let form = z.object({
            productVariantName: z.string().min(4),
            weight: z.number(),
            importPrice: z.number(),
            quality: z.number(),
            price: z.number(),

        });
        try {
            form.parse(data);
        } catch (error) {


            e.preventDefault()
            if (error instanceof z.ZodError) {


                let temp = { ...alertF } as any
                error.issues.forEach(element => {
                    temp[element.path[0]] = true
                });
                setAlertF({ ...temp })
            }
        }

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
                    Chỉnh sửa sản phẩm
                </h1>
            </div>
            <Form onSubmit={handleForm} action={actionEdit}>
                <input type="hidden" name="productVariantId" value={p.data.productVariantId} />
                <fieldset className="flex px-10  **:data-[alert=true]:border-1 **:data-[alert=true]:border-red-500">
                    <div className="size-75 ">
                        <div >
                            <label
                                className="col-span-2  "
                                htmlFor="avatarImage">
                                {
                                    url == "" ?
                                        <Image strokeWidth={0.75} className="" size={300} /> :
                                        <img src={url} alt="" className="w-full  size-75 object-contain" />
                                }
                            </label>
                        </div>
                        <input onChange={(v) => {
                            const file = v.currentTarget.files?.[0]
                            if (file == undefined) {
                                return
                            }
                            const url = URL.createObjectURL(file)
                            setUrl(url)
                            setData({ ...data, avatarImage: file as any })

                        }} type="file"
                            name="avatarImage"
                            id="avatarImage"
                            className="hidden!" />
                    </div>
                    <div className=" flex-1 shadow-2xl p-3.5 rounded-2xl">
                        <FieldGroup className="">
                            <Field>
                                <FieldLabel htmlFor="productVariantName">Tên sản phẩm</FieldLabel>
                                <FieldDescription>Tên của sản phẩm nên có những đặc điểm của sản phẩm đó</FieldDescription>
                                <InputGroup data-alert={alertF.productVariantName} >
                                    <InputGroupAddon>
                                        <InputGroupText>
                                            <Shirt />
                                        </InputGroupText>
                                    </InputGroupAddon>
                                    <InputGroupInput
                                        value={data.productVariantName}
                                        onChange={handleChange}
                                        onFocus={handleFocus}
                                        name="productVariantName"
                                        placeholder="Chăn 10cm x 20cm 20cm" />
                                    <InputGroupAddon align="inline-end">
                                        <InputGroupButton className="rounded-full" size="icon-xs">
                                            <OctagonAlert />
                                        </InputGroupButton>
                                    </InputGroupAddon>
                                </InputGroup>

                            </Field>

                            <Field>
                                <FieldLabel htmlFor="brandId">Chọn nhãn hàng</FieldLabel>
                                <Select defaultValue={data.brandId} name="brandId" >
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
                            </Field>

                            <Field>
                                <FieldLabel htmlFor="weight">Cận năng của sản phẩm</FieldLabel>
                                <InputGroup data-alert={alertF.weight} >
                                    <InputGroupAddon>
                                        <InputGroupText>
                                            <Weight />
                                        </InputGroupText>
                                    </InputGroupAddon>
                                    <InputGroupInput
                                        value={data.weight}
                                        onChange={handleChangeNumber}
                                        onFocus={handleFocus}
                                        name="weight"
                                        placeholder="Cân nặng" />
                                    <InputGroupAddon align="inline-end">
                                        <InputGroupText>Kg</InputGroupText>
                                    </InputGroupAddon>
                                </InputGroup>
                            </Field>

                            <FieldGroup>
                                <div className="grid grid-cols-2 gap-4">
                                    <Field>
                                        <FieldLabel htmlFor="importPrice">Giá nhập</FieldLabel>
                                        <FieldDescription>Giá nhập: {priceFormat(data.importPrice + "")}</FieldDescription>
                                        <InputGroup data-alert={alertF.importPrice} className="col-span-1">
                                            <InputGroupAddon>
                                                <HandCoins />
                                            </InputGroupAddon>
                                            <InputGroupInput
                                                value={data.importPrice}
                                                type="number"
                                                onChange={handleChangeNumber}
                                                onFocus={handleFocus}
                                                name="importPrice"
                                                placeholder="Giá nhập" />
                                            <InputGroupAddon align="inline-end">
                                                <InputGroupText>VND</InputGroupText>
                                            </InputGroupAddon>
                                        </InputGroup>
                                    </Field>
                                    <Field>
                                        <FieldLabel htmlFor="importPrice">Giá bán</FieldLabel>
                                        <FieldDescription>Giá bán: {priceFormat(data.price + "")}</FieldDescription>
                                        <InputGroup data-alert={alertF.price} className="col-span-1">
                                            <InputGroupAddon>
                                                <InputGroupText>
                                                    <HandCoins />
                                                </InputGroupText>
                                            </InputGroupAddon>
                                            <InputGroupInput
                                                value={data.price}
                                                type="number"
                                                onChange={handleChangeNumber}
                                                onFocus={handleFocus}
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
                                    </Field>
                                </div>
                            </FieldGroup>

                            <Field>
                                <FieldLabel htmlFor="quality">Số lượng sản phẩm</FieldLabel>
                                <FieldDescription>Số lượng sản phẩm hiện có: {priceFormat(data.quality + "")}</FieldDescription>
                                <InputGroup data-alert={alertF.quality} className="col-span-2">
                                    <InputGroupAddon>
                                        <InputGroupText>
                                            <DiamondPlus />
                                        </InputGroupText>
                                    </InputGroupAddon>
                                    <InputGroupInput
                                        value={data.quality}
                                        type="number"
                                        onChange={handleChangeNumber}
                                        onFocus={handleFocus}
                                        name="quality"
                                        placeholder="Số lượng hiện có" />
                                </InputGroup>
                            </Field>


                        </FieldGroup>
                        <div className="mt-10">
                            {
                                pedding ?
                                    <Button variant={"blue"} type="button"> <Spinner /> Chỉnh sửa....</Button> :
                                    <Button variant={"blue"} type="submit">Chỉnh sửa</Button>
                            }
                        </div>
                    </div>
                </fieldset>

            </Form>
        </>
    )
}