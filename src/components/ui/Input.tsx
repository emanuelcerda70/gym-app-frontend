"use client"

import { cn } from "@/lib/utils"
import { InputHTMLAttributes, forwardRef } from "react"

const Input = forwardRef<HTMLInputElement, InputHTMLAttributes<HTMLInputElement>>(
  ({ className, ...props }, ref) => {
    return (
      <input
        ref={ref}
        className={cn(
          "w-full bg-white/10 border border-white/10 rounded-md px-3 py-2.5 text-sm text-white placeholder-muted-dim outline-none transition-all",
          "focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/30",
          className
        )}
        {...props}
      />
    )
  }
)
Input.displayName = "Input"
export default Input
