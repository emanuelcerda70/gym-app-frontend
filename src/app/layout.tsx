import type { Metadata } from "next"
import "./globals.css"
import Providers from "./providers"

export const metadata: Metadata = {
  title: "GYM APP - Entrenador Personal IA",
  description: "Entrená con inteligencia artificial",
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es" className="dark">
      <body className="bg-surface text-white min-h-screen">
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}
