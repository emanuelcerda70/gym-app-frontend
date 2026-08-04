import { Calendar, Flame } from "lucide-react"

export default function DashboardPage() {
  return (
    <main>
      <header className="p-6">
        <h1 className="font-display text-2xl font-bold text-text-primary">
          Hola, Atleta ⚡
        </h1>
      </header>

      <section className="px-6">
        <h2 className="font-sans text-sm font-semibold text-text-secondary mb-3">
          RESUMEN
        </h2>
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-hierro rounded-xl p-4">
            <Calendar className="w-6 h-6 text-primary mb-2" />
            <p className="font-sans text-xs text-text-secondary">Frecuencia Semanal</p>
            <p className="font-display text-2xl font-bold text-text-primary">3/5 Días</p>
          </div>
          <div className="bg-hierro rounded-xl p-4">
            <Flame className="w-6 h-6 text-secondary mb-2" />
            <p className="font-sans text-xs text-text-secondary">Racha Actual</p>
            <p className="font-display text-2xl font-bold text-text-primary">2 Semanas</p>
          </div>
        </div>
      </section>

      <section className="px-6 mt-8">
        <h2 className="font-sans text-sm font-semibold text-text-secondary mb-3">
          RUTINA DE HOY
        </h2>
        <div className="w-full bg-hierro-soft rounded-2xl p-5 border border-hierro-border relative overflow-hidden">
          <div className="absolute -right-4 -top-4 w-24 h-24 rounded-full bg-primary/10 blur-xl" />
          <div className="relative flex items-center justify-between">
            <div>
              <h3 className="font-display text-xl font-bold text-text-primary">
                Fuerza - Tren Superior
              </h3>
              <p className="font-sans text-sm text-text-secondary mt-1">
                45 min
              </p>
            </div>
            <button
              className="bg-primary text-text-primary font-bold rounded-xl h-12 px-6 hover:bg-primary-hover transition-colors active:scale-[0.98]"
            >
              Empezar
            </button>
          </div>
        </div>
      </section>
    </main>
  )
}