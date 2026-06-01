import { getRsvps, getInvite } from '@/lib/store'
import { notFound } from 'next/navigation'
import { WeddingData, BirthdayData } from '@/types/invitation'
import { RsvpRecord } from '@/lib/store'
import DuplicateButton from '@/components/DuplicateButton'
import UpgradeButton from '@/components/UpgradeButton'

interface Props {
  params: Promise<{ slug: string }>
}

export default async function DashboardPage({ params }: Props) {
  const { slug } = await params
  const record = await getInvite(slug)
  if (!record) notFound()

  const rsvps = await getRsvps(slug)
  const { data } = record

  let eventTitle = 'Your Event'
  let eventDate = ''
  if (data.type === 'wedding') {
    const w = data as WeddingData
    eventTitle = `${w.partner1.name} & ${w.partner2.name}`
    eventDate = new Date(w.ceremony.date).toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' })
  } else if (data.type === 'birthday') {
    const b = data as BirthdayData
    eventTitle = b.age ? `${b.celebrant.name}'s ${b.age}th Birthday` : `${b.celebrant.name}'s Birthday`
    eventDate = new Date(b.event.date).toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' })
  }

  const yes = rsvps.filter(r => r.attending === 'yes')
  const no = rsvps.filter(r => r.attending === 'no')
  const maybe = rsvps.filter(r => r.attending === 'maybe')
  const totalGuests = yes.reduce((sum, r) => sum + (r.guests ?? 1), 0)

  return (
    <div className="min-h-screen bg-[#0C0A09] text-[#FAFAF9] px-6 py-12">
      <div className="max-w-3xl mx-auto">

        {/* Header */}
        <div className="mb-10">
          <p className="text-[#A16207] tracking-[0.3em] text-xs uppercase mb-2">RSVP Dashboard</p>
          <h1 className="font-['Playfair_Display'] text-4xl text-[#FAFAF9] mb-1">{eventTitle}</h1>
          <p className="text-[#FAFAF9] opacity-40 font-['Cormorant_Infant'] text-lg">{eventDate}</p>
          {/* Expiry info */}
          {record.expiresAt && (() => {
            const daysLeft = Math.ceil((new Date(record.expiresAt).getTime() - Date.now()) / (1000 * 60 * 60 * 24))
            const isExpiringSoon = daysLeft <= 14
            return (
              <div className="flex items-center gap-3 mt-3">
                <p className="text-xs" style={{ color: isExpiringSoon ? '#DC2626' : 'rgba(255,255,255,0.3)' }}>
                  {daysLeft > 0 ? `Expires in ${daysLeft} day${daysLeft !== 1 ? 's' : ''}` : 'Expired'}
                </p>
                {isExpiringSoon && (
                  <form action={`/api/invites/${slug}/extend`} method="POST">
                    <button
                      formMethod="PUT"
                      className="text-xs tracking-widest uppercase px-3 py-1 border border-[#A16207] border-opacity-40 text-[#A16207] hover:bg-[#A16207] hover:text-[#0C0A09] transition-all"
                    >
                      Extend
                    </button>
                  </form>
                )}
              </div>
            )
          })()}
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-12">
          {[
            { label: 'Total Views', value: record.views ?? 0, color: '#0891B2' },
            { label: 'Total Responses', value: rsvps.length, color: '#A16207' },
            { label: 'Attending', value: yes.length, color: '#16A34A' },
            { label: 'Not Attending', value: no.length, color: '#DC2626' },
            { label: 'Total Guests', value: totalGuests, color: '#7C3AED' },
          ].map(({ label, value, color }) => (
            <div key={label} className="border border-white/5 p-5 bg-[#111009]">
              <p className="font-['Playfair_Display'] text-4xl mb-1" style={{ color }}>{value}</p>
              <p className="text-[#FAFAF9] opacity-40 text-xs tracking-widest uppercase">{label}</p>
            </div>
          ))}
        </div>

        {/* RSVP breakdown bar */}
        {rsvps.length > 0 && (
          <div className="border border-white/5 p-5 bg-[#111009] mb-6">
            <p className="text-[#FAFAF9] opacity-40 text-xs tracking-widest uppercase mb-4">Response Breakdown</p>
            <div className="flex h-3 rounded-full overflow-hidden gap-0.5 mb-3">
              {yes.length > 0 && (
                <div className="rounded-full transition-all duration-700" style={{ width: `${(yes.length / rsvps.length) * 100}%`, background: '#16A34A' }} />
              )}
              {maybe.length > 0 && (
                <div className="rounded-full transition-all duration-700" style={{ width: `${(maybe.length / rsvps.length) * 100}%`, background: '#F59E0B' }} />
              )}
              {no.length > 0 && (
                <div className="rounded-full transition-all duration-700" style={{ width: `${(no.length / rsvps.length) * 100}%`, background: '#DC2626' }} />
              )}
            </div>
            <div className="flex gap-6 text-xs">
              <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-[#16A34A]" /><span className="text-[#FAFAF9] opacity-50">Attending {yes.length}</span></span>
              <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-[#F59E0B]" /><span className="text-[#FAFAF9] opacity-50">Maybe {maybe.length}</span></span>
              <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-[#DC2626]" /><span className="text-[#FAFAF9] opacity-50">No {no.length}</span></span>
            </div>
          </div>
        )}

        {/* Conversion rate */}
        {(record.views ?? 0) > 0 && (
          <div className="border border-white/5 p-5 bg-[#111009] mb-8">
            <p className="text-[#FAFAF9] opacity-40 text-xs tracking-widest uppercase mb-3">Conversion Funnel</p>
            <div className="space-y-2">
              {[
                { label: 'Views', value: record.views ?? 0, color: '#0891B2', pct: 100 },
                { label: 'RSVPs', value: rsvps.length, color: '#A16207', pct: Math.round((rsvps.length / Math.max(record.views ?? 1, 1)) * 100) },
                { label: 'Attending', value: yes.length, color: '#16A34A', pct: Math.round((yes.length / Math.max(record.views ?? 1, 1)) * 100) },
              ].map(({ label, value, color, pct }) => (
                <div key={label} className="flex items-center gap-3">
                  <span className="text-[#FAFAF9] opacity-40 text-xs w-16 flex-shrink-0">{label}</span>
                  <div className="flex-1 h-2 bg-white/5 rounded-full overflow-hidden">
                    <div className="h-full rounded-full transition-all duration-700" style={{ width: `${pct}%`, background: color }} />
                  </div>
                  <span className="text-xs flex-shrink-0" style={{ color, opacity: 0.8 }}>{value} <span className="text-[#FAFAF9] opacity-30">({pct}%)</span></span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Invite link */}
        <div className="border border-white/5 p-5 bg-[#111009] mb-4 flex items-center gap-4 flex-wrap">
          <div className="flex-1 min-w-0">
            <p className="text-[#A16207] text-xs tracking-widest uppercase mb-1">Invite Link</p>
            <p className="text-[#FAFAF9] opacity-60 text-sm truncate">
              {`${process.env.NEXT_PUBLIC_BASE_URL ?? ''}/i/${slug}`}
            </p>
          </div>
          <a
            href={`/i/${slug}`}
            target="_blank"
            className="flex-shrink-0 px-4 py-2 border border-[#A16207] border-opacity-40 text-[#A16207] text-xs tracking-widest uppercase hover:bg-[#A16207] hover:text-[#0C0A09] transition-all"
          >
            View
          </a>
          <a
            href={`/edit/${slug}`}
            className="flex-shrink-0 px-4 py-2 border border-white/10 text-[#FAFAF9] opacity-50 hover:opacity-100 text-xs tracking-widest uppercase transition-all"
          >
            Edit
          </a>
          <a
            href={`/api/rsvp/${slug}`}
            download
            className="flex-shrink-0 px-4 py-2 border border-white/10 text-[#FAFAF9] opacity-50 hover:opacity-100 text-xs tracking-widest uppercase transition-all"
          >
            Export CSV
          </a>
          <DuplicateButton
            slug={slug}
            title={eventTitle}
            templateId={record.templateId}
            category={data.type as 'wedding' | 'birthday'}
          />
        </div>

        {/* QR Code */}
        <div className="border border-white/5 p-5 bg-[#111009] mb-8 flex items-center gap-6">
          <img
            src={`/api/qr?url=${encodeURIComponent(`${process.env.NEXT_PUBLIC_BASE_URL ?? ''}/i/${slug}`)}`}
            alt="QR Code"
            className="w-20 h-20 flex-shrink-0"
          />
          <div>
            <p className="text-[#A16207] text-xs tracking-widest uppercase mb-1">QR Code</p>
            <p className="text-[#FAFAF9] opacity-40 text-sm leading-relaxed">
              Print this on physical invites or display at the venue. Guests scan to open the digital invite.
            </p>
            <a
              href={`/api/qr?url=${encodeURIComponent(`${process.env.NEXT_PUBLIC_BASE_URL ?? ''}/i/${slug}`)}`}
              download={`${slug}-qr.svg`}
              className="inline-block mt-2 text-xs tracking-widest uppercase text-[#A16207] opacity-60 hover:opacity-100 transition-opacity"
            >
              Download SVG →
            </a>
          </div>
        </div>

        {/* Upgrade */}
        <div className="mb-8">
          <UpgradeButton
            slug={slug}
            currentTier={(record.tier ?? 'classic') as 'classic' | 'premium' | 'luxury'}
          />
        </div>

        {/* RSVP list */}
        <div>
          <p className="text-[#FAFAF9] opacity-40 text-xs tracking-widest uppercase mb-4">
            Responses ({rsvps.length})
          </p>

          {rsvps.length === 0 ? (
            <div className="border border-white/5 p-10 text-center">
              <p className="font-['Cormorant_Infant'] text-xl text-[#FAFAF9] opacity-30">
                No RSVPs yet. Share your invite link to start collecting responses.
              </p>
            </div>
          ) : (
            <div className="space-y-3">
              {rsvps.map((r: RsvpRecord) => (
                <div key={r.id} className="border border-white/5 p-4 bg-[#111009] flex items-start gap-4">
                  <div
                    className="w-2 h-2 rounded-full mt-2 flex-shrink-0"
                    style={{ background: r.attending === 'yes' ? '#16A34A' : r.attending === 'no' ? '#DC2626' : '#F59E0B' }}
                  />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-3 flex-wrap">
                      <p className="text-[#FAFAF9] font-semibold text-sm">{r.name}</p>
                      <span
                        className="text-[10px] tracking-widest uppercase px-2 py-0.5"
                        style={{
                          color: r.attending === 'yes' ? '#16A34A' : r.attending === 'no' ? '#DC2626' : '#F59E0B',
                          border: `1px solid ${r.attending === 'yes' ? '#16A34A40' : r.attending === 'no' ? '#DC262640' : '#F59E0B40'}`,
                        }}
                      >
                        {r.attending === 'yes' ? `Attending · ${r.guests ?? 1} guest${(r.guests ?? 1) > 1 ? 's' : ''}` : r.attending === 'maybe' ? 'Maybe' : 'Not Attending'}
                      </span>
                    </div>
                    {r.phone && <p className="text-[#FAFAF9] opacity-40 text-xs mt-0.5">{r.phone}</p>}
                    {r.message && <p className="text-[#FAFAF9] opacity-50 text-sm mt-1 font-['Cormorant_Infant'] italic">"{r.message}"</p>}
                    <p className="text-[#FAFAF9] opacity-20 text-xs mt-1">
                      {new Date(r.createdAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit' })}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="mt-12 pt-8 border-t border-white/5 text-center">
          <p className="font-['Great_Vibes'] text-3xl text-[#FAFAF9] opacity-20">Invitely</p>
        </div>
      </div>
    </div>
  )
}
