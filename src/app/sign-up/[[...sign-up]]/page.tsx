import { SignUp } from "@clerk/nextjs";
import { dark } from "@clerk/themes";

export default function SignUpPage() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-zinc-950 p-4">
      <div className="flex flex-col items-center gap-8">
        <h1 className="text-3xl font-black tracking-tighter text-white">ASCEND</h1>
        <SignUp 
          path="/sign-up" 
          fallbackRedirectUrl="/dashboard"
          appearance={{ baseTheme: dark, variables: { colorPrimary: "#7c3aed" }, elements: { formButtonPrimary: "bg-violet-600 hover:bg-violet-700 text-sm normal-case", card: "bg-zinc-900 border border-zinc-800 shadow-2xl" } }} 
        />
      </div>
    </main>
  );
}