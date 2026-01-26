"use client"

import * as React from "react"
import { Area, AreaChart, CartesianGrid, XAxis } from "recharts"

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

const chartData = [
  { date: "2024-04-01", orders: 12, revenue: 2450 },
  { date: "2024-04-02", orders: 8, revenue: 1800 },
  { date: "2024-04-03", orders: 15, revenue: 3200 },
  { date: "2024-04-04", orders: 20, revenue: 4100 },
  { date: "2024-04-05", orders: 18, revenue: 3800 },
  { date: "2024-04-06", orders: 22, revenue: 4500 },
  { date: "2024-04-07", orders: 14, revenue: 2900 },
  { date: "2024-04-08", orders: 25, revenue: 5200 },
  { date: "2024-04-09", orders: 10, revenue: 2100 },
  { date: "2024-04-10", orders: 16, revenue: 3400 },
  { date: "2024-04-11", orders: 19, revenue: 3900 },
  { date: "2024-04-12", orders: 21, revenue: 4300 },
  { date: "2024-04-13", orders: 17, revenue: 3600 },
  { date: "2024-04-14", orders: 13, revenue: 2700 },
  { date: "2024-04-15", orders: 11, revenue: 2300 },
  { date: "2024-04-16", orders: 14, revenue: 2900 },
  { date: "2024-04-17", orders: 24, revenue: 4900 },
  { date: "2024-04-18", orders: 20, revenue: 4100 },
  { date: "2024-04-19", orders: 15, revenue: 3100 },
  { date: "2024-04-20", orders: 9, revenue: 1900 },
  { date: "2024-04-21", orders: 12, revenue: 2500 },
  { date: "2024-04-22", orders: 18, revenue: 3700 },
  { date: "2024-04-23", orders: 16, revenue: 3300 },
  { date: "2024-04-24", orders: 22, revenue: 4500 },
  { date: "2024-04-25", orders: 19, revenue: 3900 },
  { date: "2024-04-26", orders: 7, revenue: 1500 },
  { date: "2024-04-27", orders: 23, revenue: 4700 },
  { date: "2024-04-28", orders: 14, revenue: 2900 },
  { date: "2024-04-29", orders: 17, revenue: 3500 },
  { date: "2024-04-30", orders: 26, revenue: 5300 },
  { date: "2024-05-01", orders: 11, revenue: 2300 },
  { date: "2024-05-02", orders: 20, revenue: 4100 },
  { date: "2024-05-03", orders: 15, revenue: 3100 },
  { date: "2024-05-04", orders: 24, revenue: 4900 },
  { date: "2024-05-05", orders: 28, revenue: 5700 },
  { date: "2024-05-06", orders: 30, revenue: 6100 },
  { date: "2024-05-07", orders: 22, revenue: 4500 },
  { date: "2024-05-08", orders: 13, revenue: 2700 },
  { date: "2024-05-09", orders: 16, revenue: 3300 },
  { date: "2024-05-10", orders: 21, revenue: 4300 },
  { date: "2024-05-11", orders: 19, revenue: 3900 },
  { date: "2024-05-12", orders: 14, revenue: 2900 },
  { date: "2024-05-13", orders: 12, revenue: 2500 },
  { date: "2024-05-14", orders: 27, revenue: 5500 },
  { date: "2024-05-15", orders: 29, revenue: 5900 },
  { date: "2024-05-16", orders: 23, revenue: 4700 },
  { date: "2024-05-17", orders: 31, revenue: 6300 },
  { date: "2024-05-18", orders: 20, revenue: 4100 },
  { date: "2024-05-19", orders: 15, revenue: 3100 },
  { date: "2024-05-20", orders: 11, revenue: 2300 },
  { date: "2024-05-21", orders: 8, revenue: 1700 },
  { date: "2024-05-22", orders: 7, revenue: 1500 },
  { date: "2024-05-23", orders: 18, revenue: 3700 },
  { date: "2024-05-24", orders: 21, revenue: 4300 },
  { date: "2024-05-25", orders: 16, revenue: 3300 },
  { date: "2024-05-26", orders: 13, revenue: 2700 },
  { date: "2024-05-27", orders: 25, revenue: 5100 },
  { date: "2024-05-28", orders: 19, revenue: 3900 },
  { date: "2024-05-29", orders: 9, revenue: 1900 },
  { date: "2024-05-30", orders: 22, revenue: 4500 },
  { date: "2024-05-31", orders: 12, revenue: 2500 },
  { date: "2024-06-01", orders: 11, revenue: 2300 },
  { date: "2024-06-02", orders: 27, revenue: 5500 },
  { date: "2024-06-03", orders: 8, revenue: 1700 },
  { date: "2024-06-04", orders: 26, revenue: 5300 },
  { date: "2024-06-05", orders: 9, revenue: 1900 },
  { date: "2024-06-06", orders: 21, revenue: 4300 },
  { date: "2024-06-07", orders: 24, revenue: 4900 },
  { date: "2024-06-08", orders: 22, revenue: 4500 },
  { date: "2024-06-09", orders: 28, revenue: 5700 },
  { date: "2024-06-10", orders: 12, revenue: 2500 },
  { date: "2024-06-11", orders: 10, revenue: 2100 },
  { date: "2024-06-12", orders: 30, revenue: 6100 },
  { date: "2024-06-13", orders: 8, revenue: 1700 },
  { date: "2024-06-14", orders: 25, revenue: 5100 },
  { date: "2024-06-15", orders: 20, revenue: 4100 },
  { date: "2024-06-16", orders: 23, revenue: 4700 },
  { date: "2024-06-17", orders: 31, revenue: 6300 },
  { date: "2024-06-18", orders: 10, revenue: 2100 },
  { date: "2024-06-19", orders: 21, revenue: 4300 },
  { date: "2024-06-20", orders: 26, revenue: 5300 },
  { date: "2024-06-21", orders: 13, revenue: 2700 },
  { date: "2024-06-22", orders: 19, revenue: 3900 },
  { date: "2024-06-23", orders: 29, revenue: 5900 },
  { date: "2024-06-24", orders: 11, revenue: 2300 },
  { date: "2024-06-25", orders: 12, revenue: 2500 },
  { date: "2024-06-26", orders: 27, revenue: 5500 },
  { date: "2024-06-27", orders: 28, revenue: 5700 },
  { date: "2024-06-28", orders: 13, revenue: 2700 },
  { date: "2024-06-29", orders: 9, revenue: 1900 },
  { date: "2024-06-30", orders: 27, revenue: 5500 },
]

const chartConfig = {
  sales: {
    label: "Sales",
  },
  orders: {
    label: "Orders",
    color: "hsl(var(--chart-1))",
  },
  revenue: {
    label: "Revenue ($)",
    color: "hsl(var(--chart-2))",
  },
} satisfies ChartConfig

export function SalesChart() {
  const [timeRange, setTimeRange] = React.useState("90d")

  const filteredData = chartData.filter((item) => {
    const date = new Date(item.date)
    const referenceDate = new Date("2024-06-30")
    let daysToSubtract = 90
    if (timeRange === "30d") {
      daysToSubtract = 30
    } else if (timeRange === "7d") {
      daysToSubtract = 7
    }
    const startDate = new Date(referenceDate)
    startDate.setDate(startDate.getDate() - daysToSubtract)
    return date >= startDate
  })

  return (
    <Card className="pt-0 border border-gray-200">
      <CardHeader className="flex items-center gap-2 space-y-0 border-b py-5 sm:flex-row">
        <div className="grid flex-1 gap-1">
          <CardTitle className="text-gray-900">Sales Overview</CardTitle>
          <CardDescription>
            Track orders and revenue over time
          </CardDescription>
        </div>
        <Select value={timeRange} onValueChange={setTimeRange}>
          <SelectTrigger
            className="hidden w-[160px] rounded-lg sm:ml-auto sm:flex"
            aria-label="Select a time range"
          >
            <SelectValue placeholder="Last 3 months" />
          </SelectTrigger>
          <SelectContent className="rounded-xl">
            <SelectItem value="90d" className="rounded-lg">
              Last 3 months
            </SelectItem>
            <SelectItem value="30d" className="rounded-lg">
              Last 30 days
            </SelectItem>
            <SelectItem value="7d" className="rounded-lg">
              Last 7 days
            </SelectItem>
          </SelectContent>
        </Select>
      </CardHeader>
      <CardContent className="px-2 pt-4 sm:px-6 sm:pt-6">
        <ChartContainer
          config={chartConfig}
          className="aspect-auto h-[250px] w-full"
        >
          <AreaChart data={filteredData}>
            <defs>
              <linearGradient id="fillOrders" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="5%"
                  stopColor="var(--color-orders)"
                  stopOpacity={0.8}
                />
                <stop
                  offset="95%"
                  stopColor="var(--color-orders)"
                  stopOpacity={0.1}
                />
              </linearGradient>
              <linearGradient id="fillRevenue" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="5%"
                  stopColor="var(--color-revenue)"
                  stopOpacity={0.8}
                />
                <stop
                  offset="95%"
                  stopColor="var(--color-revenue)"
                  stopOpacity={0.1}
                />
              </linearGradient>
            </defs>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="date"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              minTickGap={32}
              tickFormatter={(value) => {
                const date = new Date(value)
                return date.toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                })
              }}
            />
            <ChartTooltip
              cursor={false}
              content={
                <ChartTooltipContent
                  labelFormatter={(value) => {
                    return new Date(value).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                    })
                  }}
                  indicator="dot"
                />
              }
            />
            <Area
              dataKey="revenue"
              type="natural"
              fill="url(#fillRevenue)"
              stroke="var(--color-revenue)"
              stackId="a"
            />
            <Area
              dataKey="orders"
              type="natural"
              fill="url(#fillOrders)"
              stroke="var(--color-orders)"
              stackId="a"
            />
            <ChartLegend content={<ChartLegendContent />} />
          </AreaChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
