"use client"

import { cn } from "@/lib/utils"
import { InputHTMLAttributes, forwardRef } from "react"

const Input = forwardRef<HTMLInputElement, InputHTMLAttributes<HTMLInputElement>>(
  ({ className, ...props }, ref) => {
    return (
      <input
        ref={ref}
        className={cn(
          "w-full bg-hierro-soft border border-hierro-border rounded-sm px-3 py-2.5 text-sm text-hueso placeholder-ceniza-dim outline-none transition-all",
          "focus:border-ember/60 focus:ring-2 focus:ring-ember/20",
          className
        )}
        {...props}
      />
    )
  }
)
Input.displayName = "Input"
export default Input
 
