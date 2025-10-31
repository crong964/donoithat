
import { Calendar, DoorClosed, DoorOpen, Home, Inbox, MapPinHouse, Network, Package, Package2, Search, Settings, User } from "lucide-react"

import {
    Sidebar,
    SIDEBAR_WIDTH_ICON,
    SidebarContent,
    SidebarFooter,
    SidebarGroup,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,

} from "@/components/ui/sidebar"
import Link from "next/link"
import LoadingLink from "@/components/admin/menu/loading-link"
import Form from "next/form"
import { logoutUser } from "@/service/user-service"
import { Button } from "../../ui/button"
import SubmitButton from "../../button/submit-buttom"


// Menu items.
const items = [
    { title: "Tài khoản của tôi", url: "/user", icon: User },
    { title: "Danh sách địa chỉ", url: "/user/address", icon: MapPinHouse },
    { title: "Đơn hàng", url: "/user/order", icon: Package2 },
]

export function UserSidebar() {

    return (
        <Sidebar className="sticky top-0" variant="inset" collapsible="icon">
            <SidebarHeader>

            </SidebarHeader>
            <SidebarContent>
                <SidebarGroup>
                    <SidebarGroupContent>
                        <SidebarMenu>
                            {items.map((item) => (
                                <SidebarMenuItem key={item.title}>
                                    <SidebarMenuButton asChild>
                                        <Link href={item.url as any}>
                                            <item.icon />
                                            <span className="text-sm">{item.title}</span>
                                        </Link>
                                    </SidebarMenuButton>
                                </SidebarMenuItem>
                            ))}
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>
            </SidebarContent>
            <SidebarFooter>
                <Form action={logoutUser}>
                    <SidebarMenuButton asChild>
                        <Button type="submit" variant={"link"}>
                            <DoorOpen />
                            <span className="text-sm">Đăng xuất</span>
                        </Button>
                    </SidebarMenuButton>
                </Form>
            </SidebarFooter>
        </Sidebar>


    )
}


