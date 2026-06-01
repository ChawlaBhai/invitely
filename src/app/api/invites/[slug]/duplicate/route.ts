import { NextRequest, NextResponse } from 'next/server'
import { nanoid } from 'nanoid'
import { getInvite, saveInvite } from '@/lib/store'

export async function POST(
  _req: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params
    const record = await getInvite(slug)
    if (!record) return NextResponse.json({ error: 'Not found' }, { status: 404 })

    const newSlug = nanoid(8)
    await saveInvite(newSlug, record.templateId, record.data)
    return NextResponse.json({ slug: newSlug, url: `/i/${newSlug}` })
  } catch {
    return NextResponse.json({ error: 'Failed to duplicate' }, { status: 500 })
  }
}
