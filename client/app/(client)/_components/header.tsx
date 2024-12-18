"use client";

import Logo from "@/components/logo";
import { MobileToggle } from "@/components/mobile-toggle";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useAuthStore } from "@/store/auth-store";
import { ShoppingCartIcon, UserIcon } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import HeaderNav from "./header-nav";
import Search from "./search";
import UserDropdown from "./user-dropdown";

const Header = () => {
  const { isLoggedIn } = useAuthStore();
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.innerWidth >= 768) {
        if (window.scrollY > 50) {
          setIsScrolled(true);
        } else {
          setIsScrolled(false);
        }
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={cn(
        `sticky left-0 right-0 top-0 z-50 w-full border-b bg-background`,
        isScrolled && "shadow-md",
      )}
    >
      <div
        className={cn(
          "container flex h-[110px] w-full flex-wrap items-center justify-between gap-2 py-2 duration-300 md:h-16 md:flex-nowrap md:gap-4 md:py-0",
          isScrolled && "md:h-12",
        )}
      >
        <MobileToggle />
        <Logo />
        <HeaderNav />
        <div className="order-last w-full flex-1 basis-full md:order-none md:block md:w-fit md:basis-auto">
          <Search />
        </div>
        <div className="flex items-center gap-1">
          <Button
            variant="ghost"
            size="icon"
            className="-mr-2 h-8 w-8 md:mr-0 md:h-10 md:w-10"
            asChild
          >
            <Link href="/cart">
              <ShoppingCartIcon />
            </Link>
          </Button>
          <div className="hidden md:block">
            {isLoggedIn ? (
              <UserDropdown />
            ) : (
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 md:-mr-3 md:h-10 md:w-10"
                asChild
              >
                <Link href={"/login"}>
                  <UserIcon />
                </Link>
              </Button>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
