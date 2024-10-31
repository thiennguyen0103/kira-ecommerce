"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { TrendingUp } from "lucide-react";
import { useState } from "react";
import { Area, AreaChart, CartesianGrid, XAxis } from "recharts";
export const description = "A stacked area chart";

const chartData = [
  { month: "January", revenue: 186000000, income: 80000000 },
  { month: "February", revenue: 305000000, income: 200000000 },
  { month: "March", revenue: 237000000, income: 120000000 },
  { month: "April", revenue: 73000000, income: 190000000 },
  { month: "May", revenue: 209000000, income: 130000000 },
  { month: "June", revenue: 214000000, income: 140000000 },
  { month: "July", revenue: 186000000, income: 80000000 },
  { month: "August", revenue: 305000000, income: 200000000 },
  { month: "September", revenue: 237000000, income: 120000000 },
  { month: "October", revenue: 73000000, income: 190000000 },
  { month: "November", revenue: 209000000, income: 130000000 },
  { month: "December", revenue: 214000000, income: 140000000 },
];
const chartConfig = {
  revenue: {
    label: "Doanh thu",
    color: "hsl(var(--chart-1))",
  },
  income: {
    label: "Thu nhập",
    color: "hsl(var(--chart-2))",
  },
} satisfies ChartConfig;

const RevenueChart = () => {
  const [timeRange, setTimeRange] = useState("2024");
  return (
    <Card>
      <CardHeader className="flex items-center gap-2 space-y-0 border-b py-5 sm:flex-row">
        <div className="grid flex-1 gap-1 text-center sm:text-left">
          <CardTitle>Doanh số bán hàng hằng năm</CardTitle>
          <CardDescription>Hiển thị tổng doanh số trong 1 năm</CardDescription>
        </div>
        <Select value={timeRange} onValueChange={setTimeRange}>
          <SelectTrigger
            className="w-[160px] rounded-lg sm:ml-auto"
            aria-label="Select a value"
          >
            <SelectValue placeholder="Last 3 months" />
          </SelectTrigger>
          <SelectContent className="rounded-xl">
            <SelectItem value="2022" className="rounded-lg">
              2022
            </SelectItem>
            <SelectItem value="2023" className="rounded-lg">
              2023
            </SelectItem>
            <SelectItem value="2024" className="rounded-lg">
              2024
            </SelectItem>
          </SelectContent>
        </Select>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="h-[200px] w-full">
          <AreaChart
            accessibilityLayer
            data={chartData}
            margin={{
              left: 12,
              right: 12,
            }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="month"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tickFormatter={(value) => value.slice(0, 3)}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent indicator="dot" />}
            />
            <Area
              dataKey="income"
              type="natural"
              fill="var(--color-income)"
              fillOpacity={0.4}
              stroke="var(--color-income)"
              stackId="a"
            />
            <Area
              dataKey="revenue"
              type="natural"
              fill="var(--color-revenue)"
              fillOpacity={0.4}
              stroke="var(--color-revenue)"
              stackId="a"
            />
            <ChartLegend content={<ChartLegendContent />} />
          </AreaChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
};

export default RevenueChart;
