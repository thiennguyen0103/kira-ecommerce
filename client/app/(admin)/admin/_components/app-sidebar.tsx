"use client";

import Logo from "@/components/logo";
import { Badge } from "@/components/ui/badge";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { cn } from "@/lib/utils";
import { Home, Receipt, Shirt, Users } from "lucide-react";
import { usePathname } from "next/navigation";

// Menu items.
const overviewItems = [
  {
    title: "Bảng điều khiển",
    url: "/admin",
    icon: Home,
  },
];

// Management
const managementItems = [
  {
    title: "Sản phẩm",
    url: "/admin/products",
    icon: Shirt,
  },
  {
    title: "Hóa đơn",
    url: "/admin/orders",
    icon: Receipt,
  },
  {
    title: "Khách hàng",
    url: "/admin/customers",
    icon: Users,
  },
];

export function AppSidebar() {
  const pathName = usePathname();
  return (
    <Sidebar>
      <div className="flex items-start justify-center py-4">
        <Logo />
        <Badge>Admin</Badge>
      </div>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Tổng quan</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {overviewItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton
                    asChild
                    className={cn(
                      pathName === item.url &&
                        "rounded-md bg-primary text-white hover:bg-primary hover:text-white",
                    )}
                  >
                    <a href={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
        <SidebarGroup>
          <SidebarGroupLabel>Quản lý</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {managementItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton
                    asChild
                    className={cn(
                      pathName === item.url &&
                        "rounded-md bg-primary text-white hover:bg-primary hover:text-white",
                    )}
                  >
                    <a href={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
