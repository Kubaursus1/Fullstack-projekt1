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
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart"

interface AreaChartDemoProps {
  data: {
    month: string
    wartosc: number
    zapytania: number
  }[]
}

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

export function AreaChartDemo({ data }: AreaChartDemoProps) {
  return (
    <div className="h-full w-full">
      <ResponsiveContainer width="100%" height="100%">
        <RechartsAreaChart data={data} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
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
    </div>
  )
}