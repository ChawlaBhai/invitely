import { NextRequest, NextResponse } from 'next/server'
import { validateCode } from '@/lib/discountCodes'

export async function GET(req: NextRequest) {
  const code = req.nextUrl.searchParams.get('code')
  if (!code) return NextResponse.json({ valid: false, reason: 'Missing code' }, { status: 400 })

  const result = await validateCode(code)
  return NextResponse.json(result)
}
