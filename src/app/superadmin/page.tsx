"use client"

import { useState } from "react"
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import { api } from "@/lib/api"
import { usePerfil } from "@/hooks/usePerfil"
import Link from "next/link"
import { useRouter } from "next/navigation"
import {
  Crown,
  Users,
  UserCheck,
  Clock,
  UserX,
  Search,
  ExternalLink,
  ArrowLeft,
  CalendarPlus,
  Ban,
  Trash2,
  RefreshCw,
  Sparkles,
  Building2,
  AlertTriangle,
  CheckCircle,
} from "lucide-react"
import type { UsuarioAdmin } from "@/types"

export default function SuperAdminPage() {
  const router = useRouter()
  const queryClient = useQueryClient()
  const { perfil, isLoading: perfilLoading } = usePerfil()

  const [busqueda, setBusqueda] = useState("")
  const [filtroEstado, setFiltroEstado] = useState<"todos" | "activo" | "prueba" | "inactivo">("todos")
  const [usuarioAEliminar, setUsuarioAEliminar] = useState<UsuarioAdmin | null>(null)
  const [notificacion, setNotificacion] = useState<{ texto: string; tipo: "success" | "error" } | null>(null)

  const mostrarNotif = (texto: string, tipo: "success" | "error" = "success") => {
    setNotificacion({ texto, tipo })
    setTimeout(() => setNotificacion(null), 4000)
  }

  // 1. Obtener métricas
  const { data: metricas, isLoading: metricasLoading, refetch: refetchMetricas } = useQuery({
    queryKey: ["admin", "metricas"],
    queryFn: api.admin.metricas,
    enabled: !!perfil?.es_admin || perfil?.email === "emanuelcerda70@gmail.com",
    refetchInterval: 15000,
  })

  // 2. Obtener lista de usuarios
  const { data: usuarios = [], isLoading: usuariosLoading, refetch: refetchUsuarios } = useQuery({
    queryKey: ["admin", "usuarios"],
    queryFn: api.admin.usuarios,
    enabled: !!perfil?.es_admin || perfil?.email === "emanuelcerda70@gmail.com",
    refetchInterval: 15000,
  })

  // Mutaciones de acción rápida
  const activarMutation = useMutation({
    mutationFn: ({ id, dias }: { id: number; dias: number }) => api.admin.activar(id, dias),
    onSuccess: (data) => {
      mostrarNotif(data.mensaje, "success")
      queryClient.invalidateQueries({ queryKey: ["admin"] })
    },
    onError: (err: any) => {
      mostrarNotif(err.message || "Error al activar usuario", "error")
    },
  })

  const suspenderMutation = useMutation({
    mutationFn: (id: number) => api.admin.suspender(id),
    onSuccess: (data) => {
      mostrarNotif(data.mensaje, "success")
      queryClient.invalidateQueries({ queryKey: ["admin"] })
    },
    onError: (err: any) => {
      mostrarNotif(err.message || "Error al suspender usuario", "error")
    },
  })

  const eliminarMutation = useMutation({
    mutationFn: (id: number) => api.admin.eliminar(id),
    onSuccess: (data) => {
      mostrarNotif(data.mensaje, "success")
      setUsuarioAEliminar(null)
      queryClient.invalidateQueries({ queryKey: ["admin"] })
    },
    onError: (err: any) => {
      mostrarNotif(err.message || "Error al eliminar usuario", "error")
    },
  })

  // Verificación de seguridad: solo Emanuel / Superadmin
  if (perfilLoading) {
    return (
      <div className="min-h-screen bg-[#09090B] flex flex-col items-center justify-center p-4">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/logo-ascend.png" alt="ASCEND" className="w-14 h-14 animate-pulse mb-3" />
        <p className="text-xs uppercase tracking-widest text-[#7A8090] font-bold">
          Verificando credenciales Superadmin...
        </p>
      </div>
    )
  }

  const esSuperAdmin =
    perfil?.es_admin ||
    perfil?.rol === "admin" ||
    (perfil?.email && perfil.email.toLowerCase() === "emanuelcerda70@gmail.com")

  if (!esSuperAdmin) {
    return (
      <div className="min-h-screen bg-[#09090B] text-[#F5F7FA] flex flex-col items-center justify-center p-4">
        <div className="max-w-md w-full bg-[#14141A] border border-red-500/40 rounded-3xl p-6 text-center shadow-2xl">
          <Ban className="w-12 h-12 text-red-400 mx-auto mb-3" />
          <h1 className="text-xl font-extrabold text-white">Acceso Restringido</h1>
          <p className="text-xs text-[#9CA3AF] mt-2">
            Este panel es exclusivo para el Superadmin de ASCEND (Emanuel Cerda).
          </p>
          <button
            onClick={() => router.push("/dashboard")}
            className="mt-5 w-full bg-[#6C5CFF] hover:bg-[#5848E5] text-white text-xs font-bold py-2.5 rounded-xl transition-all"
          >
            ← Volver a mi entrenamiento
          </button>
        </div>
      </div>
    )
  }

  // Filtrado de usuarios
  const usuariosFiltrados = usuarios.filter((u) => {
    const coincideTexto =
      u.nombre.toLowerCase().includes(busqueda.toLowerCase()) ||
      u.email.toLowerCase().includes(busqueda.toLowerCase()) ||
      (u.gimnasio_nombre && u.gimnasio_nombre.toLowerCase().includes(busqueda.toLowerCase()))

    if (!coincideTexto) return false
    if (filtroEstado === "todos") return true
    return u.estado_suscripcion === filtroEstado
  })

  return (
    <main className="min-h-screen bg-[#09090B] text-[#F5F7FA] pb-16">
      {/* Toast de Notificaciones */}
      {notificacion && (
        <div
          className={`fixed top-4 right-4 z-50 px-4 py-3 rounded-2xl border shadow-2xl text-xs font-bold flex items-center gap-2 backdrop-blur-xl transition-all animate-in fade-in slide-in-from-top-2 ${
            notificacion.tipo === "success"
              ? "bg-[#00E676]/20 border-[#00E676]/60 text-white"
              : "bg-red-500/20 border-red-500/60 text-white"
          }`}
        >
          {notificacion.tipo === "success" ? (
            <CheckCircle className="w-4 h-4 text-[#00E676]" />
          ) : (
            <AlertTriangle className="w-4 h-4 text-red-400" />
          )}
          <span>{notificacion.texto}</span>
        </div>
      )}

      {/* Header Superior */}
      <header className="border-b border-[#2B2B36] bg-[#14141A]/80 backdrop-blur-xl sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="flex items-center gap-3">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/logo-ascend.png" alt="ASCEND" className="w-9 h-9 object-contain" />
            <div>
              <div className="flex items-center gap-2">
                <h1 className="font-display text-lg font-black tracking-tight text-white">
                  ASCEND SuperAdmin
                </h1>
                <span className="inline-flex items-center gap-1 bg-[#6C5CFF]/20 border border-[#6C5CFF]/40 text-[#8B7DFF] text-[10px] font-black uppercase px-2 py-0.5 rounded-full">
                  <Crown className="w-3 h-3 text-[#00D4FF]" />
                  Root
                </span>
              </div>
              <p className="text-[11px] text-[#7A8090]">
                Control Maestro de Suscripciones & Atletas · {perfil?.email}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                refetchMetricas()
                refetchUsuarios()
                mostrarNotif("Datos actualizados en tiempo real")
              }}
              title="Refrescar datos"
              className="p-2 rounded-xl bg-[#1C1C24] border border-[#2B2B36] hover:border-[#6C5CFF] text-[#9CA3AF] hover:text-white transition-all"
            >
              <RefreshCw className="w-4 h-4" />
            </button>

            <a
              href="https://dashboard.clerk.com/apps"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-[#1C1C24] border border-[#2B2B36] hover:border-[#6C5CFF] text-xs font-bold text-[#00D4FF] hover:text-white transition-all"
            >
              <span>Clerk Auth</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>

            <Link
              href="/dashboard"
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-[#6C5CFF] hover:bg-[#5848E5] text-xs font-bold text-white transition-all shadow-md shadow-[#6C5CFF]/20"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Ir a la App</span>
            </Link>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-6 space-y-6">
        {/* Tarjetas de Métricas */}
        <section className="grid grid-cols-2 lg:grid-cols-5 gap-3.5">
          <div className="bg-[#14141A] border border-[#2B2B36] rounded-2xl p-4">
            <div className="flex items-center justify-between text-[#7A8090]">
              <span className="text-[11px] font-bold uppercase tracking-wider">Total Atletas</span>
              <Users className="w-4 h-4 text-[#00D4FF]" />
            </div>
            <p className="text-2xl font-black text-white mt-1 font-mono">
              {metricas?.total_usuarios ?? 0}
            </p>
            <span className="text-[10px] text-[#7A8090]">Registrados en la plataforma</span>
          </div>

          <div className="bg-[#14141A] border border-[#00E676]/30 rounded-2xl p-4">
            <div className="flex items-center justify-between text-[#00E676]">
              <span className="text-[11px] font-bold uppercase tracking-wider">Activos (Pagos)</span>
              <UserCheck className="w-4 h-4 text-[#00E676]" />
            </div>
            <p className="text-2xl font-black text-[#00E676] mt-1 font-mono">
              {metricas?.activos ?? 0}
            </p>
            <span className="text-[10px] text-[#7A8090]">Suscripción al día ($10 USD)</span>
          </div>

          <div className="bg-[#14141A] border border-[#6C5CFF]/30 rounded-2xl p-4">
            <div className="flex items-center justify-between text-[#8B7DFF]">
              <span className="text-[11px] font-bold uppercase tracking-wider">En Prueba (14d)</span>
              <Clock className="w-4 h-4 text-[#00D4FF]" />
            </div>
            <p className="text-2xl font-black text-white mt-1 font-mono">
              {metricas?.en_prueba ?? 0}
            </p>
            <span className="text-[10px] text-[#7A8090]">Prueba activa sin cargo</span>
          </div>

          <div className="bg-[#14141A] border border-red-500/30 rounded-2xl p-4">
            <div className="flex items-center justify-between text-red-400">
              <span className="text-[11px] font-bold uppercase tracking-wider">Suspendidos / Vencidos</span>
              <UserX className="w-4 h-4 text-red-400" />
            </div>
            <p className="text-2xl font-black text-red-400 mt-1 font-mono">
              {metricas?.inactivos ?? 0}
            </p>
            <span className="text-[10px] text-[#7A8090]">Acceso bloqueado en app</span>
          </div>

          <div className="bg-[#14141A] border border-[#2B2B36] rounded-2xl p-4 col-span-2 lg:col-span-1">
            <div className="flex items-center justify-between text-[#7A8090]">
              <span className="text-[11px] font-bold uppercase tracking-wider">Gimnasios</span>
              <Building2 className="w-4 h-4 text-[#6C5CFF]" />
            </div>
            <p className="text-2xl font-black text-white mt-1 font-mono">
              {metricas?.total_gimnasios ?? 1}
            </p>
            <span className="text-[10px] text-[#7A8090]">Sedes B2B ($100 USD)</span>
          </div>
        </section>

        {/* Barra de Búsqueda y Filtros */}
        <section className="bg-[#14141A] border border-[#2B2B36] rounded-2xl p-4 flex flex-col md:flex-row gap-3 items-stretch md:items-center justify-between">
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-[#7A8090] absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={busqueda}
              onChange={(e) => setBusqueda(e.target.value)}
              placeholder="Buscar por nombre, email o gimnasio..."
              className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-[#1C1C24] border border-[#2B2B36] text-xs text-white placeholder-[#7A8090] focus:border-[#6C5CFF] focus:outline-none transition-colors"
            />
          </div>

          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 md:pb-0">
            {(
              [
                { id: "todos", label: "Todos" },
                { id: "activo", label: "Activos" },
                { id: "prueba", label: "En Prueba" },
                { id: "inactivo", label: "Suspendidos" },
              ] as const
            ).map((tab) => (
              <button
                key={tab.id}
                onClick={() => setFiltroEstado(tab.id)}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all shrink-0 ${
                  filtroEstado === tab.id
                    ? "bg-[#6C5CFF] text-white"
                    : "bg-[#1C1C24] text-[#7A8090] hover:text-white border border-[#2B2B36]"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </section>

        {/* Tabla de Usuarios */}
        <section className="bg-[#14141A] border border-[#2B2B36] rounded-3xl overflow-hidden shadow-xl">
          <div className="p-4 border-b border-[#2B2B36] flex items-center justify-between">
            <h2 className="text-sm font-bold text-white flex items-center gap-2">
              <Users className="w-4 h-4 text-[#00D4FF]" />
              Atletas Registrados ({usuariosFiltrados.length})
            </h2>
            <span className="text-[11px] text-[#7A8090]">
              Hacé clic en los botones de acción para activar, renovar o suspender
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-[#1C1C24] text-[#7A8090] uppercase tracking-wider font-semibold border-b border-[#2B2B36] text-[10px]">
                <tr>
                  <th className="py-3 px-4">Atleta</th>
                  <th className="py-3 px-4">Rol</th>
                  <th className="py-3 px-4">Sede / Gym</th>
                  <th className="py-3 px-4">Estado</th>
                  <th className="py-3 px-4">Vencimiento</th>
                  <th className="py-3 px-4 text-right">Acciones de Superadmin</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#2B2B36]">
                {usuariosFiltrados.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="text-center py-12 text-[#7A8090]">
                      No se encontraron atletas con los filtros aplicados.
                    </td>
                  </tr>
                ) : (
                  usuariosFiltrados.map((u) => {
                    const esAdminRow = u.rol === "admin" || u.email === "emanuelcerda70@gmail.com"
                    return (
                      <tr key={u.id} className="hover:bg-[#1C1C24]/50 transition-colors">
                        {/* Atleta Info */}
                        <td className="py-3.5 px-4">
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-[#6C5CFF] to-[#00D4FF] text-white font-black text-xs flex items-center justify-center shrink-0">
                              {u.nombre.charAt(0).toUpperCase()}
                            </div>
                            <div>
                              <p className="font-bold text-white flex items-center gap-1.5">
                                {u.nombre}
                                {esAdminRow && <Crown className="w-3 h-3 text-[#00D4FF]" />}
                              </p>
                              <p className="text-[11px] text-[#7A8090] font-mono">{u.email}</p>
                            </div>
                          </div>
                        </td>

                        {/* Rol */}
                        <td className="py-3.5 px-4">
                          <span
                            className={`px-2 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider ${
                              esAdminRow
                                ? "bg-[#6C5CFF]/20 text-[#8B7DFF] border border-[#6C5CFF]/40"
                                : "bg-[#1C1C24] text-[#9CA3AF] border border-[#2B2B36]"
                            }`}
                          >
                            {u.rol}
                          </span>
                        </td>

                        {/* Sede / Gimnasio */}
                        <td className="py-3.5 px-4">
                          <span className="text-[#9CA3AF] text-xs">
                            {u.gimnasio_nombre || "Sede General"}
                          </span>
                        </td>

                        {/* Estado */}
                        <td className="py-3.5 px-4">
                          {u.estado_suscripcion === "activo" && (
                            <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#00E676]/15 text-[#00E676] border border-[#00E676]/30 text-[11px] font-bold">
                              <span className="w-1.5 h-1.5 rounded-full bg-[#00E676]" />
                              Activo
                            </span>
                          )}
                          {u.estado_suscripcion === "prueba" && (
                            <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#6C5CFF]/15 text-[#00D4FF] border border-[#6C5CFF]/30 text-[11px] font-bold">
                              <span className="w-1.5 h-1.5 rounded-full bg-[#00D4FF] animate-pulse" />
                              Prueba ({u.dias_restantes}d)
                            </span>
                          )}
                          {u.estado_suscripcion === "inactivo" && (
                            <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-red-500/15 text-red-400 border border-red-500/30 text-[11px] font-bold">
                              <span className="w-1.5 h-1.5 rounded-full bg-red-400" />
                              Suspendido
                            </span>
                          )}
                        </td>

                        {/* Vencimiento */}
                        <td className="py-3.5 px-4 font-mono text-[11px]">
                          {esAdminRow ? (
                            <span className="text-[#00D4FF] font-bold">Vitalicio</span>
                          ) : u.fecha_vencimiento ? (
                            <div>
                              <span className="text-white">{u.fecha_vencimiento}</span>
                              <span
                                className={`block text-[10px] ${
                                  u.dias_restantes > 0 ? "text-[#7A8090]" : "text-red-400 font-bold"
                                }`}
                              >
                                {u.dias_restantes > 0
                                  ? `${u.dias_restantes} días restantes`
                                  : "Vencido"}
                              </span>
                            </div>
                          ) : (
                            <span className="text-[#7A8090]">Sin definir</span>
                          )}
                        </td>

                        {/* Acciones */}
                        <td className="py-3.5 px-4 text-right">
                          {esAdminRow ? (
                            <span className="text-[#7A8090] text-[10px] italic">
                              Superadmin Protegido
                            </span>
                          ) : (
                            <div className="inline-flex items-center gap-1.5 justify-end">
                              {/* Botón Activar / Renovar +30 Días */}
                              <button
                                onClick={() =>
                                  activarMutation.mutate({ id: u.id, dias: 30 })
                                }
                                disabled={activarMutation.isPending}
                                title="Activar o sumar 30 días de suscripción ($10 USD)"
                                className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-[#00E676]/15 hover:bg-[#00E676]/30 text-[#00E676] border border-[#00E676]/40 font-bold text-[11px] transition-all active:scale-95 disabled:opacity-50"
                              >
                                <CalendarPlus className="w-3.5 h-3.5" />
                                <span>+30 Días</span>
                              </button>

                              {/* Botón Plan Anual +365 Días */}
                              <button
                                onClick={() =>
                                  activarMutation.mutate({ id: u.id, dias: 365 })
                                }
                                disabled={activarMutation.isPending}
                                title="Activar plan anual (365 días)"
                                className="hidden sm:inline-flex items-center gap-1 px-2 py-1.5 rounded-lg bg-[#6C5CFF]/20 hover:bg-[#6C5CFF]/35 text-[#8B7DFF] border border-[#6C5CFF]/40 font-bold text-[11px] transition-all active:scale-95 disabled:opacity-50"
                              >
                                <Sparkles className="w-3.5 h-3.5 text-[#00D4FF]" />
                                <span>+1 Año</span>
                              </button>

                              {/* Botón Suspender / Echar */}
                              {u.estado_suscripcion !== "inactivo" ? (
                                <button
                                  onClick={() => suspenderMutation.mutate(u.id)}
                                  disabled={suspenderMutation.isPending}
                                  title="Suspender acceso (Bloquear en la app)"
                                  className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-red-500/15 hover:bg-red-500/30 text-red-400 border border-red-500/40 font-bold text-[11px] transition-all active:scale-95 disabled:opacity-50"
                                >
                                  <Ban className="w-3.5 h-3.5" />
                                  <span>Suspender</span>
                                </button>
                              ) : (
                                <span className="text-[10px] text-red-400/80 px-2 py-1 font-semibold">
                                  Bloqueado
                                </span>
                              )}

                              {/* Botón Eliminar en Cascada */}
                              <button
                                onClick={() => setUsuarioAEliminar(u)}
                                title="Eliminar definitivamente de la base de datos"
                                className="p-1.5 rounded-lg bg-[#1C1C24] hover:bg-red-500/20 text-[#7A8090] hover:text-red-400 border border-[#2B2B36] hover:border-red-500/40 transition-all"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                            </div>
                          )}
                        </td>
                      </tr>
                    )
                  })
                )}
              </tbody>
            </table>
          </div>
        </section>

        {/* Modal de Confirmación para Eliminar Usuario */}
        {usuarioAEliminar && (
          <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
            <div className="max-w-md w-full bg-[#14141A] border border-red-500/40 rounded-3xl p-6 shadow-2xl animate-in zoom-in-95">
              <div className="w-12 h-12 rounded-2xl bg-red-500/20 text-red-400 flex items-center justify-center mx-auto mb-4">
                <AlertTriangle className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-black text-white text-center">
                ¿Eliminar atleta definitivamente?
              </h3>
              <p className="text-xs text-[#9CA3AF] text-center mt-2">
                Estás a punto de borrar a{" "}
                <strong className="text-white">{usuarioAEliminar.nombre}</strong> (
                {usuarioAEliminar.email}). Se eliminarán todas sus rutinas, registros de cargas y
                asistencias en la base de datos de Neon.
              </p>

              <div className="mt-6 flex items-center gap-3">
                <button
                  onClick={() => setUsuarioAEliminar(null)}
                  className="flex-1 py-2.5 rounded-xl bg-[#1C1C24] border border-[#2B2B36] text-xs font-bold text-[#9CA3AF] hover:text-white transition-all"
                >
                  Cancelar
                </button>
                <button
                  onClick={() => eliminarMutation.mutate(usuarioAEliminar.id)}
                  disabled={eliminarMutation.isPending}
                  className="flex-1 py-2.5 rounded-xl bg-red-500 hover:bg-red-600 text-xs font-bold text-white transition-all shadow-lg shadow-red-500/30 disabled:opacity-50"
                >
                  {eliminarMutation.isPending ? "Eliminando..." : "Sí, Eliminar"}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </main>
  )
}
