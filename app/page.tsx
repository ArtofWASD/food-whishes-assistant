"use client"

import Fridge from "@/src/components/Fridge/Fridge"
import OutputResults from "@/src/components/OutputResults/OutputResults"
import SettingsBar from "@/src/components/SettingsBar/SettingsBar"

export default function Home() {
  return (
    <main className="min-h-screen bg-[var(--background)]">
      {/* Header */}
      <header className="py-4">
        <h1 className="text-3xl font-bold text-center">Food-whishes-assistant</h1>
      </header>
      {/* Settings */}
      <div className="px-4 py-4">
        <SettingsBar />
      </div>
      {/* Fridge */}
      <div className="px-4 mb-8">
        <Fridge />
      </div>
      {/* Output Results */}
      <div className="px-4">
        <OutputResults />
      </div>
    </main>
  )
}
