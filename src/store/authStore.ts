import { create } from "zustand"

interface AuthState {
  token: string | null
  usuarioId: number | null
  nombre: string | null
  setAuth: (token: string, usuarioId: number, nombre: string) => void
  logout: () => void
  isAuthenticated: () => boolean
}

export const useAuthStore = create<AuthState>((set, get) => ({
  token: typeof window !== "undefined" ? localStorage.getItem("gym_token") : null,
  usuarioId: typeof window !== "undefined" ? Number(localStorage.getItem("gym_user_id")) || null : null,
  nombre: typeof window !== "undefined" ? localStorage.getItem("gym_user_name") : null,

  setAuth: (token, usuarioId, nombre) => {
    localStorage.setItem("gym_token", token)
    localStorage.setItem("gym_user_id", String(usuarioId))
    localStorage.setItem("gym_user_name", nombre)
    set({ token, usuarioId, nombre })
  },

  logout: () => {
    localStorage.removeItem("gym_token")
    localStorage.removeItem("gym_user_id")
    localStorage.removeItem("gym_user_name")
    set({ token: null, usuarioId: null, nombre: null })
  },

  isAuthenticated: () => get().token !== null,
}))
