"use client"

import Link from "next/link"
import { useRouter } from "next/navigation"
import { useClerk, useUser } from "@clerk/nextjs"
import {
  Dumbbell,
  Flame,
  LogOut,
  Pencil,
  Salad,
  Target,
  User,
  Weight,
} from "lucide-react"
import { usePerfil } from "@/hooks/usePerfil"
import { useAuthStore } from "@/store/authStore"

const OBJETIVO_LABEL: Record<string, string> = {
  ganar_musculo_fuerza: "Ganar masa muscular",
  perder_peso: "Perder grasa corporal",
  salud_agilidad: "Salud",
}

const NIVEL_LABEL: Record<string, string> = {
  principiante: "Principiante",
  intermedio: "Intermedio",
  avanzado: "Avanzado",
}

const PRESUPUESTO_LABEL: Record<string, string> = {
  bajo: "Económico",
  medio: "Práctico",
  alto: "Elaborado",
}

function Fila({ label, valor }: { label: string; valor: string }) {
  return (
    <div className="flex items-center justify-between py-2.5 border-b border-hierro-border last:border-0">
      <span className="font-sans text-sm text-ceniza">{label}</span>
      <span className="font-sans text-sm font-semibold text-hueso text-right">{valor}</span>
    </div>
  )
}

export default function PerfilPage() {
  const router = useRouter()
  const { user } = useUser()
  const { signOut } = useClerk()
  const logout = useAuthStore((s) => s.logout)
  const { perfil, isLoading } = usePerfil()

  const cerrarSesion = async () => {
    logout()
    try {
      await signOut({ redirectUrl: "/sign-in" })
    } catch {
      router.push("/sign-in")
    }
  }

  const nombre = perfil?.nombre || user?.firstName || "Atleta"
  const email = user?.emailAddresses?.[0]?.emailAddress || perfil?.email || ""

  return (
    <main className="px-6 pb-28 pt-6">
      <h1 className="font-display text-2xl font-bold text-text-primary mb-6">Mi Perfil</h1>

      {/* Tarjeta del usuario */}
      <section className="rounded-2xl bg-hierro border border-hierro-border p-6 flex items-center gap-4">
        <div className="w-16 h-16 rounded-full bg-gradient-to-r from-primary to-secondary flex items-center justify-center text-hueso shrink-0 overflow-hidden">
          <User className="w-8 h-8" />
        </div>
        <div className="min-w-0">
          <h2 className="font-display text-xl font-bold text-text-primary truncate">{nombre}</h2>
          <p className="font-sans text-sm text-ceniza truncate">{email}</p>
        </div>
      </section>

      {/* Fuerza / Racha */}
      <section className="mt-4 grid grid-cols-2 gap-4">
        <div className="bg-hierro rounded-2xl p-4 border border-hierro-border">
          <Dumbbell className="w-5 h-5 text-primary mb-3" />
          <p className="label-caps">Nivel</p>
          <p className="font-display text-2xl font-bold text-text-primary mt-1">
            {isLoading ? "--" : perfil?.nivel ? NIVEL_LABEL[perfil.nivel] : "Sin definir"}
          </p>
        </div>
        <div className="bg-hierro rounded-2xl p-4 border border-hierro-border">
          <Flame className="w-5 h-5 text-secondary mb-3" />
          <p className="label-caps">Racha actual</p>
          <p className="font-display text-2xl font-bold text-text-primary mt-1">
            {isLoading ? "--" : perfil?.racha_actual_dias ?? 0}{" "}
            <span className="font-sans text-sm text-ceniza">días</span>
          </p>
        </div>
      </section>

      {/* Objetivo */}
      <section className="mt-4 rounded-2xl bg-hierro border border-hierro-border p-5">
        <div className="flex items-center gap-2 mb-1">
          <Target className="w-4 h-4 text-primary" />
          <p className="label-caps">Objetivo y plan</p>
        </div>
        <Fila
          label="Objetivo"
          valor={isLoading ? "--" : perfil?.objetivo ? OBJETIVO_LABEL[perfil.objetivo] : "Sin definir"}
        />
        <Fila
          label="Días por semana"
          valor={isLoading ? "--" : perfil?.dias_disponibles ? `${perfil.dias_disponibles} días` : "Sin definir"}
        />
        <Fila label="Presupuesto de comida" valor={isLoading ? "--" : perfil?.presupuesto_comida ? PRESUPUESTO_LABEL[perfil.presupuesto_comida] : "Sin definir"} />
      </section>

      {/* Físico */}
      <section className="mt-4 rounded-2xl bg-hierro border border-hierro-border p-5">
        <div className="flex items-center gap-2 mb-1">
          <Weight className="w-4 h-4 text-primary" />
          <p className="label-caps">Datos físicos</p>
        </div>
        <Fila label="Edad" valor={isLoading ? "--" : perfil?.edad ? `${perfil.edad} años` : "Sin definir"} />
        <Fila label="Peso" valor={isLoading ? "--" : perfil?.peso_kg ? `${perfil.peso_kg} kg` : "Sin definir"} />
        <Fila label="Altura" valor={isLoading ? "--" : perfil?.altura_cm ? `${perfil.altura_cm} cm` : "Sin definir"} />
      </section>

      {/* Nutrición */}
      <section className="mt-4 rounded-2xl bg-hierro border border-hierro-border p-5">
        <div className="flex items-center gap-2 mb-1">
          <Salad className="w-4 h-4 text-primary" />
          <p className="label-caps">Nutrición</p>
        </div>
        <Fila label="Comidas favoritas" valor={perfil?.comidas_favoritas || "No especificó"} />
        <Fila label="Evita" valor={perfil?.comidas_evitar || "Nada en particular"} />
      </section>

      {/* Editar perfil */}
      <Link
        href="/onboarding"
        className="mt-4 w-full bg-primary text-text-primary font-bold rounded-xl h-12 flex items-center justify-center gap-2 hover:bg-primary-hover transition-colors active:scale-[0.98]"
      >
        <Pencil className="w-4 h-4" />
        Editar mis datos
      </Link>

      {/* Logout nativo */}
      <button
        type="button"
        onClick={cerrarSesion}
        className="mt-3 w-full bg-hierro border border-hierro-border text-red-400 font-bold rounded-xl h-12 flex items-center justify-center gap-2 hover:border-red-400/40 transition-colors active:scale-[0.98]"
      >
        <LogOut className="w-4 h-4" />
        Cerrar sesión
      </button>
    </main>
  )
}