"use client";

import { Order } from "@/@types/order";
import { DataTableColumnHeader } from "@/components/data-table/data-table-column-header";
import { Button } from "@/components/ui/button";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { UserAvatar } from "@/components/user-avatar";
import { convertVnd } from "@/lib/utils";
import { ColumnDef } from "@tanstack/react-table";
import { format } from "date-fns";
import Image from "next/image";
import { orderStatus } from "../data/data";

export const columns: ColumnDef<Order>[] = [
  {
    accessorKey: "user",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Khách hàng" />
    ),
    cell: ({ row }) => (
      <div className="flex items-center gap-2">
        <UserAvatar src="https://www.bootstrapget.com/demos/templatemonster/arise-admin-dashboard/assets/images/user3.png" />
        <div>{row.original.user.name}</div>
      </div>
    ),
  },
  {
    accessorKey: "items",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Sản phẩm" />
    ),
    cell: ({ row }) => {
      return (
        <HoverCard>
          <HoverCardTrigger asChild>
            <Button variant="link" size="sm">
              Xem
            </Button>
          </HoverCardTrigger>
          <HoverCardContent className="w-[300px]">
            <ul className="space-y-4">
              {row.original.items.map((item) => (
                <li key={item.id}>
                  <div className="flex items-center gap-2">
                    <Image
                      src={
                        // item.product.image ??
                        "https://www.bootstrapget.com/demos/templatemonster/arise-admin-dashboard/assets/images/user3.png"
                      }
                      width={60}
                      height={60}
                      alt={item.product.name}
                      className="rounded-md"
                    />
                    <div>
                      <h1 className="font-bold">{item.product.name}</h1>
                      <p className="font-bold text-primary">
                        {convertVnd(item.product.price)}
                      </p>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </HoverCardContent>
        </HoverCard>
      );
    },
  },
  {
    accessorKey: "createdAt",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Ngày đặt hàng" />
    ),
    cell: ({ row }) => {
      return <div>{format(row.original.createdAt, "dd-mm-yyyy")}</div>;
    },
  },
  {
    accessorKey: "totalAmount",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Số tiền" />
    ),
    cell: ({ row }) => {
      return <div>{convertVnd(row.original.totalAmount)}</div>;
    },
  },
  {
    accessorKey: "status",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Trạng thái" />
    ),
    cell: ({ row }) => {
      const status = orderStatus.find(
        (status) => status.value === row.getValue("status"),
      );

      if (!status) {
        return null;
      }

      return (
        <div className="flex items-center gap-2">
          {<status.icon className="h-6 w-6" />}
          <span>{status.label}</span>
        </div>
      );
    },
  },
];
