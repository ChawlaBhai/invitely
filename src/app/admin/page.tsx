import { promises as fs } from 'fs'
import path from 'path'
import Link from 'next/link'
import { WeddingData, BirthdayData } from '@/types/invitation'
import { getAllCodes } from '@/lib/discountCodes'

const DATA_DIR = path.join(process.cwd(), '.data')
const STORE_FILE = path.join(DATA_DIR, 'invites.json')
const RSVP_FILE = path.join(DATA_DIR, 'rsvps.json')
const LEADS_FILE = path.join(DATA_DIR, 'leads.json')
const SUBS_FILE = path.join(DATA_DIR, 'subscribers.json')

async function getAllInvites() {
  try {
    const raw = await fs.readFile(STORE_FILE, 'utf-8')
    return Object.values(JSON.parse(raw)) as any[]
  } catch { return [] }
}

async function getAllRsvps() {
  try {
    const raw = await fs.readFile(RSVP_FILE, 'utf-8')
    return JSON.parse(raw) as Record<string, any[]>
  } catch { return {} }
}

async function getAllLeads() {
  try {
    const raw = await fs.readFile(LEADS_FILE, 'utf-8')
    return JSON.parse(raw) as any[]
  } catch { return [] }
}

async function getAllSubscribers() {
  try {
    const raw = await fs.readFile(SUBS_FILE, 'utf-8')
    return JSON.parse(raw) as any[]
  } catch { return [] }
}

export default async function AdminPage() {
  const invites = await getAllInvites()
  const rsvps = await getAllRsvps()
  const leads = await getAllLeads()
  const codes = await getAllCodes()
  const subscribers = await getAllSubscribers()

  const totalViews = invites.reduce((sum: number, i: any) => sum + (i.views ?? 0), 0)
  const totalRsvps = Object.values(rsvps).reduce((sum, arr) => sum + arr.length, 0)
  const totalReferrals = invites.filter((i: any) => i.referredBy).length

  invites.sort((a: any, b: any) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
  leads.sort((a: any, b: any) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())

  return (
    <div className="min-h-screen bg-[#0C0A09] text-[#FAFAF9] px-6 py-12">
      <div className="max-w-5xl mx-auto">

        <div className="mb-12">
          <p className="text-[#A16207] tracking-[0.3em] text-xs uppercase mb-2">Admin</p>
          <h1 className="font-['Playfair_Display'] text-4xl text-[#FAFAF9]">All Invites</h1>
        </div>

        {/* Global stats */}
        <div className="grid grid-cols-2 md:grid-cols-6 gap-4 mb-12">
          {[
            { label: 'Total Invites', value: invites.length, color: '#A16207' },
            { label: 'Total Views', value: totalViews, color: '#0891B2' },
            { label: 'Total RSVPs', value: totalRsvps, color: '#16A34A' },
            { label: 'Referrals', value: totalReferrals, color: '#EA580C' },
            { label: 'Subscribers', value: subscribers.length, color: '#7C3AED' },
            { label: 'Leads', value: leads.length, color: '#DC2626' },
          ].map(({ label, value, color }) => (
            <div key={label} className="border border-white/5 p-5 bg-[#111009]">
              <p className="font-['Playfair_Display'] text-4xl mb-1" style={{ color }}>{value}</p>
              <p className="text-[#FAFAF9] opacity-40 text-xs tracking-widest uppercase">{label}</p>
            </div>
          ))}
        </div>

        {/* Invite list */}
        <div className="space-y-3">
          {invites.length === 0 ? (
            <div className="border border-white/5 p-10 text-center">
              <p className="font-['Cormorant_Infant'] text-xl text-[#FAFAF9] opacity-30">No invites created yet.</p>
            </div>
          ) : invites.map((invite: any) => {
            const { slug, templateId, data, createdAt, views } = invite
            const rsvpCount = rsvps[slug]?.length ?? 0

            let title = 'Unknown'
            let subtitle = ''
            if (data?.type === 'wedding') {
              const w = data as WeddingData
              title = `${w.partner1.name} & ${w.partner2.name}`
              subtitle = w.ceremony.city
            } else if (data?.type === 'birthday') {
              const b = data as BirthdayData
              title = b.celebrant.name
              subtitle = b.event.city
            }

            return (
              <div key={slug} className="border border-white/5 p-5 bg-[#111009] flex items-center gap-4 flex-wrap">
                <div className="flex-1 min-w-0">
                  <p className="text-[#FAFAF9] font-semibold">{title}</p>
                  <p className="text-[#FAFAF9] opacity-40 text-xs mt-0.5">{templateId} · {subtitle}</p>
                  <p className="text-[#FAFAF9] opacity-20 text-xs mt-0.5">
                    {new Date(createdAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}
                  </p>
                  {invite.referredBy && (
                    <p className="text-[#EA580C] opacity-70 text-xs mt-0.5">
                      via /i/{invite.referredBy}
                    </p>
                  )}
                </div>
                <div className="flex items-center gap-6 flex-shrink-0">
                  <div className="text-center">
                    <p className="text-[#0891B2] font-bold">{views ?? 0}</p>
                    <p className="text-[#FAFAF9] opacity-30 text-[10px] uppercase tracking-wider">Views</p>
                  </div>
                  <div className="text-center">
                    <p className="text-[#16A34A] font-bold">{rsvpCount}</p>
                    <p className="text-[#FAFAF9] opacity-30 text-[10px] uppercase tracking-wider">RSVPs</p>
                  </div>
                  <div className="flex gap-2">
                    <Link href={`/i/${slug}`} target="_blank"
                      className="px-3 py-1.5 border border-white/10 text-[#FAFAF9] opacity-50 hover:opacity-100 text-xs tracking-widest uppercase transition-all">
                      View
                    </Link>
                    <Link href={`/dashboard/${slug}`}
                      className="px-3 py-1.5 border border-[#A16207] border-opacity-40 text-[#A16207] text-xs tracking-widest uppercase hover:bg-[#A16207] hover:text-[#0C0A09] transition-all">
                      Dashboard
                    </Link>
                  </div>
                </div>
              </div>
            )
          })}
        </div>

        <div className="mt-12 pt-8 border-t border-white/5 text-center">
          <p className="font-['Great_Vibes'] text-3xl text-[#FAFAF9] opacity-20">Invitely Admin</p>
        </div>

        {/* Leads */}
        {leads.length > 0 && (
          <div className="mt-12">
            <p className="text-[#DC2626] tracking-[0.3em] text-xs uppercase mb-4">Planner Leads ({leads.length})</p>
            <div className="space-y-3">
              {leads.map((lead: any) => (
                <div key={lead.id} className="border border-white/5 p-4 bg-[#111009] flex items-start gap-4">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-3 flex-wrap">
                      <p className="text-[#FAFAF9] font-semibold text-sm">{lead.name}</p>
                      {lead.company && <span className="text-[#FAFAF9] opacity-40 text-xs">{lead.company}</span>}
                    </div>
                    <p className="text-[#A16207] text-xs mt-0.5">{lead.email}{lead.phone ? ` · ${lead.phone}` : ''}</p>
                    <p className="text-[#FAFAF9] opacity-50 text-sm mt-1 font-['Cormorant_Infant']">{lead.message}</p>
                    <p className="text-[#FAFAF9] opacity-20 text-xs mt-1">
                      {new Date(lead.createdAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' })}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Discount Codes */}
        <div className="mt-12">
          <p className="text-[#A16207] tracking-[0.3em] text-xs uppercase mb-4">Discount Codes ({codes.length})</p>
          <div className="space-y-2">
            {codes.map(code => (
              <div key={code.code} className="border border-white/5 p-4 bg-[#111009] flex items-center gap-4">
                <div className="flex-1">
                  <p className="text-[#FAFAF9] font-bold tracking-widest text-sm">{code.code}</p>
                  <p className="text-[#A16207] text-xs mt-0.5">{code.discountPercent}% off · {code.description}</p>
                </div>
                <div className="text-center flex-shrink-0">
                  <p className="text-[#FAFAF9] font-bold">{code.usedCount}/{code.maxUses}</p>
                  <p className="text-[#FAFAF9] opacity-30 text-[10px] uppercase tracking-wider">Used</p>
                </div>
                <div className="flex-shrink-0">
                  <span className={`text-xs px-2 py-1 ${code.usedCount >= code.maxUses ? 'text-red-400 border border-red-400/30' : 'text-[#16A34A] border border-[#16A34A]/30'}`}>
                    {code.usedCount >= code.maxUses ? 'Exhausted' : 'Active'}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
