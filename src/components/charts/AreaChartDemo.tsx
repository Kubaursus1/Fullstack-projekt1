"use client"

import {
  Area,
  AreaChart as RechartsAreaChart,
  CartesianGrid,
  XAxis,
  YAxis,
  ResponsiveContainer,
  Tooltip,
} from "recharts"
import {
  ChartContainer,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart"

const chartData = [
  { month: "Sty", wartosc: 186, zapytania: 80 },
  { month: "Lut", wartosc: 305, zapytania: 200 },
  { month: "Mar", wartosc: 237, zapytania: 120 },
  { month: "Kwi", wartosc: 73, zapytania: 190 },
  { month: "Maj", wartosc: 209, zapytania: 130 },
  { month: "Cze", wartosc: 214, zapytania: 140 },
]

const chartConfig = {
  wartosc: {
    label: "Potwierdzone zapisy",
    color: "var(--chart-1)",
  },
  zapytania: {
    label: "Zapytania (w trakcie)",
    color: "var(--chart-2)",
  },
  month: {
    label: "Miesiąc",
  },
} satisfies ChartConfig

export function AreaChartDemo() {
  return (
    <ChartContainer config={chartConfig} className="min-h-[300px] w-full">
      <ResponsiveContainer width="100%" height="100%">
        <RechartsAreaChart data={chartData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
          <XAxis
            dataKey="month"
            tickLine={false}
            axisLine={false}
            tickMargin={8}
          />
          <YAxis tickLine={false} axisLine={false} tickMargin={8} />
          <Tooltip
            content={({ active, payload, label }) => (
              <ChartTooltipContent
                active={active}
                payload={payload}
                label={label}
                config={chartConfig}
              />
            )}
          />
          <Area
            type="monotone"
            dataKey="wartosc"
            stackId="a"
            stroke="var(--chart-1)"
            fill="var(--chart-1)"
            fillOpacity={0.6}
          />
          <Area
            type="monotone"
            dataKey="zapytania"
            stackId="a"
            stroke="var(--chart-2)"
            fill="var(--chart-2)"
            fillOpacity={0.6}
          />
        </RechartsAreaChart>
      </ResponsiveContainer>
    </ChartContainer>
  )
}
