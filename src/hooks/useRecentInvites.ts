'use client'

import { useEffect, useState } from 'react'

export interface RecentInvite {
  slug: string
  title: string
  templateId: string
  category: 'wedding' | 'birthday'
  createdAt: string
}

const KEY = 'invitely_recent_invites'
const MAX = 20

export function useRecentInvites() {
  const [invites, setInvites] = useState<RecentInvite[]>([])

  useEffect(() => {
    try {
      const raw = localStorage.getItem(KEY)
      if (raw) setInvites(JSON.parse(raw))
    } catch {}
  }, [])

  function save(invite: RecentInvite) {
    setInvites(prev => {
      const filtered = prev.filter(i => i.slug !== invite.slug)
      const next = [invite, ...filtered].slice(0, MAX)
      try { localStorage.setItem(KEY, JSON.stringify(next)) } catch {}
      return next
    })
  }

  function remove(slug: string) {
    setInvites(prev => {
      const next = prev.filter(i => i.slug !== slug)
      try { localStorage.setItem(KEY, JSON.stringify(next)) } catch {}
      return next
    })
  }

  return { invites, save, remove }
}
