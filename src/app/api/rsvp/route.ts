import { NextRequest, NextResponse } from 'next/server'
import { saveRsvp, getInvite } from '@/lib/store'
import { sendRsvpNotification } from '@/lib/email'
import { WeddingData, BirthdayData } from '@/types/invitation'
import { headers } from 'next/headers'
import { rateLimit } from '@/lib/rateLimit'

export async function POST(req: NextRequest) {
  if (!rateLimit(req, 10, 60 * 1000)) {
    return NextResponse.json({ error: 'Too many requests' }, { status: 429 })
  }
  try {
    const body = await req.json()
    const { slug, name, phone, attending, guests, message } = body

    if (!slug || !name || !attending) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }

    const record = await saveRsvp({ slug, name, phone, attending, guests, message })

    // Fire-and-forget email notification
    getInvite(slug).then(async invite => {
      if (!invite) return
      const { data } = invite

      let creatorEmail: string | undefined
      let eventTitle = 'Your Event'

      if (data.type === 'wedding') {
        const w = data as WeddingData
        creatorEmail = w.creatorEmail
        eventTitle = `${w.partner1.name} & ${w.partner2.name}'s Wedding`
      } else if (data.type === 'birthday') {
        const b = data as BirthdayData
        creatorEmail = b.creatorEmail
        eventTitle = b.age ? `${b.celebrant.name}'s ${b.age}th Birthday` : `${b.celebrant.name}'s Birthday`
      }

      if (!creatorEmail) return

      const hdrs = await headers()
      const host = hdrs.get('host') ?? 'invitely.in'
      const protocol = host.includes('localhost') ? 'http' : 'https'
      const dashboardUrl = `${protocol}://${host}/dashboard/${slug}`

      await sendRsvpNotification({
        creatorEmail,
        eventTitle,
        guestName: name,
        attending,
        guests,
        message,
        dashboardUrl,
      })
    }).catch(() => {}) // Never let email failure break the RSVP

    return NextResponse.json({ success: true, id: record.id })
  } catch {
    return NextResponse.json({ error: 'Failed to save RSVP' }, { status: 500 })
  }
}
