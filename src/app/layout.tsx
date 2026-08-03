import type { Metadata, Viewport } from "next"
import { Archivo, Sora } from "next/font/google"
import "./globals.css"
import Providers from "./providers"
import RouteRecorder from "@/components/layout/RouteRecorder"

const sora = Sora({
  subsets: ["latin"],
  variable: "--font-sora",
})

const archivo = Archivo({
  subsets: ["latin"],
  variable: "--font-archivo",
  axes: ["wdth"],
})

export const metadata: Metadata = {
  title: "ASCEND — Tu Súper Entrenador IA",
  description: "Entrená con inteligencia artificial, con racha que se ve y se siente.",
  manifest: "/manifest.webmanifest",
}

export const viewport: Viewport = {
  themeColor: "#0B0B0F",
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es" className="dark">
      <body className={`${sora.variable} ${archivo.variable} min-h-screen`}>
        <Providers>
          <RouteRecorder />
          {children}
        </Providers>
      </body>
    </html>
  )
}
 
