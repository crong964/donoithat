export default function ProductDelivery() {
    return (
        <div className="text-[14px] leading-5 pb-3.75 font-normal">
            <ol className="flex max-lg:flex-col max-lg:sp space-y-3.75">
                <li className="basis-1/3  flex items-center ">
                    <div className=" pl-10 pr-2.5 pt-1 relative">
                        <span className="absolute top-1/2 -translate-y-1/2 left-0">
                            <img className="w-7.5 h-auto " src="/product_deliverly_1_ico.png" alt="" srcSet="" />
                        </span>
                        1 Năm Bảo Hành
                    </div>
                </li>
                <li className="basis-1/3 flex items-center">
                    <div className="pl-10 pr-2.5 pt-1  relative">
                        <span className="absolute top-1/2 -translate-y-1/2 left-0">
                            <img className="w-7.5 h-auto " src="/product_deliverly_2_ico.png" alt="" srcSet="" />
                        </span>
                        Hỗ trợ đổi trong 3 ngày cho sản phẩm nguyên giá
                    </div>
                </li>
                <li className="basis-1/3 flex items-center">
                    <div className=" grow-0  pl-10 pr-2.5 pt-1   relative">
                        <span className="absolute top-1/2 -translate-y-1/2 left-0">
                            <img className="w-7.5 h-auto " src="/product_deliverly_3_ico.png" alt="" srcSet="" />
                        </span>
                        <span>
                            Hotline:
                            <strong> 1900 63 64 76</strong>
                            (9-21h)
                        </span>
                    </div>
                </li>
            </ol>
        </div>
    )
}