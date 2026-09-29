"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@clerk/nextjs"
import Link from "next/link"
import Image from "next/image"
import {
  Sparkles,
  Smartphone,
  CheckCircle2,
  ArrowRight,
  Play,
  Zap,
  WifiOff,
  Dumbbell,
  Check,
  Share2,
  PlusSquare,
  MessageCircle,
  TrendingUp,
  XCircle,
  Award,
  Bot,
  Cpu,
  Database,
  ShieldCheck,
  Camera,
  Activity,
  Layers,
  ChevronRight,
  Flame,
  QrCode,
  Users,
} from "lucide-react"

interface CasoIA {
  id: number
  etiqueta: string
  icono: React.ElementType
  pregunta: string
  respuesta: string
  accionEspecial: {
    titulo: string
    detalle: string
    badge: string
    color: string
  }
  superpoder: string
}

const CASOS_IA: CasoIA[] = [
  {
    id: 0,
    etiqueta: "Creación Activa de Rutinas",
    icono: Sparkles,
    pregunta: "Armame una rutina de hipertrofia de 4 días enfocada en empuje y tracción.",
    respuesta:
      "¡Perfecto! Analicé el equipamiento relevado de tu sede (banco plano, poleas dobles y mancuernas) y tu nivel actual. Diseñé una rutina dividida en Torso/Pierna con descansos de 90s.",
    accionEspecial: {
      titulo: "Function Calling Activo • Guardado en Base de Datos",
      detalle: "4 sesiones creadas en tu cuenta con 16 ejercicios reales, series y descansos ya listos.",
      badge: "✓ Guardada en PostgreSQL",
      color: "border-[#00E676]/40 bg-[#00E676]/10 text-[#00E676]",
    },
    superpoder: "No te tira un texto para copiar: escribe la rutina estructurada directamente en tu perfil.",
  },
  {
    id: 1,
    etiqueta: "Sobrecarga & Memoria de Cargas (PRs)",
    icono: TrendingUp,
    pregunta: "Mi récord en Press de Banca es 60 kg, ¿con qué peso arranco hoy?",
    respuesta:
      "Revisando tus récords históricos: tu 1RM registrado es 60 kg. Hoy corresponde trabajar al 75-80% de intensidad: 2 series de aproximación (30 kg y 45 kg) y luego 3 series efectivas de 8 repeticiones con 47.5 a 50 kg.",
    accionEspecial: {
      titulo: "Lectura de Récords Reales (PRs)",
      detalle: "Cálculo matemático exacto de porcentajes de fatiga y sobrecarga sin que tengas que calcular nada.",
      badge: "✓ Algoritmo de Progresión",
      color: "border-[#00D4FF]/40 bg-[#00D4FF]/10 text-[#00D4FF]",
    },
    superpoder: "El socio nunca entrena a ciegas: el bot sabe exactamente cuánto levantó en cada sesión.",
  },
  {
    id: 2,
    etiqueta: "Sustitución Articular en Sala",
    icono: Dumbbell,
    pregunta: "La polea de Jalón al Pecho está ocupada, ¿qué ejercicio hago?",
    respuesta:
      "Podés sustituirlo de inmediato por Remo con Mancuerna apoyado en banco a 30° o Remo Pendlay. Ambos respetan el mismo vector de tracción dorsal y mantendrás el estímulo programado para hoy.",
    accionEspecial: {
      titulo: "Restricción Quirúrgica al Gimnasio",
      detalle: "Tiene estrictamente prohibido inventar aparatos que tu gimnasio no tenga. Todo adaptado a tu sala.",
      badge: "✓ Validado con Inventario",
      color: "border-[#6C5CFF]/40 bg-[#6C5CFF]/10 text-[#8B7DFF]",
    },
    superpoder: "Cero alumnos parados esperando una máquina: alternativas biomecánicas al instante.",
  },
  {
    id: 3,
    etiqueta: "Visión Multimodal & Nutrición",
    icono: Camera,
    pregunta: "[Foto de plato] ¿Este almuerzo post-entreno me sirve para ganar masa muscular?",
    respuesta:
      "Excelente elección: detecto ~35g de proteína magra (pechuga de pollo), ~50g de carbohidratos complejos (arroz) y fibra vegetal. Cumple con la síntesis proteica de tu ventana de recuperación.",
    accionEspecial: {
      titulo: "Análisis Fotográfico Multimodal",
      detalle: "El socio puede enviar fotos de platos, máquinas o etiquetas para recibir feedback en segundos.",
      badge: "✓ Computer Vision Activa",
      color: "border-purple-500/40 bg-purple-500/10 text-purple-300",
    },
    superpoder: "Acompañamiento 360° para el socio tanto adentro de la sala como en su vida diaria.",
  },
]

export default function HomePage() {
  const router = useRouter()
  const { isLoaded, isSignedIn } = useAuth()
  const [casoIA, setCasoIA] = useState<number>(0)
  const [tabPlataforma, setTabPlataforma] = useState<"ios" | "android">("ios")

  // Si ya está autenticado, va directo al dashboard
  useEffect(() => {
    if (isLoaded && isSignedIn) {
      router.replace("/dashboard")
    }
  }, [isLoaded, isSignedIn, router])

  // Enlaces directos a WhatsApp según perfil
  const whatsappUrlGym =
    "https://wa.me/5492994017688?text=" +
    encodeURIComponent(
      "Hola Emanuel! Vi la web de ASCEND y quiero coordinar la prueba piloto de 14 días para mi gimnasio."
    )

  const whatsappUrlAtleta =
    "https://wa.me/5492994017688?text=" +
    encodeURIComponent(
      "Hola Emanuel! Vi la web de ASCEND y quiero suscribirme al Plan Atleta ($10 USD) para entrenar por mi cuenta."
    )

  const whatsappUrl = whatsappUrlGym

  return (
    <div className="min-h-screen bg-[#06070a] text-[#F5F7FA] font-sans selection:bg-[#6C5CFF]/30 selection:text-white relative overflow-x-hidden">
      
      {/* ========================================================= */}
      {/* AMBIENT AURORA SPOTLIGHTS                                  */}
      {/* ========================================================= */}
      <div className="fixed top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-[650px] pointer-events-none z-0 overflow-hidden">
        <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[700px] h-[550px] bg-gradient-to-b from-[#6C5CFF]/20 via-[#00D4FF]/12 to-transparent rounded-full blur-[140px]" />
        <div className="absolute top-1/4 right-10 w-[350px] h-[350px] bg-[#00D4FF]/10 rounded-full blur-[120px]" />
        <div className="absolute top-1/3 left-10 w-[320px] h-[320px] bg-[#6C5CFF]/15 rounded-full blur-[130px]" />
      </div>

      <div className="relative z-10">

        {/* ========================================================= */}
        {/* 1. NAVBAR HEADER                                          */}
        {/* ========================================================= */}
        <header className="sticky top-0 z-50 bg-[#06070a]/80 backdrop-blur-2xl border-b border-white/[0.08] transition-all duration-300">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 h-20 flex items-center justify-between">
            
            {/* Brand Logo */}
            <Link href="/" className="flex items-center gap-3.5 group">
              <div className="relative w-9 h-9 sm:w-10 sm:h-10 transition-transform duration-300 group-hover:scale-105">
                <Image
                  src="/logo-ascend.png"
                  alt="ASCEND"
                  fill
                  className="object-contain"
                  priority
                />
              </div>
              <div className="flex flex-col">
                <span className="font-display font-black text-xl tracking-wider text-white leading-none">
                  ASCEND
                </span>
                <span className="text-[10px] uppercase font-bold tracking-widest text-[#00D4FF] mt-1">
                  Gym Intelligence
                </span>
              </div>
            </Link>

            {/* Navigation Links */}
            <nav className="hidden md:flex items-center gap-8 text-xs font-semibold uppercase tracking-wider text-[#9CA3AF]">
              <a href="#experiencia" className="hover:text-white transition-colors">
                La Experiencia
              </a>
              <a href="#transformacion" className="hover:text-white transition-colors">
                Papel vs ASCEND
              </a>
              <a href="#ia-pionera" className="text-[#00D4FF] hover:text-white transition-colors flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-[#00D4FF]" />
                IA Pionera
              </a>
              <a href="#pilares" className="hover:text-white transition-colors">
                Pilares
              </a>
              <a href="#precios" className="hover:text-white transition-colors">
                Planes
              </a>
              <a href="#instalacion" className="hover:text-white transition-colors">
                PWA Offline
              </a>
            </nav>

            {/* App Entry Button */}
            <div className="flex items-center gap-3">
              <Link
                href="/dashboard"
                className="inline-flex items-center gap-2 bg-white/[0.05] hover:bg-white/[0.1] border border-white/[0.12] hover:border-[#6C5CFF]/60 text-white text-xs sm:text-sm font-semibold px-4 sm:px-5 py-2.5 rounded-full transition-all duration-200 active:scale-95 shadow-sm"
              >
                <span>Ingresar a la App</span>
                <ArrowRight className="w-3.5 h-3.5 text-[#00D4FF]" />
              </Link>
            </div>
          </div>
        </header>

        {/* ========================================================= */}
        {/* 2. HERO SECTION (EDITORIAL GRADE)                         */}
        {/* ========================================================= */}
        <section className="relative pt-12 pb-20 sm:pt-20 sm:pb-32 px-4">
          <div className="max-w-4xl mx-auto text-center">
            
            {/* Pill Eyebrow */}
            <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-white/[0.04] border border-white/[0.12] text-xs font-bold text-[#00D4FF] mb-8 shadow-sm backdrop-blur-md">
              <span className="w-2 h-2 rounded-full bg-[#00E676] animate-pulse" />
              <span>PIONEROS EN INTELIGENCIA ARTIFICIAL APLICADA A SALAS DE GIMNASIO</span>
            </div>

            {/* Main Headline */}
            <h1 className="font-display text-4xl sm:text-6xl lg:text-7xl font-black tracking-tight text-white leading-[1.06] mb-8">
              Nunca más volver a sentirte{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#6C5CFF] via-[#8B7DFF] to-[#00D4FF]">
                perdido al entrenar.
              </span>
            </h1>

            {/* Lead Narrative */}
            <p className="text-base sm:text-xl text-[#9CA3AF] max-w-2xl mx-auto leading-relaxed mb-10 font-normal">
              La primera plataforma para gimnasios que integra un{" "}
              <strong className="text-white font-semibold">Asistente con Inteligencia Artificial biomecánica</strong>,
              videos anatómicos 3D de cada máquina y registro de cargas en tiempo real. 
              Sin rutinas de papel, sin profesores sobrecargados y sin socios abandonando al segundo mes.
            </p>

            {/* CTA Group */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 bg-gradient-to-r from-[#6C5CFF] to-[#00D4FF] hover:from-[#5b4be8] hover:to-[#00b8e6] text-white font-bold text-sm sm:text-base px-8 py-4 rounded-2xl shadow-xl shadow-[#6C5CFF]/25 transition-all duration-300 hover:-translate-y-0.5 active:translate-y-0"
              >
                <MessageCircle className="w-5 h-5" />
                <span>Solicitar Piloto de 14 Días Gratis</span>
              </a>

              <a
                href="#experiencia"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 bg-white/[0.04] hover:bg-white/[0.08] border border-white/[0.12] hover:border-white/[0.25] text-white font-semibold text-sm sm:text-base px-7 py-4 rounded-2xl transition-all duration-200"
              >
                <Play className="w-4 h-4 text-[#00D4FF]" />
                <span>Ver Experiencia en Sala</span>
              </a>
            </div>

            {/* Trust Seals */}
            <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-3 text-xs text-[#7A8090]">
              <span className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#00E676]" />
                <span>Piloto 100% sin costo para tu gimnasio</span>
              </span>
              <span className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#00E676]" />
                <span>Carga y relevamiento de máquinas en 24h</span>
              </span>
              <span className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#00E676]" />
                <span>Soporte integral en toda la Argentina</span>
              </span>
            </div>

          </div>
        </section>

        {/* ========================================================= */}
        {/* 3. SIMULADOR MÓVIL EN VIVO (HARDWARE 3D EN SALA)          */}
        {/* ========================================================= */}
        <section id="experiencia" className="py-16 sm:py-24 px-4 relative">
          <div className="max-w-5xl mx-auto">
            
            <div className="text-center mb-14">
              <span className="text-xs uppercase tracking-widest text-[#00D4FF] font-bold">
                Claridad en Cada Movimiento
              </span>
              <h2 className="font-display text-2xl sm:text-4xl font-extrabold mt-1 text-white">
                Siempre saber cuál es el siguiente paso
              </h2>
              <p className="text-sm text-[#9CA3AF] mt-2 max-w-lg mx-auto">
                Cada ejercicio cuenta con su biomecánica en video 3D, objetivo muscular y registro exacto de progresión.
              </p>
            </div>

            {/* Hardware Titanium Phone Mockup */}
            <div className="max-w-md mx-auto relative">
              
              {/* Outer Phone Bezel */}
              <div className="bg-[#0b0c12] border-2 border-white/[0.15] rounded-[44px] p-4 sm:p-5 shadow-2xl shadow-black relative overflow-hidden transition-all duration-300 hover:border-[#6C5CFF]/60 hover:shadow-[#6C5CFF]/15">
                
                {/* Dynamic Speaker Slit */}
                <div className="w-20 h-3.5 bg-black rounded-full mx-auto mb-3 flex items-center justify-center">
                  <div className="w-2.5 h-2.5 rounded-full bg-[#14141A]" />
                </div>

                {/* Header in Phone */}
                <div className="flex items-center justify-between border-b border-white/[0.08] pb-3 mb-4">
                  <div className="flex items-center gap-2">
                    <div className="w-2.5 h-2.5 rounded-full bg-[#00E676] animate-pulse" />
                    <div>
                      <p className="text-xs font-bold text-white leading-tight">
                        Gimnasio Titán • Sede Central
                      </p>
                      <p className="text-[10px] text-[#7A8090]">Sesión: Empuje e Hipertrofia</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-1 bg-white/[0.06] border border-white/[0.1] px-2.5 py-1 rounded-full text-xs font-bold text-[#00D4FF]">
                    <TrendingUp className="w-3.5 h-3.5 text-[#00D4FF]" />
                    <span>Nivel 25</span>
                  </div>
                </div>

                {/* Video 3D en Vivo */}
                <div className="relative rounded-2xl overflow-hidden bg-[#000] border border-white/[0.08] aspect-[9/10] mb-4 group">
                  <video
                    src="https://res.cloudinary.com/ydo2ah5k/video/upload/v1790636662/ascend/ejercicios/press-banca.mp4"
                    autoPlay
                    loop
                    muted
                    playsInline
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-3 left-3 bg-[#06070a]/90 backdrop-blur-md border border-white/[0.12] px-3 py-1 rounded-xl text-[11px] font-semibold text-white flex items-center gap-2 shadow-lg">
                    <Dumbbell className="w-3.5 h-3.5 text-[#00D4FF]" />
                    <span>Press de Banca Plano</span>
                  </div>
                  <div className="absolute bottom-3 right-3 bg-[#06070a]/90 backdrop-blur-md border border-white/[0.12] px-2.5 py-1 rounded-xl text-[10px] text-[#9CA3AF] shadow-lg">
                    Pectoral Mayor & Tríceps
                  </div>
                </div>

                {/* Registro de Cargas & Series */}
                <div className="bg-white/[0.03] border border-white/[0.08] rounded-2xl p-3.5 mb-3.5">
                  <div className="flex items-center justify-between text-xs mb-2.5">
                    <span className="text-[#9CA3AF] font-medium">Series Realizadas</span>
                    <span className="text-[#00E676] font-bold">3 de 4 completadas</span>
                  </div>
                  <div className="grid grid-cols-4 gap-2 text-center text-xs">
                    <div className="bg-[#00E676]/10 border border-[#00E676]/40 text-[#00E676] py-2 rounded-xl font-bold">
                      ✓ 60 kg
                    </div>
                    <div className="bg-[#00E676]/10 border border-[#00E676]/40 text-[#00E676] py-2 rounded-xl font-bold">
                      ✓ 65 kg
                    </div>
                    <div className="bg-[#00E676]/10 border border-[#00E676]/40 text-[#00E676] py-2 rounded-xl font-bold">
                      ✓ 70 kg
                    </div>
                    <div className="bg-white/[0.03] border border-dashed border-white/[0.15] text-[#7A8090] py-2 rounded-xl">
                      70 kg ?
                    </div>
                  </div>
                </div>

                {/* Asistente IA Bubble */}
                <div className="bg-gradient-to-r from-[#6C5CFF]/15 via-[#00D4FF]/10 to-transparent border border-[#6C5CFF]/30 rounded-2xl p-3.5 flex items-start gap-3">
                  <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-[#6C5CFF] to-[#00D4FF] flex items-center justify-center text-white shrink-0 mt-0.5 shadow-md shadow-[#6C5CFF]/30">
                    <Sparkles className="w-4 h-4" />
                  </div>
                  <div className="text-xs">
                    <p className="font-bold text-white">Entrenador Inteligente ASCEND</p>
                    <p className="text-[#9CA3AF] text-[11px] mt-1 leading-snug">
                      &quot;Excelente progresión. Mantené los codos a 45° respecto al torso para proteger tus hombros en la última serie.&quot;
                    </p>
                  </div>
                </div>

              </div>

              {/* Floating Side Badges on Desktop */}
              <div className="hidden lg:flex items-center gap-3 absolute top-24 -left-32 bg-[#0d0f18]/90 backdrop-blur-xl border border-white/[0.1] px-4 py-2.5 rounded-2xl shadow-xl animate-float">
                <Activity className="w-4 h-4 text-[#00E676]" />
                <div>
                  <p className="text-[11px] font-bold text-white leading-tight">Sobrecarga Óptima</p>
                  <p className="text-[9px] text-[#7A8090]">1RM Calculado: 85 kg</p>
                </div>
              </div>

              <div className="hidden lg:flex items-center gap-3 absolute bottom-28 -right-32 bg-[#0d0f18]/90 backdrop-blur-xl border border-white/[0.1] px-4 py-2.5 rounded-2xl shadow-xl">
                <Flame className="w-4 h-4 text-[#fbbf24]" />
                <div>
                  <p className="text-[11px] font-bold text-white leading-tight">Activación Motora 92%</p>
                  <p className="text-[9px] text-[#7A8090]">Vector Biomecánico Alineado</p>
                </div>
              </div>

            </div>

          </div>
        </section>

        {/* ========================================================= */}
        {/* 4. PAPEL VS. ASCEND (TRANSFORMACIÓN BUSCADA)              */}
        {/* ========================================================= */}
        <section id="transformacion" className="py-20 sm:py-28 px-4 bg-[#090b10] border-y border-white/[0.08]">
          <div className="max-w-5xl mx-auto">
            
            <div className="text-center mb-16">
              <span className="text-xs uppercase tracking-widest text-[#6C5CFF] font-bold">
                Transformación en Sala
              </span>
              <h2 className="font-display text-3xl sm:text-5xl font-extrabold mt-1 text-white">
                De la incertidumbre a la confianza
              </h2>
              <p className="text-sm sm:text-base text-[#9CA3AF] mt-2 max-w-xl mx-auto">
                Cuando un alumno entra al gimnasio y no sabe qué hacer, la frustración provoca abandono. ASCEND transforma su experiencia completa.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              
              {/* Card 1: La Hojita de Papel */}
              <div className="bg-[#110e12]/80 border border-red-500/25 rounded-3xl p-7 sm:p-9 relative shadow-lg">
                <div className="flex items-center gap-3.5 mb-6">
                  <div className="w-11 h-11 rounded-2xl bg-red-500/10 border border-red-500/30 flex items-center justify-center text-red-400">
                    <XCircle className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="font-display text-lg font-bold text-white">La Rutina Tradicional en Papel</h3>
                    <p className="text-xs text-red-400/90 font-medium">Confusión y abandono a los 30 días</p>
                  </div>
                </div>

                <ul className="space-y-4 text-sm text-[#9CA3AF]">
                  <li className="flex items-start gap-3">
                    <span className="text-red-400 font-bold shrink-0 text-base">✕</span>
                    <span>La hoja se moja, se arruga y se pierde a las dos semanas.</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-red-400 font-bold shrink-0 text-base">✕</span>
                    <span>El alumno no entiende la letra o el nombre técnico del ejercicio.</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-red-400 font-bold shrink-0 text-base">✕</span>
                    <span>El profesor de sala repite 50 veces por día cómo se usa la misma polea.</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-red-400 font-bold shrink-0 text-base">✕</span>
                    <span>No hay registro de pesos: el alumno usa siempre la misma carga y se estanca.</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-red-400 font-bold shrink-0 text-base">✕</span>
                    <span>Depende 100% de la motivación pasajera en vez de construir un proceso.</span>
                  </li>
                </ul>
              </div>

              {/* Card 2: ASCEND */}
              <div className="bg-gradient-to-b from-[#101426] to-[#0c0e18] border-2 border-[#6C5CFF]/60 rounded-3xl p-7 sm:p-9 relative shadow-2xl shadow-[#6C5CFF]/15">
                <div className="flex items-center gap-3.5 mb-6">
                  <div className="w-11 h-11 rounded-2xl bg-[#6C5CFF]/20 border border-[#6C5CFF]/40 flex items-center justify-center text-[#6C5CFF]">
                    <CheckCircle2 className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="font-display text-lg font-bold text-white">Con ASCEND en el Gimnasio</h3>
                    <p className="text-xs text-[#00E676] font-semibold">Autonomía, aprendizaje y constancia</p>
                  </div>
                </div>

                <ul className="space-y-4 text-sm text-[#F5F7FA]">
                  <li className="flex items-start gap-3">
                    <span className="text-[#00E676] font-bold shrink-0 text-base">✓</span>
                    <span>Animaciones 3D e infografías biomecánicas con la técnica precisa.</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-[#00E676] font-bold shrink-0 text-base">✓</span>
                    <span>Sobrecarga progresiva: el alumno sabe exactamente qué peso le toca hoy.</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-[#00E676] font-bold shrink-0 text-base">✓</span>
                    <span>Coach con IA que adapta ejercicios y resuelve dudas sin juzgar.</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-[#00E676] font-bold shrink-0 text-base">✓</span>
                    <span>Evolución medible que convierte el entrenamiento en parte de su identidad.</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-[#00E676] font-bold shrink-0 text-base">✓</span>
                    <span>Los profesores quedan libres para corregir técnica y conectar con la gente.</span>
                  </li>
                </ul>
              </div>

            </div>

          </div>
        </section>

        {/* ========================================================= */}
        {/* 5. TECNOLOGÍA PIONERA: ASISTENTE CON IA BIOMECÁNICA       */}
        {/* ========================================================= */}
        <section id="ia-pionera" className="py-20 sm:py-32 px-4 relative">
          <div className="max-w-6xl mx-auto">
            
            <div className="text-center mb-16">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/[0.04] border border-[#6C5CFF]/40 text-xs font-bold text-[#00D4FF] mb-4 shadow-sm">
                <Sparkles className="w-3.5 h-3.5 text-[#00D4FF]" />
                <span>TECNOLOGÍA PIONERA • GOOGLE GEMINI + PINECONE VECTOR DB</span>
              </div>
              <h2 className="font-display text-3xl sm:text-5xl font-extrabold text-white tracking-tight leading-tight max-w-3xl mx-auto">
                El primer cerebro de IA que{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#6C5CFF] via-[#8B7DFF] to-[#00D4FF]">
                  entiende tu gimnasio y tus máquinas
                </span>
              </h2>
              <p className="text-sm sm:text-base text-[#9CA3AF] mt-4 max-w-2xl mx-auto leading-relaxed">
                No es un chatbot genérico que copia y pega respuestas de internet. Es un mentor de sala
                entrenado con literatura biomecánica real, memoria de cargas históricas (PRs) y conexión directa a la base de datos de tu sede.
              </p>
            </div>

            {/* 4 Superpowers Grid */}
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-14">
              
              <div className="bg-white/[0.03] border border-white/[0.08] hover:border-[#6C5CFF]/60 rounded-2xl p-6 transition-all group hover:-translate-y-1">
                <div className="w-12 h-12 rounded-xl bg-[#6C5CFF]/15 border border-[#6C5CFF]/30 flex items-center justify-center text-[#8B7DFF] mb-4 group-hover:scale-105 transition-transform">
                  <Database className="w-6 h-6" />
                </div>
                <h3 className="font-display font-bold text-base text-white mb-2">
                  Function Calling en DB
                </h3>
                <p className="text-xs text-[#9CA3AF] leading-relaxed">
                  Cuando el socio pide una rutina, la IA no responde con texto plano: <strong className="text-white">escribe y guarda la rutina directamente en la base de datos</strong> de su cuenta con ejercicios, series y descansos.
                </p>
              </div>

              <div className="bg-white/[0.03] border border-white/[0.08] hover:border-[#00D4FF]/60 rounded-2xl p-6 transition-all group hover:-translate-y-1">
                <div className="w-12 h-12 rounded-xl bg-[#00D4FF]/15 border border-[#00D4FF]/30 flex items-center justify-center text-[#00D4FF] mb-4 group-hover:scale-105 transition-transform">
                  <TrendingUp className="w-6 h-6" />
                </div>
                <h3 className="font-display font-bold text-base text-white mb-2">
                  Memoria de Cargas (PRs)
                </h3>
                <p className="text-xs text-[#9CA3AF] leading-relaxed">
                  Conoce los récords históricos de cada socio. Calcula series al <strong className="text-white">75-80% del 1RM</strong> para garantizar sobrecarga progresiva sin fatiga excesiva ni riesgo de lesión.
                </p>
              </div>

              <div className="bg-white/[0.03] border border-white/[0.08] hover:border-[#00E676]/60 rounded-2xl p-6 transition-all group hover:-translate-y-1">
                <div className="w-12 h-12 rounded-xl bg-[#00E676]/15 border border-[#00E676]/30 flex items-center justify-center text-[#00E676] mb-4 group-hover:scale-105 transition-transform">
                  <ShieldCheck className="w-6 h-6" />
                </div>
                <h3 className="font-display font-bold text-base text-white mb-2">
                  Restricción a tu Inventario
                </h3>
                <p className="text-xs text-[#9CA3AF] leading-relaxed">
                  Cero alucinaciones. La IA tiene <strong className="text-white">prohibido recomendar aparatos inexistentes</strong> en tu sala. Todo se adapta con precisión a las máquinas relevadas en tu gimnasio.
                </p>
              </div>

              <div className="bg-white/[0.03] border border-white/[0.08] hover:border-purple-500/60 rounded-2xl p-6 transition-all group hover:-translate-y-1">
                <div className="w-12 h-12 rounded-xl bg-purple-500/15 border border-purple-500/30 flex items-center justify-center text-purple-400 mb-4 group-hover:scale-105 transition-transform">
                  <Cpu className="w-6 h-6" />
                </div>
                <h3 className="font-display font-bold text-base text-white mb-2">
                  RAG Biomecánico + Visión
                </h3>
                <p className="text-xs text-[#9CA3AF] leading-relaxed">
                  Conectado a bases vectoriales Pinecone con manuales de anatomía articular y capaz de procesar imágenes de comidas o posturas con visión multimodal.
                </p>
              </div>

            </div>

            {/* Interactive Chat Simulator */}
            <div className="bg-white/[0.03] border border-white/[0.1] rounded-3xl p-6 sm:p-10 shadow-2xl relative">
              <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4 pb-6 border-b border-white/[0.08] mb-6">
                <div>
                  <span className="text-[11px] uppercase tracking-wider text-[#00D4FF] font-bold">
                    Simulador en Vivo de la Inteligencia Artificial
                  </span>
                  <h3 className="font-display text-xl sm:text-2xl font-bold text-white mt-1">
                    Mirá cómo resuelve dudas reales de tus alumnos
                  </h3>
                </div>

                {/* Case Switcher Buttons */}
                <div className="flex flex-wrap gap-2">
                  {CASOS_IA.map((caso, idx) => {
                    const Icono = caso.icono
                    const activo = casoIA === idx
                    return (
                      <button
                        key={caso.id}
                        onClick={() => setCasoIA(idx)}
                        className={`inline-flex items-center gap-2 text-xs font-semibold px-3.5 py-2 rounded-xl border transition-all ${
                          activo
                            ? "bg-[#6C5CFF] text-white border-[#6C5CFF] shadow-lg shadow-[#6C5CFF]/30"
                            : "bg-white/[0.04] text-[#9CA3AF] border-white/[0.08] hover:text-white hover:border-white/[0.2]"
                        }`}
                      >
                        <Icono className="w-3.5 h-3.5" />
                        <span>{caso.etiqueta}</span>
                      </button>
                    )
                  })}
                </div>
              </div>

              {/* Chat Viewport */}
              <div className="bg-[#040508] border border-white/[0.06] rounded-2xl p-5 sm:p-7 space-y-5">
                
                {/* User Message */}
                <div className="flex items-start gap-3 justify-end">
                  <div className="bg-white/[0.06] border border-white/[0.1] text-white text-xs sm:text-sm px-4 py-3 rounded-2xl rounded-tr-none max-w-lg">
                    <p className="font-semibold text-[10px] text-[#9CA3AF] mb-1">Alumno en Sala</p>
                    <p>{CASOS_IA[casoIA].pregunta}</p>
                  </div>
                  <div className="w-8 h-8 rounded-full bg-white/[0.1] flex items-center justify-center text-xs font-bold text-white shrink-0 mt-1">
                    A
                  </div>
                </div>

                {/* AI Response */}
                <div className="flex items-start gap-3">
                  <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#6C5CFF] to-[#00D4FF] flex items-center justify-center text-white shrink-0 mt-1 shadow-md shadow-[#6C5CFF]/30">
                    <Bot className="w-4 h-4 text-white" />
                  </div>
                  
                  <div className="space-y-3 max-w-xl">
                    <div className="bg-white/[0.04] border border-[#6C5CFF]/30 text-[#F5F7FA] text-xs sm:text-sm px-5 py-4 rounded-2xl rounded-tl-none">
                      <div className="flex items-center justify-between gap-2 mb-2">
                        <span className="font-display font-bold text-xs text-[#00D4FF]">
                          Asistente Biomecánico ASCEND
                        </span>
                        <span className="text-[10px] bg-[#00D4FF]/10 text-[#00D4FF] border border-[#00D4FF]/20 px-2 py-0.5 rounded-full font-medium">
                          Respuesta en 0.4s
                        </span>
                      </div>
                      <p className="leading-relaxed text-[#D1D5DB]">
                        {CASOS_IA[casoIA].respuesta}
                      </p>
                    </div>

                    {/* Backend Action Card */}
                    <div className={`border rounded-xl p-3.5 text-xs ${CASOS_IA[casoIA].accionEspecial.color}`}>
                      <div className="flex items-center justify-between gap-2 mb-1.5">
                        <span className="font-bold flex items-center gap-1.5">
                          <Cpu className="w-3.5 h-3.5" />
                          <span>{CASOS_IA[casoIA].accionEspecial.titulo}</span>
                        </span>
                        <span className="font-extrabold text-[10px] px-2 py-0.5 rounded-md bg-black/40">
                          {CASOS_IA[casoIA].accionEspecial.badge}
                        </span>
                      </div>
                      <p className="opacity-90 leading-relaxed">
                        {CASOS_IA[casoIA].accionEspecial.detalle}
                      </p>
                    </div>

                    <p className="text-[11px] text-[#7A8090] italic">
                      💡 <strong>Impacto comercial:</strong> {CASOS_IA[casoIA].superpoder}
                    </p>
                  </div>
                </div>

              </div>

            </div>

          </div>
        </section>

        {/* ========================================================= */}
        {/* 6. LOS PILARES OFICIALES DE ASCEND                        */}
        {/* ========================================================= */}
        <section id="pilares" className="py-20 sm:py-28 px-4 bg-[#090b10] border-t border-white/[0.08]">
          <div className="max-w-5xl mx-auto">
            
            <div className="text-center mb-16">
              <span className="text-xs uppercase tracking-widest text-[#00D4FF] font-bold">
                Principios de Producto
              </span>
              <h2 className="font-display text-3xl sm:text-5xl font-extrabold mt-1 text-white">
                Diseñada para la claridad y el progreso
              </h2>
              <p className="text-sm sm:text-base text-[#9CA3AF] mt-2 max-w-xl mx-auto">
                Tecnología rigurosa basada en ciencia del entrenamiento, sin agresividad ni recompensas vacías.
              </p>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              
              <div className="bg-white/[0.03] border border-white/[0.08] rounded-2xl p-6 hover:border-[#6C5CFF]/60 transition-colors">
                <div className="w-12 h-12 rounded-xl bg-[#6C5CFF]/15 border border-[#6C5CFF]/30 flex items-center justify-center text-[#6C5CFF] mb-4">
                  <Dumbbell className="w-6 h-6" />
                </div>
                <h3 className="font-display font-bold text-base text-white mb-2">
                  Videos 3D de cada Máquina
                </h3>
                <p className="text-xs text-[#9CA3AF] leading-relaxed">
                  Muestra de forma clara la biomecánica, las fases del movimiento y el músculo principal trabajado.
                </p>
              </div>

              <div className="bg-white/[0.03] border border-white/[0.08] rounded-2xl p-6 hover:border-[#00D4FF]/60 transition-colors">
                <div className="w-12 h-12 rounded-xl bg-[#00D4FF]/15 border border-[#00D4FF]/30 flex items-center justify-center text-[#00D4FF] mb-4">
                  <Sparkles className="w-6 h-6" />
                </div>
                <h3 className="font-display font-bold text-base text-white mb-2">
                  Mentor de Entrenamiento IA
                </h3>
                <p className="text-xs text-[#9CA3AF] leading-relaxed">
                  Acompañamiento profesional y sereno. Adapta el plan ante imprevistos y responde con evidencia científica.
                </p>
              </div>

              <div className="bg-white/[0.03] border border-white/[0.08] rounded-2xl p-6 hover:border-[#6C5CFF]/60 transition-colors">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#6C5CFF]/20 to-[#00D4FF]/20 border border-[#6C5CFF]/40 flex items-center justify-center text-white mb-4">
                  <TrendingUp className="w-6 h-6 text-[#00D4FF]" />
                </div>
                <h3 className="font-display font-bold text-base text-white mb-2">
                  Evolución de Niveles
                </h3>
                <p className="text-xs text-[#9CA3AF] leading-relaxed">
                  Un sistema de progreso que reconoce la constancia y celebra la regularidad sin generar culpas.
                </p>
              </div>

              <div className="bg-white/[0.03] border border-white/[0.08] rounded-2xl p-6 hover:border-[#00E676]/60 transition-colors">
                <div className="w-12 h-12 rounded-xl bg-[#00E676]/15 border border-[#00E676]/30 flex items-center justify-center text-[#00E676] mb-4">
                  <WifiOff className="w-6 h-6" />
                </div>
                <h3 className="font-display font-bold text-base text-white mb-2">
                  Modo 100% Offline (PWA)
                </h3>
                <p className="text-xs text-[#9CA3AF] leading-relaxed">
                  Resistente a la mala señal en salones cerrados. Las cargas se guardan en el teléfono y sincronizan después.
                </p>
              </div>

            </div>

          </div>
        </section>

        {/* ========================================================= */}
        {/* 7. PLANES & SUSCRIPCIONES (ATLETA Y GIMNASIO)             */}
        {/* ========================================================= */}
        <section id="precios" className="py-20 sm:py-32 px-4 relative">
          <div className="max-w-5xl mx-auto">
            
            <div className="text-center mb-14">
              <span className="text-xs uppercase tracking-widest text-[#00E676] font-bold">
                Planes y Suscripciones
              </span>
              <h2 className="font-display text-3xl sm:text-5xl font-extrabold mt-1 text-white">
                Elegí cómo querés entrenar
              </h2>
              <p className="text-sm sm:text-base text-[#9CA3AF] mt-2 max-w-xl mx-auto">
                Acceso individual para atletas que entrenan por su cuenta o equipamiento integral para salas de musculación de todo el país.
              </p>

              <div className="inline-flex items-center gap-2 bg-white/[0.03] border border-white/[0.1] px-4 py-2 rounded-xl mt-6 text-xs text-[#9CA3AF]">
                <span className="w-2 h-2 rounded-full bg-[#00E676]" />
                <span>Abonable en USD vía transferencia o en pesos (ARS) al valor del dólar blue del día</span>
              </div>
            </div>

            <div className="grid lg:grid-cols-2 gap-8 items-stretch">
              
              {/* CARD 1: PLAN ATLETA PARTICULAR */}
              <div className="bg-white/[0.03] border border-white/[0.1] hover:border-[#6C5CFF]/60 rounded-3xl p-7 sm:p-9 flex flex-col justify-between transition-all duration-300">
                <div>
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/[0.05] border border-white/[0.1] text-[11px] font-bold text-[#00D4FF] mb-5">
                    <Dumbbell className="w-3.5 h-3.5 text-[#00D4FF]" />
                    <span>ATLETA INDIVIDUAL</span>
                  </div>

                  <div className="flex items-baseline justify-between gap-4 pb-6 border-b border-white/[0.08]">
                    <div>
                      <h3 className="font-display text-2xl font-extrabold text-white">
                        Plan Atleta
                      </h3>
                      <p className="text-xs text-[#9CA3AF] mt-1">
                        Para entrenar por tu cuenta en cualquier gimnasio del país.
                      </p>
                    </div>
                    <div className="text-right">
                      <div className="flex items-baseline justify-end gap-1">
                        <span className="font-display text-4xl font-black text-white">$10</span>
                        <span className="text-xs font-semibold text-[#9CA3AF]">USD / mes</span>
                      </div>
                      <span className="text-[10px] text-[#00D4FF]">O en pesos al blue</span>
                    </div>
                  </div>

                  {/* Checklist Atleta */}
                  <div className="space-y-3.5 my-7 text-sm text-[#F5F7FA]">
                    <div className="flex items-start gap-2.5">
                      <Check className="w-4 h-4 text-[#00E676] shrink-0 mt-0.5" />
                      <span>Acceso libre para entrenar en cualquier gimnasio o box</span>
                    </div>
                    <div className="flex items-start gap-2.5">
                      <Check className="w-4 h-4 text-[#00E676] shrink-0 mt-0.5" />
                      <span>Asistente con IA en <strong>Entrenamiento & Nutrición 24/7</strong></span>
                    </div>
                    <div className="flex items-start gap-2.5">
                      <Check className="w-4 h-4 text-[#00E676] shrink-0 mt-0.5" />
                      <span>Catálogo de videos 3D de cada máquina en sala</span>
                    </div>
                    <div className="flex items-start gap-2.5">
                      <Check className="w-4 h-4 text-[#00E676] shrink-0 mt-0.5" />
                      <span>Registro de cargas, series y cálculo automático de 1RM</span>
                    </div>
                    <div className="flex items-start gap-2.5">
                      <Check className="w-4 h-4 text-[#00E676] shrink-0 mt-0.5" />
                      <span>Análisis fotográfico de platos de comida por IA</span>
                    </div>
                    <div className="flex items-start gap-2.5">
                      <Check className="w-4 h-4 text-[#00E676] shrink-0 mt-0.5" />
                      <span>Modo 100% Offline (PWA) sin cortes por baja señal</span>
                    </div>
                  </div>
                </div>

                <div>
                  <a
                    href={whatsappUrlAtleta}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full inline-flex items-center justify-center gap-2 bg-white/[0.05] hover:bg-white/[0.1] border border-white/[0.15] text-white font-bold text-sm py-4 rounded-xl transition-all active:scale-[0.99]"
                  >
                    <MessageCircle className="w-4 h-4 text-[#00D4FF]" />
                    <span>Suscribirme al Plan Atleta ($10 USD)</span>
                  </a>
                  <p className="text-center text-[11px] text-[#7A8090] mt-2.5">
                    Transferencia directa • Activación inmediata de tu cuenta
                  </p>
                </div>
              </div>

              {/* CARD 2: PLAN GIMNASIO OFICIAL (DESTACADA B2B) */}
              <div className="bg-gradient-to-b from-[#141828] to-[#0c0e18] border-2 border-[#6C5CFF] rounded-3xl p-7 sm:p-9 flex flex-col justify-between shadow-2xl shadow-[#6C5CFF]/20 relative">
                
                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-gradient-to-r from-[#6C5CFF] to-[#00D4FF] text-white text-[11px] font-extrabold uppercase tracking-wider px-4 py-1 rounded-full shadow-lg">
                  14 Días de Piloto Gratis
                </div>

                <div>
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#6C5CFF]/15 border border-[#6C5CFF]/40 text-[11px] font-bold text-[#8B7DFF] mb-5">
                    <Award className="w-3.5 h-3.5 text-[#00D4FF]" />
                    <span>SEDE COMPLETA</span>
                  </div>

                  <div className="flex items-baseline justify-between gap-4 pb-6 border-b border-white/[0.08]">
                    <div>
                      <h3 className="font-display text-2xl font-extrabold text-white">
                        Plan Gimnasio Oficial
                      </h3>
                      <p className="text-xs text-[#9CA3AF] mt-1">
                        Acceso completo para tu gimnasio, profesores y todos tus alumnos.
                      </p>
                    </div>
                    <div className="text-right">
                      <div className="flex items-baseline justify-end gap-1">
                        <span className="font-display text-4xl font-black text-white">$100</span>
                        <span className="text-xs font-semibold text-[#9CA3AF]">USD / mes</span>
                      </div>
                      <div className="inline-flex items-center gap-1 bg-black/40 border border-[#00E676]/30 px-2 py-0.5 rounded-md text-[10px] text-[#00E676] font-semibold mt-1">
                        <span>Anual: $1.080 USD (10% OFF)</span>
                      </div>
                    </div>
                  </div>

                  {/* Checklist Gimnasio */}
                  <div className="space-y-3.5 my-7 text-sm text-[#F5F7FA]">
                    <div className="flex items-start gap-2.5">
                      <Check className="w-4 h-4 text-[#00E676] shrink-0 mt-0.5" />
                      <span><strong>Alumnos ilimitados</strong> en tu sede (tarifa plana sin sorpresas)</span>
                    </div>
                    <div className="flex items-start gap-2.5">
                      <Check className="w-4 h-4 text-[#00E676] shrink-0 mt-0.5" />
                      <span>Relevamiento y carga del parque de máquinas propio</span>
                    </div>
                    <div className="flex items-start gap-2.5">
                      <Check className="w-4 h-4 text-[#00E676] shrink-0 mt-0.5" />
                      <span>Cartelería QR lista para recepción y mostrador</span>
                    </div>
                    <div className="flex items-start gap-2.5">
                      <Check className="w-4 h-4 text-[#00E676] shrink-0 mt-0.5" />
                      <span>Radar de inactividad para retener socios y evitar bajas</span>
                    </div>
                    <div className="flex items-start gap-2.5">
                      <Check className="w-4 h-4 text-[#00E676] shrink-0 mt-0.5" />
                      <span>Videos 3D e infografías anatómicas de tus máquinas</span>
                    </div>
                    <div className="flex items-start gap-2.5">
                      <Check className="w-4 h-4 text-[#00E676] shrink-0 mt-0.5" />
                      <span>Asistente con IA biomecánica para todos tus alumnos</span>
                    </div>
                    <div className="flex items-start gap-2.5">
                      <Check className="w-4 h-4 text-[#00E676] shrink-0 mt-0.5" />
                      <span>Soporte técnico directo y puesta en marcha en 24h</span>
                    </div>
                  </div>
                </div>

                <div>
                  <a
                    href={whatsappUrlGym}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full inline-flex items-center justify-center gap-2 bg-gradient-to-r from-[#6C5CFF] to-[#00D4FF] hover:from-[#5b4be8] hover:to-[#00b8e6] text-white font-bold text-sm sm:text-base py-4 rounded-xl shadow-lg shadow-[#6C5CFF]/30 transition-all active:scale-[0.99]"
                  >
                    <MessageCircle className="w-4 h-4" />
                    <span>Comenzar Prueba de 14 Días sin Costo</span>
                  </a>
                  <p className="text-center text-[11px] text-[#7A8090] mt-2.5">
                    Relevamiento y puesta en marcha en 24h • Sin tarjeta de crédito
                  </p>
                </div>
              </div>

            </div>

            {/* Banner Caballo de Troya (Socio conecta con Gym) */}
            <div className="mt-12 bg-white/[0.03] border border-white/[0.08] rounded-2xl p-5 sm:p-6 flex flex-col sm:flex-row items-center justify-between gap-5 text-center sm:text-left">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-2xl bg-[#6C5CFF]/20 text-[#00D4FF] flex items-center justify-center shrink-0">
                  <Sparkles className="w-6 h-6 text-[#00D4FF]" />
                </div>
                <div>
                  <p className="text-sm font-bold text-white">
                    ¿Entrenás en un gimnasio y querés que lo tengan gratis para todos?
                  </p>
                  <p className="text-xs text-[#9CA3AF] mt-0.5">
                    Pasale nuestro contacto al dueño o encargado de tu sala. Cuando tu gimnasio se suma, el acceso es 100% libre para todos los socios.
                  </p>
                </div>
              </div>
              <a
                href={whatsappUrlGym}
                target="_blank"
                rel="noopener noreferrer"
                className="shrink-0 text-xs font-bold text-[#00D4FF] hover:text-white border border-[#00D4FF]/40 hover:border-[#00D4FF] px-5 py-2.5 rounded-xl transition-all"
              >
                Recomendar a mi Gym →
              </a>
            </div>

          </div>
        </section>

        {/* ========================================================= */}
        {/* 8. CÓMO INSTALAR LA PWA (GUÍA ALUMNOS)                    */}
        {/* ========================================================= */}
        <section id="instalacion" className="py-20 sm:py-28 px-4 bg-[#090b10] border-t border-white/[0.08]">
          <div className="max-w-3xl mx-auto">
            
            <div className="text-center mb-12">
              <span className="text-xs uppercase tracking-widest text-[#6C5CFF] font-bold">
                Tecnología Ligera
              </span>
              <h2 className="font-display text-2xl sm:text-4xl font-extrabold mt-1 text-white">
                ¿Cómo acceden los alumnos?
              </h2>
              <p className="text-sm text-[#9CA3AF] mt-2">
                ASCEND es una PWA (Progressive Web App): no satura la memoria del celular ni requiere descargas pesadas de la tienda.
              </p>

              {/* Selector iPhone vs Android */}
              <div className="inline-flex items-center bg-white/[0.04] border border-white/[0.1] rounded-2xl p-1.5 mt-7">
                <button
                  onClick={() => setTabPlataforma("ios")}
                  className={`text-xs font-bold px-5 py-2.5 rounded-xl transition-all ${
                    tabPlataforma === "ios"
                      ? "bg-[#6C5CFF] text-white shadow-md shadow-[#6C5CFF]/30"
                      : "text-[#7A8090] hover:text-white"
                  }`}
                >
                  iPhone (iOS / Safari)
                </button>
                <button
                  onClick={() => setTabPlataforma("android")}
                  className={`text-xs font-bold px-5 py-2.5 rounded-xl transition-all ${
                    tabPlataforma === "android"
                      ? "bg-[#6C5CFF] text-white shadow-md shadow-[#6C5CFF]/30"
                      : "text-[#7A8090] hover:text-white"
                  }`}
                >
                  Android (Chrome)
                </button>
              </div>
            </div>

            {/* Steps Display */}
            <div className="bg-white/[0.03] border border-white/[0.08] rounded-3xl p-6 sm:p-9">
              {tabPlataforma === "ios" ? (
                <div className="space-y-4">
                  <div className="flex items-start gap-4 p-4 bg-white/[0.03] rounded-2xl border border-white/[0.06]">
                    <div className="w-9 h-9 rounded-xl bg-[#6C5CFF]/20 text-[#6C5CFF] font-bold flex items-center justify-center shrink-0">
                      1
                    </div>
                    <div className="text-sm">
                      <p className="font-bold text-white">Abrí ascend.com.ar en Safari</p>
                      <p className="text-xs text-[#9CA3AF] mt-0.5">
                        Escaneá el cartel QR del mostrador con la cámara de tu iPhone o ingresá directo.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4 p-4 bg-white/[0.03] rounded-2xl border border-white/[0.06]">
                    <div className="w-9 h-9 rounded-xl bg-[#6C5CFF]/20 text-[#6C5CFF] font-bold flex items-center justify-center shrink-0">
                      <Share2 className="w-4 h-4" />
                    </div>
                    <div className="text-sm">
                      <p className="font-bold text-white">Tocá el botón Compartir</p>
                      <p className="text-xs text-[#9CA3AF] mt-0.5">
                        Es el ícono con un cuadrado y una flecha hacia arriba en la barra inferior de Safari.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4 p-4 bg-white/[0.03] rounded-2xl border border-white/[0.06]">
                    <div className="w-9 h-9 rounded-xl bg-[#6C5CFF]/20 text-[#6C5CFF] font-bold flex items-center justify-center shrink-0">
                      <PlusSquare className="w-4 h-4" />
                    </div>
                    <div className="text-sm">
                      <p className="font-bold text-white">Elegí &quot;Agregar a pantalla de inicio&quot;</p>
                      <p className="text-xs text-[#9CA3AF] mt-0.5">
                        ¡Listo! Te queda el icono de ASCEND en tu pantalla con acceso offline como app nativa.
                      </p>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="flex items-start gap-4 p-4 bg-white/[0.03] rounded-2xl border border-white/[0.06]">
                    <div className="w-9 h-9 rounded-xl bg-[#6C5CFF]/20 text-[#6C5CFF] font-bold flex items-center justify-center shrink-0">
                      1
                    </div>
                    <div className="text-sm">
                      <p className="font-bold text-white">Abrí ascend.com.ar en Chrome</p>
                      <p className="text-xs text-[#9CA3AF] mt-0.5">
                        Escaneá el cartel QR de la recepción o entrá desde el navegador.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4 p-4 bg-white/[0.03] rounded-2xl border border-white/[0.06]">
                    <div className="w-9 h-9 rounded-xl bg-[#6C5CFF]/20 text-[#6C5CFF] font-bold flex items-center justify-center shrink-0">
                      2
                    </div>
                    <div className="text-sm">
                      <p className="font-bold text-white">Tocá el aviso &quot;Instalar App&quot;</p>
                      <p className="text-xs text-[#9CA3AF] mt-0.5">
                        Aparece automáticamente abajo en la pantalla al ingresar o en el menú de 3 puntos.
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>

          </div>
        </section>

        {/* ========================================================= */}
        {/* 9. FOOTER                                                 */}
        {/* ========================================================= */}
        <footer className="border-t border-white/[0.08] bg-[#040508] py-14 px-4 text-xs text-[#7A8090]">
          <div className="max-w-5xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-6">
            
            <div className="flex items-center gap-3">
              <div className="relative w-8 h-8">
                <Image src="/logo-ascend.png" alt="ASCEND" fill className="object-contain" />
              </div>
              <span className="font-display font-bold text-sm text-white">ASCEND</span>
              <span className="text-[#9CA3AF]">— Entrená. Progresá. Ascendé.</span>
            </div>

            <div className="flex items-center gap-6">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-white transition-colors"
              >
                Instagram
              </a>
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-white transition-colors"
              >
                WhatsApp Comercial
              </a>
              <Link href="/dashboard" className="text-white hover:text-[#6C5CFF] transition-colors font-semibold">
                Acceso Alumnos
              </Link>
            </div>

          </div>

          <div className="max-w-5xl mx-auto text-center sm:text-left mt-8 pt-6 border-t border-white/[0.06] text-[11px]">
            © {new Date().getFullYear()} ASCEND. Todos los derechos reservados. Argentina.
          </div>
        </footer>

      </div>

    </div>
  )
}