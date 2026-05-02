import { Button } from "@/components/ui/button";
import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";
import { PanelLeftIcon } from "lucide-react";


const HeaderMenu = () => {
  const { toggleSidebar } = useSidebar();
  return (
    <div
      onClick={(event) => {
        toggleSidebar();
      }}
    >
      <SidebarMenu>
        <SidebarMenuItem>
          <SidebarMenuButton>
            <PanelLeftIcon />
            <span>Quản trị viên</span>
          </SidebarMenuButton>
        </SidebarMenuItem>
      </SidebarMenu>
    </div>
  );
};

export default HeaderMenu;
