"use client"

import type { ElementType } from "react"
import Link from "next/link"
import { ArrowRight, Dumbbell, Flame, RotateCcw, Trophy } from "lucide-react"
import { usePerfil } from "@/hooks/usePerfil"
import { cn } from "@/lib/utils"

interface Logro {
  id: string
  titulo: string
  descripcion: string
  icono: ElementType
  desbloqueado: boolean
}

const LOGROS_BASE: Omit<Logro, "desbloqueado">[] = [
  {
    id: "primer-paso",
    titulo: "Primer Paso",
    descripcion: "Completaste tu primer entrenamiento",
    icono: Dumbbell,
  },
  {
    id: "semana-fuego",
    titulo: "Semana de Fuego",
    descripcion: "7 días de racha",
    icono: Flame,
  },
  {
    id: "fuerza-despierta",
    titulo: "Fuerza Despierta",
    descripcion: "Primer PR registrado",
    icono: Trophy,
  },
  {
    id: "el-regreso",
    titulo: "El Regreso",
    descripcion: "Retomaste tras 7 días de pausa",
    icono: RotateCcw,
  },
]

function LogroCard({ logro }: { logro: Logro }) {
  const Icon = logro.icono
  return (
    <div
      className={cn(
        "min-w-[140px] p-4 bg-surface border rounded-2xl flex flex-col items-center text-center transition-colors",
        logro.desbloqueado
          ? "border-primary/60"
          : "border-border opacity-50 grayscale"
      )}
    >
      <div
        className={cn(
          "w-12 h-12 rounded-full flex items-center justify-center mb-3",
          logro.desbloqueado
            ? "bg-primary/20 text-primary"
            : "bg-hierro-soft text-text-secondary"
        )}
      >
        <Icon className="w-6 h-6" />
      </div>
      <h3 className="font-display text-sm font-bold text-text-primary">
        {logro.titulo}
      </h3>
      <p className="font-sans text-xs text-text-secondary mt-1 leading-snug">
        {logro.descripcion}
      </p>
      <span
        className={cn(
          "font-sans text-[10px] font-semibold uppercase tracking-wider mt-3",
          logro.desbloqueado ? "text-primary" : "text-text-secondary/70"
        )}
      >
        {logro.desbloqueado ? "Desbloqueado" : "Bloqueado"}
      </span>
    </div>
  )
}

export default function PerfilPage() {
  const { perfil, isLoading } = usePerfil()
  const racha = perfil?.racha_actual_dias ?? 0

  const logros: Logro[] = LOGROS_BASE.map((l) => ({
    ...l,
    desbloqueado:
      l.id === "primer-paso"
        ? (perfil?.racha_actual_dias ?? 0) > 0
        : l.id === "semana-fuego"
          ? racha >= 7
          : false,
  }))

  return (
    <main className="px-6 pt-8 pb-6">
      {/* -------- Resumen principal -------- */}
      <h1 className="font-display text-2xl font-bold text-text-primary">
        Mi Perfil
      </h1>

      <section className="mt-5 bg-surface-light border border-border rounded-2xl p-5">
        <p className="font-sans text-sm font-semibold text-text-primary capitalize">
          {perfil?.nombre ?? (isLoading ? "Cargando..." : "Atleta")}
        </p>
        <p className="font-sans text-xs text-text-secondary mt-1">
          Constancia que se ve y se siente.
        </p>
        <div className="flex items-center gap-2 mt-4">
          <Flame className="w-5 h-5 text-primary" />
          <p className="font-display text-lg font-bold text-text-primary">
            {racha} {racha === 1 ? "día" : "días"}
          </p>
          <span className="font-sans text-xs text-text-secondary">
            de racha
          </span>
        </div>
      </section>

      {/* -------- Assistente + Rutinas shortcuts -------- */}
      <div className="grid grid-cols-2 gap-3 mt-4">
        <Link
          href="/dashboard/chat"
          className="bg-primary text-text-primary rounded-2xl p-4 flex items-center justify-between hover:bg-primary-hover transition-colors active:scale-[0.98]"
        >
          <span className="font-sans text-sm font-bold">Hablar con Coach</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
        <Link
          href="/dashboard/rutinas"
          className="bg-surface-light border border-border text-text-primary rounded-2xl p-4 flex items-center justify-between hover:border-primary/40 transition-colors active:scale-[0.98]"
        >
          <span className="font-sans text-sm font-bold">Mis Rutinas</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>

      {/* -------- Sección Tus Logros -------- */}
      <section className="mt-8">
        <h2 className="font-display text-lg font-bold text-text-primary">
          Tus Logros
        </h2>
        <p className="font-sans text-xs text-text-secondary mt-1">
          Hitos que importan, a tu ritmo.
        </p>
        <div className="flex overflow-x-auto gap-4 no-scrollbar py-2 mt-3">
          {logros.map((logro) => (
            <LogroCard key={logro.id} logro={logro} />
          ))}
        </div>
      </section>
    </main>
  )
}