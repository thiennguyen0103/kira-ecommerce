"use client";

import { DataTable } from "@/components/data-table/data-table";
import { DataTableColumnHeader } from "@/components/data-table/data-table-column-header";
import { DataTableRowActions } from "@/components/data-table/data-table-row-actions";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { convertVnd } from "@/lib/utils";
import { ColumnDef } from "@tanstack/react-table";
import { format } from "date-fns";
import { PlusIcon } from "lucide-react";
import Image from "next/image";
import { productData } from "./_components/data";

const Products = () => {
  const productColumns: ColumnDef<Product>[] = [
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
        <DataTableColumnHeader column={column} title="Sản phẩm" />
      ),
      cell: ({ row }) => (
        <div className="flex items-center gap-3">
          <Image
            src={
              // item.product.image ??
              "https://www.bootstrapget.com/demos/templatemonster/arise-admin-dashboard/assets/images/user3.png"
            }
            width={60}
            height={60}
            alt={row.original.name}
            className="rounded-md"
          />
          <div>
            <div className="font-medium">{row.original.name}</div>
            <div className="text-sm text-muted-foreground">
              {row.original.subcategory.name}
            </div>
          </div>
        </div>
      ),
    },
    {
      accessorKey: "createdAt",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Ngày tạo" />
      ),
      cell: ({ row }) => {
        return <div>{format(row.original.createdAt, "dd-mm-yyyy")}</div>;
      },
    },
    {
      id: "stock",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Hàng tồn kho" />
      ),
      cell: ({ row }) => {
        return (
          <div>
            {/* TODO: add stock to db */}
            50
          </div>
        );
      },
    },
    {
      accessorKey: "price",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Số tiền" />
      ),
      cell: ({ row }) => {
        return <div>{convertVnd(row.original.price)}</div>;
      },
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
      <DataTable data={productData} columns={productColumns} />
    </div>
  );
};

export default Products;
