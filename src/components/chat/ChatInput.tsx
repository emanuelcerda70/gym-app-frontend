"use client"

import { useState, useRef, KeyboardEvent } from "react"

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
        <div className="absolute -top-16 left-2 bg-surface-secondary border border-white/10 rounded-md p-1 shadow-lg flex items-center gap-2">
          <img src={imagen} alt="preview" className="h-10 w-auto rounded" />
          <button onClick={() => setImagen(null)} className="bg-red-500 text-white rounded-full w-5 h-5 text-xs font-bold">
            X
          </button>
        </div>
      )}

      <div className="flex items-center gap-2 bg-surface-secondary/90 border border-white/10 rounded-full px-4 py-2">
        <input
          type="file"
          accept="image/*"
          ref={fileRef}
          onChange={handleFile}
          className="hidden"
        />
        <button onClick={() => fileRef.current?.click()} className="text-lg opacity-60 hover:opacity-100 transition">
          📷
        </button>

        <input
          value={texto}
          onChange={(e) => setTexto(e.target.value)}
          onKeyDown={handleKey}
          placeholder="Escribile a tu coach..."
          className="flex-1 bg-transparent text-sm text-white placeholder-muted-dim outline-none"
        />

        <button
          onClick={handleSend}
          disabled={cargando}
          className="w-9 h-9 rounded-full bg-gradient-to-r from-emerald-500 to-cyan-500 text-black font-bold text-sm flex items-center justify-center hover:opacity-90 transition disabled:opacity-50"
        >
          ➤
        </button>
      </div>
    </div>
  )
}
