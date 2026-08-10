import { UserButton, currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

export default async function PerfilPage() {
  const user = await currentUser();
  if (!user) redirect("/sign-in");

  return (
    <main className="min-h-screen bg-zinc-950 p-6 text-white pb-28">
      <h1 className="text-3xl font-black mb-8">Mi Perfil</h1>
      <section className="bg-zinc-900 border border-zinc-800 rounded-3xl p-6 flex items-center gap-4 shadow-lg">
        <UserButton 
          afterSignOutUrl="/sign-in" 
          appearance={{ elements: { userButtonAvatarBox: "w-16 h-16", userButtonPopoverCard: "bg-zinc-900 border-zinc-800", userButtonPopoverActionButtonText: "text-white" } }} 
        />
        <div>
          <h2 className="text-xl font-bold">{user.firstName || "Atleta"} {user.lastName || ""}</h2>
          <p className="text-sm text-zinc-400">{user.emailAddresses[0]?.emailAddress}</p>
        </div>
      </section>
    </main>
  );
}