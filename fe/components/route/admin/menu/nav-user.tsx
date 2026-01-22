"use client";

import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import Form from "next/form";
import { Button } from "@/components/ui/button";
import { logoutUser } from "@/service/user-service";

export function NavUser() {
  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <Form action={logoutUser}>
          <SidebarMenuButton asChild>
            <Button type="submit" variant={"none"}>
              <span className="text-sm">Đăng xuất</span>
            </Button>
          </SidebarMenuButton>
        </Form>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
