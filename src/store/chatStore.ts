import { create } from "zustand"
import type { MensajeHistorial } from "@/types"

interface ChatState {
  mensajes: MensajeHistorial[]
  cargando: boolean
  agregarMensaje: (msg: MensajeHistorial) => void
  setCargando: (v: boolean) => void
  limpiar: () => void
}

export const useChatStore = create<ChatState>((set) => ({
  mensajes: [],
  cargando: false,

  agregarMensaje: (msg) =>
    set((state) => ({ mensajes: [...state.mensajes, msg] })),

  setCargando: (v) => set({ cargando: v }),

  limpiar: () => set({ mensajes: [] }),
}))
 
