import { Resend } from 'resend'

const resend = process.env.RESEND_API_KEY ? new Resend(process.env.RESEND_API_KEY) : null

interface RsvpNotificationParams {
  creatorEmail: string
  eventTitle: string
  guestName: string
  attending: 'yes' | 'no' | 'maybe'
  guests?: number
  message?: string
  dashboardUrl: string
}

export async function sendRsvpNotification(params: RsvpNotificationParams): Promise<void> {
  if (!resend) return // Silently skip if Resend not configured

  const { creatorEmail, eventTitle, guestName, attending, guests, message, dashboardUrl } = params

  const attendingLabel = attending === 'yes'
    ? `✅ Attending (${guests ?? 1} guest${(guests ?? 1) > 1 ? 's' : ''})`
    : attending === 'maybe'
    ? '🤔 Maybe'
    : '❌ Not Attending'

  const html = `
    <!DOCTYPE html>
    <html>
    <head><meta charset="utf-8"></head>
    <body style="font-family: Georgia, serif; background: #0C0A09; color: #FAFAF9; padding: 40px; max-width: 600px; margin: 0 auto;">
      <div style="border: 1px solid rgba(161,98,7,0.3); padding: 40px;">
        <p style="color: #A16207; font-size: 11px; letter-spacing: 0.4em; text-transform: uppercase; margin: 0 0 24px;">Invitely · New RSVP</p>
        <h1 style="font-size: 28px; margin: 0 0 8px; color: #FAFAF9;">${guestName}</h1>
        <p style="color: #A16207; font-size: 16px; margin: 0 0 24px;">${attendingLabel}</p>
        <p style="color: rgba(255,255,255,0.5); font-size: 14px; margin: 0 0 8px;">For: <strong style="color: #FAFAF9;">${eventTitle}</strong></p>
        ${message ? `<p style="color: rgba(255,255,255,0.5); font-size: 14px; margin: 16px 0; font-style: italic;">"${message}"</p>` : ''}
        <div style="margin-top: 32px; padding-top: 24px; border-top: 1px solid rgba(255,255,255,0.1);">
          <a href="${dashboardUrl}" style="display: inline-block; padding: 12px 32px; background: #A16207; color: #0C0A09; text-decoration: none; font-size: 12px; letter-spacing: 0.2em; text-transform: uppercase; font-weight: bold;">
            View All RSVPs
          </a>
        </div>
      </div>
      <p style="color: rgba(255,255,255,0.2); font-size: 11px; text-align: center; margin-top: 24px;">Invitely · invitely.in</p>
    </body>
    </html>
  `

  await resend.emails.send({
    from: 'Invitely <noreply@invitely.in>',
    to: creatorEmail,
    subject: `New RSVP: ${guestName} ${attending === 'yes' ? 'is attending' : attending === 'maybe' ? 'might attend' : 'can\'t make it'} — ${eventTitle}`,
    html,
  })
}
