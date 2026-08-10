import { redirect } from "next/navigation";

export default function HomePage() {
  // Redirige automáticamente a la parte principal de la app
  redirect("/dashboard");
}