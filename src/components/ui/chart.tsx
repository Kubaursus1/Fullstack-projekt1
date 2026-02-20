"use client"

import * as React from "react"
import { cn } from "@/lib/utils"

export type ChartConfig = Record<
  string,
  { label?: string; color?: string } & Record<string, unknown>
>

interface ChartContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  config: ChartConfig
  children: React.ReactNode
}

const ChartContainer = React.forwardRef<HTMLDivElement, ChartContainerProps>(
  ({ config: _config, className, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn("w-full", className)}
        {...props}
      >
        {children}
      </div>
    )
  }
)
ChartContainer.displayName = "ChartContainer"

interface ChartTooltipPayloadItem {
  name: string
  value?: number
  color?: string
}

interface ChartTooltipContentProps {
  active?: boolean
  payload?: ReadonlyArray<ChartTooltipPayloadItem>
  label?: string | number
  config?: ChartConfig
}

function ChartTooltipContent({
  active,
  payload,
  label,
  config = {},
}: ChartTooltipContentProps) {
  if (!active || !payload?.length) return null
  return (
    <div className="rounded-lg border border-border bg-background px-3 py-2 text-sm shadow-md">
      {label != null && <p className="mb-2 font-medium">{String(label)}</p>}
      <div className="flex flex-col gap-1">
        {payload.map((entry) => (
          <div key={entry.name} className="flex items-center gap-2">
            {entry.color != null && (
              <span
                className="h-2 w-2 shrink-0 rounded-full"
                style={{ backgroundColor: entry.color }}
              />
            )}
            <span className="text-muted-foreground">
              {(config[entry.name]?.label ?? entry.name)}:
            </span>
            <span className="font-medium">{entry.value ?? ""}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

export { ChartContainer, ChartTooltipContent }
