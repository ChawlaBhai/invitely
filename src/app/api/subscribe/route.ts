import { NextRequest, NextResponse } from 'next/server'
import { promises as fs } from 'fs'
import path from 'path'
import { rateLimit } from '@/lib/rateLimit'

const DATA_DIR = path.join(process.cwd(), '.data')
const SUBS_FILE = path.join(DATA_DIR, 'subscribers.json')

async function saveSubscriber(email: string, source: string) {
  await fs.mkdir(DATA_DIR, { recursive: true })
  let subs: any[] = []
  try { subs = JSON.parse(await fs.readFile(SUBS_FILE, 'utf-8')) } catch {}
  if (subs.find(s => s.email === email)) return // already subscribed
  subs.push({ email, source, createdAt: new Date().toISOString() })
  await fs.writeFile(SUBS_FILE, JSON.stringify(subs, null, 2))
}

export async function POST(req: NextRequest) {
  if (!rateLimit(req, 3, 60 * 1000)) {
    return NextResponse.json({ error: 'Too many requests' }, { status: 429 })
  }
  try {
    const { email, source = 'gallery' } = await req.json()
    if (!email || !email.includes('@')) {
      return NextResponse.json({ error: 'Invalid email' }, { status: 400 })
    }
    await saveSubscriber(email.toLowerCase().trim(), source)
    return NextResponse.json({ success: true })
  } catch {
    return NextResponse.json({ error: 'Failed' }, { status: 500 })
  }
}
