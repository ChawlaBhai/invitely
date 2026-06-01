import { InvitationData } from '@/types/invitation'
import { promises as fs } from 'fs'
import path from 'path'

// If SUPABASE_URL is set, re-export from the Supabase store
// This allows zero-code-change switching between local dev and production
if (process.env.SUPABASE_URL && process.env.SUPABASE_SERVICE_ROLE_KEY) {
  module.exports = require('./store.supabase')
}

const DATA_DIR = path.join(process.cwd(), '.data')
const STORE_FILE = path.join(DATA_DIR, 'invites.json')
const RSVP_FILE = path.join(DATA_DIR, 'rsvps.json')

interface InviteRecord {
  slug: string
  templateId: string
  data: InvitationData
  createdAt: string
  views: number
  lastViewedAt?: string
  expiresAt: string   // ISO date — 90 days from creation by default
  tier: 'classic' | 'premium' | 'luxury'
  referredBy?: string
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

type Store = Record<string, InviteRecord>
type RsvpStore = Record<string, RsvpRecord[]>

async function readStore(): Promise<Store> {
  try {
    await fs.mkdir(DATA_DIR, { recursive: true })
    const raw = await fs.readFile(STORE_FILE, 'utf-8')
    return JSON.parse(raw)
  } catch {
    return {}
  }
}

async function writeStore(store: Store): Promise<void> {
  await fs.mkdir(DATA_DIR, { recursive: true })
  await fs.writeFile(STORE_FILE, JSON.stringify(store, null, 2))
}

async function readRsvpStore(): Promise<RsvpStore> {
  try {
    await fs.mkdir(DATA_DIR, { recursive: true })
    const raw = await fs.readFile(RSVP_FILE, 'utf-8')
    return JSON.parse(raw)
  } catch {
    return {}
  }
}

async function writeRsvpStore(store: RsvpStore): Promise<void> {
  await fs.mkdir(DATA_DIR, { recursive: true })
  await fs.writeFile(RSVP_FILE, JSON.stringify(store, null, 2))
}

export async function saveInvite(slug: string, templateId: string, data: InvitationData, tier: 'classic' | 'premium' | 'luxury' = 'classic', referredBy?: string): Promise<void> {
  const store = await readStore()
  const now = new Date()
  const daysValid = tier === 'luxury' ? 365 : tier === 'premium' ? 365 : 90
  const expiresAt = new Date(now.getTime() + daysValid * 24 * 60 * 60 * 1000).toISOString()
  store[slug] = { slug, templateId, data, createdAt: now.toISOString(), views: 0, expiresAt, tier, ...(referredBy ? { referredBy } : {}) }
  await writeStore(store)
}

export async function getInvite(slug: string): Promise<InviteRecord | null> {
  const store = await readStore()
  return store[slug] ?? null
}

export function isExpired(record: InviteRecord): boolean {
  if (!record.expiresAt) return false
  return new Date(record.expiresAt).getTime() < Date.now()
}

export async function incrementViews(slug: string): Promise<void> {
  const store = await readStore()
  if (store[slug]) {
    store[slug].views = (store[slug].views ?? 0) + 1
    store[slug].lastViewedAt = new Date().toISOString()
    await writeStore(store)
  }
}

export async function saveRsvp(rsvp: Omit<RsvpRecord, 'id' | 'createdAt'>): Promise<RsvpRecord> {
  const store = await readRsvpStore()
  const record: RsvpRecord = {
    ...rsvp,
    id: Math.random().toString(36).slice(2, 10),
    createdAt: new Date().toISOString(),
  }
  if (!store[rsvp.slug]) store[rsvp.slug] = []
  store[rsvp.slug].push(record)
  await writeRsvpStore(store)
  return record
}

export async function getRsvps(slug: string): Promise<RsvpRecord[]> {
  const store = await readRsvpStore()
  return store[slug] ?? []
}

