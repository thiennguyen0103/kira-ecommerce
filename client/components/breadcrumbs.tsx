"use client";

import { convertBreadcrumb } from "@/lib/utils";
import { ChevronRight } from "lucide-react";
import { usePathname } from "next/navigation";
import { Fragment, useEffect, useState } from "react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "./ui/breadcrumb";

interface IBreadCrumbData {
  href: string;
  breadcrumb: string;
}

const Breadcrumbs = () => {
  const pathname = usePathname();
  const [breadcrumbs, setBreadcrumbs] = useState<IBreadCrumbData[]>([]);
  const isAdmin = pathname.toLowerCase().includes("/admin");

  useEffect(() => {
    if (pathname) {
      const asPathWithoutQuery = pathname.split("?")[0];
      const linkPath = asPathWithoutQuery.split("/");
      linkPath.shift();
      if (isAdmin) {
        linkPath.shift();
      }

      const pathArray: IBreadCrumbData[] = linkPath.map((path, i) => {
        return {
          breadcrumb: path,
          href:
            (isAdmin ? "/admin/" : "/") + linkPath.slice(0, i + 1).join("/"),
        };
      });

      setBreadcrumbs(pathArray);
    }
  }, [pathname, isAdmin]);

  if (!breadcrumbs.length) {
    return null;
  }

  return (
    <Breadcrumb>
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink href={isAdmin ? "/admin" : "/"}>Home</BreadcrumbLink>
        </BreadcrumbItem>
        {breadcrumbs.map((breadcrumb) => {
          return (
            <Fragment key={breadcrumb.href}>
              <BreadcrumbSeparator>
                <ChevronRight />
              </BreadcrumbSeparator>
              <BreadcrumbItem>
                <BreadcrumbLink href={breadcrumb.href} className="capitalize">
                  {convertBreadcrumb(breadcrumb.breadcrumb)}
                </BreadcrumbLink>
              </BreadcrumbItem>
            </Fragment>
          );
        })}
      </BreadcrumbList>
    </Breadcrumb>
  );
};

export default Breadcrumbs;
