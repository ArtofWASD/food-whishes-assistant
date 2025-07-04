"use client"

import React from 'react'
import OutputResults from "@/src/components/OutputResults/OutputResults"
import SettingsBar from "@/src/components/SettingsBar/SettingsBar"
import { useAppStore } from '@/src/store/appStore'
import CookPlate from "@/src/components/CookPlate/CookPlate"

export default function Home() {
  const showResults = useAppStore(s => s.showResults)
  return (
    <main className="min-h-screen bg-[var(--background)]">
      {/* Header */}
      <header className="py-4">
        <h1 className="text-3xl font-bold text-center">Food-whishes-assistant</h1>
      </header>
      {/* Settings */}
      <div className="p-4">
        <SettingsBar />
      </div>
      <div className="p-4">
        <CookPlate />
      </div>
      {/* Output Results */}
      <div className="p-4">
        {showResults && <OutputResults />}
      </div>
    </main>
  )
}
