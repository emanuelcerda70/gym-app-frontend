"use client"

import { cn } from "@/lib/utils"
import { ButtonHTMLAttributes, forwardRef } from "react"

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "ghost" | "danger" | "soft"
  fullWidth?: boolean
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "primary", fullWidth, children, ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(
          "rounded-md font-bold text-sm transition-all font-sans select-none",
          fullWidth && "w-full",
          variant === "primary" && "ember-btn",
          variant === "soft" &&
            "bg-ember/10 text-ember-soft border border-ember/25 font-semibold transition-all hover:bg-ember/20 active:scale-[0.97] disabled:opacity-50",
          variant === "ghost" && "ghost-btn",
          variant === "danger" &&
            "bg-red-500/10 text-red-400 border border-red-500/25 font-semibold transition-all hover:bg-red-500/20 active:scale-[0.97]",
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
