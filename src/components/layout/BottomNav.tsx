"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Home, Dumbbell, TrendingUp, MessageCircle, User } from "lucide-react"
import { cn } from "@/lib/utils"

const tabs = [
  { href: "/dashboard", label: "Inicio", icon: Home },
  { href: "/dashboard/rutinas", label: "Rutinas", icon: Dumbbell },
  { href: "/dashboard/progreso", label: "Progreso", icon: TrendingUp },
  { href: "/dashboard/perfil", label: "Perfil", icon: User },
]

export default function BottomNav() {
  const pathname = usePathname()
  const chatActive = pathname === "/dashboard/chat" || pathname.startsWith("/dashboard/chat/")

  return (
    <div className="fixed bottom-0 w-full p-4 z-50">
      <nav className="relative mx-auto max-w-md bg-hierro/80 backdrop-blur-md border border-hierro-border rounded-2xl shadow-lg">
        <div className="flex items-stretch h-16">
          {tabs.map((tab) => {
            const active = pathname === tab.href || pathname.startsWith(tab.href + "/")
            const Icon = tab.icon
            return (
              <Link
                key={tab.href}
                href={tab.href}
                className="flex-1 flex flex-col items-center justify-center gap-1 transition-colors"
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

        {/* FAB central flotante: Chat */}
        <Link
          href="/dashboard/chat"
          className="absolute left-1/2 -translate-x-1/2 -top-7 flex flex-col items-center gap-1"
        >
          <span
            className={cn(
              "w-14 h-14 rounded-full bg-primary text-text-primary flex items-center justify-center shadow-lg transition-transform active:scale-95 hover:bg-primary-hover",
              chatActive && "ring-2 ring-secondary/60"
            )}
          >
            <MessageCircle className="w-6 h-6" />
          </span>
          <span
            className={cn(
              "text-[10px] font-sans font-medium",
              chatActive ? "text-primary" : "text-text-secondary"
            )}
          >
            Chat
          </span>
        </Link>
      </nav>
    </div>
  )
}