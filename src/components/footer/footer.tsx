import React from "react"
import Link from "next/link"

const Footer = () => {
  const year = new Date().getFullYear()
  return (
    <footer className="w-full bg-[var(--pastel-blue)] bg-opacity-35 flex flex-col items-center py-4 sticky bottom-0 left-0 z-10 min-h-[56px]">
      <Link href="/about" className="text-black mb-2 no-underline hover:no-underline">О проекте</Link>
      <div className="text-gray-700 text-sm">&copy; {year} ArtOfWASD</div>
    </footer>
  )
}

export default Footer 