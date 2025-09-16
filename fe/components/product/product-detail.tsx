'use client'
import detail from "@/tempdata/detail"
import { Minus, Plus } from "lucide-react"
import { useState } from "react"

export default function ProductDetail() {
    const [extend, setExtend] = useState(false)
    return (
        <div className="mt-3.75  p-3.75 bg-white">
            <div className="border-b-2 border-[#ededed] uppercase relative">
                <h1 className="text-f pb-2.5 border-b-f w-max border-b-2 font-semibold text-[16px] leading-5.75">
                    Mô tả sản phẩm
                </h1>
            </div>
            <div className={`${extend ? " " : " animate-shorten h-25 overflow-y-hidden"} pt-5 `}>
                <p>----------</p>
                <table className="table-auto leading-5 text-[14px] w-full">
                    <tbody>
                        {
                            detail.map((v) => {
                                return (
                                    <tr key={v.key}>
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

            </div>
            <div className="mt-7.5 flex justify-center">
                <button onClick={() => {
                    setExtend(!extend)
                }} className="w-max cursor-pointer px-3.75 py-1.75">
                    <span className="text-[14px] flex items-center space-x-2 leading-5 text-f ">
                        {extend ? <Plus></Plus> : <Minus className="font-bold" />}
                        <p>{extend ? "Mở rộng" : "Rút gọn"}</p>
                    </span>
                </button>
            </div>
        </div>
    )
}