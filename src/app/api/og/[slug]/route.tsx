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
  let subtitle = 'Open to see the full invitation'
  let accent = '#A16207'
  let bg = '#0C0A09'
  let midBg = '#1C1917'

  try {
    const record = await getInvite(slug)
    if (record) {
      const { data, templateId } = record
      const template = getTemplate(templateId)
      if (template) {
        accent = template.accentColor
        // Set bg based on template
        if (templateId.includes('garden') || templateId.includes('bohemian')) {
          bg = '#F0FDF4'; midBg = '#DCFCE7'
        } else if (templateId.includes('beach')) {
          bg = '#0A1628'; midBg = '#0C2340'
        } else if (templateId.includes('celestial') || templateId.includes('midnight')) {
          bg = '#050510'; midBg = '#0A0614'
        }
      }

      if (data.type === 'wedding') {
        const w = data as WeddingData
        title = `${w.partner1.name} & ${w.partner2.name}`
        subtitle = `Getting Married · ${w.ceremony.city}`
      } else if (data.type === 'birthday') {
        const b = data as BirthdayData
        title = b.celebrant.name
        subtitle = b.age ? `Turning ${b.age} · ${b.event.city}` : `Birthday Celebration · ${b.event.city}`
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
          width: '1200px',
          height: '630px',
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
        {/* Border */}
        <div style={{
          position: 'absolute', inset: '20px',
          border: `1px solid ${accent}40`,
          display: 'flex',
        }} />
        <div style={{
          position: 'absolute', inset: '30px',
          border: `1px solid ${accent}20`,
          display: 'flex',
        }} />

        {/* Corner accents */}
        {[
          { top: 20, left: 20 },
          { top: 20, right: 20 },
          { bottom: 20, left: 20 },
          { bottom: 20, right: 20 },
        ].map((pos, i) => (
          <div key={i} style={{
            position: 'absolute',
            width: 40, height: 40,
            borderTop: i < 2 ? `2px solid ${accent}` : undefined,
            borderBottom: i >= 2 ? `2px solid ${accent}` : undefined,
            borderLeft: i % 2 === 0 ? `2px solid ${accent}` : undefined,
            borderRight: i % 2 === 1 ? `2px solid ${accent}` : undefined,
            opacity: 0.6,
            ...pos,
            display: 'flex',
          }} />
        ))}

        {/* Brand */}
        <div style={{
          color: accent, fontSize: 18, letterSpacing: '0.4em',
          textTransform: 'uppercase', marginBottom: 32, opacity: 0.7,
          display: 'flex',
        }}>
          INVITELY
        </div>

        {/* Divider */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 24 }}>
          <div style={{ width: 80, height: 1, background: accent, opacity: 0.4 }} />
          <div style={{ color: accent, fontSize: 20, opacity: 0.6 }}>✦</div>
          <div style={{ width: 80, height: 1, background: accent, opacity: 0.4 }} />
        </div>

        {/* Title */}
        <div style={{
          color: textColor,
          fontSize: title.length > 20 ? 56 : 72,
          fontWeight: 700,
          textAlign: 'center',
          maxWidth: 900,
          lineHeight: 1.1,
          marginBottom: 20,
          display: 'flex',
        }}>
          {title}
        </div>

        {/* Divider */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 24 }}>
          <div style={{ width: 60, height: 1, background: accent, opacity: 0.5 }} />
          <div style={{ color: accent, fontSize: 16, opacity: 0.7 }}>✦</div>
          <div style={{ width: 60, height: 1, background: accent, opacity: 0.5 }} />
        </div>

        {/* Subtitle */}
        <div style={{
          color: subtitleColor,
          fontSize: 28,
          letterSpacing: '0.1em',
          opacity: 0.6,
          textAlign: 'center',
          display: 'flex',
        }}>
          {subtitle}
        </div>

        {/* CTA */}
        <div style={{
          marginTop: 40,
          padding: '12px 40px',
          border: `1px solid ${accent}60`,
          color: accent,
          fontSize: 14,
          letterSpacing: '0.3em',
          textTransform: 'uppercase',
          display: 'flex',
        }}>
          OPEN INVITATION
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
    }
  )
}
