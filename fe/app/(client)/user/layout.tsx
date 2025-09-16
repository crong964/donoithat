import { UserSidebar } from "@/components/client/menu";
import { SidebarInset, SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { getUserInfor, } from "@/service/user-service";

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
        <div className="relative">
            <SidebarProvider >
                <UserSidebar />
                <SidebarInset>
                    <SidebarTrigger />
                    <div className=" h-1000">
                        {children}
                    </div>
                </SidebarInset>

            </SidebarProvider>
        </div>

    )
}