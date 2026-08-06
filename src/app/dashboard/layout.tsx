import BottomNav from "@/components/layout/BottomNav"
import RestBar from "@/components/entrenamiento/RestBar"

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-surface">
      <RestBar />
      <div className="pb-24">{children}</div>
      <BottomNav />
    </div>
  )
}