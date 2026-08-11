import { SignIn } from "@clerk/nextjs";
import { dark } from "@clerk/themes";

export default function SignInPage() {
  return (
    <main className="relative min-h-screen w-full overflow-hidden bg-surface">
      {/* Fondo de montaña */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/bg-onboarding.png"
        alt=""
        className="absolute inset-0 w-full h-full object-cover object-center"
      />

      {/* Gradiente oscuro inferior para legibilidad */}
      <div className="absolute inset-0 bg-gradient-to-t from-surface via-surface/80 to-transparent" />

      {/* Overlay con blur sutil */}
      <div className="absolute inset-0 bg-black/30 backdrop-blur-[2px]" />

      {/* -------- Contenido centrado -------- */}
      <div className="relative z-20 flex min-h-screen flex-col items-center justify-center px-4 py-8">
        <div className="flex w-full flex-col items-center gap-6 max-w-md">
          {/* Logo + Nombre */}
          <div className="flex flex-col items-center gap-3">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/logo-ascend.png"
              alt="ASCEND"
              className="h-12 w-auto drop-shadow-[0_0_20px_rgba(108,92,255,0.45)]"
            />
            <h1 className="font-display text-3xl font-black tracking-tighter text-text-primary">
              ASCEND
            </h1>
          </div>

          {/* Componente de Clerk integrado al glassmorphism */}
          <SignIn
            path="/sign-in"
            signUpUrl="/sign-up"
            fallbackRedirectUrl="/dashboard"
            appearance={{
              baseTheme: dark,
              variables: {
                colorPrimary: "#6C5CFF",
                colorText: "#F5F7FA",
                colorTextSecondary: "#9CA3AF",
                colorNeutral: "#1C1C22",
                colorBackground: "#0E0E13",
                colorInputBackground: "rgba(255, 255, 255, 0.06)",
                colorInputText: "#F5F7FA",
                borderRadius: "1rem",
                fontFamily: "var(--font-inter), Inter, system-ui, sans-serif",
              },
              elements: {
                card: "bg-white/[0.06] backdrop-blur-xl border border-white/20 rounded-3xl shadow-2xl",
                formButtonPrimary:
                  "bg-gradient-to-r from-[#6C5CFF] to-[#00D4FF] text-white font-bold rounded-xl border-none hover:opacity-90",
                formFieldInput:
                  "bg-white/[0.06] border border-white/20 rounded-xl text-white placeholder:text-white/40 focus:border-[#6C5CFF] focus:ring-2 focus:ring-[#6C5CFF]/30",
                footerActionLink: "text-[#8B7DFF] hover:text-[#6C5CFF]",
                headerTitle: "text-white font-display",
                headerSubtitle: "text-zinc-400",
                dividerLine: "bg-white/10",
                dividerText: "text-zinc-500",
                socialButtonsBlockButton:
                  "bg-white/[0.06] border border-white/20 text-white hover:bg-white/10",
                socialButtonsBlockButtonText: "text-white",
                formFieldLabel: "text-zinc-300",
                formFieldErrorText: "text-red-400",
                input: "text-white",
                badge: "bg-[#6C5CFF]/20 text-[#8B7DFF]",
                buttonPrimary: "text-white",
              },
            }}
          />
        </div>
      </div>
    </main>
  );
}