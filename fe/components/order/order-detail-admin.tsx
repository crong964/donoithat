'use client'
import dateFormat from "@/util/date";
import priceFormat from "@/util/price-format";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { iOrder, iProductVariantDetail } from "./interface";
import Form from "next/form";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "../ui/alert-dialog";
import { Button } from "../ui/button";
import { useActionState, useEffect, useState } from "react";
import { updatePayOrder, updateStatusOrder } from "@/service/admin/order-service";
import SubmitButton from "../button/submit-buttom";
import { toast } from "react-toastify";
import LeafletButtom from "./leaflet-buttom";


export default function OrderDetailAdmin(p: {
    order: iOrder,
    items: iProductVariantDetail[],
    orderStatus: string[]
}) {

    const orderStatus = p.orderStatus
    const order = p.order
    const items = p.items
    const tottal = items.reduce((pre, cur) => {
        return pre + cur.price * cur.quality
    }, 0)
    const [openStatus, setOpenStatus] = useState<{ status: boolean, v: string }>({
        status: false,
        v: ""
    })
    const [openPay, setOpenPay] = useState<{ status: boolean, v: string }>({
        status: false,
        v: ""
    })
    const [statusMess, formStatusAction, pending1] = useActionState(updateStatusOrder, null)
    const [statusPay, formPayAction, pending2] = useActionState(updatePayOrder, null)
    useEffect(() => {
        setOpenStatus({ status: false, v: "" })
        switch (statusMess?.err) {
            case true:
                toast.error(statusMess.message)
                break;

            default:
                break;
        }
        return () => {
        };
    }, [statusMess]);
    useEffect(() => {
        setOpenPay({ status: false, v: "" })
        switch (statusPay?.err) {
            case true:
                toast.error(statusPay.message)
                break;

            default:
                break;
        }
        return () => {
        };
    }, [statusPay]);
    return (
        <>
            <div className="pl-3.75">
                <h1 className="mb-3.75 text-2xl">
                    Chi tiết đơn hàng
                </h1>
                <div className="space-y-3.5 mb-3.75">
                    <p><span className="font-bold pr-3">Mã đơn hàng:</span> {order.orderId}</p>
                    <p><span className="font-bold pr-3">Ngày đặt:</span> {dateFormat(order.orderTime)}</p>
                    <LeafletButtom data={{ lat: parseFloat(order.lat), lng: parseFloat(order.lng) }} text={order.address} />
                    <div className="flex items-center ">
                        <span className="font-bold pr-3">Trạng thái thanh toán: </span>
                        <Select onValueChange={(v) => {
                            setOpenPay({ status: true, v: v })
                        }} value={order.pay}>
                            <SelectTrigger className="w-[180px]  font-bold">
                                <SelectValue placeholder="trạng thái thành toán" />
                            </SelectTrigger>
                            <SelectContent >
                                <SelectItem value={"Chưa thanh toán"}>
                                    Chưa thanh toán
                                </SelectItem>
                                <SelectItem value={"Đã thanh toán"}>
                                    Đã thanh toán
                                </SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                    <div className="flex items-center ">
                        <span className="font-bold pr-3">Trạng thái giao hàng:</span>
                        <Select onValueChange={(v) => {
                            setOpenStatus({ status: true, v: v })
                        }} value={order.status} >
                            <SelectTrigger className="w-[180px]   font-bold">
                                <SelectValue placeholder="trạng thái giao hàng" />
                            </SelectTrigger>
                            <SelectContent >
                                {orderStatus.map((v, i) => {
                                    return (
                                        <SelectItem value={v}>
                                            {v}
                                        </SelectItem>
                                    )
                                })}
                            </SelectContent>
                        </Select>
                    </div>

                </div>
                <div className=" p-4 w-full overflow-x-auto">
                    <table className="table-auto w-max lg:w-full ">
                        <thead>
                            <tr>
                                <th className="text-center pb-2 w-2/5">Sản phẩm</th>
                                <th className=" pb-2">Mã sản phẩm</th>
                                <th className=" pb-2">Đơn giá</th>
                                <th className=" pb-2">Số lượng</th>
                                <th className=" pb-2 text-right">Thành tiền</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                items.map((p) => {

                                    return (
                                        <tr>
                                            <td className="pb-3.75">
                                                <div className="flex h-full">
                                                    <div className="basis-20 ">
                                                        <img className="min-w-20 border border-boder h-auto"
                                                            src={p.image} alt={p.variantName} srcSet="" />
                                                    </div>
                                                    <div className="flex-1 h-full">
                                                        <div className="grid grid-cols-1 h-full content-between gap-4 px-4.5">
                                                            <h3 className="text-[15px] max-md:line-clamp-1 leading-4.5 ">
                                                                {p.productName}
                                                            </h3>
                                                            <h4 className="text-[15px] text-[#777] max-md:line-clamp-1 leading-4.25 ">
                                                                {p.variantName}
                                                            </h4>
                                                        </div>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="text-center pb-3.75">
                                                {p.productVariantId}
                                            </td>
                                            <td className="text-center pb-3.75">
                                                {priceFormat((p.price) + "")}₫
                                            </td>
                                            <td className="text-center pb-3.75">
                                                {p.quality}
                                            </td>
                                            <td className="text-right pb-3.75">
                                                {priceFormat((p.price * p.quality) + "")}₫
                                            </td>
                                        </tr>
                                    )
                                })
                            }
                            <tr>
                                <td colSpan={2} className="pt-3.75">

                                </td>
                                <td colSpan={3} className="pt-3.75">
                                    <div className="flex space-x-3 justify-end">
                                        <p className="font-bold text-2xl">
                                            Giá sản phẩm:
                                        </p>
                                        <p className="text-right text-f font-bold text-2xl">
                                            {priceFormat(tottal + "")}
                                        </p>
                                    </div>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>

            <AlertDialog open={openStatus.status}>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>Bạn có chắc thực hiện việc cập nhật trạng thái hóa đơn</AlertDialogTitle>
                        <AlertDialogDescription>
                            Không thể hoàn tác hành động này. Thao tác này sẽ xóa vĩnh viễn tài khoản
                            của bạn và xóa dữ liệu của bạn khỏi máy chủ của chúng tôi.
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter className="flex space-x-2">
                        <AlertDialogCancel asChild>
                            <Button onClick={() => {
                                setOpenStatus({ ...openStatus, status: false })
                            }} type="button" variant={"ghost"}>
                                Hủy
                            </Button>
                        </AlertDialogCancel>
                        <AlertDialogAction asChild>
                            <Form action={formStatusAction} className="bg-white hover:bg-white">
                                <input type="hidden" name="orderId" value={order.orderId} />
                                <input type="hidden" name="status" value={openStatus.v} />
                                <SubmitButton loading={
                                    <Button type="button" className="bg-loadingbg">
                                        Tiếp tục
                                    </Button>}>
                                    <Button className="bg-f">
                                        Tiếp tục
                                    </Button>
                                </SubmitButton>
                            </Form>
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>

            <AlertDialog open={openPay.status}>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>Bạn có chắc thực hiện việc cập nhật trạng thái thanh toán hóa đơn</AlertDialogTitle>
                        <AlertDialogDescription>
                            Không thể hoàn tác hành động này. Thao tác này sẽ xóa vĩnh viễn tài khoản
                            của bạn và xóa dữ liệu của bạn khỏi máy chủ của chúng tôi.
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter className="flex space-x-2">
                        <AlertDialogCancel asChild>
                            <Button variant={"ghost"} onClick={() => {
                                setOpenPay({ ...openPay, status: false })
                            }}>
                                Hủy
                            </Button>
                        </AlertDialogCancel>
                        <AlertDialogAction asChild>
                            <Form action={formPayAction} className="bg-white hover:bg-white">
                                <input type="hidden" name="orderId" value={order.orderId} />
                                <input type="hidden" name="pay" value={openPay.v} />
                                <SubmitButton loading={
                                    <Button type="button" className="bg-loadingbg">
                                        Tiếp tục
                                    </Button>}>
                                    <Button className="hover:bg-red-500 bg-f">
                                        Tiếp tục
                                    </Button>
                                </SubmitButton>
                            </Form>
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </>
    )
}