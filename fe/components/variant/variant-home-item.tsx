import Form from "next/form";
import SubmitButton from "@/components/button/submit-buttom";
import { Button } from "@/components/ui/button";
import { Fragment, useActionState, useEffect, useState } from "react";
import { updateVarient } from "@/service/admin/variant-service";
import PriceFormat from "@/util/price-format";
import { iProductVariant } from "@/components/product/interface-admin";
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger
} from "@/components/ui/alert-dialog";
import { toast } from "react-toastify";

export default function VariantsHomeItem(v: iProductVariant) {
    const [mess, formAction, pending] = useActionState(updateVarient, null)
    const [data, setData] = useState<{
        price: string
        importPrice: string
        quality: string
    }>({
        importPrice: v.importPrice + "",
        price: v.price + "",
        quality: v.quality + ""
    })

    useEffect(() => {
        switch (mess?.err) {
            case true:
                toast.error(mess.mess)
                break;

            case false:
                toast.success(mess.mess)
                break;
        }
        return () => {

        };
    }, [mess]);
    const handleChange = (v: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = v.currentTarget
        let nb = value.replaceAll(",", "")
        if (isNaN(parseInt(nb)) && nb != "") {
            return
        }
        const d = data as any
        if (!Object.hasOwn(d, name)) return
        d[name] = value.replaceAll(",", "")
        setData({ ...d })
    }
    return (
        <div className="flex space-x-4 p-3 items-center grid grid-cols-5" >
            <div className="col-span-1">
                <img className="w-20 border border-boder h-auto"
                    src={v.image} alt={v.variantName} srcSet="" />
            </div>
            <div>{v.variantName}</div>
            <div className="col-span-2">
                <div className="grid grid-cols-3">
                    <div className="col-span-1">
                        <p className="px-1.5 py-1">Giá bán</p>
                        <p className="px-1.5 py-1">Giá nhập</p>
                        <p className="px-1.5 py-1">Số lượng</p>
                    </div>
                    <div >


                        <input required
                            autoComplete="off"
                            className="px-1.5 py-1"
                            type="text" name="price"
                            value={PriceFormat(data.price)}
                            onChange={handleChange}
                            placeholder={PriceFormat((v.price) + "")} />

                        <input
                            autoComplete="off"
                            className="px-1.5 py-1"
                            type="text" name="importPrice"
                            value={PriceFormat(data.importPrice)}
                            onChange={handleChange}
                            placeholder={PriceFormat((v.importPrice) + "")} />

                        <input required
                            autoComplete="off"
                            className="px-1.5 py-1"
                            type="text" name="quality"
                            value={data.quality}
                            onChange={handleChange}
                            placeholder={v.quality + ""} />
                    </div>
                </div>
            </div>
            <div>
                <AlertDialog>
                    <AlertDialogTrigger asChild>
                        <Button className="bg-f" variant="default">Chỉnh sủa</Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                        <AlertDialogHeader>
                            <AlertDialogTitle>Bạn có chắc muốn chỉnh sửa dữ liệu</AlertDialogTitle>
                            <AlertDialogDescription>
                                <div className="grid grid-cols-3 gap-2">
                                    <div className="col-span-1 flex flex-col justify-end">
                                        <p>Giá bán</p>
                                        <p>Giá nhập</p>
                                        <p>Số lượng</p>
                                    </div>
                                    <div className="col-span-1">
                                        <p className="font-bold">Giá trị cũ</p>
                                        <p>{PriceFormat(v.price + "")}</p>
                                        <p>{PriceFormat(v.importPrice + "")}</p>
                                        <p>{v.quality}</p>
                                    </div>
                                    <div className="col-span-1">
                                        <p className="font-bold">Giá trị mới</p>
                                        <p>{PriceFormat(data.price + "")}</p>
                                        <p>{PriceFormat(data.importPrice + "")}</p>
                                        <p>{data.quality}</p>
                                    </div>
                                </div>
                            </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter className="flex justify-between">
                            <AlertDialogCancel asChild>
                                <Button variant={"ghost"}>Hủy thay đổi</Button>
                            </AlertDialogCancel>
                            <AlertDialogAction asChild>
                                <Form action={formAction}>
                                    <SubmitButton loading={undefined} >
                                        <input type="hidden" name="productVariantId" value={v.productVariantId} />
                                        <input type="hidden" name="quality" value={data.quality} />
                                        <input type="hidden" name="price" value={data.price} />
                                        <input type="hidden" name="importPrice" value={data.importPrice} />
                                        <Button type="submit">Đồng ý thay đổi</Button>
                                    </SubmitButton>
                                </Form>
                            </AlertDialogAction>
                        </AlertDialogFooter>
                    </AlertDialogContent>
                </AlertDialog>
            </div>
        </div>
    )
}