import { DataTable } from "@/components/data-table/data-table";
import { data } from "../_components/data/data";
import { columns } from "../_components/order/columns";

const Orders = () => {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between gap-2 space-y-0 sm:flex-row">
        <h1 className="text-2xl font-semibold">Quản lý đơn hàng</h1>
      </div>
      <DataTable data={data} columns={columns} />
    </div>
  );
};

export default Orders;
