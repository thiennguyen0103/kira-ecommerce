import
  {
    HoverCard,
    HoverCardContent,
    HoverCardTrigger,
  } from "@/components/ui/hover-card";
import
  {
    NavigationMenu,
    NavigationMenuContent,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    NavigationMenuTrigger,
    navigationMenuTriggerStyle,
  } from "@/components/ui/navigation-menu";
import { cn } from "@/lib/utils";
import { categoryService } from "@/services/category.service";
import { useQuery } from "@tanstack/react-query";
import { ChevronRight } from "lucide-react";
import Link from "next/link";

export default function HeaderNav() {
  const { data } = useQuery({
    queryKey: ["get-categories"],
    queryFn: async () => {
      try {
        const response = await categoryService.getCategories();
        return response.data;
      } catch (error) {}
    },
    retry: false,
  });

  return (
    <NavigationMenu className="hidden md:block">
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuTrigger>
            <Link href={"/cua-hang"} className="font-semibold uppercase">
              Cửa hàng
            </Link>
          </NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="w-64 p-4">
              {data?.map((category) => (
                <NavigationMenuLink asChild key={category.id}>
                  <HoverCard openDelay={200} closeDelay={200}>
                    <HoverCardTrigger asChild>
                      <li>
                        <Link
                          className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                          href={`/cua-hang/${category.slug}`}
                        >
                          <div className="flex items-center justify-between">
                            <span className="capitalize">{category.name}</span>
                            {!!category?.subcategories?.length && (
                              <ChevronRight className="h-4 w-4" />
                            )}
                          </div>
                        </Link>
                      </li>
                    </HoverCardTrigger>
                    {!!category?.subcategories?.length && (
                      <HoverCardContent
                        className="w-60 shadow-sm"
                        side="right"
                        align="start"
                        sideOffset={15}
                      >
                        <ul>
                          {category?.subcategories.map((subcategory) => (
                            <li key={subcategory.id}>
                              <Link
                                href={`/cua-hang/${category.slug}/${subcategory.slug}`}
                                className="block select-none space-y-1 rounded-md p-3 capitalize leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                              >
                                {subcategory.name}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </HoverCardContent>
                    )}
                  </HoverCard>
                </NavigationMenuLink>
              ))}
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <Link href={"/san-pham-moi"} legacyBehavior passHref>
            <NavigationMenuLink
              className={cn(
                navigationMenuTriggerStyle(),
                "font-semibold uppercase",
              )}
            >
              Sản phẩm mới
            </NavigationMenuLink>
          </Link>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
}
