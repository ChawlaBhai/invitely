'use client'

import { useEffect } from 'react'

interface Props {
  accentColor: string
  children: React.ReactNode
}

export default function AccentColorWrapper({ accentColor, children }: Props) {
  useEffect(() => {
    document.documentElement.style.setProperty('--invite-accent', accentColor)
    return () => { document.documentElement.style.removeProperty('--invite-accent') }
  }, [accentColor])

  return <>{children}</>
}
