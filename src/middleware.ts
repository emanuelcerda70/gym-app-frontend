import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";

// Protegemos todo lo que esté dentro de /dashboard
const isProtectedRoute = createRouteMatcher(["/dashboard(.*)"]);

export default clerkMiddleware((auth, req) => {
  if (isProtectedRoute(req)) {
    auth().protect({
      unauthenticatedUrl: new URL("/sign-in", req.url).toString(),
    });
  }
});

export const config = {
  matcher: [
    // Ignorar archivos estáticos y de Next.js internamente
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    // Siempre ejecutar para rutas de API
    "/(api|trpc)(.*)",
  ],
};