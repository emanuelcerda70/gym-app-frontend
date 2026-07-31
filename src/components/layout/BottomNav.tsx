"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import Fueguito from "@/components/ui/Fueguito"

function IconoEntrenar() {
  return (
    <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
      <path d="M6.5 6.5 L17.5 17.5 M17.5 6.5 L6.5 17.5" />
    </svg>
  )
}

function IconoProgreso() {
  return (
    <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
    </svg>
  )
}

function IconoChat() {
  return (
    <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
    </svg>
  )
}

function IconoPerfil() {
  return (
    <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" />
    </svg>
  )
}

const tabs = [
  {
    href: "/home",
    label: "Home",
    icon: (active: boolean) => <Fueguito racha={active ? 1 : 0} size={22} />,
  },
  { href: "/entrenamiento", label: "Entrenar", icon: () => <IconoEntrenar /> },
  { href: "/progreso", label: "Progreso", icon: () => <IconoProgreso /> },
  { href: "/chat", label: "Chat", icon: () => <IconoChat /> },
  { href: "/perfil", label: "Perfil", icon: () => <IconoPerfil /> },
]

export default function BottomNav() {
  const pathname = usePathname()

  return (
    <nav className="fixed bottom-3 left-1/2 -translate-x-1/2 w-[calc(100%-24px)] max-w-md h-[68px] glass rounded-full flex items-center justify-around px-2 z-50" style={{ boxShadow: "0 12px 40px rgba(0,0,0,0.6)" }}>
      {tabs.map((tab) => {
        const active = pathname === tab.href || pathname.startsWith(tab.href + "/")
        return (
          <Link
            key={tab.href}
            href={tab.href}
            className={cn(
              "flex flex-col items-center justify-center gap-0.5 w-14 h-14 rounded-full transition-all text-[10px] font-semibold",
              active ? "text-ember-soft" : "text-ceniza hover:text-hueso"
            )}
          >
            <div className={cn("flex items-center justify-center w-8 h-8 rounded-full transition-all", active && "bg-ember/10")}>
              {tab.icon(active)}
            </div>
            <span>{tab.label}</span>
          </Link>
        )
      })}
    </nav>
  )
}
