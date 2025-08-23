import Coupon from "@/components/coupon/coupon";
import Navi from "@/components/layout/navi";
import ProductCart from "@/components/product/productcart";

export default function CartPage() {
    return (
        <>
            <Navi />
            <div className="flex max-md:flex-col">
                <div className="md:basis-8/12 px-3.75 ">
                    <div className="shadow-pro bg-white">
                        <div className="px-3.75 py-2.5 border-b border-a">
                            <h1 className="text-f font-bold text-[20px] leading-6">
                                Giỏ hàng của bạn
                            </h1>
                        </div>
                        <div className="p-3.75">
                            <p className="mb-3.75">Bạn đang có <strong>26 sản phẩm</strong> trong giỏ hàng</p>
                            <div className="border-2  px-2.5 py-2 rounded-lg border-boder">
                                {Array.from(({ length: 26 }))
                                    .map((_) => {
                                        return <ProductCart />
                                    })}
                            </div>
                            <div className="mt-5  py-2 mb-2.5">
                                <div className="bg-a p-3.75">
                                    <div className="mb-2.5 ">
                                        <h1 className="text-[14px] leading-5 font-semibold">Ghi chú đơn hàng</h1>
                                    </div>
                                    <textarea rows={5} className="px-3.75 w-full border border-boder py-2.5 bg-white">

                                    </textarea>
                                </div>
                            </div>
                            <div>
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
                            </div>
                        </div>

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
                                    <span className="text-[24px] leading-8.75 font-bold text-f">33,835,000₫</span>
                                </div>
                                <div className="pt-2.25">
                                    <ul className="text-[14px] text-[#252a2b] font-normal list-disc pl-3.75">
                                        <li className="mb-1 leading-4.75">Phí vận chuyển sẽ được tính ở trang Thanh toán.</li>
                                        <li className="mb-1 leading-4.75">Mã giảm giá được nhập ở trang Thanh toán</li>
                                    </ul>
                                </div>
                                <div className="w-full mt-3">
                                    <button className=" text-center text-white text-[15px] leading-5.5 font-bold uppercase bg-[#FF0000] px-1.25 py-2.5 w-full bg" >
                                        Thanh toán
                                    </button>
                                </div>
                            </div>
                        </div>
                        <div className=" shadow-pro mb-3.75 p-3.75 bg-white">
                            {
                                Array.from({ length: 2 })
                                    .map((_) => {
                                        return <div className="mb-3.75"><Coupon /></div>
                                    })
                            }
                        </div>
                    </div>
                </div>
            </div>

        </>
    )
}