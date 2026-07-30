"use client"

import AuthGuard from "@/components/layout/AuthGuard"
import Header from "@/components/layout/Header"
import BottomNav from "@/components/layout/BottomNav"
import ExerciseCard from "@/components/rutina/ExerciseCard"
import { useRutinas } from "@/hooks/useRutinas"

export default function EntrenamientoPage() {
  const { rutinaActual } = useRutinas()

  if (rutinaActual.isLoading) {
    return (
      <AuthGuard>
        <Header />
        <main className="px-4 pt-4 pb-24 animate-fade-in">
          <p className="text-sm text-muted text-center py-8">Cargando tu rutina...</p>
        </main>
        <BottomNav />
      </AuthGuard>
    )
  }

  if (rutinaActual.isError || !rutinaActual.data) {
    return (
      <AuthGuard>
        <Header />
        <main className="px-4 pt-4 pb-24 animate-fade-in">
          <p className="text-sm text-muted text-center py-8">
            Todavía no tenés rutinas guardadas. Pedile una a tu coach en el chat.
          </p>
        </main>
        <BottomNav />
      </AuthGuard>
    )
  }

  const { nombre_rutina, descripcion, ejercicios } = rutinaActual.data

  return (
    <AuthGuard>
      <Header />
      <main className="px-4 pt-4 pb-24 animate-fade-in">
        <h2 className="text-lg font-bold">{nombre_rutina}</h2>
        <p className="text-sm text-muted mb-4">{descripcion}</p>
        <div className="space-y-4">
          {ejercicios.map((ej, i) => (
            <ExerciseCard key={i} ejercicio={ej} />
          ))}
        </div>

        {/* Historial de rutinas */}
        <HistorialRutinas />
      </main>
      <BottomNav />
    </AuthGuard>
  )
}

function HistorialRutinas() {
  const { todas } = useRutinas()
  const { eliminar } = useRutinas()

  if (todas.isLoading || !todas.data?.length) return null

  return (
    <div className="mt-8">
      <h3 className="text-sm font-bold text-muted mb-3">Rutinas anteriores</h3>
      <div className="space-y-2">
        {todas.data.slice(1).map((r) => (
          <div
            key={r.id}
            className="flex items-center justify-between bg-white/5 border border-white/10 rounded-md px-3 py-2"
          >
            <div>
              <p className="text-sm font-medium">{r.nombre}</p>
              <p className="text-xs text-muted">{r.ejercicios_count} ejercicios</p>
            </div>
            <button
              onClick={() => eliminar.mutate(r.id)}
              className="text-xs text-red-400 hover:text-red-300 transition"
            >
              Borrar
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}
