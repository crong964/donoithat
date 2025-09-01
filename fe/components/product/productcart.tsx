import Link from "next/link";

export default function ProductCart() {
    return (
        <div className="w-full flex relative px-2.5 py-3.75">
            <Link href="#" className="size-5 bg-[#8f9bb3] text-[8px] leading-5 text-center text-white rounded-full absolute top-2.5 left-0">
                xóa
            </Link>
            <div className="basis-20 ">
                <img className="min-w-20 border border-boder h-auto" src="/cartpro.jpg" alt="" srcSet="" />
            </div>
            <div className="flex-1 px-4.5">
                <div className="mb-2.5">
                    <h3 className="text-[15px] max-md:line-clamp-1 leading-4.5 font-medium">
                        Đệm Ngồi Ghế Thư Giãn Vải Cotton ROSABELLA
                    </h3>
                </div>
                <div>
                    <p>
                        <span className="text-[14px] text-[#8f9bb3] leading-5 font-semibold">199,000₫</span>
                    </p>
                </div>
            </div>
            <div className="basis-20">
                <div>
                    <h3 className="text-[16px] leading-5.75 font-bold">2,587,000₫</h3>
                </div>
                <div className="flex mt-2.25 mb-0.75">
                    <button className="size-7 border-1 border-boder flex items-center justify-center">
                        <svg focusable="false" className="size-2 " viewBox="0 0 10 2" role="presentation">
                            <path d="M10 0v2H0V0z"></path>
                        </svg>
                    </button>
                    <div className="size-7 border-1 border-boder flex items-center justify-center">
                        <p className="text-[15px] leading-5.5 font-medium">2</p>
                    </div>
                    <button className="size-7 border-1 border-boder flex items-center justify-center">
                        <svg focusable="false" className="size-2 " viewBox="0 0 10 10" role="presentation">
                            <path d="M6 4h4v2H6v4H4V6H0V4h4V0h2v4z"></path>
                        </svg>
                    </button>
                </div>
            </div>
        </div>
    )
}