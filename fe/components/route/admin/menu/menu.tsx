'use client'
import { Calendar, ChevronRight, Home, Inbox, Network, Package, Search, Settings, Shirt, Sofa, Store, TicketPercent, Warehouse } from "lucide-react"

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
    SidebarMenuSub,
    SidebarMenuSubButton,
    SidebarMenuSubItem,
    SidebarTrigger,

} from "@/components/ui/sidebar"
import Link from "next/link"

import LoadingLink from "./loading-link"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import { usePathname } from "next/navigation"

// Menu items.
const items = [
    {
        title: "Trang chủ",
        url: "/admin",
        icon: Home,
    },
    {
        title: "Sản phẩm",
        icon: Shirt,
        sub:
            [
                {
                    title: "Các sản phẩm",
                    url: "/admin/product"
                },
                {
                    title: "Thêm sản phẩm",
                    url: "/admin/product/add"
                }
            ]
    },
    {
        title: "Đơn đặt hàng",
        url: "/admin/order",
        icon: Package,
    },
    {
        title: "Loại Sản phẩm",
        url: "/admin/category",
        icon: Network,
    },
    {
        title: "Kho hàng",
        icon: Warehouse,
        sub: [
            {
                title: "Sản phẩm tồn kho",
                url: "/admin/warehouse/inventory"
            },
        ]
    },
    {
        title: "Nhà cung cấp",
        url: "/admin/suplier",
        icon: Store,
    },
    {
        title: "Chường trình khuyến mãi",
        url: "/admin/coupon",
        icon: TicketPercent,
    },
]

export function AppSidebar() {
    const pathName = usePathname();

    return (
        <>
            <nav >
                <Sidebar collapsible="icon" className="**:data-link:data-[activelink=true]:bg-blue-400 **:data-link:data-[activelink=true]:text-white ">
                    <SidebarHeader>
                        <SidebarTrigger className="w-full">

                        </SidebarTrigger>
                    </SidebarHeader>
                    <SidebarContent>
                        <SidebarGroup>
                            <SidebarGroupContent>
                                <SidebarMenu>
                                    {items.map((item, i) => (
                                        item.sub ?
                                            <Collapsible asChild key={item.title}
                                                className="group/collapsible">
                                                <SidebarMenuItem>
                                                    <CollapsibleTrigger asChild>
                                                        <SidebarMenuButton tooltip={item.title}>
                                                            {item.icon && <item.icon />}
                                                            <span>{item.title}</span>
                                                            <ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
                                                        </SidebarMenuButton>
                                                    </CollapsibleTrigger>
                                                    <CollapsibleContent>
                                                        <SidebarMenuSub>
                                                            {item.sub.map((subItem) => (
                                                                <SidebarMenuSubItem key={subItem.title}>
                                                                    <SidebarMenuSubButton asChild>
                                                                        <Link data-link data-activelink={subItem.url == pathName}
                                                                            href={subItem.url as any}>
                                                                            <span>{subItem.title}</span>
                                                                        </Link>
                                                                    </SidebarMenuSubButton>
                                                                </SidebarMenuSubItem>
                                                            ))}
                                                        </SidebarMenuSub>
                                                    </CollapsibleContent>
                                                </SidebarMenuItem>
                                            </Collapsible> :
                                            <SidebarMenuItem key={item.title} >
                                                <SidebarMenuButton asChild>
                                                    <Link data-link data-activelink={item.url == pathName}
                                                        href={item.url as any}>
                                                        <item.icon />
                                                        <span>{item.title}</span>
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


