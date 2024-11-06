import { Menu } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { categoryService } from "@/services/category.service";
import { useAuthStore } from "@/store/auth-store";
import { useQuery } from "@tanstack/react-query";
import Link from "next/link";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "./ui/accordion";
import { ScrollArea } from "./ui/scroll-area";
import { Separator } from "./ui/separator";
import { UserAvatar } from "./user-avatar";

export const MobileToggle = () => {
  const { isLoggedIn, user } = useAuthStore();
  const { data: categories } = useQuery({
    queryKey: ["get-categories"],
    queryFn: async () => {
      try {
        const response = await categoryService.getCategories();
        return response.data;
      } catch (error) {}
    },
  });
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="-ml-2 h-8 w-8 md:ml-0 md:hidden md:h-10 md:w-10"
        >
          <Menu />
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="w-full">
        <SheetHeader>
          <SheetTitle />
          <SheetDescription />
        </SheetHeader>
        <div className="flex h-full flex-col space-y-4">
          <Link href={"/account/me"} className="flex items-center gap-4">
            <UserAvatar />
            <div className="flex flex-col">
              {isLoggedIn ? (
                <>
                  <h3 className="font-bold">{user?.name}</h3>
                  <small>{user?.email}</small>
                </>
              ) : (
                <>
                  <Link href={"/login"}>Tài khoản</Link>
                  <small>
                    <Link href={"/login"}>Đăng nhập</Link>
                  </small>
                </>
              )}
            </div>
          </Link>
          <Separator />
          <ScrollArea className="scrollbar-hide w-full flex-1" type="scroll">
            <Accordion type="multiple" className="w-full pr-2">
              {categories?.map((category) => (
                <AccordionItem value={category.id} key={category.id}>
                  <AccordionTrigger>
                    <Link
                      href={`/san-pham/${category.slug}`}
                      className="font-semibold uppercase"
                    >
                      {category.name}
                    </Link>
                  </AccordionTrigger>
                  {category?.subcategories?.length ? (
                    <AccordionContent>
                      <ul className="space-y-2">
                        {category?.subcategories.map((subcategory) => (
                          <li key={subcategory.id}>
                            <Link
                              href={`/san-pham/${category.slug}/${subcategory.slug}`}
                              className="block text-base capitalize hover:underline"
                            >
                              {subcategory.name}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </AccordionContent>
                  ) : null}
                </AccordionItem>
              ))}
            </Accordion>
          </ScrollArea>
        </div>
      </SheetContent>
    </Sheet>
  );
};
