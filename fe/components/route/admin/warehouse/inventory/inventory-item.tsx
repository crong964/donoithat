'use client'
import SubmitButton from "@/components/button/submit-buttom";
import { iInventory } from "@/components/inventory/interface";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import { setOpen } from "@/redux/admin/product/mediaLibraryRedux";
import { deleteInventoryAdmin } from "@/service/admin/inventory-service";
import priceFormat from "@/util/price-format";

import { SquarePen, Trash2 } from "lucide-react";
import Form from "next/form";
import Link from "next/link";
import { useActionState, useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";

export default function InventoryItem(p: iInventory) {
    const [open, setOpen] = useState(false)
    const [mess, actionDelete, pedding] = useActionState(deleteInventoryAdmin, null)
    const [del, setDel] = useState(false)
    const dis = useRef<HTMLTableRowElement>(null)
    useEffect(() => {
        let f = undefined
        if (mess?.error == false) {
            toast.success("Xóa thành công")
            setDel(true)
            const cu = dis.current
            f = setTimeout(() => {
                if (cu) {
                    cu.style = "display:none"
                }
            }, 1900);
            setOpen(false)
            return
        }
        if (mess?.error == true) {
            toast.error("Không xóa được")
        }
        return () => {
            if (f) {
                clearTimeout(f);
            }
        };
    }, [mess, dis]);

    return (
        <tr ref={dis} data-del={del} className="data-[del=true]:animate-delete ">
            <td className="text-center pb-2 ">
                <span data-show={p.onSale} className="px-3 rounded-2xl py-1.5 data-[show=false]:bg-red-600 data-[show=true]:bg-green-600 text-white">
                    {p.onSale == "true" ? "Đang bán" : "Chưa bán"}
                </span>
            </td>
            <td className=" pb-2">
                <div className="flex items-center gap-4">
                    <img className="size-25 border object-cover border-boder"
                        src={p.image} alt={p.productVariantName} srcSet="" />
                    <p>{p.productVariantName}</p>
                </div>
            </td>
            <td className="text-center pb-2">{p.brandName}</td>
            <td className="text-center pb-2">{priceFormat(p.price + "")}</td>
            <td className="text-center pb-2">{p.quality}</td>
            <td className="text-center pb-2 space-x-2.5">
                <Link href={`/admin/warehouse/inventory/${p.productVariantId}`}>
                    <Button variant={"blue"}>
                        <SquarePen />
                    </Button>
                </Link>
                <AlertDialog open={open}>
                    <AlertDialogTrigger asChild>
                        <Button onClick={() => setOpen(true)} variant="destructive"><Trash2 /></Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                        <AlertDialogHeader>
                            <AlertDialogTitle>Bạn có chắc muốn chỉnh sửa dữ liệu</AlertDialogTitle>
                            <AlertDialogDescription>
                                <p>
                                    Việc xóa sẽ khiến sản phẩm không con trên web dữ liệu cũ vẫn sẽ còn
                                </p>
                            </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter className="flex justify-between">
                            <AlertDialogCancel asChild>
                                <Button onClick={() => setOpen(false)} variant={"ghost"}>Hủy </Button>
                            </AlertDialogCancel>
                            <AlertDialogAction asChild>
                                <Form action={actionDelete}>
                                    <input type="hidden" name="productVariantId" value={p.productVariantId} />
                                    {
                                        pedding ?
                                            <Button type="button"> <Spinner /> Xóa....</Button> :
                                            <Button type="submit" >Xóa</Button>
                                    }
                                </Form>
                            </AlertDialogAction>
                        </AlertDialogFooter>
                    </AlertDialogContent>
                </AlertDialog>


            </td>
        </tr>
    )
}