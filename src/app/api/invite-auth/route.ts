import { NextRequest, NextResponse } from 'next/server'
import { getInvite } from '@/lib/store'
import { WeddingData } from '@/types/invitation'

export async function POST(req: NextRequest) {
  try {
    const { slug, password } = await req.json()
    if (!slug || !password) return NextResponse.json({ valid: false }, { status: 400 })

    const record = await getInvite(slug)
    if (!record) return NextResponse.json({ valid: false }, { status: 404 })

    const invitePassword = record.data.type === 'wedding'
      ? (record.data as WeddingData).invitePassword
      : undefined

    if (!invitePassword) return NextResponse.json({ valid: true }) // no password set

    const valid = password === invitePassword
    if (valid) {
      // Set a short-lived cookie so they don't have to re-enter
      const res = NextResponse.json({ valid: true })
      res.cookies.set(`invite_auth_${slug}`, '1', { httpOnly: true, maxAge: 86400, path: '/' })
      return res
    }
    return NextResponse.json({ valid: false })
  } catch {
    return NextResponse.json({ valid: false }, { status: 500 })
  }
}
