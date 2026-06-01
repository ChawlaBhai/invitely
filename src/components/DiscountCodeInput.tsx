'use client'

import { useState } from 'react'

interface Props {
  onApply: (code: string, discountPercent: number) => void
  onRemove: () => void
  appliedCode?: string
  appliedDiscount?: number
  accentColor?: string
}

export default function DiscountCodeInput({ onApply, onRemove, appliedCode, appliedDiscount, accentColor = '#A16207' }: Props) {
  const [code, setCode] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  async function apply() {
    if (!code.trim()) return
    setLoading(true)
    setError('')
    try {
      const res = await fetch(`/api/discount/validate?code=${encodeURIComponent(code.trim())}`)
      const json = await res.json()
      if (json.valid) {
        onApply(code.trim().toUpperCase(), json.discountPercent)
        setCode('')
      } else {
        setError(json.reason ?? 'Invalid code')
      }
    } finally {
      setLoading(false)
    }
  }

  if (appliedCode) {
    return (
      <div className="flex items-center gap-3 p-3 border"
        style={{ borderColor: `${accentColor}40`, background: `${accentColor}08` }}>
        <div className="flex-1">
          <p className="text-xs font-semibold" style={{ color: accentColor }}>{appliedCode}</p>
          <p className="text-[#FAFAF9] opacity-50 text-xs">{appliedDiscount}% discount applied</p>
        </div>
        <button onClick={onRemove} className="text-[#FAFAF9] opacity-30 hover:opacity-60 text-xs tracking-widest uppercase transition-opacity">
          Remove
        </button>
      </div>
    )
  }

  return (
    <div className="space-y-2">
      <div className="flex gap-2">
        <input
          value={code}
          onChange={e => setCode(e.target.value.toUpperCase())}
          onKeyDown={e => e.key === 'Enter' && apply()}
          placeholder="Discount code"
          className="flex-1 bg-[#111009] border border-white/10 text-[#FAFAF9] px-4 py-2.5 text-sm focus:outline-none transition-colors placeholder:opacity-20 uppercase tracking-widest"
          style={{ borderColor: error ? '#DC2626' : undefined }}
        />
        <button
          onClick={apply}
          disabled={loading || !code.trim()}
          className="flex-shrink-0 px-4 py-2.5 text-xs tracking-widest uppercase font-semibold transition-all disabled:opacity-30"
          style={{ background: accentColor, color: '#0C0A09' }}
        >
          {loading ? '...' : 'Apply'}
        </button>
      </div>
      {error && <p className="text-red-400 text-xs">{error}</p>}
    </div>
  )
}
