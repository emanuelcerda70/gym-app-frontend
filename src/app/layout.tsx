import type { Metadata, Viewport } from "next"
import { Archivo, Inter, Space_Grotesk, Sora } from "next/font/google"
import "./globals.css"
import Providers from "./providers"
import RouteRecorder from "@/components/layout/RouteRecorder"
import InstallPrompt from "@/components/layout/InstallPrompt"

const sora = Sora({
  subsets: ["latin"],
  variable: "--font-sora",
})

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
})

const space = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space",
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
  themeColor: "#6C5CFF",
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es" className="dark">
      <body className="bg-[#09090B] text-[#F5F7FA] min-h-screen font-inter" style={{ fontFamily: 'Inter, system-ui, sans-serif' }}>
        <Providers>
          <RouteRecorder />
          {children}
          <InstallPrompt />
        </Providers>
      </body>
    </html>
  )
}
 
