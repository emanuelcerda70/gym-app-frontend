"use client"

import { useState } from "react"
import { useAuth } from "@/hooks/useAuth"
import Button from "@/components/ui/Button"
import Input from "@/components/ui/Input"
import Badge from "@/components/ui/Badge"

export default function AuthPage() {
  const { login, register, error } = useAuth()
  const [esRegistro, setEsRegistro] = useState(false)
  const [nombre, setNombre] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email || !password) return
    if (esRegistro && !nombre) return
    if (esRegistro) {
      await register(nombre, email, password)
    } else {
      await login(email, password)
    }
  }

  return (
    <div className="flex items-center justify-center min-h-screen px-5 bg-surface">
      <div className="w-full max-w-sm bg-card-glass backdrop-blur-md border border-white/10 rounded-lg px-6 py-8 text-center animate-fade-in">
        <h1 className="text-2xl font-extrabold text-gradient mb-1">GYM APP</h1>
        <Badge className="mb-5">AI COACH</Badge>
        <p className="text-sm text-muted mb-6">Entrená con inteligencia artificial</p>

        {error && (
          <div className="bg-red-500/20 border border-red-500/30 text-red-400 text-xs px-3 py-2 rounded mb-4">
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
          <Button type="submit" fullWidth className="!py-3">
            {esRegistro ? "Crear cuenta" : "Ingresar"}
          </Button>
        </form>

        <p className="text-xs text-muted mt-5">
          {esRegistro ? "¿Ya tenés cuenta?" : "¿No tenés cuenta?"}{" "}
          <button
            onClick={() => setEsRegistro(!esRegistro)}
            className="text-emerald-400 font-semibold underline"
          >
            {esRegistro ? "Ingresá" : "Registrate"}
          </button>
        </p>
      </div>
    </div>
  )
}
