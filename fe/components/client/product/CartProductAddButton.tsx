'use client'
import SubmitButton from "@/components/button/submitbuttom"
import { addProductCart } from "@/service/cartService"
import Form from "next/form"
import { useActionState, useEffect } from "react"
import { toast } from "react-toastify"


const CartProductAddButton = (p: { curquality: number, productVariantId: string }) => {
    const [message, formAction, isPending] = useActionState(addProductCart, null)
    const curquality = p.curquality
    useEffect(() => {
        switch (message?.err) {
            case true:
                toast.error(message.mess)
                break;
            case false:
                toast.success(message.mess)
                break;

        }

        return () => {

        };
    }, [message]);
    return <>
        {
            curquality == 0 ?
                <>
                    <button className="border px-5 py-3 rounded-sm cursor-pointer w-full  uppercase  text-center">Hết hàng </button>
                </> :
                <>
                    <Form action={formAction} className="w-full">
                        <input type="hidden" name="productVariantId" value={p.productVariantId} />
                        <input type="hidden" name="quality" value={p.curquality} />
                        <SubmitButton loading={
                            <button disabled type="button" className="border px-5 py-3 rounded-sm cursor-pointer w-full  uppercase  border-f text-f text-center">
                                Đang xử lý
                            </button>
                        }>
                            <button type="submit" className="border px-5 py-3 rounded-sm cursor-pointer w-full  uppercase  border-f text-f text-center">
                                Thêm vào giỏ
                            </button>
                        </SubmitButton>
                    </Form>
                    <button className="border px-5 py-3 rounded-sm cursor-pointer w-full  uppercase ml-3.75  border-f bg-f text-white" >
                        Mua ngay
                    </button>
                </>
        }
    </>
}

export default CartProductAddButton