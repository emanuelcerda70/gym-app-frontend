"use client"

import { useRouter } from "next/navigation"
import { useAuthStore } from "@/store/authStore"
import { api } from "@/lib/api"
import { useState } from "react"

export function useAuth() {
  const router = useRouter()
  const { setAuth, logout, token, nombre, usuarioId } = useAuthStore()
  const [error, setError] = useState<string | null>(null)

  const login = async (email: string, password: string) => {
    setError(null)
    try {
      const data = await api.auth.login({ email, password })
      setAuth(data.access_token, data.usuario_id, data.nombre)
      router.push("/home")
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : "Error al iniciar sesión")
    }
  }

  const register = async (nombre: string, email: string, password: string) => {
    setError(null)
    try {
      const data = await api.auth.register({ nombre, email, password })
      setAuth(data.access_token, data.usuario_id, data.nombre)
      router.push("/onboarding")
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : "Error al registrarse")
    }
  }

  const cerrarSesion = () => {
    logout()
    router.push("/")
  }

  return { login, register, cerrarSesion, error, token, nombre, usuarioId }
}
 
