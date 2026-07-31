"use client"

import { useState } from "react"
import { useAuth } from "@/hooks/useAuth"
import Button from "@/components/ui/Button"
import Input from "@/components/ui/Input"
import Fueguito from "@/components/ui/Fueguito"

export default function AuthPage() {
  const { login, register, error } = useAuth()
  const [esRegistro, setEsRegistro] = useState(false)
  const [nombre, setNombre] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [enviando, setEnviando] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email || !password) return
    if (esRegistro && !nombre) return
    setEnviando(true)
    try {
      if (esRegistro) await register(nombre, email, password)
      else await login(email, password)
    } finally {
      setEnviando(false)
    }
  }

  return (
    <div className="flex items-center justify-center min-h-screen px-5 bg-carbon">
      <div className="w-full max-w-sm animate-fade-in">
        {/* Branding */}
        <div className="flex flex-col items-center mb-8">
          <Fueguito racha={3} size={56} className="mb-4" />
          <div className="flex items-baseline gap-1">
            <span className="font-display-expanded text-3xl tracking-tight">Gym App</span>
            <span className="w-1.5 h-1.5 rounded-full bg-ember inline-block" />
          </div>
          <p className="text-xs text-ceniza mt-2">Tu Súper Entrenador IA</p>
        </div>

        {error && (
          <div className="bg-red-500/10 border border-red-500/30 text-red-400 text-xs px-3 py-2 rounded-md mb-4">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-3">
          {esRegistro && (
            <Input
              placeholder="Nombre"
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
              required
            />
          )}
          <Input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <Input
            type="password"
            placeholder="Contraseña"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <Button type="submit" fullWidth className="!py-3.5" disabled={enviando}>
            {enviando ? "..." : esRegistro ? "Crear cuenta" : "Ingresar"}
          </Button>
        </form>

        <p className="text-xs text-ceniza mt-6 text-center">
          {esRegistro ? "¿Ya tenés cuenta?" : "¿No tenés cuenta?"}{" "}
          <button
            onClick={() => setEsRegistro(!esRegistro)}
            className="text-ember-soft font-bold underline underline-offset-2"
          >
            {esRegistro ? "Ingresá" : "Registrate"}
          </button>
        </p>
      </div>
    </div>
  )
}
 
