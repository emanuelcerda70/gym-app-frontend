import { auth, currentUser } from "@clerk/nextjs/server"
import { NextResponse } from "next/server"

export async function POST() {
  try {
    const { userId } = auth()
    if (!userId) {
      return NextResponse.json(
        { detail: "No autorizado: Sesión de Clerk no activa o inválida." },
        { status: 401 }
      )
    }

    const user = await currentUser()
    const email =
      user?.primaryEmailAddress?.emailAddress ||
      user?.emailAddresses?.[0]?.emailAddress

    if (!email) {
      return NextResponse.json(
        { detail: "Email no encontrado en la cuenta autenticada." },
        { status: 400 }
      )
    }

    const nombre =
      user?.firstName || user?.username || email.split("@")[0] || "Atleta"

    const backendUrl =
      process.env.BACKEND_INTERNAL_URL ||
      process.env.NEXT_PUBLIC_API_URL ||
      "https://gym-app-backend-n7we.onrender.com"

    const syncSecret = process.env.INTERNAL_SYNC_SECRET || ""

    const headers: Record<string, string> = {
      "Content-Type": "application/json",
    }
    if (syncSecret) {
      headers["X-Ascend-Secret"] = syncSecret
    }

    const response = await fetch(`${backendUrl}/api/auth/sync`, {
      method: "POST",
      headers,
      body: JSON.stringify({ email, nombre }),
    })

    const data = await response.json().catch(() => ({ detail: "Error al comunicarse con el backend" }))
    return NextResponse.json(data, { status: response.status })
  } catch (error) {
    console.error("Error en backend-sync:", error)
    return NextResponse.json(
      { detail: "Error interno en el servidor de sincronización segura." },
      { status: 500 }
    )
  }
}
