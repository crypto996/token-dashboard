"use client"

import * as React from "react"
import * as SliderPrimitive from "@radix-ui/react-slider"

import { cn } from "@/lib/utils"

const CustomSlider = React.forwardRef<
  React.ElementRef<typeof SliderPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof SliderPrimitive.Root> & {
    variant?: "default" | "fomo"
    showValue?: boolean
    formatValue?: (value: number) => string
  }
>(({ className, variant = "default", showValue = false, formatValue, ...props }, ref) => {
  // 默认的格式化函数
  const defaultFormatValue = (value: number) => value.toLocaleString()
  const formatFn = formatValue || defaultFormatValue

  // 获取当前值用于显示
  const value = props.value?.[0] ?? props.defaultValue?.[0] ?? 0

  return (
    <div className="relative">
      <SliderPrimitive.Root
        ref={ref}
        className={cn("relative flex w-full touch-none select-none items-center", className)}
        {...props}
      >
        <SliderPrimitive.Track
          className={cn(
            "relative h-2 w-full grow overflow-hidden rounded-full bg-secondary",
            "transition-colors duration-200",
          )}
        >
          <SliderPrimitive.Range
            className={cn(
              "absolute h-full bg-highlight",
              variant === "fomo" && "bg-highlight-alt",
              "transition-all duration-200 ease-out",
            )}
          />
        </SliderPrimitive.Track>
        <SliderPrimitive.Thumb
          className={cn(
            "block h-5 w-5 rounded-full border-2 border-highlight bg-background",
            variant === "fomo" && "border-highlight-alt",
            "ring-offset-background transition-colors focus-visible:outline-none",
            "focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
            "hover:scale-110 active:scale-95",
            "transition-transform duration-150 ease-out",
            "disabled:pointer-events-none disabled:opacity-50",
            "shadow-md hover:shadow-lg",
          )}
        >
          {showValue && (
            <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-panel-bg px-2 py-1 rounded text-xs font-medium">
              {formatFn(value)}
            </div>
          )}
        </SliderPrimitive.Thumb>
      </SliderPrimitive.Root>
    </div>
  )
})
CustomSlider.displayName = "CustomSlider"

export { CustomSlider }
