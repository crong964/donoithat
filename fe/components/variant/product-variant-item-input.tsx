'use client'
import { useDispatch, useSelector } from "react-redux";
import { IProductVariant } from "@/components/route/admin/product/interface";
import { JSX, memo, useMemo, useState } from "react";


import { RootState } from "@/redux/admin/reduxRoot";

import {
    Check,
    Image
} from "lucide-react"
import {
    setIamgeVariants, setProductVariant
} from "@/redux/admin/product/productRedux";
import ImageProduct from "@/components/route/admin/product/image-product";
import PriceFormat from "@/util/price-format"
import { Sheet, SheetClose, SheetContent, SheetDescription, SheetFooter, SheetHeader, SheetTitle, SheetTrigger }
    from "../ui/sheet";

import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { selectInventory } from "@/redux/admin/product/inventoryRedux";
function ProductVariantItemInput(v: IProductVariant) {
    const dispatch = useDispatch()
    const imageVariants = useSelector((state: RootState) => state.product.imageVariants)
    const imageurls = useSelector((state: RootState) => state.product.imageurls)
    const inventorys = useSelector((state: RootState) => state.inventory.inventorys)
    const [open, setOpen] = useState(false)
    const productVariant = v
    let url = imageurls[productVariant.image]?.url
    const inventorysSelected = useMemo(() => {
        let html: JSX.Element[] = []
        for (const key in inventorys) {
            if (!Object.hasOwn(inventorys, key)) continue;

            const inventory = inventorys[key]?.data;
            const s = inventorys[key]?.selected
            if (inventory == undefined || s == undefined) continue

            html.push(
                <button type="button" onClick={() => {
                    let temp = { ...v }

                    temp.productVariantId = inventory.productVariantId
                    temp.quality = inventory.quality + ""
                    temp.price = inventory.price

                    dispatch(setProductVariant(temp))
                    dispatch(selectInventory(inventory.productVariantId))

                }} key={inventory.productVariantId} className="relative border-2 cursor-pointer rounded-2xl  flex gap-2 p-2">
                    <img src={inventory.image} className="aspect-square h-20" alt="" />
                    <p className="text-sm">{inventory.productVariantName}</p>

                    <div data-selected={s} className="data-[selected]:block data-[selected=false]:hidden absolute top-0 right-0 ">
                        <Check />
                    </div>
                </button>
            )

        }

        return html
    }, [inventorys])

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
            <li className="flex py-4 gap-x-3 relative">
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
                    <div className="my-10">

                    </div>
                    <Sheet>
                        <SheetTrigger asChild>
                            <Button variant="blue">Chọn hàng trong kho</Button>
                        </SheetTrigger>
                        <SheetContent>
                            <SheetHeader>
                                <SheetTitle>Edit profile</SheetTitle>
                                <SheetDescription>
                                    Make changes to your profile here. Click save when you&apos;re done.
                                </SheetDescription>
                            </SheetHeader>
                            <div className="mt-1 px-2 space-y-2.5 overflow-y-auto">
                                {inventorysSelected}
                            </div>
                            <SheetFooter>

                                <SheetClose asChild>
                                    <Button variant="outline">Close</Button>
                                </SheetClose>
                            </SheetFooter>
                        </SheetContent>
                    </Sheet>
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
                <div data-selected={v.productVariantId != undefined} 
                className="data-[selected]:block data-[selected=false]:hidden absolute -top-1 right-0 text-green-500">
                    <Check />
                </div>
            </li>
        </>
    )
}

export default memo(ProductVariantItemInput)