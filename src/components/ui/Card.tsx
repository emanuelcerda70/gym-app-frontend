import { cn } from "@/lib/utils"
import { HTMLAttributes, forwardRef } from "react"

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  variant?: "glass" | "flat" | "ember"
}

const Card = forwardRef<HTMLDivElement, CardProps>(
  ({ className, variant = "glass", children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          "rounded-lg p-4",
          variant === "glass" && "glass",
          variant === "flat" && "bg-hierro-soft border border-hierro-border",
          variant === "ember" &&
            "bg-gradient-to-br from-ember/15 to-brasa/5 border border-ember/25",
          className
        )}
        {...props}
      >
        {children}
      </div>
    )
  }
)
Card.displayName = "Card"
export default Card
