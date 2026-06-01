'use client'

import { PersonaAppearance } from '@/types/invitation'
import ManPersona from './ManPersona'
import WomanPersona from './WomanPersona'

interface Props {
  appearance: PersonaAppearance
  gender?: 'woman' | 'man' | 'other'
  className?: string
  animated?: boolean
}

export default function CelebrantPersona({ appearance, gender = 'woman', className = '', animated = true }: Props) {
  if (gender === 'man') {
    return <ManPersona appearance={appearance} className={className} animated={animated} />
  }
  return <WomanPersona appearance={appearance} className={className} animated={animated} />
}
