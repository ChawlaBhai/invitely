'use client'

import { useEffect } from 'react'

interface Props {
  fonts?: { display?: string; script?: string; body?: string }
  children: React.ReactNode
}

export default function FontWrapper({ fonts, children }: Props) {
  useEffect(() => {
    if (!fonts) return
    const root = document.documentElement
    if (fonts.display) root.style.setProperty('--font-display-custom', `'${fonts.display}', serif`)
    if (fonts.script) root.style.setProperty('--font-script-custom', `'${fonts.script}', cursive`)
    if (fonts.body) root.style.setProperty('--font-body-custom', `'${fonts.body}', serif`)
    return () => {
      root.style.removeProperty('--font-display-custom')
      root.style.removeProperty('--font-script-custom')
      root.style.removeProperty('--font-body-custom')
    }
  }, [fonts])

  if (!fonts) return <>{children}</>

  // Inject Google Fonts link for custom fonts
  const fontFamilies = [fonts.display, fonts.script, fonts.body].filter(Boolean)
  const googleUrl = `https://fonts.googleapis.com/css2?${fontFamilies.map(f => `family=${f?.replace(/ /g, '+')}:wght@300;400;500;600;700`).join('&')}&display=swap`

  return (
    <>
      <link rel="stylesheet" href={googleUrl} />
      {children}
    </>
  )
}
