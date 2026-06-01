import { NextRequest, NextResponse } from 'next/server'
import { getRsvps, getInvite } from '@/lib/store'
import { WeddingData, BirthdayData } from '@/types/invitation'

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params
  const record = await getInvite(slug)
  if (!record) return NextResponse.json({ error: 'Not found' }, { status: 404 })

  const rsvps = await getRsvps(slug)

  const { data } = record
  let eventTitle = 'Event'
  if (data.type === 'wedding') {
    const w = data as WeddingData
    eventTitle = `${w.partner1.name}_${w.partner2.name}_Wedding`
  } else if (data.type === 'birthday') {
    const b = data as BirthdayData
    eventTitle = `${b.celebrant.name}_Birthday`
  }

  const headers = ['Name', 'Phone', 'Attending', 'Guests', 'Message', 'Date']
  const rows = rsvps.map(r => [
    `"${r.name}"`,
    `"${r.phone ?? ''}"`,
    `"${r.attending}"`,
    `"${r.guests ?? 1}"`,
    `"${(r.message ?? '').replace(/"/g, '""')}"`,
    `"${new Date(r.createdAt).toLocaleDateString('en-IN')}"`,
  ])

  const csv = [headers.join(','), ...rows.map(r => r.join(','))].join('\n')

  return new NextResponse(csv, {
    headers: {
      'Content-Type': 'text/csv',
      'Content-Disposition': `attachment; filename="${eventTitle}_RSVPs.csv"`,
    },
  })
}
