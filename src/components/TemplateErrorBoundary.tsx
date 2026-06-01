'use client'

import { Component, ReactNode } from 'react'
import Link from 'next/link'

interface Props { children: ReactNode }
interface State { hasError: boolean; error?: Error }

export default class TemplateErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error }
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-[#0C0A09] flex flex-col items-center justify-center px-6 text-center">
          <div className="relative z-10 max-w-lg">
            <p className="text-[#A16207] tracking-[0.4em] text-xs uppercase mb-4">Something went wrong</p>
            <h1 className="font-['Playfair_Display'] text-4xl text-[#FAFAF9] mb-4">
              This invite couldn't load
            </h1>
            <p className="font-['Cormorant_Infant'] text-lg text-[#FAFAF9] opacity-50 mb-10 leading-relaxed">
              There was an error rendering this invitation. Please try refreshing the page.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={() => window.location.reload()}
                className="px-10 py-4 bg-[#A16207] text-[#0C0A09] text-sm tracking-[0.2em] uppercase font-semibold hover:bg-[#FAFAF9] transition-all duration-500"
              >
                Refresh
              </button>
              <Link href="/" className="px-10 py-4 border border-white/10 text-[#FAFAF9] opacity-50 hover:opacity-100 text-sm tracking-widest uppercase transition-all">
                Go Home
              </Link>
            </div>
          </div>
        </div>
      )
    }
    return this.props.children
  }
}
