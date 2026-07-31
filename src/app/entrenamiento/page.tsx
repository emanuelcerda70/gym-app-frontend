"use client"

import { useMemo, useState } from "react"
import Link from "next/link"
import AuthGuard from "@/components/layout/AuthGuard"
import Header from "@/components/layout/Header"
import BottomNav from "@/components/layout/BottomNav"
import ExerciseCard from "@/components/rutina/ExerciseCard"
import Button from "@/components/ui/Button"
import Fueguito from "@/components/ui/Fueguito"
import { useRutinas } from "@/hooks/useRutinas"
import { cn } from "@/lib/utils"

function HistorialRutinas() {
  const { todas, eliminar } = useRutinas()

  if (todas.isLoading || !todas.data?.length) return null

  return (
    <div className="mt-8">
      <p className="label-caps mb-3">Rutinas anteriores</p>
      <div className="space-y-2">
        {todas.data.slice(1).map((r) => {
          const count = Array.isArray(r.ejercicios) ? r.ejercicios.length : r.ejercicios_count
          return (
            <div
              key={r.id}
              className="flex items-center justify-between gap-2 glass rounded-md px-3.5 py-3"
            >
              <Link href={`/entrenamiento/${r.id}`} className="min-w-0 flex-1">
                <p className="text-sm font-semibold truncate">{r.nombre}</p>
                {typeof count === "number" && (
                  <p className="text-xs text-ceniza">{count} ejercicios</p>
                )}
              </Link>
              <button
                onClick={() => eliminar.mutate(r.id)}
                className="text-xs text-ceniza hover:text-red-400 transition-colors shrink-0"
              >
                Borrar
              </button>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default function EntrenamientoPage() {
  const { rutinaActual } = useRutinas()
  const [modoEntrenar, setModoEntrenar] = useState(false)
  const [hechos, setHechos] = useState<Record<number, boolean>>({})

  const ejercicios = rutinaActual.data?.ejercicios ?? []
  const totalHechos = useMemo(() => Object.values(hechos).filter(Boolean).length, [hechos])
  const progreso = ejercicios.length > 0 ? totalHechos / ejercicios.length : 0

  if (rutinaActual.isLoading) {
    return (
      <AuthGuard>
        <Header />
        <main className="px-4 pt-4 pb-28 animate-fade-in max-w-md mx-auto">
          <div className="glass rounded-xl p-5 space-y-3">
            <div className="h-6 bg-hierro-soft rounded animate-pulse w-1/2" />
            <div className="h-4 bg-hierro-soft rounded animate-pulse w-2/3" />
            <div className="h-28 bg-hierro-soft rounded animate-pulse" />
          </div>
        </main>
        <BottomNav />
      </AuthGuard>
    )
  }

  if (rutinaActual.isError || !rutinaActual.data) {
    return (
      <AuthGuard>
        <Header />
        <main className="px-4 pt-8 pb-28 flex flex-col items-center text-center animate-fade-in max-w-md mx-auto">
          <Fueguito racha={0} size={72} className="mb-5" />
          <h2 className="text-xl font-bold mb-2">Todavía no tenés rutina</h2>
          <p className="text-sm text-ceniza mb-6 max-w-[260px]">
            Pedile una a tu Súper Entrenador y la vas a encontrar acá.
          </p>
          <Link href="/chat">
            <Button className="!px-8 !py-3">Pedir mi rutina</Button>
          </Link>
          <Link href="/ejercicios" className="text-xs text-ceniza underline underline-offset-2 mt-8">
            Mientras tanto, mirá el catálogo de ejercicios
          </Link>
        </main>
        <BottomNav />
      </AuthGuard>
    )
  }

  const { nombre_rutina, descripcion } = rutinaActual.data

  return (
    <AuthGuard>
      <Header />
      <main className="px-4 pt-5 pb-32 animate-fade-in max-w-md mx-auto">
        {/* Hero rutina */}
        <section className="glass rounded-xl p-5 mb-5 relative overflow-hidden">
          <p className="label-caps mb-1">Rutina activa</p>
          <h2 className="font-display text-xl font-bold leading-tight mb-1">{nombre_rutina}</h2>
          <p className="text-sm text-ceniza mb-4">{descripcion}</p>

          {modoEntrenar ? (
            <div>
              <div className="h-2 bg-hierro-soft rounded-full overflow-hidden mb-2">
                <div
                  className="h-full bg-gradient-to-r from-ember to-brasa rounded-full transition-all duration-500"
                  style={{ width: `${progreso * 100}%` }}
                />
              </div>
              <p className="text-xs text-ceniza">
                {totalHechos} de {ejercicios.length} ejercicios hechos
              </p>
              <Button variant="soft" fullWidth className="mt-3 !py-2.5" onClick={() => setModoEntrenar(false)}>
                Salir del modo entrenar
              </Button>
            </div>
          ) : (
            <Button fullWidth className="!py-3.5" onClick={() => setModoEntrenar(true)}>
              Entrenar ahora
            </Button>
          )}
        </section>

        {/* Ejercicios */}
        <div className="space-y-4">
          {ejercicios.map((ej, i) => {
            const card = (
              <ExerciseCard
                key={`${ej.nombre}-${i}`}
                ejercicio={ej}
                index={i}
                hecho={!!hechos[i]}
                onToggleHecho={() => setHechos((prev) => ({ ...prev, [i]: !prev[i] }))}
              />
            )
            return ej.ejercicio_id ? (
              <Link key={`${ej.nombre}-${i}`} href={`/ejercicios/${ej.ejercicio_id}`} className="block">
                {card}
              </Link>
            ) : (
              card
            )
          })}
        </div>

        <Link
          href="/ejercicios"
          className={cn(
            "block text-center text-xs text-ceniza underline underline-offset-2 mt-8",
            !modoEntrenar && "hidden"
          )}
        >
          Catálogo de ejercicios
        </Link>

        <HistorialRutinas />
      </main>

      {/* Barra de sesión */}
      <div
        className={cn(
          "fixed bottom-[92px] left-1/2 -translate-x-1/2 w-[calc(100%-24px)] max-w-md transition-all duration-300",
          modoEntrenar ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4 pointer-events-none"
        )}
      >
        <div className="glass rounded-full px-5 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3 flex-1">
            <div className="h-1.5 flex-1 bg-hierro-soft rounded-full overflow-hidden max-w-[120px]">
              <div
                className="h-full bg-gradient-to-r from-ember to-brasa rounded-full transition-all duration-500"
                style={{ width: `${progreso * 100}%` }}
              />
            </div>
            <span className="text-xs font-bold text-ember-soft">
              {totalHechos}/{ejercicios.length}
            </span>
          </div>
          <span className="text-[11px] text-ceniza">¡Dale, mostrá!</span>
        </div>
      </div>

      <BottomNav />
    </AuthGuard>
  )
}
 
