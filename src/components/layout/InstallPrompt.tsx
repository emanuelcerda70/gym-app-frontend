"use client"

import { useEffect, useState } from "react"
import { Download, X } from "lucide-react"

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>
  userChoice: Promise<{ outcome: "accepted" | "dismissed" }>
}

const OCULTO_KEY = "ascend:install-dismissed"

function yaInstalada(): boolean {
  return (
    window.matchMedia("(display-mode: standalone)").matches ||
    (window.navigator as unknown as { standalone?: boolean }).standalone === true
  )
}

function esIOS(): boolean {
  return /iphone|ipad|ipod/i.test(navigator.userAgent)
}

export default function InstallPrompt() {
  const [evento, setEvento] = useState<BeforeInstallPromptEvent | null>(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    if (yaInstalada()) return
    if (localStorage.getItem(OCULTO_KEY)) return

    const handler = (e: Event) => {
      e.preventDefault()
      setEvento(e as BeforeInstallPromptEvent)
      setVisible(true)
    }

    window.addEventListener("beforeinstallprompt", handler)
    return () => window.removeEventListener("beforeinstallprompt", handler)
  }, [])

  useEffect(() => {
    const handler = () => setVisible(false)
    window.addEventListener("appinstalled", handler)
    return () => window.removeEventListener("appinstalled", handler)
  }, [])

  if (!visible) return null

  const instalar = async () => {
    if (evento) {
      await evento.prompt()
      setVisible(false)
    }
  }

  const cerrar = () => {
    localStorage.setItem(OCULTO_KEY, "1")
    setVisible(false)
  }

  const mensajeIOS =
    "Abrí el menú Compartir y elegí “Agregar a Pantalla de Inicio” para instalar ASCEND."

  return (
    <div className="fixed bottom-24 inset-x-4 z-50 max-w-md mx-auto animate-fade-in">
      <div className="bg-surface-elevated border border-border rounded-2xl p-4 shadow-2xl shadow-black/40">
        <div className="flex items-start gap-3">
          <div className="w-11 h-11 rounded-xl overflow-hidden shrink-0 border border-primary/30">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/icons/icon-192x192.png"
              alt="ASCEND"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="flex-1 min-w-0">
            <p className="font-display text-sm font-bold text-text-primary">
              Instalá ASCEND
            </p>
            <p className="font-sans text-xs text-text-secondary mt-0.5 leading-relaxed">
              {evento ? "Accedé a tu rutina y al registro de series incluso sin conexión." : mensajeIOS}
            </p>
          </div>
          <button
            onClick={cerrar}
            aria-label="Cerrar"
            className="w-7 h-7 rounded-full flex items-center justify-center text-text-muted hover:text-text-primary hover:bg-hierro transition-colors shrink-0 -mt-1 -mr-1"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {evento && (
          <button
            onClick={instalar}
            className="mt-4 w-full bg-primary text-text-primary font-sans font-bold rounded-xl h-11 flex items-center justify-center gap-2 hover:bg-primary-hover transition-colors active:scale-[0.98]"
          >
            <Download className="w-4 h-4" />
            Descargar app
          </button>
        )}
      </div>
    </div>
  )
}