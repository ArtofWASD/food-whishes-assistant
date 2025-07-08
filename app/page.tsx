"use client"

import React from 'react'
import OutputResults from "@/src/components/output-results/output-results"
import SettingsBar from "@/src/components/settings-bar/settings-bar"
import { useAppStore } from '@/src/store/appStore'
import CookPlate from "@/src/components/cook-plate/cook-plate"

export default function Home() {
  const showResults = useAppStore(s => s.showResults)
  return (
    <main className="min-h-screen bg-[var(--background)]">
      {/* Header */}
      <header className="py-2">
        <h1 className="text-3xl font-bold text-center">Из чего?</h1>
      </header>
      {/* Settings */}
      <div className="p-2">
        <SettingsBar />
      </div>
      <div className="p-2">
        <CookPlate />
      </div>
      {/* Output Results */}
      <div className="p-2">
        {showResults && <OutputResults />}
      </div>
    </main>
  )
}
