"use client"

import { useEffect, useRef, useState } from "react"
import {
  BarChart3,
  ClipboardList,
  Dumbbell,
  ImagePlus,
  MessageCircleQuestion,
  Send,
  Settings2,
  Sparkles,
  X,
} from "lucide-react"
import { api } from "@/lib/api"
import { cn } from "@/lib/utils"
import { getMascotAvatar } from "@/utils/mascot"
import { usePerfil } from "@/hooks/usePerfil"
import type { MensajeHistorial } from "@/types"

interface ChatMsg extends MensajeHistorial {
  imagen?: string | null
}

const ACCIONES_RAPIDAS = [
  {
    icono: ClipboardList,
    titulo: "Crear una rutina",
    subtitulo: "Arma tu plan desde cero",
  },
  {
    icono: Settings2,
    titulo: "Ajustar mi plan",
    subtitulo: "Adaptá rutina o dieta",
  },
  {
    icono: MessageCircleQuestion,
    titulo: "Resolver dudas",
    subtitulo: "Técnica, nutrición y más",
  },
  {
    icono: BarChart3,
    titulo: "Análisis de progreso",
    subtitulo: "Revisá tu evolución",
  },
]

const SUGERENCIAS = [
  "Armame una rutina de tren superior",
  "¿Cómo mejoro mi técnica de sentadilla?",
  "Qué debería comer hoy para entrenar",
  "Revisá mi progreso de esta semana",
]

export default function ChatPage() {
  const [messages, setMessages] = useState<ChatMsg[]>([])
  const [input, setInput] = useState("")
  const [imagen, setImagen] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [intentActivo, setIntentActivo] = useState(false)
  const scrollRef = useRef<HTMLDivElement>(null)
  const fileRef = useRef<HTMLInputElement>(null)
  const intentDisparado = useRef(false)
  const { perfil } = usePerfil()
  const racha = perfil?.racha_actual_dias ?? 0
  const nombre = perfil?.nombre?.split(" ")[0] ?? "Atleta"

  const mensajeBienvenida: ChatMsg = {
    role: "assistant",
    content:
      "Soy tu asistente personal. Contame qué querés lograr hoy y lo hacemos realidad.",
  }

  const conBienvenida = messages.length === 0
    ? [mensajeBienvenida]
    : messages

  useEffect(() => {
    const el = scrollRef.current
    if (el) el.scrollTo({ top: el.scrollHeight, behavior: "smooth" })
  }, [messages, isLoading])

  /* -------- Interceptar intent=create_routine -------- */
  useEffect(() => {
    if (intentDisparado.current) return
    const params = new URLSearchParams(window.location.search)
    if (params.get("intent") === "create_routine") {
      intentDisparado.current = true
      setIntentActivo(true)
      setTimeout(() => {
        enviar("Quiero crear mi primera rutina")
      }, 300)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    const reader = new FileReader()
    reader.onload = () => setImagen(reader.result as string)
    reader.readAsDataURL(file)
    e.target.value = ""
  }

  const enviar = async (textoRaw: string) => {
    const texto = textoRaw.trim()
    if ((!texto && !imagen) || isLoading) return

    setMessages((prev) => [...prev, { role: "user", content: texto, imagen }])
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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    enviar(input)
  }

  return (
    <main className="flex flex-col h-[calc(100vh-var(--nav-height)-16px)] -mb-24">
      {/* -------- Header del chat -------- */}
      <header className="flex items-center justify-between px-6 pt-6 pb-4">
        <div className="flex items-center gap-3">
          <div className="relative w-12 h-12 rounded-full bg-hierro border border-hierro-border p-1 flex items-center justify-center shrink-0 overflow-hidden">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={getMascotAvatar(racha)}
              alt="Mascota IA"
              className="w-10 h-10 object-contain"
            />
            <span className="absolute bottom-0.5 right-0.5 w-3 h-3 rounded-full bg-green-500 border-2 border-surface" />
          </div>
          <div>
            <p className="font-display text-base font-bold text-text-primary">
              Asistente ASCEND
            </p>
            <p className="flex items-center gap-1.5 font-sans text-[11px] text-green-500">
              <span className="w-1.5 h-1.5 rounded-full bg-green-500" />
              En línea
            </p>
          </div>
        </div>
        <button
          aria-label="Sugerencias de IA"
          className="w-10 h-10 rounded-full bg-hierro border border-hierro-border flex items-center justify-center text-primary hover:text-primary-hover transition-colors active:scale-95"
        >
          <Sparkles className="w-4 h-4" />
        </button>
      </header>

      {/* -------- Área scrolleable -------- */}
      <div ref={scrollRef} className="flex-1 overflow-y-auto px-6 pb-4 space-y-5">
        {/* Tarjeta de bienvenida */}
        {messages.length === 0 && !intentActivo && (
          <section className="bg-surface p-5 rounded-[20px] border border-border mb-1">
            <h2 className="font-display text-xl font-bold text-text-primary">
              ¡Hola {nombre}!
            </h2>
            <p className="font-sans text-sm text-text-muted mt-1">
              Soy tu asistente personal. Contame qué querés lograr hoy.
            </p>

            <div className="mt-5 space-y-2.5">
              {ACCIONES_RAPIDAS.map((a) => {
                const Icono = a.icono
                return (
                  <button
                    key={a.titulo}
                    onClick={() => enviar(a.titulo)}
                    className="w-full flex items-center gap-3 p-3 rounded-2xl bg-surface-light border border-border text-left hover:border-primary/40 transition-colors active:scale-[0.98]"
                  >
                    <span className="w-10 h-10 rounded-full bg-primary/10 text-primary flex items-center justify-center shrink-0">
                      <Icono className="w-5 h-5" />
                    </span>
                    <span className="min-w-0">
                      <span className="block font-sans text-sm font-semibold text-text-primary">
                        {a.titulo}
                      </span>
                      <span className="block font-sans text-xs text-text-muted truncate">
                        {a.subtitulo}
                      </span>
                    </span>
                  </button>
                )
              })}
            </div>
          </section>
        )}

        {messages.length === 0 && !intentActivo && (
          <section className="mb-1">
            <p className="font-sans text-xs font-semibold text-text-muted mb-3 uppercase tracking-wider">
              Sugerencias rápidas
            </p>
            <div className="flex flex-wrap gap-2">
              {SUGERENCIAS.map((s) => (
                <button
                  key={s}
                  onClick={() => enviar(s)}
                  className="border border-border rounded-full p-3 font-sans text-xs text-text-secondary hover:text-text-primary hover:border-primary/40 transition-colors active:scale-[0.98]"
                >
                  {s}
                </button>
              ))}
            </div>
          </section>
        )}

        {/* Mensajes */}
        {conBienvenida.map((msg, i) =>
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

      {/* -------- Input (conserva cámara) -------- */}
      <form
        onSubmit={handleSubmit}
        className="w-full bg-surface/90 backdrop-blur-md border-t border-hierro-border p-4"
      >
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