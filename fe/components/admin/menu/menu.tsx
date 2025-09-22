
import { Calendar, ChevronRight, Home, Inbox, Network, Package, Search, Settings, Sofa } from "lucide-react"

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

} from "@/components/ui/sidebar"
import Link from "next/link"

import LoadingLink from "./loading-link"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"

// Menu items.
const items = [
    {
        title: "Trang chủ",
        url: "/admin",
        icon: Home,
    },
    {
        title: "Sản phẩm",
        icon: Package,
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
                                                                        <Link href={subItem.url as any}>
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
                                                    <Link href={item.url as any}>
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


