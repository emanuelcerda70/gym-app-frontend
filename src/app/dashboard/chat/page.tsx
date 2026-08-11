"use client"

import dynamic from "next/dynamic"

const ChatPageInner = dynamic(() => import("./ChatPageInner"), {
  ssr: false,
  loading: () => (
    <main className="flex flex-col h-[calc(100vh-var(--nav-height)-16px)] -mb-24 px-6 pt-6">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-12 h-12 rounded-full bg-hierro border border-hierro-border animate-pulse" />
        <div className="space-y-2">
          <div className="h-4 w-32 rounded bg-hierro animate-pulse" />
          <div className="h-3 w-16 rounded bg-hierro animate-pulse" />
        </div>
      </div>
      <div className="space-y-3">
        <div className="h-24 rounded-[20px] bg-hierro animate-pulse" />
        <div className="h-24 rounded-[20px] bg-hierro animate-pulse" />
        <div className="h-16 rounded-[20px] bg-hierro animate-pulse" />
      </div>
    </main>
  ),
})

export default function ChatPage() {
  return <ChatPageInner />
}