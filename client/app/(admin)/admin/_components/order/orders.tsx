import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { data } from "../data/data";
import { columns } from "./columns";
import { DataTable } from "@/components/data-table/data-table";

const Orders = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Đơn đặt hàng</CardTitle>
      </CardHeader>
      <CardContent>
        <DataTable data={data} columns={columns} />
      </CardContent>
    </Card>
  );
};

export default Orders;
