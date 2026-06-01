'use client'

import { useState } from 'react'
import { WeddingData, BirthdayData, PersonaAppearance } from '@/types/invitation'
import PersonaCustomiser from '@/components/persona/PersonaCustomiser'
import Link from 'next/link'

interface Props {
  slug: string
  record: { templateId: string; data: WeddingData | BirthdayData }
}

export default function EditInviteClient({ slug, record }: Props) {
  const { data, templateId } = record
  const isWedding = data.type === 'wedding'
  const w = isWedding ? data as WeddingData : null
  const b = !isWedding ? data as BirthdayData : null

  // Wedding fields
  const [p1Name, setP1Name] = useState(w?.partner1.name ?? '')
  const [p1Nick, setP1Nick] = useState(w?.partner1.nickname ?? '')
  const [p2Name, setP2Name] = useState(w?.partner2.name ?? '')
  const [p2Nick, setP2Nick] = useState(w?.partner2.nickname ?? '')
  const [p1Appearance, setP1Appearance] = useState<PersonaAppearance>(w?.partner1.appearance ?? { skinTone: 'tan', hairColor: '#1A0A00', hairStyle: 'short', outfitColor: '#1C1917', outfitStyle: 'indo-western', accentColor: '#A16207' })
  const [p2Appearance, setP2Appearance] = useState<PersonaAppearance>(w?.partner2.appearance ?? { skinTone: 'medium', hairColor: '#2C1810', hairStyle: 'long', outfitColor: '#8B1A1A', outfitStyle: 'traditional', accentColor: '#A16207' })
  const [howMet, setHowMet] = useState(w?.story.howTheyMet ?? '')
  const [memory, setMemory] = useState(w?.story.favoriteMemory ?? '')
  const [proposal, setProposal] = useState(w?.story.proposalStory ?? '')
  const [passions, setPassions] = useState(w?.story.sharedPassions?.join(', ') ?? '')
  const [wDate, setWDate] = useState(w?.ceremony.date ?? '')
  const [wTime, setWTime] = useState(w?.ceremony.time ?? '')
  const [wVenue, setWVenue] = useState(w?.ceremony.venue ?? '')
  const [wAddress, setWAddress] = useState(w?.ceremony.address ?? '')
  const [wCity, setWCity] = useState(w?.ceremony.city ?? '')
  const [hashtag, setHashtag] = useState(w?.hashtag ?? '')
  const [rsvpContact, setRsvpContact] = useState(w?.rsvpContact ?? '')
  const [customMsg, setCustomMsg] = useState(w?.customMessage ?? '')
  const [dressCode, setDressCode] = useState(w?.dressCode ?? '')
  const [wPhotos, setWPhotos] = useState(w?.photos?.join('\n') ?? '')

  // Birthday fields
  const [celebrantName, setCelebrantName] = useState(b?.celebrant.name ?? '')
  const [celebrantNick, setCelebrantNick] = useState(b?.celebrant.nickname ?? '')
  const [age, setAge] = useState(b?.age?.toString() ?? '')
  const [highlights, setHighlights] = useState(b?.story.highlights?.join('\n') ?? '')
  const [funFacts, setFunFacts] = useState(b?.story.funFacts?.join('\n') ?? '')
  const [bDate, setBDate] = useState(b?.event.date ?? '')
  const [bTime, setBTime] = useState(b?.event.time ?? '')
  const [bVenue, setBVenue] = useState(b?.event.venue ?? '')
  const [bAddress, setBAddress] = useState(b?.event.address ?? '')
  const [bCity, setBCity] = useState(b?.event.city ?? '')
  const [bRsvp, setBRsvp] = useState(b?.rsvpContact ?? '')
  const [bMsg, setBMsg] = useState(b?.customMessage ?? '')
  const [celebrantAppearance, setCelebrantAppearance] = useState<PersonaAppearance>(b?.celebrant.appearance ?? { skinTone: 'medium', hairColor: '#2C1810', hairStyle: 'long', outfitColor: '#7C3AED', outfitStyle: 'modern', accentColor: '#A16207' })

  const [saving, setSaving] = useState(false)
  const [saved, setSaved] = useState(false)
  const [error, setError] = useState('')

  async function save() {
    setSaving(true)
    setError('')
    try {
      let updatedData: WeddingData | BirthdayData

      if (isWedding && w) {
        updatedData = {
          ...w,
          partner1: { ...w.partner1, name: p1Name, nickname: p1Nick || undefined, appearance: p1Appearance },
          partner2: { ...w.partner2, name: p2Name, nickname: p2Nick || undefined, appearance: p2Appearance },
          story: {
            howTheyMet: howMet || undefined,
            favoriteMemory: memory || undefined,
            proposalStory: proposal || undefined,
            sharedPassions: passions ? passions.split(',').map(s => s.trim()).filter(Boolean) : undefined,
          },
          ceremony: { ...w.ceremony, date: wDate, time: wTime || undefined, venue: wVenue, address: wAddress || undefined, city: wCity },
          hashtag: hashtag || undefined,
          rsvpContact: rsvpContact || undefined,
          customMessage: customMsg || undefined,
          dressCode: dressCode || undefined,
          photos: wPhotos ? wPhotos.split('\n').map(s => s.trim()).filter(Boolean) : undefined,
        }
      } else if (b) {
        updatedData = {
          ...b,
          celebrant: { ...b.celebrant, name: celebrantName, nickname: celebrantNick || undefined, appearance: celebrantAppearance },
          age: age ? parseInt(age) : undefined,
          story: {
            highlights: highlights ? highlights.split('\n').map(s => s.trim()).filter(Boolean) : undefined,
            funFacts: funFacts ? funFacts.split('\n').map(s => s.trim()).filter(Boolean) : undefined,
          },
          event: { ...b.event, date: bDate, time: bTime || undefined, venue: bVenue, address: bAddress || undefined, city: bCity },
          rsvpContact: bRsvp || undefined,
          customMessage: bMsg || undefined,
        }
      } else return

      const res = await fetch(`/api/invites/${slug}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ data: updatedData }),
      })

      if (res.ok) {
        setSaved(true)
        setTimeout(() => setSaved(false), 3000)
      } else {
        setError('Failed to save. Please try again.')
      }
    } finally {
      setSaving(false)
    }
  }

  return (
    <div className="min-h-screen bg-[#0C0A09] text-[#FAFAF9] px-6 py-12">
      <div className="max-w-2xl mx-auto">

        <div className="flex items-center justify-between mb-10">
          <div>
            <p className="text-[#A16207] tracking-[0.3em] text-xs uppercase mb-2">Edit Invite</p>
            <h1 className="font-['Playfair_Display'] text-3xl text-[#FAFAF9]">
              {isWedding ? `${p1Name || '—'} & ${p2Name || '—'}` : celebrantName || '—'}
            </h1>
          </div>
          <div className="flex gap-3">
            <Link href={`/i/${slug}`} target="_blank"
              className="px-4 py-2 border border-white/10 text-[#FAFAF9] opacity-50 hover:opacity-100 text-xs tracking-widest uppercase transition-all">
              Preview
            </Link>
            <Link href={`/dashboard/${slug}`}
              className="px-4 py-2 border border-[#A16207] border-opacity-40 text-[#A16207] text-xs tracking-widest uppercase hover:bg-[#A16207] hover:text-[#0C0A09] transition-all">
              Dashboard
            </Link>
          </div>
        </div>

        <div className="space-y-5">
          {isWedding ? (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Field label="Partner 1 Name *" value={p1Name} onChange={setP1Name} placeholder="Arjun" />
                <Field label="Nickname" value={p1Nick} onChange={setP1Nick} placeholder="The Dreamer" />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Field label="Partner 2 Name *" value={p2Name} onChange={setP2Name} placeholder="Priya" />
                <Field label="Nickname" value={p2Nick} onChange={setP2Nick} placeholder="The Soul" />
              </div>
              <Divider label="The Story" />
              <TextArea label="How did you meet?" value={howMet} onChange={setHowMet} rows={3} />
              <TextArea label="A favourite memory" value={memory} onChange={setMemory} rows={3} />
              <TextArea label="The proposal story" value={proposal} onChange={setProposal} rows={3} />
              <Field label="Shared passions (comma separated)" value={passions} onChange={setPassions} />
              <Divider label="The Event" />
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Field label="Wedding Date *" value={wDate} onChange={setWDate} type="date" />
                <Field label="Time" value={wTime} onChange={setWTime} placeholder="7:00 PM onwards" />
              </div>
              <Field label="Venue *" value={wVenue} onChange={setWVenue} />
              <Field label="Address" value={wAddress} onChange={setWAddress} />
              <Field label="City *" value={wCity} onChange={setWCity} />
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Field label="Hashtag" value={hashtag} onChange={setHashtag} />
                <Field label="RSVP Contact" value={rsvpContact} onChange={setRsvpContact} />
              </div>
              <Field label="Dress Code" value={dressCode} onChange={setDressCode} />
              <TextArea label="Message to guests" value={customMsg} onChange={setCustomMsg} rows={2} />
              <Divider label="Photos" />
              <TextArea label="Photo URLs (one per line)" value={wPhotos} onChange={setWPhotos} rows={3} />
              <Divider label="Appearance" />
              <div className="space-y-8">
                <div>
                  <p className="font-['Playfair_Display'] text-lg text-[#FAFAF9] mb-4">{p1Name || 'Partner 1'} — Groom</p>
                  <PersonaCustomiser gender="man" initial={p1Appearance} onChange={setP1Appearance} />
                </div>
                <div>
                  <p className="font-['Playfair_Display'] text-lg text-[#FAFAF9] mb-4">{p2Name || 'Partner 2'} — Bride</p>
                  <PersonaCustomiser gender="woman" initial={p2Appearance} onChange={setP2Appearance} />
                </div>
              </div>
            </>
          ) : (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Field label="Name *" value={celebrantName} onChange={setCelebrantName} />
                <Field label="Nickname" value={celebrantNick} onChange={setCelebrantNick} />
              </div>
              <Field label="Age" value={age} onChange={setAge} type="number" />
              <Divider label="Their Story" />
              <TextArea label="Life highlights (one per line)" value={highlights} onChange={setHighlights} rows={5} />
              <TextArea label="Fun facts (one per line)" value={funFacts} onChange={setFunFacts} rows={4} />
              <Divider label="The Event" />
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Field label="Date *" value={bDate} onChange={setBDate} type="date" />
                <Field label="Time" value={bTime} onChange={setBTime} />
              </div>
              <Field label="Venue *" value={bVenue} onChange={setBVenue} />
              <Field label="Address" value={bAddress} onChange={setBAddress} />
              <Field label="City *" value={bCity} onChange={setBCity} />
              <Field label="RSVP Contact" value={bRsvp} onChange={setBRsvp} />
              <TextArea label="Message to guests" value={bMsg} onChange={setBMsg} rows={2} />
            </>
          )}
        </div>

        {error && <p className="mt-4 text-red-400 text-sm">{error}</p>}

        <div className="flex gap-4 mt-8">
          <button
            onClick={save}
            disabled={saving}
            className="flex-1 py-4 text-sm tracking-[0.2em] uppercase font-semibold transition-all duration-300 disabled:opacity-50"
            style={{ background: saved ? '#16A34A' : '#A16207', color: '#0C0A09' }}
          >
            {saving ? 'Saving...' : saved ? 'Saved!' : 'Save Changes'}
          </button>
          <Link
            href={`/i/${slug}`}
            target="_blank"
            className="px-8 py-4 border border-white/10 text-[#FAFAF9] opacity-50 hover:opacity-100 text-sm tracking-widest uppercase transition-all text-center"
          >
            View Live
          </Link>
        </div>
      </div>
    </div>
  )
}

function Field({ label, value, onChange, placeholder, type = 'text' }: {
  label: string; value: string; onChange: (v: string) => void; placeholder?: string; type?: string
}) {
  return (
    <div>
      <label className="block text-[#FAFAF9] opacity-50 text-xs tracking-widest uppercase mb-2">{label}</label>
      <input type={type} value={value} onChange={e => onChange(e.target.value)} placeholder={placeholder}
        className="w-full bg-[#111009] border border-white/10 text-[#FAFAF9] px-4 py-3 text-sm focus:outline-none focus:border-[#A16207] transition-colors placeholder:opacity-20" />
    </div>
  )
}

function TextArea({ label, value, onChange, placeholder, rows = 3 }: {
  label: string; value: string; onChange: (v: string) => void; placeholder?: string; rows?: number
}) {
  return (
    <div>
      <label className="block text-[#FAFAF9] opacity-50 text-xs tracking-widest uppercase mb-2">{label}</label>
      <textarea value={value} onChange={e => onChange(e.target.value)} placeholder={placeholder} rows={rows}
        className="w-full bg-[#111009] border border-white/10 text-[#FAFAF9] px-4 py-3 text-sm focus:outline-none focus:border-[#A16207] transition-colors resize-none placeholder:opacity-20" />
    </div>
  )
}

function Divider({ label }: { label: string }) {
  return (
    <div className="flex items-center gap-4 py-2">
      <div className="h-px flex-1 bg-white/10" />
      <span className="text-[#A16207] text-xs tracking-widest uppercase">{label}</span>
      <div className="h-px flex-1 bg-white/10" />
    </div>
  )
}
