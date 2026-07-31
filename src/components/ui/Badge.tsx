import { cn } from "@/lib/utils"
import type { ReactNode } from "react"

interface BadgeProps {
  children: ReactNode
  variant?: "ember" | "ghost" | "danger" | "brasa"
  className?: string
}

export default function Badge({ children, variant = "ember", className }: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-block text-[0.7rem] font-semibold px-2 py-0.5 rounded-full uppercase tracking-wide",
        variant === "ember" && "bg-ember/15 text-ember-soft border border-ember/30",
        variant === "ghost" && "bg-hierro-soft text-ceniza border border-hierro-border",
        variant === "brasa" && "bg-brasa/10 text-brasa border border-brasa/30",
        variant === "danger" && "bg-red-500/10 text-red-400 border border-red-500/30",
        className
      )}
    >
      {children}
    </span>
  )
}
