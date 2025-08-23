
import { Calendar, Home, Inbox, Network, Package, Search, Settings } from "lucide-react"

import {
    Sidebar,
    SIDEBAR_WIDTH_ICON,
    SidebarContent,
    SidebarGroup,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,

} from "@/components/ui/sidebar"
import Link from "next/link"

import LoadingLink from "./loadingLink"

// Menu items.
const items = [
    {
        title: "Trang chủ",
        url: "/admin",
        icon: Home,
    },
    {
        title: "Sản phẩm",
        url: "/admin/product",
        icon: Package,
    },
    {
        title: "Loại Sản phẩm",
        url: "/admin/category",
        icon: Network,
    },
]

export function AppSidebar() {

    return (
        <>
            <nav >
                <Sidebar collapsible="icon">
                    <SidebarHeader>

                    </SidebarHeader>
                    <SidebarContent>
                        <SidebarGroup>
                            <SidebarGroupContent>
                                <SidebarMenu>
                                    {items.map((item) => (
                                        <SidebarMenuItem key={item.title}>
                                            <SidebarMenuButton asChild>
                                                <Link href={item.url}>
                                                    <item.icon />
                                                    <span className="text-sm">{item.title}</span>
                                                    <LoadingLink />
                                                </Link>
                                            </SidebarMenuButton>
                                        </SidebarMenuItem>
                                    ))}
                                </SidebarMenu>
                            </SidebarGroupContent>
                        </SidebarGroup>
                    </SidebarContent>
                </Sidebar>
            </nav>
        </>


    )
}


