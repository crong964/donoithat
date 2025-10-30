import SubmitButton from "@/components/button/submit-buttom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { InputGroup, InputGroupAddon, InputGroupButton, InputGroupInput } from "@/components/ui/input-group";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select";
import { SearchIcon } from "lucide-react";
import Form from "next/form";

export default function InventoryLayout({ children }: { children: React.ReactNode }) {
    return (
        <>
            <div className="p-3.75">
                <h1 className="text-4xl font-bold">
                    Hàng tồn kho
                </h1>
            </div>
            <Form action={"/admin/warehouse/inventory"}
                className="px-3.75 pb-10">
                <div className="flex">
                    <Input type="text" name="inventoryName" placeholder="Tên sản phẩm" />
                    <Select name="onSale">
                        <SelectTrigger className="w-[180px]">
                            <SelectValue placeholder="Chọn trạng thái" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectGroup>
                                <SelectLabel>Chọn trạng thai</SelectLabel>
                                <SelectItem value="truse">Tất cả</SelectItem>
                                <SelectItem value="true">Đang bán</SelectItem>
                                <SelectItem value="false">Chưa bán</SelectItem>
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
            {children}
        </>
    )
}