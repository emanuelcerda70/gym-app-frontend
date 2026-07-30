"use client"

import { useParams } from "next/navigation"
import AuthGuard from "@/components/layout/AuthGuard"
import Header from "@/components/layout/Header"
import BottomNav from "@/components/layout/BottomNav"
import { useQuery } from "@tanstack/react-query"
import { api } from "@/lib/api"
import Link from "next/link"

function AnatomySVG({ musculo }: { musculo: string }) {
  const highlight = musculo.toLowerCase()

  const MUSCLE_PATHS: Record<string, { primary: boolean; d: string; label?: string }[]> = {
    pecho: [
      { primary: true, d: "M95,105 Q120,95 145,105 L150,160 Q120,170 90,160 Z", label: "Pecho" },
    ],
    pectorales: [
      { primary: true, d: "M95,105 Q120,95 145,105 L150,160 Q120,170 90,160 Z", label: "Pecho" },
    ],
    hombros: [
      { primary: true, d: "M65,105 Q80,85 95,105 L90,130 Q80,130 65,125 Z", label: "Hombro" },
      { primary: true, d: "M145,105 Q160,85 175,105 L175,125 Q160,130 150,130 Z", label: "Hombro" },
    ],
    bíceps: [
      { primary: true, d: "M60,140 Q75,135 85,145 L80,175 Q65,180 55,170 Z", label: "Bíceps" },
      { primary: true, d: "M155,140 Q165,135 180,140 L185,170 Q175,180 160,175 Z", label: "Bíceps" },
    ],
    tríceps: [
      { primary: true, d: "M290,140 Q305,135 320,140 L325,170 Q315,180 300,175 Z", label: "Tríceps" },
      { primary: true, d: "M265,140 Q275,135 290,140 L285,170 Q275,180 260,175 Z", label: "Tríceps" },
    ],
    antebrazos: [
      { primary: true, d: "M55,185 Q70,180 80,190 L75,230 Q65,235 55,225 Z", label: "Antebrazo" },
      { primary: true, d: "M160,185 Q170,180 185,185 L185,225 Q175,235 165,230 Z", label: "Antebrazo" },
    ],
    espalda: [
      { primary: true, d: "M280,105 Q310,95 340,105 L345,180 Q310,195 275,180 Z", label: "Dorsales" },
    ],
    "espalda alta": [
      { primary: true, d: "M280,105 Q310,95 340,105 L345,140 Q310,150 275,140 Z", label: "Espalda alta" },
    ],
    dorsales: [
      { primary: true, d: "M280,105 Q310,95 340,105 L345,180 Q310,195 275,180 Z", label: "Dorsales" },
    ],
    trapecio: [
      { primary: true, d: "M160,60 Q200,45 240,60 L230,80 Q200,75 170,80 Z", label: "Trapecio" },
    ],
    trapecios: [
      { primary: true, d: "M160,60 Q200,45 240,60 L230,80 Q200,75 170,80 Z", label: "Trapecio" },
    ],
    lumbar: [
      { primary: true, d: "M275,200 Q310,210 345,200 L340,240 Q310,250 280,240 Z", label: "Lumbar" },
    ],
    "espalda baja": [
      { primary: true, d: "M275,200 Q310,210 345,200 L340,240 Q310,250 280,240 Z", label: "Lumbar" },
    ],
    abdominales: [
      { primary: true, d: "M100,175 Q120,185 140,175 L140,230 Q120,240 100,230 Z", label: "Abdominales" },
    ],
    cuádriceps: [
      { primary: true, d: "M95,245 Q120,235 145,245 L145,330 Q120,340 95,330 Z", label: "Cuádriceps" },
    ],
    isquiotibiales: [
      { primary: true, d: "M290,260 Q310,250 330,260 L330,340 Q310,350 290,340 Z", label: "Isquiotibiales" },
    ],
    glúteos: [
      { primary: true, d: "M270,230 Q310,220 350,230 L345,260 Q310,270 275,260 Z", label: "Glúteos" },
    ],
    gemelos: [
      { primary: true, d: "M285,350 Q310,340 335,350 L330,390 Q310,400 290,390 Z", label: "Gemelos" },
    ],
    general: [
      { primary: true, d: "M80,60 Q200,40 320,60 L320,400 Q200,420 80,400 Z", label: "Cuerpo" },
    ],
  }

  const paths = MUSCLE_PATHS[highlight] || MUSCLE_PATHS["general"]

  return (
    <div className="flex justify-center gap-6 py-4">
      {/* Front view */}
      <svg viewBox="0 0 250 420" className="w-32 h-auto">
        <rect width="250" height="420" fill="none" />
        {/* Body outline */}
        <path d="M85,40 Q125,30 165,40 L175,60 Q180,80 175,90 L170,95 Q160,85 125,82 Q90,85 80,95 L75,90 Q70,80 75,60 Z" fill="#1e293b" stroke="#334155" strokeWidth="1" />
        <path d="M75,100 Q125,88 175,100 L180,230 Q180,410 125,415 Q70,410 70,230 Z" fill="#1e293b" stroke="#334155" strokeWidth="1" />
        <path d="M70,230 L55,230 L50,410 L75,410 Z" fill="#1e293b" stroke="#334155" strokeWidth="1" />
        <path d="M180,230 L195,230 L200,410 L175,410 Z" fill="#1e293b" stroke="#334155" strokeWidth="1" />
        {/* Arms */}
        <path d="M70,110 L35,115 L25,200 L30,210 L50,200 L55,130 L75,130 Z" fill="#1e293b" stroke="#334155" strokeWidth="1" />
        <path d="M180,110 L215,115 L225,200 L220,210 L200,200 L195,130 L175,130 Z" fill="#1e293b" stroke="#334155" strokeWidth="1" />
        {/* Highlight */}
        {paths.map((p, i) => (
          <path
            key={i}
            d={p.d}
            fill={p.primary ? "rgba(239,68,68,0.7)" : "rgba(234,179,8,0.5)"}
            stroke={p.primary ? "#ef4444" : "#eab308"}
            strokeWidth="1.5"
            className="transition-all duration-300"
          />
        ))}
        {paths.filter(p => p.label).map((p, i) => (
          <text
            key={`l-${i}`}
            x="125"
            y="405"
            textAnchor="middle"
            fill="#9ca3af"
            fontSize="11"
            fontWeight="bold"
          >
            {p.label}
          </text>
        ))}
        <text x="125" y="18" textAnchor="middle" fill="#6b7280" fontSize="10">Vista Frontal</text>
      </svg>

      {/* Back view */}
      <svg viewBox="0 0 250 420" className="w-32 h-auto">
        <rect width="250" height="420" fill="none" />
        {/* Body outline back */}
        <path d="M85,40 Q125,30 165,40 L175,60 Q180,80 175,90 L170,95 Q160,85 125,82 Q90,85 80,95 L75,90 Q70,80 75,60 Z" fill="#1e293b" stroke="#334155" strokeWidth="1" />
        <path d="M75,100 Q125,88 175,100 L180,230 Q180,410 125,415 Q70,410 70,230 Z" fill="#1e293b" stroke="#334155" strokeWidth="1" />
        <path d="M70,230 L55,230 L50,410 L75,410 Z" fill="#1e293b" stroke="#334155" strokeWidth="1" />
        <path d="M180,230 L195,230 L200,410 L175,410 Z" fill="#1e293b" stroke="#334155" strokeWidth="1" />
        <path d="M70,110 L35,115 L25,200 L30,210 L50,200 L55,130 L75,130 Z" fill="#1e293b" stroke="#334155" strokeWidth="1" />
        <path d="M180,110 L215,115 L225,200 L220,210 L200,200 L195,130 L175,130 Z" fill="#1e293b" stroke="#334155" strokeWidth="1" />
        <text x="125" y="18" textAnchor="middle" fill="#6b7280" fontSize="10">Vista Posterior</text>
      </svg>
    </div>
  )
}

export default function EjercicioDetallePage() {
  const params = useParams()
  const id = Number(params.id)

  const { data: ej, isLoading, error } = useQuery({
    queryKey: ["ejercicio", id],
    queryFn: () => api.ejercicios.detalle(id),
    enabled: !!id,
  })

  if (isLoading) {
    return (
      <AuthGuard>
        <Header />
        <main className="px-4 pt-4 pb-28 animate-fade-in">
          <div className="bg-white/5 rounded-lg h-64 animate-pulse mb-4" />
          <div className="bg-white/5 rounded-lg h-8 animate-pulse w-2/3 mb-3" />
          <div className="bg-white/5 rounded-lg h-4 animate-pulse w-1/3 mb-6" />
          <div className="bg-white/5 rounded-lg h-32 animate-pulse" />
        </main>
        <BottomNav />
      </AuthGuard>
    )
  }

  if (error || !ej) {
    return (
      <AuthGuard>
        <Header />
        <main className="px-4 pt-4 pb-28 animate-fade-in">
          <p className="text-sm text-muted text-center py-8">Ejercicio no encontrado</p>
          <Link href="/ejercicios" className="text-emerald-400 text-sm text-center block underline">Volver a ejercicios</Link>
        </main>
        <BottomNav />
      </AuthGuard>
    )
  }

  return (
    <AuthGuard>
      <Header />
      <main className="px-4 pt-4 pb-28 animate-fade-in">
        <Link href="/ejercicios" className="text-sm text-muted flex items-center gap-1 mb-4">
          ← Volver
        </Link>

        {/* GIF */}
        {ej.gif_url ? (
          <div className="bg-black/60 rounded-2xl overflow-hidden mb-4 flex items-center justify-center" style={{ minHeight: 200 }}>
            <img src={ej.gif_url} alt={ej.nombre} className="w-full max-h-72 object-contain" />
          </div>
        ) : (
          <div className="bg-black/60 rounded-2xl h-48 flex items-center justify-center text-5xl mb-4">
            🏋️
          </div>
        )}

        {/* Title and info */}
        <h1 className="text-xl font-black capitalize mb-1">{ej.nombre}</h1>
        <div className="flex flex-wrap gap-2 mb-4">
          <span className="text-xs bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 px-2.5 py-0.5 rounded-full font-semibold uppercase">
            {ej.musculo_objetivo}
          </span>
          {ej.equipo && (
            <span className="text-xs bg-cyan-500/20 text-cyan-400 border border-cyan-500/30 px-2.5 py-0.5 rounded-full font-semibold uppercase">
              {ej.equipo}
            </span>
          )}
        </div>

        {/* Anatomy SVG */}
        <div className="bg-card-glass backdrop-blur-md border border-white/10 rounded-xl p-3 mb-4">
          <h3 className="text-xs font-bold text-muted uppercase tracking-wider mb-2">Músculos trabajados</h3>
          <div className="flex items-center gap-3 text-xs mb-2">
            <span className="flex items-center gap-1"><span className="w-3 h-3 rounded bg-red-500 inline-block" /> Principal</span>
            <span className="flex items-center gap-1"><span className="w-3 h-3 rounded bg-yellow-500 inline-block" /> Accesorio</span>
          </div>
          <AnatomySVG musculo={ej.musculo_objetivo || ""} />
        </div>

        {/* Instructions */}
        {ej.instrucciones && (
          <div className="bg-card-glass backdrop-blur-md border border-white/10 rounded-xl p-4">
            <h3 className="text-xs font-bold text-muted uppercase tracking-wider mb-2">Instrucciones</h3>
            <p className="text-sm text-white leading-relaxed whitespace-pre-line">{ej.instrucciones}</p>
          </div>
        )}
      </main>
      <BottomNav />
    </AuthGuard>
  )
}
