"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { UserAvatar } from "@/components/user-avatar";
import { LogOut, Settings, User } from "lucide-react";
import Link from "next/link";

const ProfileDropdown = () => {
  const onLogout = () => {
    console.log("logout");
  };
  return (
    <DropdownMenu modal={false}>
      <DropdownMenuTrigger>
        <UserAvatar />
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-40" side="bottom" align="end">
        <DropdownMenuItem asChild>
          <Link href={"/admin/profile"} className="block">
            <User className="mr-2 h-4 w-4" />
            <span>Trang cá nhân</span>
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link href={"/admin/settings"} className="block">
            <Settings className="mr-2 h-4 w-4" />
            <span>Cài đặt</span>
          </Link>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem asChild>
          <div className="cursor-pointer" onClick={onLogout}>
            <LogOut className="mr-2 h-4 w-4" />
            <span>Log out</span>
          </div>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default ProfileDropdown;
