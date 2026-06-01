import { NextRequest, NextResponse } from 'next/server'
import { getInvite } from '@/lib/store'
import { promises as fs } from 'fs'
import path from 'path'

const STORE_FILE = path.join(process.cwd(), '.data', 'invites.json')

export async function PUT(
  _req: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params
    const record = await getInvite(slug)
    if (!record) return NextResponse.json({ error: 'Not found' }, { status: 404 })

    const daysToAdd = record.tier === 'luxury' ? 365 : record.tier === 'premium' ? 180 : 90
    const currentExpiry = new Date(record.expiresAt)
    const newExpiry = new Date(Math.max(currentExpiry.getTime(), Date.now()) + daysToAdd * 24 * 60 * 60 * 1000)

    const raw = await fs.readFile(STORE_FILE, 'utf-8')
    const store = JSON.parse(raw)
    if (store[slug]) {
      store[slug].expiresAt = newExpiry.toISOString()
      await fs.writeFile(STORE_FILE, JSON.stringify(store, null, 2))
    }

    return NextResponse.json({ success: true, expiresAt: newExpiry.toISOString() })
  } catch {
    return NextResponse.json({ error: 'Failed to extend' }, { status: 500 })
  }
}
