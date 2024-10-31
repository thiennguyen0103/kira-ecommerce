"use client";

import { DataTable } from "@/components/data-table/data-table";
import { DataTableColumnHeader } from "@/components/data-table/data-table-column-header";
import { DataTableRowActions } from "@/components/data-table/data-table-row-actions";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { UserAvatar } from "@/components/user-avatar";
import { RoleEnum } from "@/enums/roles.enum";
import { ColumnDef } from "@tanstack/react-table";
import { PlusIcon } from "lucide-react";
import { usersData } from "./_components/data";

const Customers = () => {
  const userColumns: ColumnDef<User>[] = [
    {
      id: "select",
      header: ({ table }) => (
        <Checkbox
          checked={
            table.getIsAllPageRowsSelected() ||
            (table.getIsSomePageRowsSelected() && "indeterminate")
          }
          onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
          aria-label="Select all"
          className="translate-y-[2px]"
        />
      ),
      cell: ({ row }) => (
        <Checkbox
          checked={row.getIsSelected()}
          onCheckedChange={(value) => row.toggleSelected(!!value)}
          aria-label="Select row"
          className="translate-y-[2px]"
        />
      ),
      enableSorting: false,
      enableHiding: false,
    },
    {
      accessorKey: "name",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Họ tên" />
      ),
      cell: ({ row }) => (
        <div className="flex items-center gap-3">
          <UserAvatar />
          <div>
            <div className="font-medium">{row.original.name}</div>
            <div className="text-sm text-muted-foreground">
              {row.original.email}
            </div>
          </div>
        </div>
      ),
    },
    {
      accessorKey: "isActive",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Trạng thái" />
      ),
      cell: ({ row }) => (
        <Select
          value={row.original.isActive ? "true" : "false"}
          onValueChange={() => {
            // TODO: implement change status
            console.log("Change status");
          }}
        >
          <SelectTrigger aria-label="Select a value">
            <SelectValue placeholder="Last 3 months" />
          </SelectTrigger>
          <SelectContent className="rounded-xl">
            <SelectItem value="true" className="rounded-lg">
              Kích hoạt
            </SelectItem>
            <SelectItem value="false" className="rounded-lg">
              Chưa kích hoạt
            </SelectItem>
          </SelectContent>
        </Select>
      ),
    },
    {
      accessorKey: "role",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Vai trò" />
      ),
      cell: ({ row }) => (
        <div>
          <Select
            value={row.original.role.name}
            onValueChange={() => {
              // TODO: implement change role
              console.log("Change role");
            }}
          >
            <SelectTrigger aria-label="Select a value">
              <SelectValue placeholder="Last 3 months" />
            </SelectTrigger>
            <SelectContent className="rounded-xl">
              <SelectItem value={RoleEnum.Admin} className="rounded-lg">
                Quản trị viên
              </SelectItem>
              <SelectItem value={RoleEnum.Client} className="rounded-lg">
                Người dùng
              </SelectItem>
            </SelectContent>
          </Select>
        </div>
      ),
    },
    {
      id: "actions",
      cell: ({ row }) => <DataTableRowActions row={row} />,
    },
  ];

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between gap-2 space-y-0 sm:flex-row">
        <h1 className="text-2xl font-semibold">Quản lý người dùng</h1>
        <Button>
          <PlusIcon /> Tạo mới
        </Button>
      </div>
      <DataTable data={usersData} columns={userColumns} />
    </div>
  );
};

export default Customers;
