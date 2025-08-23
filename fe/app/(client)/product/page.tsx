import Coupon from "@/components/coupon/coupon";
import Navi from "@/components/layout/navi";
import ProductHome from "@/components/product/producthome";
import { MainCarousel } from "@/components/ui/carousel";
import detail from "@/tempdata/detail";

export default function ProductDetai() {
    return (
        <>
            <div className="max-lg:hidden">
                <Navi />
            </div>
            <section className="lg:px-3.75">
                <div className="flex max-lg:flex-col">
                    <div className="lg:w-[45%] ">
                        <div className="sticky top-0">
                            <div className="flex max-lg:flex-col bg-white h-max">
                                <ol className="w-21.25 p-2 max-lg:hidden">
                                    {
                                        Array.from(({ length: 5 }))
                                            .map((_) => {
                                                return (
                                                    <li className="mb-2 w-17.25">
                                                        <span className="">
                                                            <img className="max-w-full h-auto border-f border" src="gallery.jpg" alt="" srcSet="" />
                                                        </span>
                                                    </li>
                                                )
                                            })
                                    }
                                </ol>
                                <div className="flex-1">
                                    <img className="w-133 h-auto object-center" src="product.jpg" alt="" srcSet="" />
                                </div>
                                <div className="p-2 lg:hidden">
                                    <MainCarousel>
                                        {
                                            Array.from(({ length: 5 }))
                                                .map((_) => {
                                                    return (
                                                        <div className="basis-22.5 shrink-0 grow-0 max-lg:pr-2">
                                                            <span className="w-full">
                                                                <img className="max-w-full h-auto border-f border" src="gallery.jpg" alt="" srcSet="" />
                                                            </span>
                                                        </div>
                                                    )
                                                })
                                        }
                                    </MainCarousel>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="lg:w-[55%]  lg:pl-3.75">
                        <div className=" bg-white px-3.75">
                            <div className="pt-3.75 mb-3.75">
                                <h1 className="text-[24px] font-bold text-f mb-1.25 leading-7.25">Bàn Học Liền Giá Sách gỗ nâu STUDENT</h1>
                                <span className="text-[14px] flex flex-wrap gap-4.75 leading-5 ">
                                    <span>Mã sản phẩm:  <b className="text-f">1099553</b> </span>
                                    <span>Tình trạng:  <b className="text-f">Còn hàng </b> </span>
                                    <span>Thương hiệu:   <b className="text-f">STUDENT</b> </span>
                                </span>
                            </div>
                            <div className="p-3.75 bg-[#fafafa]">
                                <div className="flex items-center ">
                                    <span className="w-1/5 font-semibold text-[14px]">Giá:</span>
                                    <span style={{ color: "red" }} className="text-[28px] font-semibold">
                                        2,990,000₫
                                    </span>
                                </div>
                            </div>
                            <div className="pt-3.75 mb-3.75">
                                <div className="flex px-3.75 items-center ">
                                    <span className="w-1/5 font-semibold text-[14px]">Số lượng:</span>
                                    <button className="size-9.75 border-1 border-boder flex items-center justify-center">
                                        <svg focusable="false" className="size-3 " viewBox="0 0 10 2" role="presentation">
                                            <path d="M10 0v2H0V0z"></path>
                                        </svg>
                                    </button>
                                    <div className="size-9.75 border-1 border-boder flex items-center justify-center">
                                        2
                                    </div>
                                    <button className="size-9.75 border-1 border-boder flex items-center justify-center">
                                        <svg focusable="false" className="size-3 " viewBox="0 0 10 10" role="presentation">
                                            <path d="M6 4h4v2H6v4H4V6H0V4h4V0h2v4z"></path>
                                        </svg>
                                    </button>
                                </div>
                                <div style={{ lineHeight: "normal" }} className="mt-3.75 tracking-letter flex text-[15px] font-bold">
                                    <button className="border px-5 py-3 rounded-sm cursor-pointer w-full  uppercase  border-f text-f text-center">Thêm vào giỏ </button>
                                    <button className="border px-5 py-3 rounded-sm cursor-pointer w-full  uppercase ml-3.75  border-f bg-f text-white" >Mua ngay</button>
                                </div>
                            </div>

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
                        </div>
                        <div className="">
                            <div className="lg:p-3.75 mt-3.75 bg-white">
                                <div className="flex flex-wrap max-lg:hidden -mx-1.75 -mb-2.5">
                                    {Array.from({ length: 3 })
                                        .map((v) => {
                                            return (
                                                <div className="basis-1/2 grow-0 px-1.75 mb-3.75 ">
                                                    <Coupon />
                                                </div>
                                            )
                                        })}
                                </div>
                                <div className="lg:hidden">
                                    <MainCarousel >
                                        {Array.from({ length: 3 })
                                            .map((v) => {
                                                return (
                                                    <div className="basis-6/7 shrink-0 grow-0 px-1.75 mb-3.75 ">
                                                        <Coupon />
                                                    </div>
                                                )
                                            })}
                                    </MainCarousel>
                                </div>
                            </div>
                        </div>
                        <div className="mt-3.75  p-3.75 bg-white">
                            <div className="border-b-2 border-[#ededed] uppercase relative">
                                <h1 className="text-f pb-2.5 border-b-f w-max border-b-2 font-semibold text-[16px] leading-5.75">Mô tả sản phẩm</h1>
                            </div>
                            <div className="pt-5">
                                <p>----------</p>
                                <table className="table-auto leading-5 text-[14px] w-full">
                                    <tbody>
                                        {
                                            detail.map((v) => {
                                                return (
                                                    <tr>
                                                        <td className="font-bold">{v.key}	</td>
                                                        <td className="font-normal">{v.value}</td>
                                                    </tr>
                                                )
                                            })
                                        }
                                    </tbody>
                                </table>
                                <caption className="py-3">

                                </caption>
                                <p>----------</p>
                                <span className="text-[14px] font-normal leading-5">
                                    <p>Bộ sưu tập nội thất văn phòng Student: Sự kết hợp hoàn hảo giữa Thẩm mỹ và
                                        Công năng sử dụng </p>
                                    <p>Trong nhịp sống hiện đại, nơi mà hoạt động làm việc và học
                                        tập tại nhà trở nên ngày càng quan trọng, việc chọn một sản phẩm bàn học
                                        hay tủ kệ văn phòng phù hợp là điều không thể thiếu. Những vật dụng này
                                        không chỉ phải đảm bảo tính chất lượng và chắc chắn mà còn phải thể hiện
                                        sự thẩm mỹ và phù hợp với môi trường làm việc và nội thất trong gia đình.
                                        Bộ sưu tập Student chính là sự lựa chọn hoàn hảo cho nhu cầu của bạn.</p>
                                    <p>Khung sắt và về mặt hoàn thiện xuất sắc</p>
                                    <p>
                                        Khung sắt là yếu tố quan trọng tạo nên sự chắc chắn và độ bền của các sản phẩm nội thất trong bộ sưu tập Student. Khung sắt được chế tạo bằng công nghệ tiên tiến, giúp đảm bảo tính cứng cáp và độ bền vượt trội. Với mức độ hoàn thiện cao, bạn có thể yên tâm sử dụng các sản phẩm trong thời gian dài mà không cần lo lắng về sự trầy xước hoặc biến dạng.
                                    </p>
                                    <p>
                                        Mặt bàn và ngăn tủ kệ được làm từ gỗ công nghiệp cao cấp, chất lượng và hoàn thiện tinh tế. Gỗ công nghiệp không chỉ giúp bảo vệ môi trường mà còn đảm bảo tính chất lượng và đẹp mắt. Sự hoàn thiện tỉ mỉ trên mặt gỗ tạo nên một bề mặt mịn màng và dễ dàng vệ sinh, giúp bàn luôn giữ được vẻ đẹp ban đầu suốt thời gian dài.
                                    </p>
                                    <p>
                                        Thiết kế hiện đại và thẩm mỹ
                                    </p>
                                    <p>
                                        Bộ sản phẩm Student không chỉ có tính chất lượng và chắc chắn mà còn mang đậm phong cách hiện đại. Thiết kế đơn giản, gọn gàng và tiện dụng giúp các sản phẩm phù hợp với mọi không gian làm việc và gia đình. Bạn có thể dễ dàng kết hợp bàn, tủ kệ với các loại ghế và trang trí nội thất khác để tạo nên một môi trường làm việc thú vị và sáng tạo.
                                    </p>
                                </span>
                                <div className="mt-7.5 flex justify-center">
                                    <button className="w-max cursor-pointer px-3.75 py-1.75">
                                        <span className="text-[14px] leading-5 text-f ">Rút ngọn nội dung</span>
                                    </button>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </section>
            <section className="lg:px-3.75 mt-10 pb-17.5">
                <div className="mb-5">
                    <h2 className="text-[24px] font-bold leading-7.25 text-f">
                        <a href="#" >Xem thêm sản phẩm cùng loại</a>
                    </h2>
                </div>
                <MainCarousel >
                    {Array.from({ length: 5 })
                        .map((v) => {
                            return (
                                <ProductHome />
                            )
                        })}
                </MainCarousel>
            </section>
            <section className="lg:px-3.75  pb-17.5">
                <div className="mb-5">
                    <h2 className="text-[24px] font-bold leading-7.25 text-f">
                        <a href="#" >Sản phẩm đã xem</a>
                    </h2>
                </div>
                <MainCarousel >
                    {Array.from({ length: 5 })
                        .map((v) => {
                            return (
                                <ProductHome />
                            )
                        })}
                </MainCarousel>
            </section>
        </>
    )
}