"use client"

import type { ElementType } from "react"
import Link from "next/link"
import {
  ArrowRight,
  Dumbbell,
  Edit2,
  Flame,
  MessageCircle,
  RotateCcw,
  Settings,
  Trophy,
} from "lucide-react"
import { usePerfil } from "@/hooks/usePerfil"
import { getMascotAvatar } from "@/utils/mascot"
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
        "min-w-[150px] p-4 bg-surface border rounded-2xl flex flex-col items-center text-center transition-colors",
        logro.desbloqueado
          ? "border-primary"
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
      {logro.desbloqueado ? (
        <span className="font-sans text-[10px] font-bold uppercase tracking-wider mt-3 bg-primary/10 text-primary rounded-full px-3 py-1">
          Desbloqueado
        </span>
      ) : (
        <span className="font-sans text-[10px] font-semibold uppercase tracking-wider mt-3 text-text-muted">
          Bloqueado
        </span>
      )}
    </div>
  )
}

export default function PerfilPage() {
  const { perfil } = usePerfil()
  const racha = perfil?.racha_actual_dias ?? 0
  const nombre = perfil?.nombre ?? "Atleta"

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
      {/* -------- Header -------- */}
      <div className="flex items-center justify-between mb-6">
        <h1 className="font-display text-2xl font-bold text-text-primary">
          Mi Perfil
        </h1>
        <button
          aria-label="Configuración"
          className="w-10 h-10 rounded-full bg-surface-light border border-border flex items-center justify-center text-text-secondary hover:text-text-primary hover:border-primary/40 transition-colors active:scale-95"
        >
          <Settings className="w-4 h-4" />
        </button>
      </div>

      {/* -------- User Card -------- */}
      <section className="bg-surface border border-border rounded-2xl p-5 flex items-center gap-4">
        <div className="relative shrink-0">
          <div className="w-24 h-24 rounded-full bg-hierro border border-hierro-border p-2 flex items-center justify-center overflow-hidden shadow-[0_0_30px_rgba(108,92,255,0.2)]">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={getMascotAvatar(racha)}
              alt="Tu mascota"
              className="w-20 h-20 object-contain"
            />
          </div>
        </div>
        <div className="min-w-0">
          <div className="flex items-center gap-2">
            <h2 className="font-display text-lg font-bold text-text-primary truncate capitalize">
              {nombre}
            </h2>
            <button
              aria-label="Editar nombre"
              className="text-text-muted hover:text-primary transition-colors shrink-0"
            >
              <Edit2 className="w-4 h-4" />
            </button>
          </div>
          <p className="font-sans text-xs text-text-muted mt-0.5">
            Constancia que se ve y se siente.
          </p>
          <span className="inline-flex items-center gap-1.5 mt-3 bg-primary/10 text-primary font-sans text-xs font-bold rounded-full px-3 py-1.5">
            <Flame className="w-3.5 h-3.5" />
            {racha} {racha === 1 ? "día" : "días"}
          </span>
        </div>
      </section>

      {/* -------- Acciones Rápidas -------- */}
      <div className="grid grid-cols-2 gap-3 mt-4">
        <Link
          href="/dashboard/chat"
          className="bg-primary text-white rounded-2xl p-4 flex items-center gap-3 hover:bg-primary-hover transition-colors active:scale-[0.98]"
        >
          <span className="w-10 h-10 rounded-full bg-white/15 flex items-center justify-center shrink-0">
            <MessageCircle className="w-5 h-5" />
          </span>
          <span className="font-sans text-sm font-bold leading-tight">
            Hablar con
            <br />
            Coach
          </span>
        </Link>
        <Link
          href="/dashboard/rutinas"
          className="bg-surface border border-border text-text-primary rounded-2xl p-4 flex items-center gap-3 hover:border-primary/40 transition-colors active:scale-[0.98]"
        >
          <span className="w-10 h-10 rounded-full bg-primary/10 text-primary flex items-center justify-center shrink-0">
            <Dumbbell className="w-5 h-5" />
          </span>
          <span className="font-sans text-sm font-bold leading-tight">
            Mis
            <br />
            Rutinas
          </span>
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
        <Link
          href="/dashboard/progreso"
          className="inline-flex items-center gap-1 font-sans text-xs font-semibold text-primary mt-2 hover:text-primary-hover transition-colors"
        >
          Ver todos los logros
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </section>
    </main>
  )
}