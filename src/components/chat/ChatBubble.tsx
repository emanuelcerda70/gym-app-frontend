"use client"

import { cn } from "@/lib/utils"
import type { MensajeHistorial } from "@/types"

interface Props {
  msg: MensajeHistorial
}

export default function ChatBubble({ msg }: Props) {
  const isUser = msg.role === "user"

  return (
    <div className={cn("flex gap-2.5 max-w-[88%]", isUser ? "self-end flex-row-reverse" : "self-start")}>
      {!isUser && (
        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-emerald-500 to-cyan-500 flex items-center justify-center text-xs font-bold text-black shrink-0">
          AI
        </div>
      )}
      <div
        className={cn(
          "px-3.5 py-2.5 text-sm leading-relaxed rounded-2xl",
          isUser
            ? "bg-gradient-to-r from-emerald-500 to-cyan-500 text-black font-medium rounded-br-md"
            : "bg-card-glass border border-white/10 rounded-bl-md"
        )}
      >
        {msg.content}
      </div>
    </div>
  )
}
