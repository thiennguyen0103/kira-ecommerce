import Breadcrumbs from "@/components/breadcrumbs";
import { Separator } from "@/components/ui/separator";
import { SidebarTrigger } from "@/components/ui/sidebar";
import ProfileDropdown from "./profile-dropdown";

const Header = () => {
  return (
    <div className="sticky left-0 top-0 h-16 border-b bg-background px-2">
      <div className="flex h-full items-center justify-between gap-4">
        <div className="flex items-center space-x-3">
          <SidebarTrigger />
          <Separator orientation="vertical" className="h-4" />
          <Breadcrumbs />
        </div>
        <ProfileDropdown />
      </div>
    </div>
  );
};

export default Header;
