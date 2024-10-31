import { ReactNode } from "react";
import { Icons } from "../icons";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";

type StatisticCardProps = {
  name: string;
  statistics: number | string;
  percent: number;
  trend: "increase" | "decrease";
  icon?: ReactNode;
};

const StatisticCard = ({
  name,
  statistics,
  trend,
  icon,
  percent,
}: StatisticCardProps) => {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-semibold">{name}</CardTitle>
        {icon}
      </CardHeader>
      <CardContent>
        <div className="text-lg font-bold">{statistics}</div>
        <div className="flex items-center space-x-1">
          {trend === "increase" ? (
            <Icons.increase className="h-6 w-6 text-green-500" />
          ) : (
            <Icons.decrease className="h-6 w-6 text-red-500" />
          )}
          <span className="text-sm text-muted-foreground">
            {percent}% so với tháng trước
          </span>
        </div>
      </CardContent>
    </Card>
  );
};

export default StatisticCard;
