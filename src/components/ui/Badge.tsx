import { cn } from "@/lib/utils"
import type { ReactNode } from "react"

interface BadgeProps {
  children: ReactNode
  variant?: "green" | "cyan" | "red"
  className?: string
}

export default function Badge({ children, variant = "green", className }: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-block text-[0.7rem] font-semibold px-2 py-0.5 rounded-full uppercase tracking-wide",
        variant === "green" && "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30",
        variant === "cyan" && "bg-cyan-500/20 text-cyan-400 border border-cyan-500/30",
        variant === "red" && "bg-red-500/20 text-red-400 border border-red-500/30",
        className
      )}
    >
      {children}
    </span>
  )
}
