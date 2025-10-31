'use client'
import { iBrand } from "@/components/brand/interface";
import SubmitButton from "@/components/button/submit-buttom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select";

import Form from "next/form";
import { useState } from "react";

export default function ActionInventoryHeader(p: { ls: iBrand[] }) {
    const [s, S] = useState()
    const brands = p.ls
    return (
        <Form action={"/admin/warehouse/inventory"}
            className="px-3.75 pb-10">
            <div className="flex gap-4">
                <Input type="text" name="inventoryName" placeholder="Tên sản phẩm" />
                <Select name="onSale" defaultValue="all">
                    <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Chọn trạng thái" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectGroup>
                            <SelectLabel>Chọn trạng thai</SelectLabel>
                            <SelectItem value="all">Tất cả </SelectItem>
                            <SelectItem value="true">Đang bán</SelectItem>
                            <SelectItem value="false">Chưa bán</SelectItem>
                        </SelectGroup>
                    </SelectContent>
                </Select>
                <Select name="brandId" defaultValue="all">
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
                <div className="w-[180px]">
                    <SubmitButton loading={<Button type="button" variant={"blue"}>
                        Tìm kiếm...
                    </Button>}>
                        <Button variant={"blue"}>
                            Tìm kiếm
                        </Button>
                    </SubmitButton>
                </div>
            </div>
        </Form >
    )
}