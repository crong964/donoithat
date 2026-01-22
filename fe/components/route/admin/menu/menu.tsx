"use client";
import {
  ChevronRight,
  ChevronUp,
  Factory,
  Home,
  LucideProps,
  Package,
  ReceiptText,
  Settings,
  Shirt,
  Store,
  TicketPercent,
  User,
  User2,
  UserCog,
  Users2,
  Warehouse,
} from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import Link from "next/link";

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { usePathname } from "next/navigation";
import { _permissions } from "@/contant/permission";
import {
  ForwardRefExoticComponent,
  RefAttributes,
  useEffect,
  useMemo,
} from "react";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@radix-ui/react-dropdown-menu";
import HeaderMenu from "./header-menu";
import { NavUser } from "./nav-user";
import { useDispatch } from "react-redux";
import {
  setPermission,
  setRole,
} from "@/redux/admin/permission/permissionRedux";

const itemsMenu = [
  {
    title: "Trang chủ",
    url: "/admin",
    icon: Home,
    permission: "home.view",
  },
  {
    title: "Đơn đặt hàng",
    url: "/admin/order",
    permission: "order.view",
    icon: Package,
  },
  {
    title: "Sản phẩm bầy bán",
    icon: Shirt,
    sub: [
      {
        title: "Danh sách sản phẩm",
        url: "/admin/product",
        permission: "product.view",
      },
      {
        title: "Đăng sản phẩm",
        url: "/admin/product/add",
        permission: "product.add",
      },
      {
        title: "Loại Sản phẩm",
        url: "/admin/category",
        permission: "category.view",
      },
    ],
  },
  {
    title: "Nhãn hàng",
    icon: Factory,
    sub: [
      {
        title: "Tất cả nhãn hàng",
        url: "/admin/brand",
        permission: "brand.view",
      },
      {
        title: "Thêm nhãn hàng",
        url: "/admin/brand/add",
        permission: "brand.add",
      },
    ],
  },
  {
    title: "Người dùng",
    icon: User,
    sub: [
      {
        title: "Người mua hàng",
        url: "/admin/user",
        permission: "user.view",
      },
    ],
  },
  {
    title: "Nhân viên",
    icon: Users2,
    sub: [
      {
        title: "Danh sách nhân viên",
        url: "/admin/employee",
        permission: "employee.view",
      },
      {
        title: "Thêm nhân viên",
        url: "/admin/employee/add",
        permission: "employee.add",
      },
    ],
  },
  {
    title: "Kho hàng",
    icon: Warehouse,
    sub: [
      {
        title: "Sản phẩm tồn kho",
        url: "/admin/warehouse/inventory",
        permission: "inventory.view",
      },
      {
        title: "Thêm sản phẩm tồn kho",
        url: "/admin/warehouse/inventory/add",
        permission: "inventory.add",
      },
      {
        title: "Theo dõi sản phẩm nhập",
        url: "/admin/warehouse/order",
        permission: "follower.inventory.view",
      },
    ],
  },
  {
    title: "Hóa đơn nhập",
    icon: ReceiptText,
    sub: [
      {
        title: "Danh sách hóa đơn",
        url: "/admin/warehouse/import",
        permission: "import.view",
      },
      {
        title: "Thêm hóa đơn",
        url: "/admin/warehouse/import/add",
        permission: "import.add",
      },
    ],
  },
  {
    title: "Nhà cung cấp",
    icon: Store,
    sub: [
      {
        title: "Tất cả nhà cung cấp",
        url: "/admin/suplier",
        permission: "suplier.view",
      },
      {
        title: "Thêm nhà cung cấp",
        url: "/admin/suplier/add",
        permission: "suplier.add",
      },
    ],
  },
  {
    title: "Vai trò",
    icon: UserCog,
    sub: [
      {
        title: "Danh sách vai trò",
        url: "/admin/role",
        permission: "role.view",
      },
      {
        title: "Thêm vai trò",
        url: "/admin/role/add",
        permission: "role.add",
      },
    ],
  },

  {
    title: "Chường trình khuyến mãi",
    url: "/admin/coupon",
    icon: TicketPercent,
    permission: "",
  },
];
interface iAppSidebar {
  role: string;
  permissionUser: string;
}
export function AppSidebar({ permissionUser, role }: iAppSidebar) {
  const pathName = usePathname();
  const dispatch = useDispatch();
  const itemsMenuPemission = useMemo(() => {
    if (role == "superadmin") {
      return itemsMenu;
    }
    const permissions = permissionUser.split(" ");
    const perSet = new Set<string>();
    permissions.forEach((v) => {
      perSet.add(v);
    });
    let tempItemsmenu: (iItemsMenu1 | iItemsMenu2)[] = [];
    for (let i = 0; i < itemsMenu.length; i++) {
      const element = itemsMenu[i];
      if (element.permission && perSet.has(element.permission)) {
        tempItemsmenu.push(element);
        continue;
      }
      if (element.sub) {
        let sub: {
          title: string;
          url: string;
          permission: string;
        }[] = [];
        for (let j = 0; j < element.sub.length; j++) {
          const element2 = element.sub[j];
          if (perSet.has(element2.permission)) {
            sub.push(element2);
          }
        }
        if (sub.length > 0) {
          tempItemsmenu.push({ ...element, sub: sub });
        }
      }
    }

    return tempItemsmenu;
  }, [permissionUser, role]);
  useEffect(() => {
    dispatch(setPermission(permissionUser));
    dispatch(setRole(role));
  }, [permissionUser, role]);
  return (
    <Sidebar
      collapsible="icon"
      variant="inset"
      className="**:data-link:data-[activelink=true]:bg-blue-400 **:data-link:data-[activelink=true]:text-white "
    >
      <SidebarHeader>
        <HeaderMenu />
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {itemsMenuPemission.map((item, i) =>
                item.sub ? (
                  <Collapsible
                    asChild
                    key={item.title}
                    className="group/collapsible"
                  >
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
                                <Link
                                  data-link
                                  data-activelink={subItem.url == pathName}
                                  href={subItem.url as any}
                                >
                                  <span>{subItem.title}</span>
                                </Link>
                              </SidebarMenuSubButton>
                            </SidebarMenuSubItem>
                          ))}
                        </SidebarMenuSub>
                      </CollapsibleContent>
                    </SidebarMenuItem>
                  </Collapsible>
                ) : (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild>
                      <Link
                        data-link
                        data-activelink={item.url == pathName}
                        href={item.url}
                      >
                        <item.icon />
                        <span>{item.title}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ),
              )}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <NavUser />
      </SidebarFooter>
    </Sidebar>
  );
}

interface iItemsMenu1 {
  title: string;
  url: string;
  icon: ForwardRefExoticComponent<
    Omit<LucideProps, "ref"> & RefAttributes<SVGSVGElement>
  >;
  permission: string;
  sub?: undefined;
}
interface iItemsMenu2 {
  title: string;
  icon: ForwardRefExoticComponent<
    Omit<LucideProps, "ref"> & RefAttributes<SVGSVGElement>
  >;
  sub: {
    title: string;
    url: string;
    permission: string;
  }[];
  url?: undefined;
  permission?: undefined;
}
