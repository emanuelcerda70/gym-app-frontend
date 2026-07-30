"use client"

import AuthGuard from "@/components/layout/AuthGuard"
import QuizStepper from "@/components/onboarding/QuizStepper"

export default function OnboardingPage() {
  return (
    <AuthGuard>
      <QuizStepper />
    </AuthGuard>
  )
}
