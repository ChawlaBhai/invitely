import type { Metadata, Viewport } from 'next'
import './globals.css'
import SmoothScrollProvider from '@/components/SmoothScrollProvider'

export const metadata: Metadata = {
  title: 'Invitely — Invitations That Feel Like Celebrations',
  description: 'Animated, scrollytelling wedding and birthday invitations. Not just a card — the celebration starts here.',
  openGraph: {
    title: 'Invitely',
    description: 'Animated, scrollytelling wedding and birthday invitations.',
    type: 'website',
  },
  manifest: '/manifest.webmanifest',
  appleWebApp: {
    capable: true,
    statusBarStyle: 'black-translucent',
    title: 'Invitely',
  },
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const plausibleDomain = process.env.NEXT_PUBLIC_BASE_URL?.replace('https://', '').replace('http://', '')

  return (
    <html lang="en" className="h-full">
      <head>
        {plausibleDomain && (
          <script
            defer
            data-domain={plausibleDomain}
            src="https://plausible.io/js/script.js"
          />
        )}
      </head>
      <body className="min-h-full antialiased">
        <SmoothScrollProvider>
          {children}
        </SmoothScrollProvider>
      </body>
    </html>
  )
}
