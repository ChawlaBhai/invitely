'use client'

import Link from 'next/link'

interface Props {
  error: Error & { digest?: string }
  reset: () => void
}

export default function Error({ reset }: Props) {
  return (
    <div className="min-h-screen bg-[#0C0A09] flex flex-col items-center justify-center px-6 text-center">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_#1C1917_0%,_#0C0A09_70%)]" />
      <div className="relative z-10 max-w-lg">
        <p className="text-[#A16207] tracking-[0.4em] text-xs uppercase mb-4 opacity-70">Server Error</p>
        <h1 className="font-['Playfair_Display'] text-4xl text-[#FAFAF9] mb-6">Something went wrong</h1>
        <p className="font-['Cormorant_Infant'] text-xl text-[#FAFAF9] opacity-50 mb-12 leading-relaxed">
          We hit an unexpected error. Please try again in a moment.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button onClick={reset}
            className="px-10 py-4 bg-[#A16207] text-[#0C0A09] text-sm tracking-[0.2em] uppercase font-semibold hover:bg-[#FAFAF9] transition-all duration-500">
            Try Again
          </button>
          <Link href="/" className="px-10 py-4 border border-[#A16207] border-opacity-30 text-[#A16207] text-sm tracking-[0.2em] uppercase hover:bg-[#A16207] hover:text-[#0C0A09] transition-all duration-500">
            Go Home
          </Link>
        </div>
        <div className="mt-16">
          <p className="font-['Great_Vibes'] text-3xl text-[#FAFAF9] opacity-15">Invitely</p>
        </div>
      </div>
    </div>
  )
}
