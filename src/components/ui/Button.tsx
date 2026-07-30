"use client"

import { cn } from "@/lib/utils"
import { ButtonHTMLAttributes, forwardRef } from "react"

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "ghost" | "danger"
  fullWidth?: boolean
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "primary", fullWidth, children, ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(
          "rounded-md font-bold text-sm transition-all font-sans",
          fullWidth && "w-full",
          variant === "primary" &&
            "bg-gradient-to-r from-emerald-500 to-cyan-500 text-black hover:opacity-90 active:scale-[0.98]",
          variant === "ghost" &&
            "bg-white/10 text-muted hover:bg-white/20 border border-white/10",
          variant === "danger" &&
            "bg-red-500/20 text-red-400 border border-red-500/30 hover:bg-red-500/30",
          props.disabled && "opacity-50 cursor-not-allowed",
          className
        )}
        {...props}
      >
        {children}
      </button>
    )
  }
)
Button.displayName = "Button"
export default Button
