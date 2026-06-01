import { InvitationData } from '@/types/invitation'
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.SUPABASE_URL
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY

function getClient() {
  if (!supabaseUrl || !supabaseKey) throw new Error('Supabase not configured')
  return createClient(supabaseUrl, supabaseKey)
}

export interface RsvpRecord {
  id: string
  slug: string
  name: string
  phone?: string
  attending: 'yes' | 'no' | 'maybe'
  guests?: number
  message?: string
  createdAt: string
}

interface InviteRecord {
  slug: string
  templateId: string
  data: InvitationData
  createdAt: string
  views: number
  lastViewedAt?: string
  expiresAt: string
  tier: 'classic' | 'premium' | 'luxury'
  referredBy?: string
}

export async function saveInvite(slug: string, templateId: string, data: InvitationData, tier: 'classic' | 'premium' | 'luxury' = 'classic', referredBy?: string): Promise<void> {
  const supabase = getClient()
  const now = new Date()
  const daysValid = tier === 'luxury' ? 365 : tier === 'premium' ? 365 : 90
  const expiresAt = new Date(now.getTime() + daysValid * 24 * 60 * 60 * 1000).toISOString()

  const { error } = await supabase.from('invites').upsert({
    slug,
    template_id: templateId,
    data,
    created_at: now.toISOString(),
    expires_at: expiresAt,
    tier,
    views: 0,
    ...(referredBy ? { referred_by: referredBy } : {}),
  })
  if (error) throw error
}

export async function getInvite(slug: string): Promise<InviteRecord | null> {
  const supabase = getClient()
  const { data, error } = await supabase
    .from('invites')
    .select('*')
    .eq('slug', slug)
    .single()

  if (error || !data) return null

  return {
    slug: data.slug,
    templateId: data.template_id,
    data: data.data,
    createdAt: data.created_at,
    views: data.views ?? 0,
    lastViewedAt: data.last_viewed_at,
    expiresAt: data.expires_at,
    tier: data.tier ?? 'classic',
    referredBy: data.referred_by ?? undefined,
  }
}

export function isExpired(record: InviteRecord): boolean {
  if (!record.expiresAt) return false
  return new Date(record.expiresAt).getTime() < Date.now()
}

export async function incrementViews(slug: string): Promise<void> {
  const supabase = getClient()
  await supabase.rpc('increment_views', { invite_slug: slug })
}

export async function saveRsvp(rsvp: Omit<RsvpRecord, 'id' | 'createdAt'>): Promise<RsvpRecord> {
  const supabase = getClient()
  const id = Math.random().toString(36).slice(2, 10)
  const createdAt = new Date().toISOString()

  const { error } = await supabase.from('rsvps').insert({
    id,
    slug: rsvp.slug,
    name: rsvp.name,
    phone: rsvp.phone,
    attending: rsvp.attending,
    guests: rsvp.guests ?? 1,
    message: rsvp.message,
    created_at: createdAt,
  })
  if (error) throw error

  return { ...rsvp, id, createdAt }
}

export async function getRsvps(slug: string): Promise<RsvpRecord[]> {
  const supabase = getClient()
  const { data, error } = await supabase
    .from('rsvps')
    .select('*')
    .eq('slug', slug)
    .order('created_at', { ascending: false })

  if (error || !data) return []

  return data.map(r => ({
    id: r.id,
    slug: r.slug,
    name: r.name,
    phone: r.phone,
    attending: r.attending,
    guests: r.guests,
    message: r.message,
    createdAt: r.created_at,
  }))
}
