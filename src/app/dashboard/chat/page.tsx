"use client"

import { useEffect, useRef, useState } from "react"
import { Send } from "lucide-react"
import { api } from "@/lib/api"
import { cn } from "@/lib/utils"
import { getMascotAvatar } from "@/utils/mascot"
import { usePerfil } from "@/hooks/usePerfil"
import type { MensajeHistorial } from "@/types"

const MENSAJE_BIENVENIDA: MensajeHistorial = {
  role: "assistant",
  content:
    "¡Buenas! Soy el Asistente ASCEND. Contame qué querés lograr hoy: puedo armarte una rutina, ajustar tu plan o responder cualquier duda de entrenamiento.",
}

export default function ChatPage() {
  const [messages, setMessages] = useState<MensajeHistorial[]>([MENSAJE_BIENVENIDA])
  const [input, setInput] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const scrollRef = useRef<HTMLDivElement>(null)
  const { perfil } = usePerfil()
  const racha = perfil?.racha_actual_dias ?? 0

  useEffect(() => {
    const el = scrollRef.current
    if (el) el.scrollTo({ top: el.scrollHeight, behavior: "smooth" })
  }, [messages, isLoading])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const texto = input.trim()
    if (!texto || isLoading) return

    setMessages((prev) => [...prev, { role: "user", content: texto }])
    setInput("")
    setIsLoading(true)

    try {
      const res = await api.chat.enviar({
        pregunta: texto,
        historial: messages.slice(-10),
        imagen_base64: null,
      })
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: res.respuesta },
      ])
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content:
            "Ocurrió un error al conectar con el servidor. Intentá de nuevo en un momento.",
        },
      ])
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <main className="flex flex-col h-[calc(100vh-var(--nav-height)-16px)] -mb-24">
      {/* Área de mensajes */}
      <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 space-y-6">
        {messages.map((msg, i) =>
          msg.role === "user" ? (
            <div key={i} className="flex justify-end">
              <div className="bg-primary text-surface rounded-2xl rounded-tr-sm p-3 text-sm font-sans max-w-[85%]">
                {msg.content}
              </div>
            </div>
          ) : (
            <div key={i} className="flex items-end gap-2">
              <div className="w-8 h-8 rounded-full bg-hierro p-1 flex items-center justify-center shrink-0 overflow-hidden">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={getMascotAvatar(racha)}
                  alt="Mascota IA"
                  className="w-8 h-8 object-contain"
                />
              </div>
              <div className="bg-hierro-soft border border-hierro-border rounded-2xl rounded-tl-sm p-3 text-text-primary text-sm font-sans max-w-[85%]">
                {msg.content}
              </div>
            </div>
          )
        )}

        {isLoading && (
          <div className="flex items-end gap-2">
            <div className="w-8 h-8 rounded-full bg-hierro p-1 flex items-center justify-center shrink-0 overflow-hidden">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={getMascotAvatar(racha)}
                alt="Mascota IA"
                className="w-8 h-8 object-contain"
              />
            </div>
            <div className="bg-hierro-soft border border-hierro-border rounded-2xl rounded-tl-sm p-3 flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-primary animate-ember-pulse" />
              <span
                className="w-1.5 h-1.5 rounded-full bg-primary animate-ember-pulse"
                style={{ animationDelay: "0.2s" }}
              />
              <span
                className="w-1.5 h-1.5 rounded-full bg-primary animate-ember-pulse"
                style={{ animationDelay: "0.4s" }}
              />
            </div>
          </div>
        )}
      </div>

      {/* Área del input */}
      <form
        onSubmit={handleSubmit}
        className="w-full bg-surface/90 backdrop-blur-md border-t border-hierro-border p-4"
      >
        <div className="flex items-center gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Escribe aquí para crear tu rutina..."
            disabled={isLoading}
            className={cn(
              "flex-1 bg-hierro border border-hierro-border rounded-full px-4 py-3 text-sm font-sans text-text-primary placeholder:text-text-secondary/60 outline-none focus:border-primary/50 transition-colors",
              isLoading && "opacity-60"
            )}
          />
          <button
            type="submit"
            aria-label="Enviar"
            disabled={isLoading}
            className="w-10 h-10 rounded-full flex items-center justify-center bg-primary text-surface shrink-0 active:scale-95 transition-transform disabled:opacity-60 disabled:active:scale-100"
          >
            <Send className="w-4 h-4" />
          </button>
        </div>
      </form>
    </main>
  )
}
