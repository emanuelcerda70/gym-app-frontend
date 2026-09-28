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
} from "lucide-react"

export default function HomePage() {
  const router = useRouter()
  const { isLoaded, isSignedIn } = useAuth()
  const [monedaUSD, setMonedaUSD] = useState(true)
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
          <nav className="hidden md:flex items-center gap-8 text-sm text-[#9CA3AF]">
            <a href="#experiencia" className="hover:text-white transition-colors">
              La Experiencia
            </a>
            <a href="#transformacion" className="hover:text-white transition-colors">
              Papel vs ASCEND
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
            <Compass className="w-3.5 h-3.5 text-[#00D4FF]" />
            DE LA INCERTIDUMBRE A LA AUTONOMÍA
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
            El sistema de acompañamiento inteligente que reemplaza las rutinas de papel por{" "}
            <span className="text-white font-medium">videos anatómicos 3D</span>, progresión real de cargas y un{" "}
            <span className="text-white font-medium">coach con inteligencia artificial</span>. Entrená. Progresá. Ascendé.
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
              <CheckCircle2 className="w-4 h-4 text-[#00E676]" /> Soporte presencial en el Alto Valle
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
                    Gimnasio Titán • Cipolletti
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
                src="/animaciones/press-banca.mp4"
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
      {/* 5. LOS 4 PILARES OFICIALES DE ASCEND */}
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
                33+ Videos 3D Anatómicos
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

            {/* Switch de Moneda */}
            <div className="inline-flex items-center bg-[#14141A] border border-[#2B2B36] rounded-xl p-1 mt-6">
              <button
                onClick={() => setMonedaUSD(true)}
                className={`text-xs font-bold px-3 py-1.5 rounded-lg transition-all ${
                  monedaUSD ? "bg-[#6C5CFF] text-white shadow-sm" : "text-[#7A8090] hover:text-white"
                }`}
              >
                Dólares (USD)
              </button>
              <button
                onClick={() => setMonedaUSD(false)}
                className={`text-xs font-bold px-3 py-1.5 rounded-lg transition-all ${
                  !monedaUSD ? "bg-[#6C5CFF] text-white shadow-sm" : "text-[#7A8090] hover:text-white"
                }`}
              >
                Pesos Argentinos (ARS)
              </button>
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
                  Acceso completo para tu gimnasio, profesores y todos tus alumnos.
                </p>
              </div>

              <div className="text-center md:text-right">
                <div className="flex items-baseline justify-center md:justify-end gap-1.5">
                  <span className="font-display text-4xl sm:text-5xl font-black text-white">
                    {monedaUSD ? "$100" : "$140.000"}
                  </span>
                  <span className="text-sm font-semibold text-[#9CA3AF]">
                    {monedaUSD ? "USD / mes" : "ARS / mes"}
                  </span>
                </div>
                <p className="text-xs text-[#00E676] font-medium mt-1">
                  O {monedaUSD ? "$1.080 USD / año" : "anual con 10% de descuento"}
                </p>
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
                <span>Relevamiento y carga de tus máquinas</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Check className="w-4 h-4 text-[#00E676] shrink-0" />
                <span>Cartelería QR lista para recepción</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Check className="w-4 h-4 text-[#00E676] shrink-0" />
                <span>Radar de inactividad de alumnos</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Check className="w-4 h-4 text-[#00E676] shrink-0" />
                <span>Catálogo de 33 videos 3D e infografías</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Check className="w-4 h-4 text-[#00E676] shrink-0" />
                <span>Soporte presencial en el Alto Valle</span>
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
              Instalación y puesta en marcha en 24 horas. Sin tarjetas ni compromisos.
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
          © {new Date().getFullYear()} ASCEND. Todos los derechos reservados. Cipolletti, Río Negro, Argentina.
        </div>
      </footer>
    </div>
  )
}