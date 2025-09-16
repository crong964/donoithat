'use client'
import {
    AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent,
    AlertDialogDescription, AlertDialogFooter,
    AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger
}
    from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { iAddress } from "./interface";
import { useActionState, useEffect, useState } from "react";
import { deleteAddresses } from "@/service/address-service";
import Form from "next/form";
import { toast } from "react-toastify";
import Link from "next/link";
import AddressEditModel from "./address-edit-model";

export default function AddressRow(v: iAddress) {
    const [mess, fomeAction, pending] = useActionState(deleteAddresses, null)
    const [open, setOpen] = useState(false)
    const [edit, setEdit] = useState(false)
    useEffect(() => {
        if (mess?.error) {
            toast.error(mess.mess)
        }
        return () => {

        };
    }, [mess]);
    return (
        <>
            <tr>
                <td className="pb-3 pr-3">
                    {v.title}
                </td>
                <td className="pb-3 pr-3">
                    {v.address}
                </td>
                <td className="pb-3 pr-3">
                    <Button variant={"ghost"} onClick={() => setEdit(true)} className="cursor-pointer">
                        Xem chi tiết
                    </Button>
                    <AlertDialog open={open} >
                        <AlertDialogTrigger asChild >
                            <Button variant="outline" onClick={() => setOpen(true)} >Xóa địa chỉ</Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                            <AlertDialogHeader>
                                <AlertDialogTitle>Bạn có muốn xóa đị chỉ này không?</AlertDialogTitle>
                                <AlertDialogDescription>
                                    Không thể hoàn tác hành động này. Thao tác này sẽ xóa vĩnh viễn tài khoản
                                    của bạn và xóa dữ liệu của bạn khỏi máy chủ của chúng tôi.
                                </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                                <AlertDialogCancel onClick={() => setOpen(false)}>
                                    Hủy bỏ
                                </AlertDialogCancel >
                                <AlertDialogAction asChild>
                                    <Form action={fomeAction}>
                                        <input type="hidden" name="addressId" value={v.addressId} />
                                        <Button type="submit">
                                            Xóa
                                        </Button>
                                    </Form>
                                </AlertDialogAction>
                            </AlertDialogFooter>
                        </AlertDialogContent>
                    </AlertDialog>
                </td>
            </tr>
            <AddressEditModel data={v} onClick={() => {
                setEdit(false)
            }} show={edit} key={v.addressId} />
        </>
    )
} 