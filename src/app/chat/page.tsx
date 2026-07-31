"use client"

import AuthGuard from "@/components/layout/AuthGuard"
import Header from "@/components/layout/Header"
import BottomNav from "@/components/layout/BottomNav"
import ChatBubble from "@/components/chat/ChatBubble"
import ChatInput from "@/components/chat/ChatInput"
import QuickChips from "@/components/chat/QuickChips"
import Fueguito from "@/components/ui/Fueguito"
import { useChatStore } from "@/store/chatStore"
import { api } from "@/lib/api"
import { useRef, useEffect } from "react"

export default function ChatPage() {
  const { mensajes, cargando, agregarMensaje, setCargando } = useChatStore()
  const historyRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    historyRef.current?.scrollTo({ top: historyRef.current.scrollHeight, behavior: "smooth" })
  }, [mensajes, cargando])

  const handleSend = async (texto: string, imagenBase64: string | null) => {
    const pregunta = texto || "¿Qué ves en esta imagen?"

    agregarMensaje({ role: "user", content: pregunta })
    setCargando(true)

    try {
      const res = await api.chat.enviar({
        pregunta,
        historial: mensajes.slice(-10),
        imagen_base64: imagenBase64,
      })
      agregarMensaje({ role: "assistant", content: res.respuesta })
    } catch {
      agregarMensaje({ role: "assistant", content: "Ocurrió un error al conectar con el servidor." })
    } finally {
      setCargando(false)
    }
  }

  return (
    <AuthGuard>
      <Header />
      <main className="flex flex-col h-[calc(100vh-var(--nav-height)-92px)] px-4 pt-4 pb-2 max-w-md mx-auto">
        {/* Historial */}
        <div ref={historyRef} className="flex-1 overflow-y-auto space-y-3.5 pr-1 mb-3">
          {mensajes.length === 0 && (
            <div className="flex gap-2.5 max-w-[88%] self-start">
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-ember to-brasa flex items-center justify-center shrink-0">
                <Fueguito racha={1} size={16} />
              </div>
              <div className="px-3.5 py-2.5 text-sm leading-relaxed rounded-2xl glass rounded-bl-md">
                ¡Buenas! Soy tu Súper Entrenador. ¿Qué entrenamos hoy? Mandame una foto, pedime una
                rutina o consultame lo que quieras.
              </div>
            </div>
          )}
          {mensajes.map((msg, i) => (
            <ChatBubble key={i} msg={msg} />
          ))}
          {cargando && (
            <div className="flex gap-2.5 max-w-[88%] self-start">
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-ember to-brasa flex items-center justify-center shrink-0">
                <Fueguito racha={1} size={16} />
              </div>
              <div className="px-4 py-3 text-sm rounded-2xl glass rounded-bl-md flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-ember animate-ember-pulse" />
                <span className="w-1.5 h-1.5 rounded-full bg-ember animate-ember-pulse" style={{ animationDelay: "0.2s" }} />
                <span className="w-1.5 h-1.5 rounded-full bg-ember animate-ember-pulse" style={{ animationDelay: "0.4s" }} />
              </div>
            </div>
          )}
        </div>

        {mensajes.length === 0 && <QuickChips onSelect={(t) => handleSend(t, null)} />}

        <div className="mt-2 pb-3">
          <ChatInput onSend={handleSend} cargando={cargando} />
        </div>
      </main>
      <BottomNav />
    </AuthGuard>
  )
}
