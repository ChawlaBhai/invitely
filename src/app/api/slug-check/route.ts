import { NextRequest, NextResponse } from 'next/server'
import { getInvite } from '@/lib/store'

export async function GET(req: NextRequest) {
  const slug = req.nextUrl.searchParams.get('slug')
  if (!slug) return NextResponse.json({ error: 'Missing slug' }, { status: 400 })

  // Validate format: lowercase letters, numbers, hyphens, 3-50 chars
  const valid = /^[a-z0-9-]{3,50}$/.test(slug)
  if (!valid) {
    return NextResponse.json({
      available: false,
      reason: 'Slug must be 3-50 characters, lowercase letters, numbers and hyphens only',
    })
  }

  // Reserved slugs
  const reserved = ['admin', 'builder', 'preview', 'dashboard', 'edit', 'my-invites', 'for-planners', 'api', 'i']
  if (reserved.includes(slug)) {
    return NextResponse.json({ available: false, reason: 'This slug is reserved' })
  }

  const existing = await getInvite(slug)
  return NextResponse.json({ available: !existing })
}
