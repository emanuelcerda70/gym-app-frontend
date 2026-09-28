"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@clerk/nextjs"
import Link from "next/link"
import Image from "next/image"
import {
  Flame,
  Sparkles,
  Smartphone,
  ShieldCheck,
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
  HelpCircle,
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

  // Enlace directo a WhatsApp de prospección
  const whatsappUrl =
    "https://wa.me/5492994017688?text=" +
    encodeURIComponent(
      "Hola Emanuel! Vi la web de ASCEND y quiero coordinar los 14 días de prueba gratis para mi gimnasio."
    )

  return (
    <div className="min-h-screen bg-[#09090B] text-[#F5F7FA] font-sans selection:bg-[#6C5CFF]/30 selection:text-white">
      {/* ========================================================= */}
      {/* 1. NAVBAR HEADER */}
      {/* ========================================================= */}
      <header className="sticky top-0 z-40 bg-[#09090B]/85 backdrop-blur-xl border-b border-[#2B2B36]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 group">
            <div className="relative w-9 h-9">
              <Image
                src="/icon.svg"
                alt="Logo ASCEND"
                fill
                className="object-contain transition-transform group-hover:scale-105"
                priority
              />
            </div>
            <span className="font-display font-extrabold text-xl tracking-wider text-white">
              ASCEND
            </span>
          </Link>

          {/* Enlaces Desktop */}
          <nav className="hidden md:flex items-center gap-8 text-sm text-[#9CA3AF]">
            <a href="#demo" className="hover:text-white transition-colors">
              La App
            </a>
            <a href="#problema" className="hover:text-white transition-colors">
              Papel vs App
            </a>
            <a href="#pilares" className="hover:text-white transition-colors">
              Características
            </a>
            <a href="#precios" className="hover:text-white transition-colors">
              Precios
            </a>
            <a href="#instalacion" className="hover:text-white transition-colors">
              Instalación
            </a>
          </nav>

          {/* Botón Ingresar */}
          <div className="flex items-center gap-3">
            <Link
              href="/dashboard"
              className="bg-[#1C1C22] border border-[#2B2B36] hover:border-[#6C5CFF]/60 hover:text-white text-xs sm:text-sm font-semibold px-4 py-2 rounded-xl transition-all active:scale-95"
            >
              Ingresar a la App
            </Link>
          </div>
        </div>
      </header>

      {/* ========================================================= */}
      {/* 2. HERO SECTION */}
      {/* ========================================================= */}
      <section className="relative pt-12 pb-16 sm:pt-20 sm:pb-24 px-4 overflow-hidden">
        {/* Glows de fondo */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-[#6C5CFF]/15 rounded-full blur-[140px] pointer-events-none" />
        <div className="absolute top-1/3 right-1/4 w-[300px] h-[300px] bg-[#FF4D00]/10 rounded-full blur-[120px] pointer-events-none" />

        <div className="max-w-4xl mx-auto text-center relative z-10">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#14141A] border border-[#2B2B36] text-xs font-semibold text-[#00D4FF] mb-6 shadow-inner">
            <span className="w-2 h-2 rounded-full bg-[#00D4FF] animate-pulse" />
            SISTEMA OPERATIVO PARA GIMNASIOS & ATLETAS
          </div>

          {/* Título Principal */}
          <h1 className="font-display text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-white leading-[1.1] mb-6">
            El fin de la rutina <br className="hidden sm:inline" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF4D00] via-[#FF7A1F] to-[#FFB300]">
              en papel
            </span>
          </h1>

          {/* Subtítulo */}
          <p className="text-base sm:text-xl text-[#9CA3AF] max-w-2xl mx-auto leading-relaxed mb-8">
            Reemplazá las hojitas arrugadas por una app en el celular con{" "}
            <span className="text-white font-medium">videos 3D de cada máquina</span>, sobrecarga progresiva y un{" "}
            <span className="text-white font-medium">coach con inteligencia artificial</span>. Tus alumnos nunca más se sienten perdidos.
          </p>

          {/* Botones de Acción */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3.5 sm:gap-4 mb-10">
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 bg-gradient-to-r from-[#6C5CFF] to-[#8B7DFF] hover:from-[#5C4CEF] hover:to-[#7A6DF0] text-white font-bold text-sm sm:text-base px-7 py-3.5 rounded-xl shadow-lg shadow-[#6C5CFF]/25 transition-all active:scale-[0.98]"
            >
              <MessageCircle className="w-5 h-5" />
              Solicitar Piloto de 14 Días Gratis
            </a>

            <a
              href="#demo"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-[#14141A] border border-[#2B2B36] hover:border-[#6C5CFF] text-[#F5F7FA] font-medium text-sm sm:text-base px-6 py-3.5 rounded-xl transition-all active:scale-[0.98]"
            >
              <Play className="w-4 h-4 text-[#00D4FF]" />
              Ver Demo de la App
            </a>
          </div>

          {/* Garantías / Sellos */}
          <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-xs text-[#7A8090]">
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-[#00E676]" /> 14 días sin costo ni tarjeta
            </span>
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-[#00E676]" /> Carga de máquinas incluida
            </span>
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-[#00E676]" /> Soporte presencial en el Alto Valle
            </span>
          </div>
        </div>
      </section>

      {/* ========================================================= */}
      {/* 3. SIMULADOR MÓVIL EN VIVO (MOCKUP INTERACTIVO) */}
      {/* ========================================================= */}
      <section id="demo" className="py-12 sm:py-20 px-4 bg-[#09090B]">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-10">
            <span className="text-xs uppercase tracking-widest text-[#6C5CFF] font-bold">
              Experiencia en Sala
            </span>
            <h2 className="font-display text-2xl sm:text-4xl font-extrabold mt-1 text-white">
              Así entrena un alumno con ASCEND
            </h2>
            <p className="text-sm text-[#9CA3AF] mt-2 max-w-lg mx-auto">
              Cada máquina tiene su animación 3D explicativa y el registro de cargas para no estancarse.
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
                  <p className="text-[10px] text-[#7A8090]">Lunes de Empuje (Pecho & Tríceps)</p>
                </div>
              </div>
              <div className="flex items-center gap-1 bg-[#1C1C22] border border-[#2B2B36] px-2.5 py-1 rounded-full text-xs font-bold text-[#FF7A1F]">
                <Flame className="w-3.5 h-3.5 fill-[#FF7A1F]" />
                18 días
              </div>
            </div>

            {/* Video 3D en Vivo */}
            <div className="relative rounded-2xl overflow-hidden bg-black border border-[#2B2B36] aspect-[9/10] mb-4">
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
            <div className="bg-[#1C1C22] border border-[#2B2B36] rounded-2xl p-3 mb-3">
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
              <div className="w-7 h-7 rounded-lg bg-[#6C5CFF] flex items-center justify-center text-white shrink-0 mt-0.5">
                <Sparkles className="w-4 h-4" />
              </div>
              <div className="text-xs">
                <p className="font-bold text-white">Súper Entrenador IA</p>
                <p className="text-[#9CA3AF] text-[11px] mt-0.5 leading-snug">
                  &quot;Excelente progresión. Mantené los codos a 45° respecto al torso para proteger tus hombros en la última serie.&quot;
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================= */}
      {/* 4. PAPEL VS. ASCEND (COMPARATIVA DE DOLOR) */}
      {/* ========================================================= */}
      <section id="problema" className="py-16 sm:py-24 px-4 bg-[#14141A]/50 border-y border-[#2B2B36]">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <span className="text-xs uppercase tracking-widest text-[#FF4D00] font-bold">
              La Realidad en el Salón
            </span>
            <h2 className="font-display text-3xl sm:text-5xl font-extrabold mt-1 text-white">
              ¿Por qué los alumnos abandonan el gimnasio?
            </h2>
            <p className="text-sm sm:text-base text-[#9CA3AF] mt-2 max-w-xl mx-auto">
              El 60% de los principiantes deja de ir en el segundo mes porque se sienten perdidos, no entienden las máquinas y no ven progreso.
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
                  <p className="text-xs text-red-400/80">Desorganización y deserción</p>
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
                  El profesor de sala gasta el 80% de su tiempo explicando siempre cómo se usa la misma máquina.
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="text-red-400 font-bold shrink-0">✕</span>
                  No hay registro de pesos: el alumno usa siempre la misma carga y se estanca.
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="text-red-400 font-bold shrink-0">✕</span>
                  Cero motivación cuando la disciplina decae.
                </li>
              </ul>
            </div>

            {/* Card 2: ASCEND */}
            <div className="bg-gradient-to-b from-[#1C1C22] to-[#14141A] border border-[#6C5CFF]/40 rounded-3xl p-6 sm:p-8 relative shadow-xl shadow-[#6C5CFF]/10">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-xl bg-[#6C5CFF]/20 border border-[#6C5CFF]/40 flex items-center justify-center text-[#6C5CFF]">
                  <CheckCircle2 className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-display text-lg font-bold text-white">Con ASCEND en el Gimnasio</h3>
                  <p className="text-xs text-[#00E676]">Autonomía, técnica y retención</p>
                </div>
              </div>

              <ul className="space-y-3.5 text-sm text-[#F5F7FA]">
                <li className="flex items-start gap-2.5">
                  <span className="text-[#00E676] font-bold shrink-0">✓</span>
                  Video 3D anatómico e infografía de cada máquina en un toque.
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="text-[#00E676] font-bold shrink-0">✓</span>
                  Registro instantáneo de kilos y repeticiones para ver la mejora semanal.
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="text-[#00E676] font-bold shrink-0">✓</span>
                  Entrenador con IA para responder dudas de postura y pesos sugeridos.
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="text-[#00E676] font-bold shrink-0">✓</span>
                  Rachas y mascota evolutiva que convierten el entrenamiento en un juego adictivo.
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="text-[#00E676] font-bold shrink-0">✓</span>
                  Tus profesores quedan libres para corregir postura y fidelizar a los clientes.
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================= */}
      {/* 5. LOS 4 PILARES DE ASCEND */}
      {/* ========================================================= */}
      <section id="pilares" className="py-16 sm:py-24 px-4 bg-[#09090B]">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-14">
            <span className="text-xs uppercase tracking-widest text-[#00D4FF] font-bold">
              Diseñada para la Sala de Musculación
            </span>
            <h2 className="font-display text-3xl sm:text-5xl font-extrabold mt-1 text-white">
              Tecnología que realmente se usa
            </h2>
            <p className="text-sm sm:text-base text-[#9CA3AF] mt-2 max-w-xl mx-auto">
              No es una planilla de Excel disfrazada de app. Es un sistema integral pensado para el sudor, el hierro y la constancia.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {/* Pilar 1 */}
            <div className="bg-[#14141A] border border-[#2B2B36] rounded-2xl p-5 hover:border-[#6C5CFF]/60 transition-colors">
              <div className="w-10 h-10 rounded-xl bg-[#6C5CFF]/15 border border-[#6C5CFF]/30 flex items-center justify-center text-[#6C5CFF] mb-4">
                <Dumbbell className="w-5 h-5" />
              </div>
              <h3 className="font-display font-bold text-base text-white mb-2">
                33+ Videos 3D de Máquinas
              </h3>
              <p className="text-xs text-[#9CA3AF] leading-relaxed">
                Animaciones anatómicas que muestran qué músculos trabajan y cuál es la técnica correcta.
              </p>
            </div>

            {/* Pilar 2 */}
            <div className="bg-[#14141A] border border-[#2B2B36] rounded-2xl p-5 hover:border-[#00D4FF]/60 transition-colors">
              <div className="w-10 h-10 rounded-xl bg-[#00D4FF]/15 border border-[#00D4FF]/30 flex items-center justify-center text-[#00D4FF] mb-4">
                <Sparkles className="w-5 h-5" />
              </div>
              <h3 className="font-display font-bold text-base text-white mb-2">
                Coach con Inteligencia Artificial
              </h3>
              <p className="text-xs text-[#9CA3AF] leading-relaxed">
                Basado en biomecánica y ciencia del entrenamiento. Responde dudas y adapta ejercicios al instante.
              </p>
            </div>

            {/* Pilar 3 */}
            <div className="bg-[#14141A] border border-[#2B2B36] rounded-2xl p-5 hover:border-[#FF4D00]/60 transition-colors">
              <div className="w-10 h-10 rounded-xl bg-[#FF4D00]/15 border border-[#FF4D00]/30 flex items-center justify-center text-[#FF7A1F] mb-4">
                <Flame className="w-5 h-5 fill-[#FF7A1F]" />
              </div>
              <h3 className="font-display font-bold text-base text-white mb-2">
                Gamificación y Rachas
              </h3>
              <p className="text-xs text-[#9CA3AF] leading-relaxed">
                Mascota evolutiva de nivel 1 a 100. El alumno compite contra sí mismo para no perder su fueguito.
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
                ¿Mala señal o sin WiFi en el galpón? La app guarda las series en el teléfono y sincroniza al salir.
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
              Inversión Transparente
            </span>
            <h2 className="font-display text-3xl sm:text-5xl font-extrabold mt-1 text-white">
              Planes para Gimnasios
            </h2>
            <p className="text-sm sm:text-base text-[#9CA3AF] mt-2">
              Un único valor fijo. Sin costos por cantidad de alumnos ni comisiones ocultas.
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
          <div className="bg-gradient-to-b from-[#1C1C22] to-[#14141A] border-2 border-[#6C5CFF] rounded-3xl p-6 sm:p-10 shadow-2xl shadow-[#6C5CFF]/15 relative">
            {/* Tag destacado */}
            <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-gradient-to-r from-[#FF4D00] to-[#FF7A1F] text-white text-[11px] font-extrabold uppercase tracking-wider px-4 py-1 rounded-full shadow-md">
              14 Días de Prueba Gratis
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
                <span>Carga y relevamiento de tus máquinas</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Check className="w-4 h-4 text-[#00E676] shrink-0" />
                <span>Carteles QR listos para recepción y sala</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Check className="w-4 h-4 text-[#00E676] shrink-0" />
                <span>Radar de alumnos inactivos (alerta de deserción)</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Check className="w-4 h-4 text-[#00E676] shrink-0" />
                <span>33 animaciones 3D y 15 infografías biomecánicas</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Check className="w-4 h-4 text-[#00E676] shrink-0" />
                <span>Soporte técnico directo en el Alto Valle</span>
              </div>
            </div>

            {/* Botón WhatsApp de Cierre */}
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full inline-flex items-center justify-center gap-2 bg-[#6C5CFF] hover:bg-[#5C4CEF] text-white font-bold text-base py-4 rounded-xl shadow-lg shadow-[#6C5CFF]/30 transition-all active:scale-[0.99]"
            >
              <MessageCircle className="w-5 h-5" />
              Comenzar Prueba de 14 Días sin Costo
            </a>

            <p className="text-center text-xs text-[#7A8090] mt-3">
              Te lo instalamos en 24 horas. Si al día 14 no convence a tus alumnos, no pagás nada.
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
              Cero Descargas Pesadas
            </span>
            <h2 className="font-display text-2xl sm:text-4xl font-extrabold mt-1 text-white">
              ¿Cómo la instalan los alumnos?
            </h2>
            <p className="text-sm text-[#9CA3AF] mt-2">
              ASCEND es una PWA (Progressive Web App): no ocupa memoria en el teléfono ni requiere descargar 200 MB de la tienda.
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
                <div className="flex items-start gap-4 p-3.5 bg-[#1C1C22] rounded-2xl border border-[#2B2B36]">
                  <div className="w-8 h-8 rounded-xl bg-[#6C5CFF]/20 text-[#6C5CFF] font-bold flex items-center justify-center shrink-0">
                    1
                  </div>
                  <div className="text-sm">
                    <p className="font-bold text-white">Abrí ascend.com.ar en Safari</p>
                    <p className="text-xs text-[#9CA3AF] mt-0.5">
                      Escaneá el código QR del mostrador con la cámara de tu iPhone.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4 p-3.5 bg-[#1C1C22] rounded-2xl border border-[#2B2B36]">
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

                <div className="flex items-start gap-4 p-3.5 bg-[#1C1C22] rounded-2xl border border-[#2B2B36]">
                  <div className="w-8 h-8 rounded-xl bg-[#6C5CFF]/20 text-[#6C5CFF] font-bold flex items-center justify-center shrink-0">
                    <PlusSquare className="w-4 h-4" />
                  </div>
                  <div className="text-sm">
                    <p className="font-bold text-white">Elegí &quot;Agregar a pantalla de inicio&quot;</p>
                    <p className="text-xs text-[#9CA3AF] mt-0.5">
                      ¡Listo! Te queda el icono de ASCEND en la pantalla como cualquier app.
                    </p>
                  </div>
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="flex items-start gap-4 p-3.5 bg-[#1C1C22] rounded-2xl border border-[#2B2B36]">
                  <div className="w-8 h-8 rounded-xl bg-[#6C5CFF]/20 text-[#6C5CFF] font-bold flex items-center justify-center shrink-0">
                    1
                  </div>
                  <div className="text-sm">
                    <p className="font-bold text-white">Abrí ascend.com.ar en Chrome</p>
                    <p className="text-xs text-[#9CA3AF] mt-0.5">
                      Escaneá el QR de la recepción o entrá desde el navegador.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4 p-3.5 bg-[#1C1C22] rounded-2xl border border-[#2B2B36]">
                  <div className="w-8 h-8 rounded-xl bg-[#6C5CFF]/20 text-[#6C5CFF] font-bold flex items-center justify-center shrink-0">
                    2
                  </div>
                  <div className="text-sm">
                    <p className="font-bold text-white">Tocá el botón flotante &quot;Instalar App&quot;</p>
                    <p className="text-xs text-[#9CA3AF] mt-0.5">
                      Aparece automáticamente abajo en la pantalla al ingresar a la web.
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
          <div className="flex items-center gap-2.5">
            <div className="relative w-7 h-7">
              <Image src="/icon.svg" alt="ASCEND" fill className="object-contain" />
            </div>
            <span className="font-display font-bold text-sm text-white">ASCEND</span>
            <span>— Tecnología de entrenamiento para el Alto Valle</span>
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