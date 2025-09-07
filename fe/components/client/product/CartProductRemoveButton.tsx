'use client'
import SubmitButton from "@/components/button/submitbuttom"
import { deleteProductCart } from "@/service/cartService"
import Form from "next/form"
import { useActionState, useEffect } from "react"
import { toast } from "react-toastify"


const CartProductRemoveButton = (p: { productVariantId: string }) => {
    const [message, formAction, isPending] = useActionState(deleteProductCart, null)

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
    return (
        <Form action={formAction} className="absolute top-2.5 left-0">
            <input type="hidden"
                name="productVariantId" value={p.productVariantId} />
            <SubmitButton loading={<></>}>
                <button className="size-5 cursor-pointer bg-[#8f9bb3] text-[8px] leading-5 text-center text-white rounded-full ">
                    xóa
                </button>
            </SubmitButton>

        </Form>
    )
}

export default CartProductRemoveButton