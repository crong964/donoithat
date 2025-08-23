export default function Coupon() {
    return (
        <div className="bg-home-coupon border border-[#00000014] flex rounded-2xl">
            <div className="p-2 relative">
                <div className="aspect-square p-2.5 rounded-lg bg-home-coupon-light">
                    <img className="size-15.5" src="/home_coupon_1_img.png" alt="" srcSet="" />
                </div>
                <div className="w-5 h-2.75 bg-white border-b border-[#00000014] absolute z-50 border-t-0 rounded-b-coupon  -top-0.25 right-0  translate-x-1/2">

                </div>
                <div className="w-5 h-2.75 bg-white border-b-0 border-[#00000014] absolute z-50 border-t rounded-t-coupon  -bottom-0.25 right-0  translate-x-1/2">

                </div>
            </div>
            <div className="flex-1 p-2.5 w-[70%] relative">
                <div className="flex flex-col justify-between">
                    <div className="pb-3 pr-6">
                        <p className="text-[14px] leading-4.25 font-bold">
                            Giảm 200.000đ
                        </p>
                        <p className="text-[12px] leading-4.25 font-medium">Đơn hàng từ 3 triệu</p>
                    </div>
                    <div className="">
                        <div className="flex">
                            <div className="leading-4 w-2/3">
                                <p >
                                    <span className="text-[10px]  font-normal">Mã:</span>
                                    <span className="text-[11px]  leading-3.75 font-bold">VOUCHERT3-200K</span>
                                </p>
                                <span className="text-[10px] leading-3.75">HSD: 31/03/2025</span>
                            </div>
                            <div className="px-1 flex">
                                <button style={{ lineHeight: "normal" }} className="bg-f mt-auto text-[10px] min-w-23 px-0.75 py-1 font-medium uppercase rounded-[20px] text-white">Sao chép mã</button>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="absolute right-2.5 top-2.5">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor"
                        className="" viewBox="0 0 16 16">
                        <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16" />
                        <path d="M7.002 11a1 1 0 1 1 2 0 1 1 0 0 1-2 0M7.1 4.995a.905.905 0 1 1 1.8 0l-.35 3.507a.552.552 0 0 1-1.1 0z" />
                    </svg>
                </div>
            </div>

        </div>
    )
}