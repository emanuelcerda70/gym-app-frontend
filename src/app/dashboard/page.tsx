"use client"

import Link from "next/link"
import { Calendar, Dumbbell, Flame } from "lucide-react"
import { useAuthStore } from "@/store/authStore"
import { useRutinas } from "@/hooks/useRutinas"
import { useCheckin } from "@/hooks/useCheckin"
import { usePerfil } from "@/hooks/usePerfil"

export default function DashboardPage() {
  const storeNombre = useAuthStore((s) => s.nombre)
  const { rutinaActual } = useRutinas()
  const { historial } = useCheckin()
  const { perfil, isLoading: perfilLoading } = usePerfil()

  const nombre = storeNombre || perfil?.nombre || "Atleta"
  const frecuencia = historial.data?.total_dias ?? 0
  const racha = perfil?.racha_actual_dias ?? 0
  const rutina = rutinaActual.data

  return (
    <main>
      <header className="p-6">
        <h1 className="font-display text-2xl font-bold text-text-primary">
          Hola, {nombre} ⚡
        </h1>
      </header>

      <section className="px-6">
        <h2 className="font-sans text-sm font-semibold text-text-secondary mb-3">
          RESUMEN
        </h2>
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-hierro rounded-xl p-4">
            <Calendar className="w-6 h-6 text-primary mb-2" />
            <p className="font-sans text-xs text-text-secondary">Frecuencia Semanal</p>
            <p className="font-display text-2xl font-bold text-text-primary">
              {historial.isLoading ? "--" : `${frecuencia}/7 Días`}
            </p>
          </div>
          <div className="bg-hierro rounded-xl p-4">
            <Flame className="w-6 h-6 text-secondary mb-2" />
            <p className="font-sans text-xs text-text-secondary">Racha Actual</p>
            <p className="font-display text-2xl font-bold text-text-primary">
              {perfilLoading ? "--" : `${racha} Días`}
            </p>
          </div>
        </div>
      </section>

      <section className="px-6 mt-8">
        <h2 className="font-sans text-sm font-semibold text-text-secondary mb-3">
          RUTINA DE HOY
        </h2>
        {rutinaActual.isLoading ? (
          <div className="w-full bg-hierro-soft rounded-2xl p-6 border border-hierro-border animate-pulse" />
        ) : rutina ? (
          <div className="w-full bg-hierro-soft rounded-2xl p-5 border border-hierro-border relative overflow-hidden">
            <div className="absolute -right-4 -top-4 w-24 h-24 rounded-full bg-primary/10 blur-xl" />
            <div className="relative flex items-center justify-between">
              <div>
                <h3 className="font-display text-xl font-bold text-text-primary">
                  {rutina.nombre_rutina}
                </h3>
                <p className="font-sans text-sm text-text-secondary mt-1">
                  {rutina.descripcion}
                </p>
              </div>
              <button className="bg-primary text-text-primary font-bold rounded-xl h-12 px-6 hover:bg-primary-hover transition-colors active:scale-[0.98]">
                Empezar
              </button>
            </div>
          </div>
        ) : (
          <div className="w-full bg-hierro-soft rounded-2xl p-6 border border-hierro-border text-center">
            <Dumbbell className="w-12 h-12 text-text-secondary/50 mx-auto mb-4" />
            <p className="font-sans text-sm text-text-secondary mb-6">
              Aún no tienes rutinas asignadas. Habla con el asistente para crear
              tu primer plan de entrenamiento.
            </p>
            <Link
              href="/dashboard/chat"
              className="bg-primary text-text-primary font-bold rounded-xl h-12 flex items-center justify-center hover:bg-primary-hover transition-colors active:scale-[0.98]"
            >
              Crear mi primera rutina
            </Link>
          </div>
        )}
      </section>
    </main>
  )
}
