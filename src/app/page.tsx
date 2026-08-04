"use client"

import { useState } from "react"
import { useAuth } from "@/hooks/useAuth"
import Input from "@/components/ui/Input"

export default function AuthPage() {
  const { login, register, error } = useAuth()
  const [isAuthenticating, setIsAuthenticating] = useState(false)
  const [authMode, setAuthMode] = useState<"login" | "register">("login")
  const [nombre, setNombre] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [enviando, setEnviando] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email || !password) return
    if (authMode === "register" && !nombre) return
    setEnviando(true)
    try {
      if (authMode === "register") await register(nombre, email, password)
      else await login(email, password)
    } finally {
      setEnviando(false)
    }
  }

  return (
    <div className="h-screen w-full relative overflow-hidden bg-black">
      {/* Fondo de montaña */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/bg-onboarding.jpg"
        alt=""
        className="absolute inset-0 w-full h-full object-cover"
      />

      {/* Overlay con blur transicional */}
      <div
        className={`absolute inset-0 transition-all duration-500 z-10 ${
          isAuthenticating
            ? "backdrop-blur-xl bg-black/50"
            : "backdrop-blur-none bg-black/20"
        }`}
      />

      {!isAuthenticating ? (
        /* -------- Vista 1: Onboarding Limpio -------- */
        <div className="relative z-20 h-full flex flex-col items-center justify-between py-16 px-6">
          <div className="flex flex-col items-center pt-10">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/logo-ascend.png"
              alt="ASCEND"
              className="h-12 w-auto"
            />
          </div>

          <div className="flex flex-col items-center text-center">
            <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">
              Tu camino empieza aquí
            </h1>
            <p className="text-gray-300 text-lg mb-8">
              Entrenamiento inteligente, hecho para vos.
            </p>
            <button
              onClick={() => setIsAuthenticating(true)}
              className="bg-gradient-to-r from-[#6C5CFF] to-[#00D4FF] text-white font-semibold py-4 px-8 rounded-full shadow-lg w-full max-w-xs active:scale-[0.98] transition-transform"
            >
              Comenzar
            </button>
          </div>

          <div className="h-10" />
        </div>
      ) : (
        /* -------- Vista 2: Formulario Glassmorphism -------- */
        <div className="relative z-20 h-full flex items-center justify-center px-4">
          <button
            onClick={() => setIsAuthenticating(false)}
            aria-label="Volver"
            className="absolute top-6 left-6 w-10 h-10 rounded-full bg-white/10 border border-white/20 text-white text-lg flex items-center justify-center hover:bg-white/20 transition-colors"
          >
            ✕
          </button>

          <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-3xl p-8 max-w-md w-full shadow-2xl animate-fade-in">
            <div className="flex flex-col items-center mb-6">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/logo-ascend.png"
                alt="ASCEND"
                className="h-9 w-auto mb-3"
              />
              <h2 className="text-xl font-bold text-white">
                {authMode === "login" ? "Bienvenido de vuelta" : "Creá tu cuenta"}
              </h2>
            </div>

            {error && (
              <div className="bg-red-500/20 border border-red-500/40 text-red-200 text-xs px-3 py-2 rounded-md mb-4">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-3">
              {authMode === "register" && (
                <input
                  type="text"
                  placeholder="Nombre"
                  value={nombre}
                  onChange={(e) => setNombre(e.target.value)}
                  required
                  className="w-full bg-white/10 border border-white/25 rounded-lg px-3 py-2.5 text-sm text-white placeholder-white/50 outline-none focus:border-[#6C5CFF] focus:ring-2 focus:ring-[#6C5CFF]/30 transition-all"
                />
              )}
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full bg-white/10 border border-white/25 rounded-lg px-3 py-2.5 text-sm text-white placeholder-white/50 outline-none focus:border-[#6C5CFF] focus:ring-2 focus:ring-[#6C5CFF]/30 transition-all"
              />
              <input
                type="password"
                placeholder="Contraseña"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full bg-white/10 border border-white/25 rounded-lg px-3 py-2.5 text-sm text-white placeholder-white/50 outline-none focus:border-[#6C5CFF] focus:ring-2 focus:ring-[#6C5CFF]/30 transition-all"
              />
              <button
                type="submit"
                disabled={enviando}
                className="w-full bg-gradient-to-r from-[#6C5CFF] to-[#00D4FF] text-white font-semibold py-3.5 rounded-full shadow-lg active:scale-[0.98] transition-transform disabled:opacity-50"
              >
                {enviando
                  ? "..."
                  : authMode === "login"
                    ? "Ingresar"
                    : "Crear cuenta"}
              </button>
            </form>

            <p className="text-xs text-white/60 mt-6 text-center">
              {authMode === "login" ? "¿No tenés cuenta?" : "¿Ya tenés cuenta?"}{" "}
              <button
                onClick={() =>
                  setAuthMode(authMode === "login" ? "register" : "login")
                }
                className="text-[#8B7DFF] font-bold underline underline-offset-2"
              >
                {authMode === "login" ? "Registrate" : "Ingresá"}
              </button>
            </p>
          </div>
        </div>
      )}
    </div>
  )
}
