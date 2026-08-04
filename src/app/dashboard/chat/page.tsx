"use client"

import { Bot, Send } from "lucide-react"

export default function ChatPage() {
  return (
    <main className="flex flex-col h-[calc(100vh-var(--nav-height)-16px)] -mb-24">
      {/* Área de mensajes */}
      <div className="flex-1 overflow-y-auto p-4 space-y-6">
        {/* Burbuja IA */}
        <div className="flex items-end gap-2">
          <div className="w-8 h-8 rounded-full bg-hierro p-2 flex items-center justify-center text-primary shrink-0">
            <Bot className="w-4 h-4" />
          </div>
          <div className="bg-hierro-soft border border-hierro-border rounded-2xl rounded-tl-sm p-3 text-text-primary text-sm font-sans max-w-[85%]">
            ¡Buenas! Soy el Asistente ASCEND. Contame qué querés lograr hoy:
            puedo armarte una rutina, ajustar tu plan o responder cualquier duda
            de entrenamiento.
          </div>
        </div>

        <div className="flex items-end gap-2">
          <div className="w-8 h-8 rounded-full bg-hierro p-2 flex items-center justify-center text-primary shrink-0">
            <Bot className="w-4 h-4" />
          </div>
          <div className="bg-hierro-soft border border-hierro-border rounded-2xl rounded-tl-sm p-3 text-text-primary text-sm font-sans max-w-[85%]">
            Por ejemplo, podés pedirme: &quot;Armame una rutina de fuerza de 3
            días&quot; y en segundos la tenés lista.
          </div>
        </div>

        {/* Burbuja Usuario */}
        <div className="flex justify-end">
          <div className="bg-primary text-surface rounded-2xl rounded-tr-sm p-3 text-sm font-sans max-w-[85%]">
            ¡Dale! Quiero ganar músculo con 3 días por semana.
          </div>
        </div>
      </div>

      {/* Área del input */}
      <div className="w-full bg-surface/90 backdrop-blur-md border-t border-hierro-border p-4">
        <div className="flex items-center gap-2">
          <input
            type="text"
            placeholder="Escribe aquí para crear tu rutina..."
            className="flex-1 bg-hierro border border-hierro-border rounded-full px-4 py-3 text-sm font-sans text-text-primary placeholder:text-text-secondary/60 outline-none focus:border-primary/50 transition-colors"
          />
          <button
            aria-label="Enviar"
            className="w-10 h-10 rounded-full flex items-center justify-center bg-primary text-surface shrink-0 active:scale-95 transition-transform"
          >
            <Send className="w-4 h-4" />
          </button>
        </div>
      </div>
    </main>
  )
}
