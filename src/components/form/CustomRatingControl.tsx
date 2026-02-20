import * as React from "react"
import { cn } from "@/lib/utils"

export interface CustomRatingControlProps {
  value: number
  onChange: (value: number) => void
  onBlur?: () => void
  max?: number
  disabled?: boolean
  className?: string
  "aria-invalid"?: boolean
}

export function CustomRatingControl({
  value,
  onChange,
  onBlur,
  max = 5,
  disabled = false,
  className,
  "aria-invalid": ariaInvalid,
}: CustomRatingControlProps) {
  const [hovered, setHovered] = React.useState<number | null>(null)
  const displayValue = hovered ?? value

  return (
    <div
      className={cn("flex gap-1", className)}
      role="group"
      aria-label="Ocena w gwiazdkach"
    >
      {Array.from({ length: max }, (_, i) => i + 1).map((star) => (
        <button
          key={star}
          type="button"
          disabled={disabled}
          aria-pressed={value >= star}
          aria-invalid={ariaInvalid}
          className={cn(
            "rounded p-1 text-2xl transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-ring",
            "hover:scale-110 focus:scale-110 active:scale-95",
            displayValue >= star ? "text-yellow-500" : "text-muted-foreground"
          )}
          onMouseEnter={() => setHovered(star)}
          onMouseLeave={() => setHovered(null)}
          onClick={() => {
            onChange(star)
            onBlur?.()
          }}
        >
          ★
        </button>
      ))}
    </div>
  )
}
