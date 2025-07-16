"use client"

import React, { useRef, useEffect } from 'react'
import OutputResults from "@/src/components/output-results/output-results"
import { useAppStore } from '@/src/store/appStore'
import CookPlate from "@/src/components/cook-plate/cook-plate"

export default function Home() {
  const showResults = useAppStore(s => s.showResults)
  const outputRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (showResults && typeof window !== 'undefined' && window.innerWidth < 768 && outputRef.current) {
      outputRef.current.scrollIntoView({ behavior: 'smooth', block: 'end' })
    }
  }, [showResults])

  return (
    <main className="min-h-screen bg-[var(--background)]">
      <div className="py-2">
        <CookPlate />
      </div>
      {/* Output Results */}
      <div className="" ref={outputRef}>
        {showResults && <OutputResults />}
      </div>
      <footer>
        {/* Здесь может быть футер */}
      </footer>
    </main>
  )
}
