import { NextRequest, NextResponse } from 'next/server'
import { getInvite, saveInvite } from '@/lib/store'
import { promises as fs } from 'fs'
import path from 'path'

const DATA_DIR = path.join(process.cwd(), '.data')
const STORE_FILE = path.join(DATA_DIR, 'invites.json')

export async function POST(req: NextRequest) {
  try {
    const { oldSlug, newSlug } = await req.json()
    if (!oldSlug || !newSlug) return NextResponse.json({ error: 'Missing slugs' }, { status: 400 })

    const valid = /^[a-z0-9-]{3,50}$/.test(newSlug)
    if (!valid) return NextResponse.json({ error: 'Invalid slug format' }, { status: 400 })

    const existing = await getInvite(newSlug)
    if (existing) return NextResponse.json({ error: 'Slug already taken' }, { status: 409 })

    const record = await getInvite(oldSlug)
    if (!record) return NextResponse.json({ error: 'Original invite not found' }, { status: 404 })

    // Save under new slug
    await saveInvite(newSlug, record.templateId, record.data)

    // Remove old slug from store
    try {
      const raw = await fs.readFile(STORE_FILE, 'utf-8')
      const store = JSON.parse(raw)
      delete store[oldSlug]
      await fs.writeFile(STORE_FILE, JSON.stringify(store, null, 2))
    } catch {}

    return NextResponse.json({ success: true, slug: newSlug, url: `/i/${newSlug}` })
  } catch {
    return NextResponse.json({ error: 'Failed to rename slug' }, { status: 500 })
  }
}
