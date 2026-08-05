"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Home, Dumbbell, TrendingUp, MessageCircle, User } from "lucide-react"
import { cn } from "@/lib/utils"

const tabs = [
  { href: "/dashboard", label: "Inicio", icon: Home },
  { href: "/dashboard/rutinas", label: "Rutinas", icon: Dumbbell },
  { href: "/dashboard/progreso", label: "Progreso", icon: TrendingUp },
  { href: "/dashboard/chat", label: "Chat", icon: MessageCircle },
  { href: "/dashboard/perfil", label: "Perfil", icon: User },
]

export default function BottomNav() {
  const pathname = usePathname()

  return (
    <div className="fixed bottom-0 w-full p-4 z-50">
      <nav className="mx-auto max-w-md bg-hierro/80 backdrop-blur-md border border-hierro-border rounded-2xl shadow-lg">
        <div className="flex justify-around items-center p-3">
          {tabs.map((tab) => {
            const active = pathname === tab.href || pathname.startsWith(tab.href + "/")
            const Icon = tab.icon
            return (
              <Link
                key={tab.href}
                href={tab.href}
                className="flex flex-col items-center gap-1 transition-colors"
              >
                <Icon
                  className={cn(
                    "w-6 h-6",
                    active
                      ? "text-primary"
                      : "text-text-secondary hover:text-text-primary"
                  )}
                />
                <span
                  className={cn(
                    "text-[10px] font-sans font-medium mt-1",
                    active ? "text-primary" : "text-text-secondary"
                  )}
                >
                  {tab.label}
                </span>
              </Link>
            )
          })}
        </div>
      </nav>
    </div>
  )
}