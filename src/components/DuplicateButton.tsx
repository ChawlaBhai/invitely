'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useRecentInvites } from '@/hooks/useRecentInvites'

interface Props {
  slug: string
  title: string
  templateId: string
  category: 'wedding' | 'birthday'
}

export default function DuplicateButton({ slug, title, templateId, category }: Props) {
  const [loading, setLoading] = useState(false)
  const router = useRouter()
  const { save } = useRecentInvites()

  async function duplicate() {
    setLoading(true)
    try {
      const res = await fetch(`/api/invites/${slug}/duplicate`, { method: 'POST' })
      const json = await res.json()
      if (json.slug) {
        save({ slug: json.slug, title: `${title} (copy)`, templateId, category, createdAt: new Date().toISOString() })
        router.push(`/dashboard/${json.slug}`)
      }
    } finally {
      setLoading(false)
    }
  }

  return (
    <button
      onClick={duplicate}
      disabled={loading}
      className="flex-shrink-0 px-4 py-2 border border-white/10 text-[#FAFAF9] opacity-50 hover:opacity-100 text-xs tracking-widest uppercase transition-all disabled:opacity-20"
    >
      {loading ? '...' : 'Duplicate'}
    </button>
  )
}
