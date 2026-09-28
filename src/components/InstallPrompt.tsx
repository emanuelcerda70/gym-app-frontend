"use client"

import { useEffect, useState } from "react"
import { Download, Share, PlusSquare, X } from "lucide-react"

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>
  userChoice: Promise<{ outcome: "accepted" | "dismissed" }>
}

const OCULTO_KEY = "ascend:install-dismissed"
const OCULTO_IOS_KEY = "ascend:install-ios-dismissed"

function yaInstalada(): boolean {
  if (typeof window === "undefined") return false
  return (
    window.matchMedia("(display-mode: standalone)").matches ||
    (window.navigator as unknown as { standalone?: boolean }).standalone === true
  )
}

function esDispositivoIOS(): boolean {
  if (typeof window === "undefined") return false
  const ua = window.navigator.userAgent.toLowerCase()
  return /iphone|ipad|ipod/.test(ua) && !(window as unknown as { MSStream?: unknown }).MSStream
}

export default function InstallPrompt() {
  const [evento, setEvento] = useState<BeforeInstallPromptEvent | null>(null)
  const [mostrarIOS, setMostrarIOS] = useState(false)

  useEffect(() => {
    if (yaInstalada()) return

    // Caso iOS
    if (esDispositivoIOS()) {
      if (!localStorage.getItem(OCULTO_IOS_KEY)) {
        // Leve retraso para no saltar inmediatamente en el primer frame
        const timer = setTimeout(() => setMostrarIOS(true), 2000)
        return () => clearTimeout(timer)
      }
      return
    }

    // Caso Android / Navegadores con soporte BeforeInstallPrompt
    if (localStorage.getItem(OCULTO_KEY)) return

    const handler = (e: Event) => {
      e.preventDefault()
      setEvento(e as BeforeInstallPromptEvent)
    }

    window.addEventListener("beforeinstallprompt", handler)
    return () => window.removeEventListener("beforeinstallprompt", handler)
  }, [])

  useEffect(() => {
    const handler = () => {
      setEvento(null)
      setMostrarIOS(false)
    }
    window.addEventListener("appinstalled", handler)
    return () => window.removeEventListener("appinstalled", handler)
  }, [])

  const instalarAndroid = async () => {
    if (!evento) return
    await evento.prompt()
    const { outcome } = await evento.userChoice
    setEvento(null)
    if (outcome !== "accepted") {
      localStorage.setItem(OCULTO_KEY, "1")
    }
  }

  const cerrarAndroid = () => {
    localStorage.setItem(OCULTO_KEY, "1")
    setEvento(null)
  }

  const cerrarIOS = () => {
    localStorage.setItem(OCULTO_IOS_KEY, "1")
    setMostrarIOS(false)
  }

  // Render para iOS
  if (mostrarIOS) {
    return (
      <div className="fixed bottom-20 inset-x-4 z-50 max-w-md mx-auto animate-fade-in">
        <div className="bg-[#14141A]/95 backdrop-blur-xl border border-[#2B2B36] rounded-2xl p-4 shadow-2xl shadow-black/70">
          <div className="flex items-start gap-3">
            <div className="w-11 h-11 rounded-xl overflow-hidden shrink-0 border border-primary/30 bg-[#09090B] p-1 flex items-center justify-center">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/icons/icon-192x192.png?v=2"
                alt="ASCEND"
                className="w-full h-full object-contain"
              />
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-display text-sm font-bold text-[#F5F7FA]">
                Instalá ASCEND en tu iPhone
              </p>
              <p className="font-sans text-xs text-[#9CA3AF] mt-0.5 leading-relaxed">
                Acceso ultra rápido y guardado de tus series sin conexión.
              </p>
            </div>
            <button
              onClick={cerrarIOS}
              aria-label="Cerrar"
              className="w-7 h-7 rounded-full flex items-center justify-center text-[#7A8090] hover:text-[#F5F7FA] hover:bg-[#1C1C22] transition-colors shrink-0 -mt-1 -mr-1"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <div className="mt-3.5 space-y-2 border-t border-[#2B2B36] pt-3 text-xs text-[#F5F7FA]">
            <div className="flex items-center gap-2.5">
              <div className="w-6 h-6 rounded-lg bg-[#1C1C22] border border-[#2B2B36] flex items-center justify-center text-primary shrink-0">
                <Share className="w-3.5 h-3.5" />
              </div>
              <p>
                1. Tocá el botón <span className="font-bold text-primary">Compartir</span> en la barra de Safari.
              </p>
            </div>
            <div className="flex items-center gap-2.5">
              <div className="w-6 h-6 rounded-lg bg-[#1C1C22] border border-[#2B2B36] flex items-center justify-center text-primary shrink-0">
                <PlusSquare className="w-3.5 h-3.5" />
              </div>
              <p>
                2. Elegí <span className="font-bold text-[#F5F7FA]">&quot;Agregar a pantalla de inicio&quot;</span>.
              </p>
            </div>
          </div>

          <button
            onClick={cerrarIOS}
            className="mt-3 w-full bg-[#1C1C22] border border-[#2B2B36] text-[#F5F7FA] font-sans font-semibold text-xs rounded-xl h-9 flex items-center justify-center hover:bg-[#2B2B36] transition-colors active:scale-[0.98]"
          >
            Entendido
          </button>
        </div>
      </div>
    )
  }

  // Render para Android
  if (evento) {
    return (
      <div className="fixed bottom-24 inset-x-4 z-50 max-w-md mx-auto animate-fade-in">
        <div className="bg-[#14141A]/95 backdrop-blur-xl border border-[#2B2B36] rounded-2xl p-4 shadow-2xl shadow-black/70">
          <div className="flex items-start gap-3">
            <div className="w-11 h-11 rounded-xl overflow-hidden shrink-0 border border-primary/30 bg-[#09090B] p-1 flex items-center justify-center">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/icons/icon-192x192.png?v=2"
                alt="ASCEND"
                className="w-full h-full object-contain"
              />
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-display text-sm font-bold text-[#F5F7FA]">
                Instalá ASCEND para una mejor experiencia
              </p>
              <p className="font-sans text-xs text-[#9CA3AF] mt-0.5 leading-relaxed">
                Accedé a tu rutina y al registro de series incluso sin conexión en el gym.
              </p>
            </div>
            <button
              onClick={cerrarAndroid}
              aria-label="Cerrar"
              className="w-7 h-7 rounded-full flex items-center justify-center text-[#7A8090] hover:text-[#F5F7FA] hover:bg-[#1C1C22] transition-colors shrink-0 -mt-1 -mr-1"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <button
            onClick={instalarAndroid}
            className="mt-4 w-full bg-primary text-[#F5F7FA] font-sans font-bold rounded-xl h-11 flex items-center justify-center gap-2 hover:bg-primary-hover transition-colors active:scale-[0.98]"
          >
            <Download className="w-4 h-4" />
            Instalar App
          </button>
        </div>
      </div>
    )
  }

  return null
}
