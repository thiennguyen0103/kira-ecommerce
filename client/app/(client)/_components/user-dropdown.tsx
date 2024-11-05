"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { UserAvatar } from "@/components/user-avatar";
import { siteConfig } from "@/configs/site.config";
import { authService } from "@/services/auth.service";
import { useAuthStore } from "@/store/auth-store";
import { LogOutIcon } from "lucide-react";
import Link from "next/link";

const UserDropdown = () => {
  const { setUser } = useAuthStore();

  const onLogout = async () => {
    await authService
      .logout()
      .then(() => setUser(null))
      .then(() => window.location.reload());
  };
  return (
    <DropdownMenu modal={false}>
      <DropdownMenuTrigger asChild>
        <div className="cursor-pointer">
          <UserAvatar />
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-44" side="bottom" align="end">
        <DropdownMenuGroup>
          {siteConfig.header.account.map((nav) => (
            <DropdownMenuItem key={nav.id} asChild>
              <Link href={nav.path} className="cursor-pointer">
                {<nav.icon />}
                <span>{nav.title}</span>
              </Link>
            </DropdownMenuItem>
          ))}
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem className="cursor-pointer" onClick={onLogout}>
          <LogOutIcon className="mr-2 h-4 w-4" />
          <span>Đăng xuất</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default UserDropdown;
