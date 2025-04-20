"use client"

import * as React from "react"

import { cn } from "@/lib/utils"

const ChartContainer = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & {
    config?: Record<string, { label: string; color: string }>
  }
>(({ className, children, config, ...props }, ref) => (
  <div ref={ref} className={cn("recharts-wrapper", className)} {...props}>
    <style>
      {`:root {
        --chart-1: 222.2 47.4% 11.2%;
        --chart-2: 215 27.9% 16.9%;
        --chart-3: 217.2 32.6% 17.5%;
        --chart-4: 219.2 33.7% 17.5%;
        --chart-5: 220.9 39.3% 11%;
        --chart-6: 225 25% 20%;
        --chart-7: 231 32.2% 30%;
        --chart-8: 226.7 38.9% 36.3%;
        --chart-9: 230 38.5% 44.1%;
        --chart-10: 232.2 37.6% 48.2%;
        --chart-11: 231.2 36.3% 56.3%;
        --chart-12: 227.7 35.7% 63.1%;
      }

      .dark {
        --chart-1: 210 40% 98%;
        --chart-2: 217.9 32.6% 82.5%;
        --chart-3: 219.2 32.6% 82.5%;
        --chart-4: 220.9 39.3% 89%;
        --chart-5: 225 25% 80%;
        --chart-6: 231 32.2% 70%;
        --chart-7: 226.7 38.9% 63.7%;
        --chart-8: 230 38.5% 55.9%;
        --chart-9: 232.2 37.6% 51.8%;
        --chart-10: 231.2 36.3% 43.7%;
        --chart-11: 227.7 35.7% 36.9%;
        --chart-12: 222.2 47.4% 88.8%;
      }
      `}
    </style>
    {children}
    {config ? (
      <div className="mt-6 flex items-center gap-4">
        {Object.entries(config).map(([key, { label, color }]) => (
          <div key={key} className="flex items-center gap-2">
            <div
              className="h-3 w-3 rounded-full"
              style={{
                backgroundColor: color,
              }}
            />
            <span className="text-sm text-muted-foreground">{label}</span>
          </div>
        ))}
      </div>
    ) : null}
  </div>
))
ChartContainer.displayName = "ChartContainer"

const ChartTooltip = React.forwardRef<HTMLDivElement, React.ComponentProps<"div">>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("recharts-tooltip border bg-background p-2 shadow-sm", className)} {...props} />
))
ChartTooltip.displayName = "ChartTooltip"

const ChartTooltipContent = React.forwardRef<HTMLDivElement, React.ComponentProps<"div">>(
  ({ className, ...props }, ref) => {
    const { active, payload, label } = props as any

    if (!active || !payload?.length) {
      return null
    }

    return (
      <div ref={ref} className={cn("recharts-tooltip-content", className)} {...props}>
        <div className="mb-2 text-sm font-medium">{label}</div>
        <div className="flex flex-col gap-0.5">
          {payload.map((item: any) => (
            <div key={item.name} className="flex items-center justify-between gap-2">
              <div className="flex items-center gap-1 text-sm">
                <div
                  className="h-2 w-2 rounded-full"
                  style={{
                    backgroundColor: item.color,
                  }}
                />
                <span className="text-muted-foreground">{item.name}</span>
              </div>
              <div className="text-sm font-medium">{item.value}</div>
            </div>
          ))}
        </div>
      </div>
    )
  },
)
ChartTooltipContent.displayName = "ChartTooltipContent"

export { ChartContainer, ChartTooltip, ChartTooltipContent }
