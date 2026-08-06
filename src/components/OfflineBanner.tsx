"use client"

import { WifiOff } from "lucide-react"

export default function OfflineBanner() {
  return (
    <div className="flex items-center gap-2.5 bg-secondary/10 border border-secondary/30 rounded-xl px-3.5 py-2.5 mb-4">
      <WifiOff className="w-4 h-4 text-secondary shrink-0" />
      <p className="font-sans text-xs text-secondary">
        Estás sin conexión — mostrando la última versión guardada.
      </p>
    </div>
  )
}
