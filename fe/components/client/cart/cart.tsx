'use client'
import { AddressComboBox } from "@/components/address/address-combo-box"
import Address from "@/components/address/address-model"
import { iAddress } from "@/components/address/interface"
import SubmitButton from "@/components/ui-custom/submit-buttom"
import Coupon from "@/components/coupon/coupon"
import Navi from "@/components/layout/navi"
import { iProductVariantCart } from "@/components/product/interface"
import ProductCart from "@/components/product/product-cart"
import { addOrder } from "@/service/order-service"
import PriceFormat from "@/util/price-format"
import Form from "next/form"
import { ChangeEvent, Fragment, useActionState, useEffect, useState } from "react"
import { toast } from "react-toastify"

export default function CartProduct(p: {
    ls: iProductVariantCart[],
    numberPhone: string,
    addresses: iAddress[]
}) {

    const [infor, setInfor] = useState<{
        address: string,
        note: string,
        addressId: string
    }>({
        address: "",
        note: "",
        addressId: ""
    })
    const productVariantCarts = p.ls
    const count = productVariantCarts.reduce((preValue, cur) => {
        return preValue + cur.quality
    }, 0)
    const total = productVariantCarts.reduce((preValue, cur) => {
        return preValue + cur.quality * cur.price
    }, 0)
    const handleChange = (v: ChangeEvent<any>) => {
        const { name, value } = v.target;
        for (const key in infor) {
            if (Object.prototype.hasOwnProperty.call(infor, key)) {
                const element = infor as any;
                element[name] = value
                setInfor(
                    { ...element }
                )
                console.log(element);

            }
        }

    }
    const [message, formAction, isPending] = useActionState(addOrder, null)
    const [address, setAddress] = useState(false)
    useEffect(() => {
        switch (message?.error) {
            case true:
                toast.error(message.message);
                break;
            case false:
                toast.success(message.message);
                break;
        }
        return () => {

        };
    }, [message]);
    return (
        <Fragment>
            <Navi ls={[{ name: `Giỏ hàng (${count})`, url: "#" }]} />
            <div className="flex max-md:flex-col">
                <div className="md:basis-8/12 px-3.75 ">
                    <div className="shadow-pro bg-white">
                        <div className="px-3.75 py-2.5 border-b border-a">
                            <h1 className="text-f font-bold text-[20px] leading-6">
                                Giỏ hàng của bạn
                            </h1>
                        </div>
                        {count == 0 ?
                            <div className="px-3.75 py-5 border-b border-a">
                                <p className=" text-[17px] leading-6.25">
                                    Giỏ hàng của bạn đang trống
                                </p>
                            </div> :
                            <div className="p-3.75">
                                <p className="mb-3.75">Bạn đang có
                                    <strong> {count} sản phẩm </strong>
                                    trong giỏ hàng
                                </p>
                                <div className="border-2  px-2.5 py-2 rounded-lg border-boder">
                                    {productVariantCarts
                                        .map((v) => {
                                            return <ProductCart key={v.productVariantId} {...v} />
                                        })}
                                </div>
                                <div className="mt-5  py-2 mb-2.5">
                                    <div className="bg-a p-3.75">
                                        <div className="mb-2.5 ">
                                            <h1 className="text-[14px] leading-5 font-semibold">Ghi chú đơn hàng</h1>
                                        </div>
                                        <textarea rows={5} onChange={handleChange} name="note"
                                            className="px-3.75 w-full border border-boder py-2.5 bg-white">
                                        </textarea>
                                    </div>
                                </div>
                                {/* <div>
                                    <div className="my-1.25">
                                        <div className="px-10 relative">
                                            <div className="absolute top-0 left-0 size-5 rounded-full flex justify-center items-center bg-f text-white">
                                                <i className="ri-check-line"></i>
                                            </div>
                                            <h1 className="text-[14px] leading-5 font-bold">Xuất hoá đơn cho đơn hàng</h1>
                                        </div>
                                        <div className="mt-5 text-[12px] ">
                                            <div className="flex ">
                                                <div className="basis-1/3 pr-3.75 pb-3.75">
                                                    <input placeholder="Tên công ty" type="text" className="h-10 focus:outline-none px-3 w-full border-boder border py-1.5" />
                                                </div>
                                                <div className="basis-1/3 pr-3.75 pb-3.75">
                                                    <input placeholder="Mã số thuế" type="text" className="h-10 focus:outline-none px-3 w-full border-boder border py-1.5" />
                                                </div>
                                                <div className="basis-1/3 pr-3.75 pb-3.75">
                                                    <input placeholder="Email" type="text" className="h-10 focus:outline-none px-3 w-full border-boder border py-1.5" />
                                                </div>
                                            </div>
                                            <div className=" pr-3.75 pb-3.75">
                                                <input placeholder="Địa chỉ công ty" type="text" className="h-10 focus:outline-none px-3 w-full border-boder border py-1.5" />
                                            </div>
                                            <button className="text-[13px] uppercase tracking-letter rounded-3xl px-6 leading-10 text-white bg-f w-max">
                                                Lưu thông tin
                                            </button>
                                        </div>
                                    </div>
                                </div> */}
                            </div>
                        }

                    </div>
                </div>
                <div className="flex-1 px-3.75">
                    <div className="sticky top-0">
                        <div className=" shadow-pro mb-3.75 bg-white">
                            <div className="p-3.75">
                                <h1 className="mt-2.5 mb-3.75 font-bold text-f text-[20px] leading-6">
                                    Thông tin đơn hàng
                                </h1>
                                <div className="py-2.5 flex items-center mb-2.5 border-y border-boder justify-between">
                                    <p className="text-[16px] leading-5.75 font-bold">Tổng tiền:</p>
                                    <span className="text-[24px] leading-8.75 font-bold text-f">{PriceFormat((total) + "")}₫</span>
                                </div>
                                <div className="pt-2.25">
                                    <ul className="text-[14px] text-[#252a2b] font-normal list-disc pl-3.75">
                                        <li className="mb-1 leading-4.75">Phí vận chuyển sẽ được tính ở trang Thanh toán.</li>
                                        <li className="mb-1 leading-4.75">Mã giảm giá được nhập ở trang Thanh toán</li>
                                    </ul>
                                </div>
                                {
                                    count == 0 ?
                                        <Fragment>
                                            <div className="my-2.5 px-3.75 py-2.5 rounded-sm border border-[#d20909] bg-[#fee3e8]">
                                                <p className="text-[#d20909] text-[13px]">
                                                    Giỏ hàng của bạn hiện chưa đạt mức tối thiểu để thanh toán.
                                                </p>
                                            </div>
                                            <div className="w-full mt-3">
                                                <button className=" text-center text-white text-[15px] leading-5.5 font-bold uppercase bg-[#5A5A5A] px-1.25 py-2.5 w-full bg" >
                                                    Thanh toán
                                                </button>
                                            </div>
                                        </Fragment> :
                                        <Fragment>
                                            <Form action={formAction} className="w-full mt-3">
                                                <div className=" pr-3.75 py-3.75">
                                                    <p className="text-[16px] leading-5.75 font-bold">Đại chỉ:</p>
                                                </div>
                                                <input type="hidden" name="addressId" value={infor.addressId} />
                                                <div className=" pr-3.75 pb-3.75">
                                                    <input
                                                        value={infor.address}
                                                        placeholder="Địa chỉ"
                                                        required
                                                        type="text"
                                                        className="h-10 focus:outline-none px-3 w-full border-boder border py-1.5" />
                                                </div>
                                                <AddressComboBox addresses={p.addresses} onChange={(v) => {
                                                    setInfor({ ...infor, address: v.address, addressId: v.id })
                                                }} />
                                                <button type="button" onClick={() => setAddress(true)}
                                                    className="cursor-pointer text-center my-3.75 text-white text-[15px] leading-5.5 font-bold uppercase bg-f px-1.25 py-2.5 w-full " >
                                                    Thêm địa chỉ
                                                </button>
                                                <input type="hidden" name="note" value={infor.note} />
                                                {
                                                    productVariantCarts.map((v) => {
                                                        return <>
                                                            <input key={v.productVariantId} type="hidden" name="productVariantId" value={v.productVariantId} />
                                                            <input key={v.productVariantId + v.quality} type="hidden" name="quality" value={v.quality} />
                                                        </>
                                                    })
                                                }
                                                <SubmitButton loading={
                                                    <button disabled
                                                        className="cursor-progress text-center text-white text-[15px] leading-5.5 font-bold uppercase bg-loadingbg px-1.25 py-2.5 w-full " >
                                                        Đặt hàng
                                                    </button>
                                                }>
                                                    <button type="submit"
                                                        className="cursor-pointer text-center text-white text-[15px] leading-5.5 font-bold uppercase bg-[#FF0000] px-1.25 py-2.5 w-full" >
                                                        Đặt hàng
                                                    </button>
                                                </SubmitButton>

                                            </Form>
                                        </Fragment>
                                }

                            </div>
                        </div>
                        <div className=" shadow-pro mb-3.75 p-3.75 bg-white">
                            {
                                Array.from({ length: 2 })
                                    .map((_, i) => {
                                        return <div key={i} className="mb-3.75"><Coupon /></div>
                                    })
                            }
                        </div>
                    </div>
                </div>
            </div>
            <Address
                show={address}
                onClick={() => {
                    setAddress(false)
                }} />
        </Fragment>
    )
}