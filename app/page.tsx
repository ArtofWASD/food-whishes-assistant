"use client"

import Fridge from "@/src/components/Fridge/Fridge"
import OutputResults from "@/src/components/OutputResults/OutputResults"
import SettingsBar from "@/src/components/SettingsBar/SettingsBar"

export default function Home() {
  return (
    <div>
      <h1 className="text-3xl font-bold text-center py-2">Food-whishes-assistant</h1>
      <div className="py-2 px-4">
        <SettingsBar />
      </div>
      <div className="px-4">
        <Fridge />
      </div>
      <div className="py-2 px-4">
        <OutputResults/>
      </div>
    </div>
  )
}
