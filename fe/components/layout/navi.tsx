import Link from "next/link";

export default function Navi() {
    return (
        <div className="px-3.75">
            <div>
                <ol className=" flex py-2.25 text-[13px] leading-4.75">
                    <li><Link className="" href="#">Trang chủ</Link></li>
                    <li><Link className="" href="#"> <span className="px-0.75 text-[#ccc] ml-1.25">/</span> Danh muc</Link></li>
                    <li><Link className="" href="#"><span className="px-0.75 text-[#ccc] ml-1.25">/</span> Tủ kệ</Link></li>
                </ol>
            </div>
        </div>
    )
}