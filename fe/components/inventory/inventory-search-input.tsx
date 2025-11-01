import { RootState } from "@/redux/admin/reduxRoot"
import { useSelector } from "react-redux"
import { Button } from "@/components/ui/button"
import {
    Sheet, SheetClose, SheetContent,
    SheetDescription, SheetFooter,
    SheetHeader, SheetTitle,
    SheetTrigger
}
    from "@/components/ui/sheet"

import { Input } from "../ui/input"
import {
    Select, SelectContent, SelectGroup,
    SelectItem, SelectLabel,
    SelectTrigger, SelectValue
} from "../ui/select"
import SubmitButton from "../button/submit-buttom"
import { iBrand } from "../brand/interface"
import { useEffect, useState } from "react"
import { iInventoryGet } from "./interface"
import { iProductVariant, iProductVariantSearch } from "@/components/variant/interface"
import Pagination from "../ui-custom/panination"
import PaginationHandle from "../ui-custom/panination-handle"

export default function InventorySearchInput() {
    const [brands, setBrands] = useState<iBrand[]>([])
    const [productVariant, setProductVariant] = useState<iProductVariantSearch[]>([])
    const nameProduct = useSelector((state: RootState) => state.product.nameProduct)
    const productVariants = useSelector((state: RootState) => state.product.productVariants)
    const [sta, setSta] = useState({ curPage: 1, totalPage: 0 })
    useEffect(() => {
        fetch("/api/admin/brand")
            .then((v) => {
                return v.json()
            }).then((v) => {
                setBrands(v)
            }).catch((v) => {

            })
        return () => {

        };
    }, []);

    const [form, setForm] = useState<iInventoryGet>({
        brandId: "",
        curPage: 1,
        inventoryName: "",
        onSale: "false"
    })
    let url = `/api/admin/inventory?curpage=${form.curPage}&inventoryName=${form.inventoryName}&onSale=${form.onSale}&brandId=${form.brandId}`

    const handleSearch = (s: string) => {
        fetch(s)
            .then((v) => {
                return v.json()
            }).then((v) => {
                if (v.data) {
                    setProductVariant(v.data)
                    setSta({ curPage: v.curPage, totalPage: v.totalPage })
                }
            }).catch((v) => {

            })
    }
    return (
        <div className=" shadow-2xl p-4  rounded-lg">
            <h1 className=" mb-4">
                Chọn sản phẩm bầy bán
            </h1>

            <Sheet>
                <SheetTrigger asChild>
                    <Button type='button' variant="blue">
                        Sản phẩm
                    </Button>
                </SheetTrigger>
                <SheetContent>
                    <SheetHeader>
                        <SheetTitle>Tim kiếm sản phẩm </SheetTitle>
                    </SheetHeader>
                    <form
                        className="px-3.75 ">
                        <div className="space-y-4 ">
                            <Input onChange={(v) => {
                                setForm({ ...form, inventoryName: v.currentTarget.value })
                            }} type="text" name="inventoryName" placeholder="Tên sản phẩm" />
                            <div className="flex gap-4">
                                <Select onValueChange={(v) => {
                                    setForm({ ...form, onSale: v })
                                }} name="onSale" defaultValue="false">
                                    <SelectTrigger className="w-[180px]">
                                        <SelectValue placeholder="Chọn trạng thái" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectGroup>
                                            <SelectLabel>Chọn trạng thai</SelectLabel>
                                            <SelectItem value="true">Đang bán</SelectItem>
                                            <SelectItem value="false">Chưa bán</SelectItem>
                                        </SelectGroup>
                                    </SelectContent>
                                </Select>
                                <Select onValueChange={(v) => {
                                    setForm({ ...form, brandId: v })
                                }} name="brandId" defaultValue="all">
                                    <SelectTrigger className="w-[180px]">
                                        <SelectValue placeholder="Chọn trạng thái" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectGroup>
                                            <SelectLabel>Chọn nhãn hàng</SelectLabel>
                                            <SelectItem value="all">Tất cả nhãn hàng</SelectItem>
                                            {
                                                brands.map((v) => {
                                                    return <SelectItem value={v.brandId}>{v.brandName}</SelectItem>
                                                })
                                            }
                                        </SelectGroup>
                                    </SelectContent>
                                </Select>
                            </div>
                            <div className="w-[180px]">
                                <SubmitButton loading={<Button type="button" variant={"blue"}>
                                    Tìm kiếm...
                                </Button>}>
                                    <Button onClick={() => {
                                        handleSearch(url)
                                    }} type="button" variant={"blue"}>
                                        Tìm kiếm
                                    </Button>
                                </SubmitButton>
                            </div>
                        </div>
                    </form >
                    <div className="mt-1 px-2 overflow-y-auto">
                        {productVariant.map((v) => {
                            return (
                                <div className="flex gap-2 py-6 shadow-2xs">
                                    <img src={v.image} className="aspect-square h-20" alt="" />
                                    <p className="text-sm">{v.productVariantName}</p>
                                </div>
                            )
                        })}
                        <div data-hidden={productVariant.length == 0}
                            className="data-[hidden=true]:hidden data-[hidden=false]:block"
                        >
                            <PaginationHandle page={sta.curPage}
                                total={sta.totalPage}
                                url={url}
                                onClick={(s) => {
                                    handleSearch(s)
                                }} />
                        </div>
                    </div>
                    <SheetFooter>

                        <SheetClose asChild>
                            <Button variant="outline">Close</Button>
                        </SheetClose>
                    </SheetFooter>
                </SheetContent>

            </Sheet>
        </div>
    )
}