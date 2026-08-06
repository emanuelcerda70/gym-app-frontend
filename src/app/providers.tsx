"use client"

import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { useState, type ReactNode } from "react"
import { persistQueryClient } from "@tanstack/react-query-persist-client"
import { createSyncStoragePersister } from "@tanstack/query-sync-storage-persister"

const CACHE_KEY = "ascend-offline-cache"
const CACHE_MAX_AGE = 48 * 60 * 60 * 1000

export default function Providers({ children }: { children: ReactNode }) {
  const [queryClient] = useState(() => {
    const client = new QueryClient({
      defaultOptions: {
        queries: {
          staleTime: 30_000,
          retry: 1,
          gcTime: CACHE_MAX_AGE,
        },
      },
    })

    if (typeof window !== "undefined") {
      const persister = createSyncStoragePersister({
        key: CACHE_KEY,
        storage: window.localStorage,
        throttleTime: 1000,
      })

      void persistQueryClient({
        queryClient: client,
        persister,
        maxAge: CACHE_MAX_AGE,
        buster: "ascend-v1",
      })
    }

    return client
  })

  return (
    <QueryClientProvider client={queryClient}>
      {children}
    </QueryClientProvider>
  )
}
