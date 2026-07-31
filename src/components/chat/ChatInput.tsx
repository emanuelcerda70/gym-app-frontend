"use client"

import { useState, useRef, KeyboardEvent } from "react"
import { cn } from "@/lib/utils"

interface Props {
  onSend: (text: string, imagenBase64: string | null) => void
  cargando: boolean
}

export default function ChatInput({ onSend, cargando }: Props) {
  const [texto, setTexto] = useState("")
  const [imagen, setImagen] = useState<string | null>(null)
  const fileRef = useRef<HTMLInputElement>(null)

  const handleSend = () => {
    if ((!texto.trim() && !imagen) || cargando) return
    onSend(texto, imagen)
    setTexto("")
    setImagen(null)
  }

  const handleKey = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") handleSend()
  }

  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    const reader = new FileReader()
    reader.onload = () => setImagen(reader.result as string)
    reader.readAsDataURL(file)
  }

  return (
    <div className="relative">
      {imagen && (
        <div className="absolute -top-[72px] left-2 glass rounded-md p-1.5 shadow-lg flex items-center gap-2">
          <img src={imagen} alt="preview" className="h-12 w-auto rounded" />
          <button
            onClick={() => setImagen(null)}
            className="bg-red-500 text-carbon rounded-full w-5 h-5 text-xs font-bold shrink-0"
          >
            X
          </button>
        </div>
      )}

      <div className={cn("flex items-center gap-2 glass rounded-full px-4 py-2", cargando && "opacity-60")}>
        <input
          type="file"
          accept="image/*"
          ref={fileRef}
          onChange={handleFile}
          className="hidden"
        />
        <button
          onClick={() => fileRef.current?.click()}
          className="text-ceniza hover:text-ember-soft transition-colors shrink-0"
          aria-label="Adjuntar foto"
        >
          <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z" />
            <circle cx="12" cy="13" r="4" />
          </svg>
        </button>

        <input
          value={texto}
          onChange={(e) => setTexto(e.target.value)}
          onKeyDown={handleKey}
          placeholder="Escribile a tu coach..."
          className="flex-1 bg-transparent text-sm text-hueso placeholder-ceniza-dim outline-none min-w-0"
        />

        <button
          onClick={handleSend}
          disabled={cargando}
          className="w-9 h-9 rounded-full bg-ember text-carbon font-bold text-sm flex items-center justify-center hover:opacity-90 transition-all active:scale-95 disabled:opacity-50 shrink-0"
          aria-label="Enviar"
        >
          <svg viewBox="0 0 24 24" className="w-4 h-4" fill="currentColor">
            <path d="M3.4 20.4l17.5-7.5a1 1 0 0 0 0-1.8L3.4 3.6a1 1 0 0 0-1.4 1.2l1.8 6.2 10.2 1.5-10.2 1.5-1.8 6.2a1 1 0 0 0 1.4 1.2z" />
          </svg>
        </button>
      </div>
    </div>
  )
}
