import { getUserInfor, logoutUser } from "@/service/userService";
import { Dot } from "lucide-react";
import Form from "next/form";
import Link from "next/link";
import { redirect } from "next/navigation";

export default async function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    const infor = await getUserInfor()
    const action = [
        { name: "Tài khoản của tôi", hrel: "/user" },
        { name: "Danh sách địa chỉ", hrel: "/user/address" },
        { name: "Đơn hàng", hrel: "/user/order" },
    ]
    if (infor == undefined) {
        redirect("/")
    }
    return (
        <div className="flex justify-center">
            <div className="w-45">
                <ul className="sticky top-20">
                    {
                        action.map((v) => {
                            return (
                                <li key={v.hrel} className="pl-2.5 mb-1.25 hover:text-f cursor-pointer">

                                    <Link href={v.hrel} className="text-[14px]">
                                        {v.name}
                                    </Link>
                                </li>
                            )
                        })
                    }
                    <Form action={logoutUser}>
                        <button type="submit" className="pl-2.5 text-[14px] mb-1.25 hover:text-f cursor-pointer">
                            Đăng xuất
                        </button>
                    </Form>
                </ul>
            </div>
            <div className="w-190 h-1000">
                {children}
            </div>
        </div>
    )
}