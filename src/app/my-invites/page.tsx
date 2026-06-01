'use client'

import { useEffect } from 'react'
import Link from 'next/link'
import { useRecentInvites, RecentInvite } from '@/hooks/useRecentInvites'

const CATEGORY_ICON: Record<string, string> = {
  wedding: '💍',
  birthday: '✨',
}

export default function MyInvitesPage() {
  const { invites, remove } = useRecentInvites()

  return (
    <div className="min-h-screen bg-[#0C0A09] text-[#FAFAF9] px-6 py-12">
      <div className="max-w-2xl mx-auto">

        <div className="flex items-center justify-between mb-10">
          <div>
            <p className="text-[#A16207] tracking-[0.3em] text-xs uppercase mb-2">Your Invites</p>
            <h1 className="font-['Playfair_Display'] text-4xl text-[#FAFAF9]">My Invites</h1>
          </div>
          <Link href="/builder"
            className="px-6 py-3 bg-[#A16207] text-[#0C0A09] text-xs tracking-widest uppercase font-semibold hover:bg-[#FAFAF9] transition-colors">
            + New Invite
          </Link>
        </div>

        {invites.length === 0 ? (
          <div className="border border-white/5 p-16 text-center">
            <p className="font-['Great_Vibes'] text-5xl text-[#FAFAF9] opacity-20 mb-4">Nothing yet</p>
            <p className="font-['Cormorant_Infant'] text-lg text-[#FAFAF9] opacity-30 mb-8">
              Invites you create will appear here so you can always find them.
            </p>
            <Link href="/builder"
              className="inline-block px-10 py-4 bg-[#A16207] text-[#0C0A09] text-sm tracking-[0.2em] uppercase font-semibold hover:bg-[#FAFAF9] transition-all duration-500">
              Create Your First Invite
            </Link>
          </div>
        ) : (
          <div className="space-y-3">
            {invites.map((invite: RecentInvite) => (
              <div key={invite.slug} className="border border-white/5 p-5 bg-[#111009] flex items-center gap-4">
                <span className="text-2xl flex-shrink-0">{CATEGORY_ICON[invite.category] ?? '✦'}</span>
                <div className="flex-1 min-w-0">
                  <p className="text-[#FAFAF9] font-semibold truncate">{invite.title}</p>
                  <p className="text-[#FAFAF9] opacity-30 text-xs mt-0.5">
                    {new Date(invite.createdAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}
                    {' · '}
                    {invite.templateId.replace(/-/g, ' ')}
                  </p>
                </div>
                <div className="flex gap-2 flex-shrink-0">
                  <Link href={`/i/${invite.slug}`} target="_blank"
                    className="px-3 py-1.5 border border-[#A16207] border-opacity-40 text-[#A16207] text-xs tracking-widest uppercase hover:bg-[#A16207] hover:text-[#0C0A09] transition-all">
                    View
                  </Link>
                  <Link href={`/edit/${invite.slug}`}
                    className="px-3 py-1.5 border border-white/10 text-[#FAFAF9] opacity-50 hover:opacity-100 text-xs tracking-widest uppercase transition-all">
                    Edit
                  </Link>
                  <Link href={`/dashboard/${invite.slug}`}
                    className="px-3 py-1.5 border border-white/10 text-[#FAFAF9] opacity-50 hover:opacity-100 text-xs tracking-widest uppercase transition-all">
                    RSVPs
                  </Link>
                  <button
                    onClick={() => remove(invite.slug)}
                    className="px-3 py-1.5 border border-white/5 text-[#FAFAF9] opacity-20 hover:opacity-50 text-xs tracking-widest uppercase transition-all"
                    title="Remove from list"
                  >
                    ×
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        <div className="mt-12 pt-8 border-t border-white/5 text-center">
          <p className="text-[#FAFAF9] opacity-20 text-xs">
            Invites are saved in your browser. Clear browser data to remove them.
          </p>
        </div>
      </div>
    </div>
  )
}
