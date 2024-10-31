import StatisticCard from "@/components/card/statistic-card";
import { convertVnd } from "@/lib/utils";
import { DollarSign, Shirt, Users } from "lucide-react";
import Orders from "./_components/order/orders";
import RevenueChart from "./_components/revenue-chart";

const AdminPage = () => {
  return (
    <div className="w-full space-y-4">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatisticCard
          name="Thu nhập"
          statistics={convertVnd(40000000)}
          trend="increase"
          icon={<DollarSign />}
          percent={20.1}
        />
        <StatisticCard
          name="Sản phẩm đã bán"
          statistics={200}
          trend="decrease"
          icon={<Shirt />}
          percent={5}
        />
        <StatisticCard
          name="Người dùng đăng ký"
          statistics={20}
          trend="decrease"
          icon={<Users />}
          percent={2}
        />
        <StatisticCard
          name="Tổng doanh thu"
          statistics={convertVnd(20000000)}
          trend="increase"
          icon={<DollarSign />}
          percent={20.1}
        />
      </div>
      <RevenueChart />
      <Orders />
    </div>
  );
};

export default AdminPage;
