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
  Compass,
  Layers,
  Award,
  Bot,
  Cpu,
  Database,
  ShieldCheck,
  Camera,
} from "lucide-react"

const CASOS_IA = [
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

  // Enlace directo a WhatsApp comercial oficial
  const whatsappUrl =
    "https://wa.me/5492994017688?text=" +
    encodeURIComponent(
      "Hola Emanuel! Vi la web de ASCEND y quiero coordinar la prueba piloto de 14 días para mi gimnasio."
    )

  return (
    <div className="min-h-screen bg-[#09090B] text-[#F5F7FA] font-sans selection:bg-[#6C5CFF]/30 selection:text-white">
      {/* ========================================================= */}
      {/* 1. NAVBAR HEADER */}
      {/* ========================================================= */}
      <header className="sticky top-0 z-40 bg-[#09090B]/90 backdrop-blur-xl border-b border-[#2B2B36]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3 group">
            <div className="relative w-8 h-8 sm:w-9 sm:h-9">
              <Image
                src="/logo-ascend.png"
                alt="ASCEND"
                fill
                className="object-contain transition-transform group-hover:scale-105"
                priority
              />
            </div>
            <span className="font-display font-bold text-lg sm:text-xl tracking-wider text-white">
              ASCEND
            </span>
          </Link>

          {/* Enlaces Desktop */}
          <nav className="hidden md:flex items-center gap-7 text-sm text-[#9CA3AF]">
            <a href="#experiencia" className="hover:text-white transition-colors">
              La Experiencia
            </a>
            <a href="#transformacion" className="hover:text-white transition-colors">
              Papel vs ASCEND
            </a>
            <a href="#ia-pionera" className="text-[#00D4FF] hover:text-white font-semibold transition-colors flex items-center gap-1.5">
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
              Instalación
            </a>
          </nav>

          {/* Botón Ingresar */}
          <div className="flex items-center gap-3">
            <Link
              href="/dashboard"
              className="bg-[#1C1C24] border border-[#2B2B36] hover:border-[#6C5CFF] text-[#F5F7FA] text-xs sm:text-sm font-semibold px-4 py-2 rounded-xl transition-all active:scale-95"
            >
              Ingresar a la App
            </Link>
          </div>
        </div>
      </header>

      {/* ========================================================= */}
      {/* 2. HERO SECTION */}
      {/* ========================================================= */}
      <section className="relative pt-14 pb-16 sm:pt-24 sm:pb-28 px-4 overflow-hidden">
        {/* Glows de fondo con la paleta oficial (Violeta y Cian) */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[550px] bg-[#6C5CFF]/12 rounded-full blur-[140px] pointer-events-none" />
        <div className="absolute top-1/3 right-1/4 w-[350px] h-[350px] bg-[#00D4FF]/10 rounded-full blur-[130px] pointer-events-none" />

        <div className="max-w-4xl mx-auto text-center relative z-10">
          {/* Badge Oficial */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#14141A] border border-[#2B2B36] text-xs font-semibold text-[#00D4FF] mb-6 shadow-sm">
            <Sparkles className="w-3.5 h-3.5 text-[#00D4FF]" />
            PIONEROS EN INTELIGENCIA ARTIFICIAL APLICADA A SALAS DE GIMNASIO
          </div>

          {/* Título Principal */}
          <h1 className="font-display text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-white leading-[1.1] mb-6">
            Nunca más volver a sentirte{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#6C5CFF] via-[#8B7DFF] to-[#00D4FF]">
              perdido al entrenar.
            </span>
          </h1>

          {/* Subtítulo alineado a la Visión de Producto */}
          <p className="text-base sm:text-xl text-[#9CA3AF] max-w-2xl mx-auto leading-relaxed mb-8">
            La primera plataforma para gimnasios que integra un{" "}
            <span className="text-white font-medium">Asistente con Inteligencia Artificial biomecánica</span>,
            videos anatómicos 3D de cada máquina y registro de cargas en tiempo real. 
            Sin rutinas de papel, sin profesores sobrecargados y sin socios abandonando al segundo mes.
          </p>

          {/* Botones de Acción */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3.5 sm:gap-4 mb-10">
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 bg-gradient-to-r from-[#6C5CFF] to-[#00D4FF] hover:opacity-95 text-white font-bold text-sm sm:text-base px-7 py-3.5 rounded-xl shadow-lg shadow-[#6C5CFF]/20 transition-all active:scale-[0.98]"
            >
              <MessageCircle className="w-5 h-5" />
              Solicitar Piloto de 14 Días Gratis
            </a>

            <a
              href="#experiencia"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-[#14141A] border border-[#2B2B36] hover:border-[#6C5CFF] text-[#F5F7FA] font-medium text-sm sm:text-base px-6 py-3.5 rounded-xl transition-all active:scale-[0.98]"
            >
              <Play className="w-4 h-4 text-[#00D4FF]" />
              Ver Experiencia en Sala
            </a>
          </div>

          {/* Sellos de Confianza */}
          <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-xs text-[#7A8090]">
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-[#00E676]" /> Piloto sin costo para tu gimnasio
            </span>
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-[#00E676]" /> Configuración de máquinas incluida
            </span>
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-[#00E676]" /> Soporte y acompañamiento en todo el país
            </span>
          </div>
        </div>
      </section>

      {/* ========================================================= */}
      {/* 3. SIMULADOR MÓVIL EN VIVO (EXPERIENCIA ASCEND) */}
      {/* ========================================================= */}
      <section id="experiencia" className="py-12 sm:py-20 px-4 bg-[#09090B]">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-10">
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

          {/* Card Mockup de Celular */}
          <div className="max-w-md mx-auto bg-[#14141A] border border-[#2B2B36] rounded-3xl p-4 sm:p-5 shadow-2xl shadow-black relative overflow-hidden">
            {/* Cabecera del Celular */}
            <div className="flex items-center justify-between border-b border-[#2B2B36] pb-3 mb-4">
              <div className="flex items-center gap-2">
                <div className="w-2.5 h-2.5 rounded-full bg-[#00E676]" />
                <div>
                  <p className="text-xs font-bold text-white leading-tight">
                    Gimnasio Titán • Sede Central
                  </p>
                  <p className="text-[10px] text-[#7A8090]">Sesión: Empuje e Hipertrofia</p>
                </div>
              </div>
              <div className="flex items-center gap-1 bg-[#1C1C24] border border-[#2B2B36] px-2.5 py-1 rounded-full text-xs font-bold text-[#00D4FF]">
                <TrendingUp className="w-3.5 h-3.5 text-[#00D4FF]" />
                Nivel 25
              </div>
            </div>

            {/* Video 3D en Vivo */}
            <div className="relative rounded-2xl overflow-hidden bg-[#0B0B0F] border border-[#2B2B36] aspect-[9/10] mb-4">
              <video
                src="https://res.cloudinary.com/ydo2ah5k/video/upload/v1790636662/ascend/ejercicios/press-banca.mp4"
                autoPlay
                loop
                muted
                playsInline
                className="w-full h-full object-cover"
              />
              <div className="absolute top-2.5 left-2.5 bg-[#09090B]/85 backdrop-blur-md border border-[#2B2B36] px-2.5 py-1 rounded-lg text-[11px] font-semibold text-white flex items-center gap-1.5">
                <Dumbbell className="w-3 h-3 text-[#00D4FF]" />
                Press de Banca Plano
              </div>
              <div className="absolute bottom-2.5 right-2.5 bg-[#09090B]/85 backdrop-blur-md border border-[#2B2B36] px-2.5 py-1 rounded-lg text-[10px] text-[#9CA3AF]">
                Pectoral Mayor & Tríceps
              </div>
            </div>

            {/* Registro de Cargas & Series */}
            <div className="bg-[#1C1C24] border border-[#2B2B36] rounded-2xl p-3 mb-3">
              <div className="flex items-center justify-between text-xs mb-2">
                <span className="text-[#9CA3AF] font-medium">Series Realizadas</span>
                <span className="text-[#00E676] font-bold">3 de 4 completadas</span>
              </div>
              <div className="grid grid-cols-4 gap-2 text-center text-xs">
                <div className="bg-[#14141A] border border-[#00E676]/40 text-[#00E676] py-1.5 rounded-lg font-bold">
                  ✓ 60 kg
                </div>
                <div className="bg-[#14141A] border border-[#00E676]/40 text-[#00E676] py-1.5 rounded-lg font-bold">
                  ✓ 65 kg
                </div>
                <div className="bg-[#14141A] border border-[#00E676]/40 text-[#00E676] py-1.5 rounded-lg font-bold">
                  ✓ 70 kg
                </div>
                <div className="bg-[#14141A] border border-dashed border-[#2B2B36] text-[#7A8090] py-1.5 rounded-lg">
                  70 kg ?
                </div>
              </div>
            </div>

            {/* Asistente IA Bubble */}
            <div className="bg-gradient-to-r from-[#6C5CFF]/15 to-[#00D4FF]/10 border border-[#6C5CFF]/30 rounded-2xl p-3 flex items-start gap-2.5">
              <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-[#6C5CFF] to-[#00D4FF] flex items-center justify-center text-white shrink-0 mt-0.5">
                <Sparkles className="w-4 h-4" />
              </div>
              <div className="text-xs">
                <p className="font-bold text-white">Entrenador Inteligente ASCEND</p>
                <p className="text-[#9CA3AF] text-[11px] mt-0.5 leading-snug">
                  &quot;Excelente progresión. Mantené los codos a 45° respecto al torso para proteger tus hombros en la última serie.&quot;
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================= */}
      {/* 4. PAPEL VS. ASCEND (TRANSFORMACIÓN BUSCADA) */}
      {/* ========================================================= */}
      <section id="transformacion" className="py-16 sm:py-24 px-4 bg-[#14141A]/50 border-y border-[#2B2B36]">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
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

          <div className="grid md:grid-cols-2 gap-6">
            {/* Card 1: La Hojita de Papel */}
            <div className="bg-[#14141A] border border-red-500/20 rounded-3xl p-6 sm:p-8 relative">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-xl bg-red-500/10 border border-red-500/30 flex items-center justify-center text-red-400">
                  <XCircle className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-display text-lg font-bold text-white">La Rutina Tradicional en Papel</h3>
                  <p className="text-xs text-red-400/80">Confusión y abandono a los 30 días</p>
                </div>
              </div>

              <ul className="space-y-3.5 text-sm text-[#9CA3AF]">
                <li className="flex items-start gap-2.5">
                  <span className="text-red-400 font-bold shrink-0">✕</span>
                  La hoja se moja, se arruga y se pierde a las dos semanas.
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="text-red-400 font-bold shrink-0">✕</span>
                  El alumno no entiende la letra o el nombre técnico del ejercicio.
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="text-red-400 font-bold shrink-0">✕</span>
                  El profesor de sala repite 50 veces por día cómo se usa la misma polea.
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="text-red-400 font-bold shrink-0">✕</span>
                  No hay registro de pesos: el alumno usa siempre la misma carga y se estanca.
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="text-red-400 font-bold shrink-0">✕</span>
                  Depende 100% de la motivación pasajera en vez de construir un proceso.
                </li>
              </ul>
            </div>

            {/* Card 2: ASCEND */}
            <div className="bg-gradient-to-b from-[#1C1C24] to-[#14141A] border border-[#6C5CFF]/40 rounded-3xl p-6 sm:p-8 relative shadow-xl shadow-[#6C5CFF]/10">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-xl bg-[#6C5CFF]/20 border border-[#6C5CFF]/40 flex items-center justify-center text-[#6C5CFF]">
                  <CheckCircle2 className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-display text-lg font-bold text-white">Con ASCEND en el Gimnasio</h3>
                  <p className="text-xs text-[#00E676]">Autonomía, aprendizaje y constancia</p>
                </div>
              </div>

              <ul className="space-y-3.5 text-sm text-[#F5F7FA]">
                <li className="flex items-start gap-2.5">
                  <span className="text-[#00E676] font-bold shrink-0">✓</span>
                  Animaciones 3D e infografías biomecánicas con la técnica precisa.
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="text-[#00E676] font-bold shrink-0">✓</span>
                  Sobrecarga progresiva: el alumno sabe exactamente qué peso le toca hoy.
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="text-[#00E676] font-bold shrink-0">✓</span>
                  Coach con IA que adapta ejercicios y resuelve dudas sin juzgar.
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="text-[#00E676] font-bold shrink-0">✓</span>
                  Evolución medible que convierte el entrenamiento en parte de su identidad.
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="text-[#00E676] font-bold shrink-0">✓</span>
                  Los profesores quedan libres para corregir técnica y conectar con la gente.
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================= */}
      {/* 5. TECNOLOGÍA PIONERA: ASISTENTE CON IA BIOMECÁNICA */}
      {/* ========================================================= */}
      <section id="ia-pionera" className="py-20 sm:py-28 px-4 bg-gradient-to-b from-[#09090B] via-[#0E0E14] to-[#09090B] relative overflow-hidden">
        {/* Glows ambientales violeta y cian */}
        <div className="absolute top-1/2 left-0 w-96 h-96 bg-[#6C5CFF]/10 rounded-full blur-[150px] pointer-events-none" />
        <div className="absolute top-1/2 right-0 w-96 h-96 bg-[#00D4FF]/10 rounded-full blur-[150px] pointer-events-none" />

        <div className="max-w-6xl mx-auto relative z-10">
          <div className="text-center mb-14">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#14141A] border border-[#6C5CFF]/40 text-xs font-bold text-[#00D4FF] mb-4 shadow-sm">
              <Sparkles className="w-3.5 h-3.5 text-[#00D4FF]" />
              TECNOLOGÍA PIONERA • GOOGLE GEMINI + PINECONE VECTOR DB
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

          {/* Grid de los 4 Superpoderes de la IA */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5 mb-14">
            {/* Superpoder 1 */}
            <div className="bg-[#14141A] border border-[#2B2B36] hover:border-[#6C5CFF]/60 rounded-2xl p-5 transition-all group">
              <div className="w-10 h-10 rounded-xl bg-[#6C5CFF]/15 border border-[#6C5CFF]/30 flex items-center justify-center text-[#6C5CFF] mb-4 group-hover:scale-105 transition-transform">
                <Database className="w-5 h-5 text-[#8B7DFF]" />
              </div>
              <h3 className="font-display font-bold text-base text-white mb-2">
                Function Calling en DB
              </h3>
              <p className="text-xs text-[#9CA3AF] leading-relaxed">
                Cuando el socio pide una rutina, la IA no responde con texto plano: <strong className="text-white">escribe y guarda la rutina directamente en la base de datos</strong> de su cuenta con ejercicios, series y descansos.
              </p>
            </div>

            {/* Superpoder 2 */}
            <div className="bg-[#14141A] border border-[#2B2B36] hover:border-[#00D4FF]/60 rounded-2xl p-5 transition-all group">
              <div className="w-10 h-10 rounded-xl bg-[#00D4FF]/15 border border-[#00D4FF]/30 flex items-center justify-center text-[#00D4FF] mb-4 group-hover:scale-105 transition-transform">
                <TrendingUp className="w-5 h-5 text-[#00D4FF]" />
              </div>
              <h3 className="font-display font-bold text-base text-white mb-2">
                Memoria de Cargas (PRs)
              </h3>
              <p className="text-xs text-[#9CA3AF] leading-relaxed">
                Conoce los récords históricos de cada socio. Calcula series al <strong className="text-white">75-80% del 1RM</strong> para garantizar sobrecarga progresiva sin fatiga excesiva ni riesgo de lesión.
              </p>
            </div>

            {/* Superpoder 3 */}
            <div className="bg-[#14141A] border border-[#2B2B36] hover:border-[#00E676]/60 rounded-2xl p-5 transition-all group">
              <div className="w-10 h-10 rounded-xl bg-[#00E676]/15 border border-[#00E676]/30 flex items-center justify-center text-[#00E676] mb-4 group-hover:scale-105 transition-transform">
                <ShieldCheck className="w-5 h-5 text-[#00E676]" />
              </div>
              <h3 className="font-display font-bold text-base text-white mb-2">
                Restricción a tu Inventario
              </h3>
              <p className="text-xs text-[#9CA3AF] leading-relaxed">
                Cero alucinaciones. La IA tiene <strong className="text-white">prohibido recomendar aparatos inexistentes</strong> en tu sala. Todo se adapta con precisión a las máquinas relevadas en tu gimnasio.
              </p>
            </div>

            {/* Superpoder 4 */}
            <div className="bg-[#14141A] border border-[#2B2B36] hover:border-purple-500/60 rounded-2xl p-5 transition-all group">
              <div className="w-10 h-10 rounded-xl bg-purple-500/15 border border-purple-500/30 flex items-center justify-center text-purple-400 mb-4 group-hover:scale-105 transition-transform">
                <Cpu className="w-5 h-5 text-purple-400" />
              </div>
              <h3 className="font-display font-bold text-base text-white mb-2">
                RAG Biomecánico + Visión
              </h3>
              <p className="text-xs text-[#9CA3AF] leading-relaxed">
                Conectado a bases vectoriales Pinecone con manuales de anatomía articular y capaz de procesar imágenes de comidas o posturas con visión multimodal.
              </p>
            </div>
          </div>

          {/* Simulador Interactivo de Casos Reales */}
          <div className="bg-[#14141A] border border-[#2B2B36] rounded-3xl p-6 sm:p-10 shadow-2xl relative">
            <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4 pb-6 border-b border-[#2B2B36] mb-6">
              <div>
                <span className="text-[11px] uppercase tracking-wider text-[#00D4FF] font-bold">
                  Simulador en Vivo de la Inteligencia Artificial
                </span>
                <h3 className="font-display text-xl sm:text-2xl font-bold text-white mt-0.5">
                  Mirá cómo resuelve dudas reales de tus alumnos
                </h3>
              </div>

              {/* Botones de Casos */}
              <div className="flex flex-wrap gap-2">
                {CASOS_IA.map((caso, idx) => {
                  const Icono = caso.icono
                  const activo = casoIA === idx
                  return (
                    <button
                      key={caso.id}
                      onClick={() => setCasoIA(idx)}
                      className={`inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-xl border transition-all ${
                        activo
                          ? "bg-[#6C5CFF] text-white border-[#6C5CFF] shadow-md shadow-[#6C5CFF]/30"
                          : "bg-[#1C1C24] text-[#9CA3AF] border-[#2B2B36] hover:text-white hover:border-[#6C5CFF]/40"
                      }`}
                    >
                      <Icono className="w-3.5 h-3.5" />
                      {caso.etiqueta}
                    </button>
                  )
                })}
              </div>
            </div>

            {/* Ventana de Conversación Interactiva */}
            <div className="bg-[#0D0D12] border border-[#2B2B36] rounded-2xl p-4 sm:p-6 space-y-4">
              {/* Mensaje del Alumno */}
              <div className="flex items-start gap-3 justify-end">
                <div className="bg-[#1C1C24] border border-[#2B2B36] text-white text-xs sm:text-sm px-4 py-3 rounded-2xl rounded-tr-none max-w-lg">
                  <p className="font-semibold text-[10px] text-[#9CA3AF] mb-1">Alumno en Sala</p>
                  {CASOS_IA[casoIA].pregunta}
                </div>
                <div className="w-8 h-8 rounded-full bg-[#2B2B36] flex items-center justify-center text-xs font-bold text-white shrink-0 mt-1">
                  A
                </div>
              </div>

              {/* Respuesta del Bot ASCEND */}
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#6C5CFF] to-[#00D4FF] flex items-center justify-center text-white shrink-0 mt-1 shadow-md shadow-[#6C5CFF]/30">
                  <Bot className="w-4 h-4 text-white" />
                </div>
                <div className="space-y-3 max-w-xl">
                  <div className="bg-[#14141A] border border-[#6C5CFF]/30 text-[#F5F7FA] text-xs sm:text-sm px-4 py-3.5 rounded-2xl rounded-tl-none">
                    <div className="flex items-center justify-between gap-2 mb-1.5">
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

                  {/* Tarjeta de Acción Técnica en Segundo Plano */}
                  <div className={`border rounded-xl p-3 text-xs ${CASOS_IA[casoIA].accionEspecial.color}`}>
                    <div className="flex items-center justify-between gap-2 mb-1">
                      <span className="font-bold flex items-center gap-1.5">
                        <Cpu className="w-3.5 h-3.5" />
                        {CASOS_IA[casoIA].accionEspecial.titulo}
                      </span>
                      <span className="font-extrabold text-[10px] px-2 py-0.5 rounded-md bg-black/30">
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
      {/* 6. LOS PILARES OFICIALES DE ASCEND */}
      {/* ========================================================= */}
      <section id="pilares" className="py-16 sm:py-24 px-4 bg-[#09090B]">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-14">
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

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {/* Pilar 1 */}
            <div className="bg-[#14141A] border border-[#2B2B36] rounded-2xl p-5 hover:border-[#6C5CFF]/60 transition-colors">
              <div className="w-10 h-10 rounded-xl bg-[#6C5CFF]/15 border border-[#6C5CFF]/30 flex items-center justify-center text-[#6C5CFF] mb-4">
                <Dumbbell className="w-5 h-5" />
              </div>
              <h3 className="font-display font-bold text-base text-white mb-2">
                Videos 3D de cada Máquina
              </h3>
              <p className="text-xs text-[#9CA3AF] leading-relaxed">
                Muestra de forma clara la biomecánica, las fases del movimiento y el músculo principal trabajado.
              </p>
            </div>

            {/* Pilar 2 */}
            <div className="bg-[#14141A] border border-[#2B2B36] rounded-2xl p-5 hover:border-[#00D4FF]/60 transition-colors">
              <div className="w-10 h-10 rounded-xl bg-[#00D4FF]/15 border border-[#00D4FF]/30 flex items-center justify-center text-[#00D4FF] mb-4">
                <Sparkles className="w-5 h-5" />
              </div>
              <h3 className="font-display font-bold text-base text-white mb-2">
                Mentor de Entrenamiento IA
              </h3>
              <p className="text-xs text-[#9CA3AF] leading-relaxed">
                Acompañamiento profesional y sereno. Adapta el plan ante imprevistos y responde con evidencia científica.
              </p>
            </div>

            {/* Pilar 3 */}
            <div className="bg-[#14141A] border border-[#2B2B36] rounded-2xl p-5 hover:border-[#6C5CFF]/60 transition-colors">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#6C5CFF]/20 to-[#00D4FF]/20 border border-[#6C5CFF]/40 flex items-center justify-center text-white mb-4">
                <TrendingUp className="w-5 h-5 text-[#00D4FF]" />
              </div>
              <h3 className="font-display font-bold text-base text-white mb-2">
                Evolución de Niveles
              </h3>
              <p className="text-xs text-[#9CA3AF] leading-relaxed">
                Un sistema de progreso que reconoce la constancia y celebra la regularidad sin generar culpas.
              </p>
            </div>

            {/* Pilar 4 */}
            <div className="bg-[#14141A] border border-[#2B2B36] rounded-2xl p-5 hover:border-[#00E676]/60 transition-colors">
              <div className="w-10 h-10 rounded-xl bg-[#00E676]/15 border border-[#00E676]/30 flex items-center justify-center text-[#00E676] mb-4">
                <WifiOff className="w-5 h-5" />
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
      {/* 6. PRECIOS & PROPUESTA PARA GIMNASIOS (B2B) */}
      {/* ========================================================= */}
      <section id="precios" className="py-16 sm:py-24 px-4 bg-[#14141A]/40 border-t border-[#2B2B36]">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-10">
            <span className="text-xs uppercase tracking-widest text-[#00E676] font-bold">
              Propuesta Comercial
            </span>
            <h2 className="font-display text-3xl sm:text-5xl font-extrabold mt-1 text-white">
              Planes para Gimnasios
            </h2>
            <p className="text-sm sm:text-base text-[#9CA3AF] mt-2">
              Un único valor fijo para toda tu sede. Sin comisiones por alumno ni costos ocultos.
            </p>

            {/* Precios Fijos y Transparentes */}
            <div className="inline-flex items-center gap-2 bg-[#14141A] border border-[#2B2B36] px-4 py-2 rounded-xl mt-6 text-xs text-[#9CA3AF]">
              <span className="w-2 h-2 rounded-full bg-[#00E676]" />
              Tarifa plana institucional • Sin costos por socio adicional
            </div>
          </div>

          {/* Tarjeta Principal de Precio */}
          <div className="bg-gradient-to-b from-[#1C1C24] to-[#14141A] border-2 border-[#6C5CFF] rounded-3xl p-6 sm:p-10 shadow-2xl shadow-[#6C5CFF]/15 relative">
            {/* Tag destacado oficial */}
            <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-gradient-to-r from-[#6C5CFF] to-[#00D4FF] text-white text-[11px] font-extrabold uppercase tracking-wider px-4 py-1 rounded-full shadow-md">
              14 Días de Piloto Gratis
            </div>

            <div className="flex flex-col md:flex-row items-center justify-between gap-6 pb-8 border-b border-[#2B2B36]">
              <div>
                <h3 className="font-display text-2xl font-extrabold text-white">
                  Plan Gimnasio Oficial
                </h3>
                <p className="text-xs sm:text-sm text-[#9CA3AF] mt-1">
                  Acceso completo para tu gimnasio, profesores de turno y todos tus alumnos.
                </p>
              </div>

              <div className="text-center md:text-right">
                <div className="flex items-baseline justify-center md:justify-end gap-1.5">
                  <span className="font-display text-4xl sm:text-5xl font-black text-white">
                    $100
                  </span>
                  <span className="text-sm font-semibold text-[#9CA3AF]">
                    USD / mes
                  </span>
                </div>
                <div className="inline-flex items-center gap-1.5 bg-[#09090B] border border-[#00E676]/30 px-3 py-1 rounded-full text-xs text-[#00E676] font-semibold mt-2">
                  <span>Plan Anual: <strong>$1.080 USD / año</strong> (10% OFF directo)</span>
                </div>
              </div>
            </div>

            {/* Aclaración destacada de modalidad de pago */}
            <div className="bg-[#0D0D12] border border-[#6C5CFF]/30 rounded-2xl p-4 my-6">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-xl bg-[#6C5CFF]/20 text-[#00D4FF] flex items-center justify-center shrink-0 mt-0.5">
                  <Zap className="w-4 h-4 text-[#00D4FF]" />
                </div>
                <div>
                  <p className="text-xs sm:text-sm font-bold text-white flex items-center gap-2">
                    Modalidad de Pago Simple y Transparente
                  </p>
                  <p className="text-xs text-[#9CA3AF] mt-1 leading-relaxed">
                    El valor de suscripción es de <strong className="text-white">100 USD mensuales</strong> (o 1.080 USD anuales). Podés abonarlo por <span className="text-white font-medium">transferencia a cuenta en dólares (USD)</span> o en <span className="text-[#00D4FF] font-semibold">pesos argentinos (ARS) cotizados al valor del dólar blue del día</span> de pago.
                  </p>
                </div>
              </div>
            </div>

            {/* Checklist de lo que incluye */}
            <div className="grid sm:grid-cols-2 gap-3.5 my-8 text-sm text-[#F5F7FA]">
              <div className="flex items-center gap-2.5">
                <Check className="w-4 h-4 text-[#00E676] shrink-0" />
                <span>Alumnos ilimitados en tu sede</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Check className="w-4 h-4 text-[#00E676] shrink-0" />
                <span>Relevamiento y carga del parque de máquinas</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Check className="w-4 h-4 text-[#00E676] shrink-0" />
                <span>Cartelería QR lista para el mostrador</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Check className="w-4 h-4 text-[#00E676] shrink-0" />
                <span>Radar de inactividad para retener socios</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Check className="w-4 h-4 text-[#00E676] shrink-0" />
                <span>Videos 3D anatómicos e infografías</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Check className="w-4 h-4 text-[#00E676] shrink-0" />
                <span>Asistente con IA biomecánica 24/7 en sala</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Check className="w-4 h-4 text-[#00E676] shrink-0" />
                <span>Modo 100% Offline (PWA) sin caídas de red</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Check className="w-4 h-4 text-[#00E676] shrink-0" />
                <span>Soporte técnico directo en toda la Argentina</span>
              </div>
            </div>

            {/* Botón WhatsApp de Cierre */}
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full inline-flex items-center justify-center gap-2 bg-gradient-to-r from-[#6C5CFF] to-[#00D4FF] hover:opacity-95 text-white font-bold text-base py-4 rounded-xl shadow-lg shadow-[#6C5CFF]/30 transition-all active:scale-[0.99]"
            >
              <MessageCircle className="w-5 h-5" />
              Comenzar Prueba de 14 Días sin Costo
            </a>

            <p className="text-center text-xs text-[#7A8090] mt-3">
              Instalación y relevamiento en 24 horas. Sin tarjetas ni compromisos.
            </p>
          </div>
        </div>
      </section>

      {/* ========================================================= */}
      {/* 7. CÓMO INSTALAR LA PWA (GUÍA ALUMNOS) */}
      {/* ========================================================= */}
      <section id="instalacion" className="py-16 sm:py-24 px-4 bg-[#09090B]">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-10">
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
            <div className="inline-flex items-center bg-[#14141A] border border-[#2B2B36] rounded-xl p-1 mt-6">
              <button
                onClick={() => setTabPlataforma("ios")}
                className={`text-xs font-bold px-4 py-2 rounded-lg transition-all ${
                  tabPlataforma === "ios"
                    ? "bg-[#6C5CFF] text-white"
                    : "text-[#7A8090] hover:text-white"
                }`}
              >
                iPhone (iOS / Safari)
              </button>
              <button
                onClick={() => setTabPlataforma("android")}
                className={`text-xs font-bold px-4 py-2 rounded-lg transition-all ${
                  tabPlataforma === "android"
                    ? "bg-[#6C5CFF] text-white"
                    : "text-[#7A8090] hover:text-white"
                }`}
              >
                Android (Chrome)
              </button>
            </div>
          </div>

          {/* Pasos según la plataforma */}
          <div className="bg-[#14141A] border border-[#2B2B36] rounded-3xl p-6 sm:p-8">
            {tabPlataforma === "ios" ? (
              <div className="space-y-4">
                <div className="flex items-start gap-4 p-3.5 bg-[#1C1C24] rounded-2xl border border-[#2B2B36]">
                  <div className="w-8 h-8 rounded-xl bg-[#6C5CFF]/20 text-[#6C5CFF] font-bold flex items-center justify-center shrink-0">
                    1
                  </div>
                  <div className="text-sm">
                    <p className="font-bold text-white">Abrí ascend.com.ar en Safari</p>
                    <p className="text-xs text-[#9CA3AF] mt-0.5">
                      Escaneá el cartel QR del mostrador con la cámara de tu iPhone.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4 p-3.5 bg-[#1C1C24] rounded-2xl border border-[#2B2B36]">
                  <div className="w-8 h-8 rounded-xl bg-[#6C5CFF]/20 text-[#6C5CFF] font-bold flex items-center justify-center shrink-0">
                    <Share2 className="w-4 h-4" />
                  </div>
                  <div className="text-sm">
                    <p className="font-bold text-white">Tocá el botón Compartir</p>
                    <p className="text-xs text-[#9CA3AF] mt-0.5">
                      Es el ícono con un cuadrado y una flecha hacia arriba en la barra inferior de Safari.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4 p-3.5 bg-[#1C1C24] rounded-2xl border border-[#2B2B36]">
                  <div className="w-8 h-8 rounded-xl bg-[#6C5CFF]/20 text-[#6C5CFF] font-bold flex items-center justify-center shrink-0">
                    <PlusSquare className="w-4 h-4" />
                  </div>
                  <div className="text-sm">
                    <p className="font-bold text-white">Elegí &quot;Agregar a pantalla de inicio&quot;</p>
                    <p className="text-xs text-[#9CA3AF] mt-0.5">
                      ¡Listo! Te queda el icono de ASCEND en tu pantalla como cualquier app.
                    </p>
                  </div>
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="flex items-start gap-4 p-3.5 bg-[#1C1C24] rounded-2xl border border-[#2B2B36]">
                  <div className="w-8 h-8 rounded-xl bg-[#6C5CFF]/20 text-[#6C5CFF] font-bold flex items-center justify-center shrink-0">
                    1
                  </div>
                  <div className="text-sm">
                    <p className="font-bold text-white">Abrí ascend.com.ar en Chrome</p>
                    <p className="text-xs text-[#9CA3AF] mt-0.5">
                      Escaneá el cartel QR de la recepción o entrá desde el navegador.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4 p-3.5 bg-[#1C1C24] rounded-2xl border border-[#2B2B36]">
                  <div className="w-8 h-8 rounded-xl bg-[#6C5CFF]/20 text-[#6C5CFF] font-bold flex items-center justify-center shrink-0">
                    2
                  </div>
                  <div className="text-sm">
                    <p className="font-bold text-white">Tocá el aviso &quot;Instalar App&quot;</p>
                    <p className="text-xs text-[#9CA3AF] mt-0.5">
                      Aparece automáticamente abajo en la pantalla al ingresar.
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* ========================================================= */}
      {/* 8. FOOTER */}
      {/* ========================================================= */}
      <footer className="border-t border-[#2B2B36] bg-[#09090B] py-12 px-4 text-xs text-[#7A8090]">
        <div className="max-w-5xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <div className="relative w-7 h-7">
              <Image src="/logo-ascend.png" alt="ASCEND" fill className="object-contain" />
            </div>
            <span className="font-display font-bold text-sm text-white">ASCEND</span>
            <span>— Entrená. Progresá. Ascendé.</span>
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
            <Link href="/dashboard" className="text-white hover:text-[#6C5CFF] transition-colors font-medium">
              Acceso Alumnos
            </Link>
          </div>
        </div>

        <div className="max-w-5xl mx-auto text-center sm:text-left mt-8 pt-6 border-t border-[#2B2B36]/60 text-[11px]">
          © {new Date().getFullYear()} ASCEND. Todos los derechos reservados. Argentina.
        </div>
      </footer>
    </div>
  )
}