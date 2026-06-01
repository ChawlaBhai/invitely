import { NextRequest, NextResponse } from 'next/server'
import { getInvite, saveInvite } from '@/lib/store'
import { InvitationData } from '@/types/invitation'

export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params
    const existing = await getInvite(slug)
    if (!existing) return NextResponse.json({ error: 'Invite not found' }, { status: 404 })

    const body = await req.json() as { data: InvitationData }
    await saveInvite(slug, existing.templateId, body.data)
    return NextResponse.json({ success: true, slug })
  } catch {
    return NextResponse.json({ error: 'Failed to update invite' }, { status: 500 })
  }
}
