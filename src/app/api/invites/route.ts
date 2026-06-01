import { NextRequest, NextResponse } from 'next/server'
import { nanoid } from 'nanoid'
import { saveInvite } from '@/lib/store'
import { InvitationData } from '@/types/invitation'
import { rateLimit } from '@/lib/rateLimit'

export async function POST(req: NextRequest) {
  if (!rateLimit(req, 5, 60 * 1000)) {
    return NextResponse.json({ error: 'Too many requests' }, { status: 429 })
  }
  try {
    const body = await req.json() as { templateId: string; data: InvitationData; referredBy?: string }
    const { templateId, data, referredBy } = body

    if (!templateId || !data) {
      return NextResponse.json({ error: 'Missing templateId or data' }, { status: 400 })
    }

    const slug = nanoid(8)
    await saveInvite(slug, templateId, data, 'classic', referredBy)

    return NextResponse.json({ slug, url: `/i/${slug}` })
  } catch {
    return NextResponse.json({ error: 'Failed to save invite' }, { status: 500 })
  }
}
