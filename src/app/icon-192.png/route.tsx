import { ImageResponse } from '@vercel/og'

export const runtime = 'nodejs'

function InvitelyIcon({ size }: { size: number }) {
  const pad = size * 0.15
  const inner = size - pad * 2
  const fontSize = size * 0.35

  return (
    <div
      style={{
        width: size,
        height: size,
        background: 'linear-gradient(135deg, #1C1917 0%, #0C0A09 100%)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: size * 0.2,
        position: 'relative',
      }}
    >
      {/* Gold ring */}
      <div style={{
        position: 'absolute',
        inset: pad * 0.6,
        border: `${size * 0.015}px solid #A16207`,
        borderRadius: size * 0.16,
        opacity: 0.4,
        display: 'flex',
      }} />
      {/* I letter */}
      <div style={{
        fontFamily: 'Georgia, serif',
        fontSize,
        fontWeight: 700,
        color: '#A16207',
        lineHeight: 1,
        display: 'flex',
      }}>
        I
      </div>
      {/* Gold dot */}
      <div style={{
        position: 'absolute',
        bottom: pad * 1.2,
        left: '50%',
        transform: 'translateX(-50%)',
        width: size * 0.06,
        height: size * 0.06,
        borderRadius: '50%',
        background: '#A16207',
        display: 'flex',
      }} />
    </div>
  )
}

export async function GET() {
  return new ImageResponse(<InvitelyIcon size={192} />, { width: 192, height: 192 })
}
