"use client"

import Link from "next/link"
import { cn } from "@/lib/utils"
import Fueguito from "@/components/ui/Fueguito"
import type { MensajeHistorial } from "@/types"

interface Props {
  msg: MensajeHistorial
}

function esRutinaGuardada(texto: string): boolean {
  return /\*\*(.+?)\*\*/.test(texto) && /\b(guardad|listo|rutina)\b/i.test(texto)
}

function renderizarBold(texto: string) {
  const partes = texto.split(/\*\*(.+?)\*\*/g)
  return partes.map((parte, i) =>
    i % 2 === 1 ? (
      <strong key={i} className="font-bold text-hueso">{parte}</strong>
    ) : (
      <span key={i}>{parte}</span>
    )
  )
}

export default function ChatBubble({ msg }: Props) {
  const isUser = msg.role === "user"
  const rutinaGuardada = !isUser && esRutinaGuardada(msg.content)

  return (
    <div className={cn("flex gap-2.5 max-w-[88%]", isUser ? "self-end flex-row-reverse" : "self-start")}>
      {!isUser && (
        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-ember to-brasa flex items-center justify-center shrink-0">
          <Fueguito racha={1} size={16} />
        </div>
      )}
      <div className="flex flex-col gap-2 min-w-0">
        <div
          className={cn(
            "px-3.5 py-2.5 text-sm leading-relaxed rounded-2xl",
            isUser
              ? "bg-ember text-carbon font-semibold rounded-br-md"
              : "glass rounded-bl-md"
          )}
        >
          {renderizarBold(msg.content)}
        </div>

        {rutinaGuardada && (
          <div className="glass border-ember/30 rounded-lg p-3 animate-seal-in ember-glow">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-full bg-ember flex items-center justify-center text-carbon font-black shrink-0 animate-pop">
                ✓
              </div>
              <div className="min-w-0">
                <p className="text-[13px] font-bold text-ember-soft">Rutina guardada</p>
                <p className="text-[11px] text-ceniza">Ya está en tu entrenamiento</p>
              </div>
              <Link
                href="/entrenamiento"
                className="ml-auto shrink-0 text-[11px] font-bold text-ember-soft border border-ember/30 rounded-full px-3 py-1.5"
              >
                Verla
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
 
