import { NextRequest, NextResponse } from 'next/server'
import crypto from 'crypto'
import { getInvite } from '@/lib/store'
import { promises as fs } from 'fs'
import path from 'path'

const STORE_FILE = path.join(process.cwd(), '.data', 'invites.json')

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature, slug, tier } = body

    if (!process.env.RAZORPAY_KEY_SECRET) {
      return NextResponse.json({ error: 'Not configured' }, { status: 503 })
    }

    // Verify signature
    const expectedSig = crypto
      .createHmac('sha256', process.env.RAZORPAY_KEY_SECRET)
      .update(`${razorpay_order_id}|${razorpay_payment_id}`)
      .digest('hex')

    if (expectedSig !== razorpay_signature) {
      return NextResponse.json({ error: 'Invalid signature' }, { status: 400 })
    }

    // Upgrade tier in store
    const record = await getInvite(slug)
    if (!record) return NextResponse.json({ error: 'Invite not found' }, { status: 404 })

    const daysValid = tier === 'luxury' ? 730 : tier === 'premium' ? 365 : 90
    const expiresAt = new Date(Date.now() + daysValid * 24 * 60 * 60 * 1000).toISOString()

    const raw = await fs.readFile(STORE_FILE, 'utf-8')
    const store = JSON.parse(raw)
    if (store[slug]) {
      store[slug].tier = tier
      store[slug].expiresAt = expiresAt
    }
    await fs.writeFile(STORE_FILE, JSON.stringify(store, null, 2))

    return NextResponse.json({ success: true, tier, expiresAt })
  } catch {
    return NextResponse.json({ error: 'Verification failed' }, { status: 500 })
  }
}
