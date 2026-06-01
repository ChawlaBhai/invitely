import { ImageResponse } from '@vercel/og'
import { NextRequest } from 'next/server'
import { getInvite } from '@/lib/store'
import { WeddingData, BirthdayData } from '@/types/invitation'
import { getTemplate } from '@/lib/templates'

export const runtime = 'nodejs'

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params

  let title = 'You Are Invited'
  let subtitle = ''
  let accent = '#A16207'
  let bg = '#0C0A09'
  let midBg = '#1C1917'
  let category = 'wedding'

  try {
    const record = await getInvite(slug)
    if (record) {
      const { data, templateId } = record
      const template = getTemplate(templateId)
      if (template) {
        accent = data.type === 'wedding'
          ? (data as WeddingData).customAccentColor || template.accentColor
          : (data as BirthdayData).customAccentColor || template.accentColor

        if (templateId.includes('garden') || templateId.includes('bohemian')) {
          bg = '#F0FDF4'; midBg = '#DCFCE7'
        } else if (templateId.includes('beach')) {
          bg = '#0A1628'; midBg = '#0C2340'
        } else if (templateId.includes('celestial') || templateId.includes('midnight')) {
          bg = '#050510'; midBg = '#0A0614'
        } else if (templateId.includes('traditional')) {
          bg = '#1A0505'; midBg = '#2D0A0A'
        } else if (templateId.includes('retro')) {
          bg = '#1A0A00'; midBg = '#2D1200'
        }
      }

      if (data.type === 'wedding') {
        const w = data as WeddingData
        title = `${w.partner1.name} & ${w.partner2.name}`
        subtitle = `Getting Married · ${w.ceremony.city}`
        category = 'wedding'
      } else if (data.type === 'birthday') {
        const b = data as BirthdayData
        title = b.celebrant.name
        subtitle = b.age ? `Turning ${b.age} · ${b.event.city}` : `Birthday · ${b.event.city}`
        category = 'birthday'
      }
    }
  } catch {}

  const isLight = bg.startsWith('#F') || bg.startsWith('#f')
  const textColor = isLight ? '#1C1917' : '#FAFAF9'
  const subtitleColor = isLight ? '#44403C' : '#FAFAF9'

  return new ImageResponse(
    (
      <div
        style={{
          width: '1080px',
          height: '1920px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          background: `radial-gradient(ellipse at center, ${midBg} 0%, ${bg} 70%)`,
          fontFamily: 'Georgia, serif',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {/* Decorative border */}
        <div style={{
          position: 'absolute', inset: '40px',
          border: `2px solid ${accent}30`,
          display: 'flex',
        }} />
        <div style={{
          position: 'absolute', inset: '60px',
          border: `1px solid ${accent}15`,
          display: 'flex',
        }} />

        {/* Corner accents */}
        {[
          { top: 40, left: 40 },
          { top: 40, right: 40 },
          { bottom: 40, left: 40 },
          { bottom: 40, right: 40 },
        ].map((pos, i) => (
          <div key={i} style={{
            position: 'absolute',
            width: 80, height: 80,
            borderTop: i < 2 ? `3px solid ${accent}` : undefined,
            borderBottom: i >= 2 ? `3px solid ${accent}` : undefined,
            borderLeft: i % 2 === 0 ? `3px solid ${accent}` : undefined,
            borderRight: i % 2 === 1 ? `3px solid ${accent}` : undefined,
            opacity: 0.7,
            ...pos,
            display: 'flex',
          }} />
        ))}

        {/* Top section */}
        <div style={{
          position: 'absolute',
          top: 120,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 8,
        }}>
          <div style={{
            color: accent, fontSize: 20, letterSpacing: '0.5em',
            textTransform: 'uppercase', opacity: 0.7, display: 'flex',
          }}>
            INVITELY
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
            <div style={{ width: 60, height: 1, background: accent, opacity: 0.4 }} />
            <div style={{ color: accent, fontSize: 18, opacity: 0.6 }}>✦</div>
            <div style={{ width: 60, height: 1, background: accent, opacity: 0.4 }} />
          </div>
        </div>

        {/* Main content */}
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 32,
          padding: '0 80px',
          textAlign: 'center',
        }}>
          {/* Category label */}
          <div style={{
            color: accent, fontSize: 18, letterSpacing: '0.4em',
            textTransform: 'uppercase', opacity: 0.7, display: 'flex',
          }}>
            {category === 'wedding' ? 'Wedding Invitation' : 'Birthday Invitation'}
          </div>

          {/* Title */}
          <div style={{
            color: textColor,
            fontSize: title.length > 15 ? 96 : 120,
            fontWeight: 700,
            lineHeight: 1.05,
            display: 'flex',
            textAlign: 'center',
          }}>
            {title}
          </div>

          {/* Divider */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 24 }}>
            <div style={{ width: 80, height: 2, background: accent, opacity: 0.5 }} />
            <div style={{ color: accent, fontSize: 28, opacity: 0.8 }}>✦</div>
            <div style={{ width: 80, height: 2, background: accent, opacity: 0.5 }} />
          </div>

          {/* Subtitle */}
          <div style={{
            color: subtitleColor,
            fontSize: 36,
            letterSpacing: '0.1em',
            opacity: 0.6,
            display: 'flex',
          }}>
            {subtitle}
          </div>
        </div>

        {/* Bottom CTA */}
        <div style={{
          position: 'absolute',
          bottom: 140,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 20,
        }}>
          <div style={{
            padding: '20px 60px',
            border: `2px solid ${accent}60`,
            color: accent,
            fontSize: 18,
            letterSpacing: '0.3em',
            textTransform: 'uppercase',
            display: 'flex',
          }}>
            OPEN INVITATION
          </div>
          <div style={{
            color: textColor, fontSize: 16, opacity: 0.3,
            letterSpacing: '0.2em', display: 'flex',
          }}>
            invitely.in
          </div>
        </div>
      </div>
    ),
    { width: 1080, height: 1920 }
  )
}
