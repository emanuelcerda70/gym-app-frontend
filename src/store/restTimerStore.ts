import { create } from "zustand"

export type RestEstado = "cerrado" | "ofrecido" | "corriendo" | "terminado"

interface RestTimerState {
  estado: RestEstado
  serie: number | null
  ejercicioId: number | null
  totalSegundos: number
  restante: number
  preseleccion: number
  ofrecer: (serie: number, ejercicioId: number, preseleccion?: number) => void
  arrancar: (segundos: number) => void
  saltar: () => void
  cerrar: () => void
}

let intervalo: ReturnType<typeof setInterval> | null = null

function limpiarIntervalo() {
  if (intervalo) {
    clearInterval(intervalo)
    intervalo = null
  }
}

function avisarFin() {
  try {
    navigator.vibrate?.([200, 100, 200])
  } catch {
    /* sin soporte de vibración */
  }
  try {
    // Beep sutil con Web Audio (sin archivos)
    const Ctx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext
    const ctx = new Ctx()
    const tocar = (freq: number, inicio: number) => {
      const osc = ctx.createOscillator()
      const gain = ctx.createGain()
      osc.connect(gain)
      gain.connect(ctx.destination)
      osc.type = "sine"
      osc.frequency.value = freq
      gain.gain.setValueAtTime(0.25, ctx.currentTime + inicio)
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + inicio + 0.4)
      osc.start(ctx.currentTime + inicio)
      osc.stop(ctx.currentTime + inicio + 0.4)
    }
    tocar(880, 0)
    tocar(660, 0.3)
  } catch {}
}

export const useRestTimerStore = create<RestTimerState>((set, get) => ({
  estado: "cerrado",
  serie: null,
  ejercicioId: null,
  totalSegundos: 90,
  restante: 90,
  preseleccion: 90,

  ofrecer: (serie, ejercicioId, preseleccion = 90) => {
    limpiarIntervalo()
    set({
      estado: "ofrecido",
      serie,
      ejercicioId,
      preseleccion,
      totalSegundos: preseleccion,
      restante: preseleccion,
    })
  },

  arrancar: (segundos) => {
    limpiarIntervalo()
    set({ estado: "corriendo", totalSegundos: segundos, restante: segundos })
    intervalo = setInterval(() => {
      const { restante } = get()
      if (restante <= 1) {
        limpiarIntervalo()
        set({ estado: "terminado", restante: 0 })
        avisarFin()
      } else {
        set({ restante: restante - 1 })
      }
    }, 1000)
  },

  saltar: () => {
    limpiarIntervalo()
    set({ estado: "cerrado", serie: null, ejercicioId: null })
  },

  cerrar: () => {
    limpiarIntervalo()
    set({ estado: "cerrado", serie: null, ejercicioId: null })
  },
}))