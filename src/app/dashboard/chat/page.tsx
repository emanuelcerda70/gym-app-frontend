"use client"

import { useEffect, useRef, useState } from "react"
import { ImagePlus, Send, X } from "lucide-react"
import { api } from "@/lib/api"
import { cn } from "@/lib/utils"
import { getMascotAvatar } from "@/utils/mascot"
import { usePerfil } from "@/hooks/usePerfil"
import type { MensajeHistorial } from "@/types"

interface ChatMsg extends MensajeHistorial {
  imagen?: string | null
}

const MENSAJE_BIENVENIDA: ChatMsg = {
  role: "assistant",
  content:
    "¡Buenas! Soy el Asistente ASCEND. Contame qué querés lograr hoy: puedo armarte una rutina, ajustar tu plan o responder cualquier duda de entrenamiento.",
}

export default function ChatPage() {
  const [messages, setMessages] = useState<ChatMsg[]>([MENSAJE_BIENVENIDA])
  const [input, setInput] = useState("")
  const [imagen, setImagen] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const scrollRef = useRef<HTMLDivElement>(null)
  const fileRef = useRef<HTMLInputElement>(null)
  const { perfil } = usePerfil()
  const racha = perfil?.racha_actual_dias ?? 0

  useEffect(() => {
    const el = scrollRef.current
    if (el) el.scrollTo({ top: el.scrollHeight, behavior: "smooth" })
  }, [messages, isLoading])

  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    const reader = new FileReader()
    reader.onload = () => setImagen(reader.result as string)
    reader.readAsDataURL(file)
    e.target.value = ""
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const texto = input.trim()
    if ((!texto && !imagen) || isLoading) return

    setMessages((prev) => [
      ...prev,
      { role: "user", content: texto, imagen },
    ])
    setInput("")
    setImagen(null)
    setIsLoading(true)

    try {
      const res = await api.chat.enviar({
        pregunta: texto,
        historial: messages.slice(-10),
        imagen_base64: imagen,
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
            <div key={i} className="flex flex-col items-end gap-2">
              {msg.imagen && (
                <div className="max-w-[85%] rounded-2xl overflow-hidden border border-primary/30">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={msg.imagen}
                    alt="Foto adjunta"
                    className="max-h-40 w-auto object-cover"
                  />
                </div>
              )}
              {msg.content && (
                <div className="bg-primary text-surface rounded-2xl rounded-tr-sm p-3 text-sm font-sans max-w-[85%]">
                  {msg.content}
                </div>
              )}
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
        {/* Preview de imagen */}
        {imagen && (
          <div className="flex items-center gap-2 mb-3">
            <div className="relative rounded-xl overflow-hidden border border-primary/30">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={imagen} alt="Preview" className="h-16 w-auto object-cover" />
              <button
                onClick={() => setImagen(null)}
                aria-label="Quitar imagen"
                className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full bg-surface border border-border text-text-primary flex items-center justify-center hover:bg-primary transition-colors"
              >
                <X className="w-3 h-3" />
              </button>
            </div>
          </div>
        )}

        <div className="flex items-center gap-2">
          <input
            ref={fileRef}
            type="file"
            accept="image/*"
            onChange={handleFile}
            className="hidden"
          />
          <button
            type="button"
            onClick={() => fileRef.current?.click()}
            aria-label="Adjuntar foto"
            disabled={isLoading}
            className="w-10 h-10 rounded-full flex items-center justify-center text-text-secondary hover:text-text-primary hover:bg-hierro shrink-0 transition-colors active:scale-95 disabled:opacity-60"
          >
            <ImagePlus className="w-5 h-5" />
          </button>
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
            disabled={(!input.trim() && !imagen) || isLoading}
            className="w-10 h-10 rounded-full flex items-center justify-center bg-primary text-surface shrink-0 active:scale-95 transition-transform disabled:opacity-60 disabled:active:scale-100"
          >
            <Send className="w-4 h-4" />
          </button>
        </div>
      </form>
    </main>
  )
}