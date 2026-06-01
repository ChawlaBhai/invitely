'use client'

import { useState, Suspense } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { WeddingData, BirthdayData, InvitationData, PersonaAppearance } from '@/types/invitation'
import { TEMPLATES, getTemplatesByCategory } from '@/lib/templates'
import PersonaCustomiser from '@/components/persona/PersonaCustomiser'
import TemplatePreviewOverlay from '@/components/TemplatePreviewOverlay'
import PhotoUploader from '@/components/PhotoUploader'
import FontPicker from '@/components/FontPicker'
import Link from 'next/link'
import { useRecentInvites } from '@/hooks/useRecentInvites'

type Step = 'category' | 'template' | 'details' | 'personas' | 'preview'

const DEFAULT_APPEARANCE: PersonaAppearance = {
  skinTone: 'medium',
  hairColor: '#2C1810',
  hairStyle: 'long',
  outfitColor: '#8B1A1A',
  outfitStyle: 'traditional',
  accentColor: '#A16207',
}

const DEFAULT_MAN_APPEARANCE: PersonaAppearance = {
  skinTone: 'tan',
  hairColor: '#1A0A00',
  hairStyle: 'short',
  outfitColor: '#1C1917',
  outfitStyle: 'indo-western',
  accentColor: '#A16207',
}

const STEP_LABELS: Record<Step, string> = {
  category: 'Occasion',
  template: 'Template',
  details: 'Your Story',
  personas: 'Appearance',
  preview: 'Preview',
}

const STEPS: Step[] = ['category', 'template', 'details', 'personas', 'preview']

export default function BuilderPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#0C0A09]" />}>
      <BuilderPageInner />
    </Suspense>
  )
}

function BuilderPageInner() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const referredBy = searchParams.get('ref') ?? undefined
  const [step, setStep] = useState<Step>('category')
  const [category, setCategory] = useState<'wedding' | 'birthday' | null>(null)
  const [templateId, setTemplateId] = useState<string | null>(null)

  // Wedding fields
  const [p1Name, setP1Name] = useState('')
  const [p1Nick, setP1Nick] = useState('')
  const [p2Name, setP2Name] = useState('')
  const [p2Nick, setP2Nick] = useState('')
  const [howMet, setHowMet] = useState('')
  const [memory, setMemory] = useState('')
  const [proposal, setProposal] = useState('')
  const [passions, setPassions] = useState('')
  const [wDate, setWDate] = useState('')
  const [wTime, setWTime] = useState('')
  const [wVenue, setWVenue] = useState('')
  const [wAddress, setWAddress] = useState('')
  const [wCity, setWCity] = useState('')
  const [hashtag, setHashtag] = useState('')
  const [rsvpContact, setRsvpContact] = useState('')
  const [customMsg, setCustomMsg] = useState('')
  const [dressCode, setDressCode] = useState('')
  const [creatorEmail, setCreatorEmail] = useState('')
  const [wMusicUrl, setWMusicUrl] = useState('')
  const [invitePassword, setInvitePassword] = useState('')
  const [wPhotos, setWPhotos] = useState<string[]>([])
  const [customAccentColor, setCustomAccentColor] = useState('')
  const [customFonts, setCustomFonts] = useState<{ display: string; script: string; body: string } | undefined>(undefined)

  // Birthday fields
  const [celebrantName, setCelebrantName] = useState('')
  const [celebrantNick, setCelebrantNick] = useState('')
  const [celebrantGender, setCelebrantGender] = useState<'woman' | 'man' | 'other'>('woman')
  const [age, setAge] = useState('')
  const [highlights, setHighlights] = useState('')
  const [funFacts, setFunFacts] = useState('')
  const [bDate, setBDate] = useState('')
  const [bTime, setBTime] = useState('')
  const [bVenue, setBVenue] = useState('')
  const [bAddress, setBAddress] = useState('')
  const [bCity, setBCity] = useState('')
  const [bRsvp, setBRsvp] = useState('')
  const [bMsg, setBMsg] = useState('')
  const [bPhotos, setBPhotos] = useState<string[]>([])

  // Personas
  const [p1Appearance, setP1Appearance] = useState<PersonaAppearance>(DEFAULT_MAN_APPEARANCE)
  const [p2Appearance, setP2Appearance] = useState<PersonaAppearance>(DEFAULT_APPEARANCE)
  const [celebrantAppearance, setCelebrantAppearance] = useState<PersonaAppearance>(DEFAULT_APPEARANCE)

  const selectedTemplate = TEMPLATES.find(t => t.id === templateId)
  const [shareUrl, setShareUrl] = useState<string | null>(null)
  const [isGenerating, setIsGenerating] = useState(false)
  const [copied, setCopied] = useState(false)
  const [validationError, setValidationError] = useState<string | null>(null)
  const [previewingTemplate, setPreviewingTemplate] = useState<string | null>(null)
  const [customSlugInput, setCustomSlugInput] = useState('')
  const [slugStatus, setSlugStatus] = useState<'idle' | 'checking' | 'available' | 'taken' | 'invalid'>('idle')
  const [slugError, setSlugError] = useState('')
  const { save: saveRecent } = useRecentInvites()

  function buildInviteData(): InvitationData | null {
    if (category === 'wedding') {
      if (!p1Name || !p2Name || !wDate || !wVenue || !wCity) return null
      const data: WeddingData = {
        type: 'wedding',
        partner1: { name: p1Name, nickname: p1Nick || undefined, appearance: p1Appearance },
        partner2: { name: p2Name, nickname: p2Nick || undefined, appearance: p2Appearance },
        story: {
          howTheyMet: howMet || undefined,
          favoriteMemory: memory || undefined,
          proposalStory: proposal || undefined,
          sharedPassions: passions ? passions.split(',').map(s => s.trim()).filter(Boolean) : undefined,
        },
        ceremony: { date: wDate, time: wTime || undefined, venue: wVenue, address: wAddress || undefined, city: wCity },
        hashtag: hashtag || undefined,
        rsvpContact: rsvpContact || undefined,
        customMessage: customMsg || undefined,
        dressCode: dressCode || undefined,
        photos: wPhotos.length > 0 ? wPhotos : undefined,
        customAccentColor: customAccentColor || undefined,
        creatorEmail: creatorEmail || undefined,
        musicUrl: wMusicUrl || undefined,
        customFonts: customFonts || undefined,
        invitePassword: invitePassword || undefined,
      }
      return data
    } else if (category === 'birthday') {
      if (!celebrantName || !bDate || !bVenue || !bCity) return null
      const data: BirthdayData = {
        type: 'birthday',
        celebrant: { name: celebrantName, nickname: celebrantNick || undefined, appearance: celebrantAppearance },
        age: age ? parseInt(age) : undefined,
        gender: celebrantGender,
        story: {
          highlights: highlights ? highlights.split('\n').map(s => s.trim()).filter(Boolean) : undefined,
          funFacts: funFacts ? funFacts.split('\n').map(s => s.trim()).filter(Boolean) : undefined,
        },
        event: { date: bDate, time: bTime || undefined, venue: bVenue, address: bAddress || undefined, city: bCity },
        rsvpContact: bRsvp || undefined,
        customMessage: bMsg || undefined,
        photos: bPhotos.length > 0 ? bPhotos : undefined,
        customAccentColor: customAccentColor || undefined,
        creatorEmail: creatorEmail || undefined,
        customFonts: customFonts || undefined,
      }
      return data
    }
    return null
  }

  async function generateShareLink() {
    if (!templateId) return
    const data = buildInviteData()
    if (!data) return
    setIsGenerating(true)
    try {
      const res = await fetch('/api/invites', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ templateId, data, ...(referredBy ? { referredBy } : {}) }),
      })
      const json = await res.json()
      if (json.slug) {
        const url = `${window.location.origin}/i/${json.slug}`
        setShareUrl(url)
        const title = category === 'wedding' ? `${p1Name} & ${p2Name}` : celebrantName
        saveRecent({ slug: json.slug, title, templateId, category: category!, createdAt: new Date().toISOString() })
      }
    } finally {
      setIsGenerating(false)
    }
  }

  async function copyLink() {
    if (!shareUrl) return
    await navigator.clipboard.writeText(shareUrl)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  function goNext() {
    const idx = STEPS.indexOf(step)
    if (idx < STEPS.length - 1) setStep(STEPS[idx + 1])
  }

  function validateDetails(): string | null {
    if (category === 'wedding') {
      if (!p1Name.trim()) return 'Partner 1 name is required'
      if (!p2Name.trim()) return 'Partner 2 name is required'
      if (!wDate) return 'Wedding date is required'
      if (!wVenue.trim()) return 'Venue is required'
      if (!wCity.trim()) return 'City is required'
    } else if (category === 'birthday') {
      if (!celebrantName.trim()) return 'Name is required'
      if (!bDate) return 'Date is required'
      if (!bVenue.trim()) return 'Venue is required'
      if (!bCity.trim()) return 'City is required'
    }
    return null
  }

  function goBack() {
    const idx = STEPS.indexOf(step)
    if (idx > 0) setStep(STEPS[idx - 1])
  }

  function handlePreview() {
    if (!templateId) return
    if (shareUrl) {
      window.open(shareUrl, '_blank')
    } else {
      router.push(`/preview/${templateId}`)
    }
  }

  async function handlePersonasContinue() {
    // Auto-generate invite when moving to preview step
    if (!templateId) { goNext(); return }
    const data = buildInviteData()
    if (!data) { goNext(); return }
    setIsGenerating(true)
    try {
      const res = await fetch('/api/invites', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ templateId, data, ...(referredBy ? { referredBy } : {}) }),
      })
      const json = await res.json()
      if (json.slug) {
        const url = `${window.location.origin}/i/${json.slug}`
        setShareUrl(url)
        const title = category === 'wedding' ? `${p1Name} & ${p2Name}` : celebrantName
        saveRecent({ slug: json.slug, title, templateId, category: category!, createdAt: new Date().toISOString() })
      }
    } finally {
      setIsGenerating(false)
      goNext()
    }
  }

  const stepIndex = STEPS.indexOf(step)

  return (
    <div className="min-h-screen bg-[#0C0A09] text-[#FAFAF9]">
      {/* Template preview overlay */}
      {previewingTemplate && (
        <TemplatePreviewOverlay
          templateId={previewingTemplate}
          templateName={TEMPLATES.find(t => t.id === previewingTemplate)?.name ?? previewingTemplate}
          onClose={() => setPreviewingTemplate(null)}
          onSelect={() => { setTemplateId(previewingTemplate); setPreviewingTemplate(null) }}
        />
      )}
      {/* Nav */}
      <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-4 bg-[#0C0A09]/90 backdrop-blur-md border-b border-white/5">
        <Link href="/" className="font-['Great_Vibes'] text-2xl text-[#FAFAF9] flex-shrink-0">Invitely</Link>
        {/* Step indicator — desktop shows labels, mobile shows dots */}
        <div className="hidden sm:flex items-center gap-2">
          {STEPS.map((s, i) => (
            <div key={s} className="flex items-center gap-2">
              <button
                onClick={() => i < stepIndex && setStep(s)}
                className={`text-xs tracking-widest uppercase transition-all duration-300 ${
                  s === step ? 'text-[#A16207]' : i < stepIndex ? 'text-[#FAFAF9] opacity-50 hover:opacity-80 cursor-pointer' : 'text-[#FAFAF9] opacity-20 cursor-default'
                }`}
              >
                {STEP_LABELS[s]}
              </button>
              {i < STEPS.length - 1 && <span className="text-[#FAFAF9] opacity-20 text-xs">›</span>}
            </div>
          ))}
        </div>
        {/* Mobile: step dots */}
        <div className="flex sm:hidden items-center gap-2">
          {STEPS.map((s, i) => (
            <div key={s} className={`w-2 h-2 rounded-full transition-all duration-300 ${
              s === step ? 'bg-[#A16207]' : i < stepIndex ? 'bg-[#FAFAF9] opacity-40' : 'bg-[#FAFAF9] opacity-10'
            }`} />
          ))}
          <span className="text-[#A16207] text-xs tracking-widest uppercase ml-2">{STEP_LABELS[step]}</span>
          <Link href="/my-invites" className="ml-3 text-[#FAFAF9] opacity-30 hover:opacity-60 transition-opacity text-xs tracking-widest uppercase hidden sm:block">My Invites</Link>
        </div>
      </nav>

      <div className="pt-20 min-h-screen flex flex-col">
        {/* Progress bar */}
        <div className="h-px bg-[#1C1917]">
          <div
            className="h-full bg-[#A16207] transition-all duration-700"
            style={{ width: `${((stepIndex + 1) / STEPS.length) * 100}%` }}
          />
        </div>

        {/* Split layout: form left, preview right (desktop only) */}
        <div className="flex-1 flex">
          {/* Form panel */}
          <div className={`flex flex-col items-center justify-center px-6 py-16 w-full ${templateId && step !== 'category' ? 'lg:w-1/2 lg:border-r lg:border-white/5' : ''}`}>

          {/* ── STEP 1: CATEGORY ── */}
          {step === 'category' && (
            <div className="w-full max-w-2xl text-center">
              <p className="text-[#A16207] tracking-[0.3em] text-xs uppercase mb-4">Let's Begin</p>
              <h1 className="font-['Playfair_Display'] text-4xl md:text-5xl text-[#FAFAF9] mb-4">What Are We Celebrating?</h1>
              <p className="font-['Cormorant_Infant'] text-lg text-[#FAFAF9] opacity-50 mb-12">
                Every celebration deserves its own world.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {[
                  { id: 'wedding' as const, label: 'Wedding', sub: '7 templates · Two souls, one story', icon: '💍' },
                  { id: 'birthday' as const, label: 'Birthday', sub: '6 templates · A life worth celebrating', icon: '✨' },
                ].map(opt => (
                  <button
                    key={opt.id}
                    onClick={() => { setCategory(opt.id); goNext() }}
                    className="group relative p-8 border border-white/10 hover:border-[#A16207] hover:border-opacity-50 transition-all duration-500 text-left"
                    style={{ background: category === opt.id ? 'rgba(161,98,7,0.08)' : 'transparent' }}
                  >
                    <div className="text-4xl mb-4">{opt.icon}</div>
                    <h3 className="font-['Playfair_Display'] text-2xl text-[#FAFAF9] mb-2">{opt.label}</h3>
                    <p className="text-[#FAFAF9] opacity-40 text-sm font-['Cormorant_Infant']">{opt.sub}</p>
                    <div className="absolute bottom-4 right-4 text-[#A16207] opacity-0 group-hover:opacity-100 transition-opacity">→</div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* ── STEP 2: TEMPLATE ── */}
          {step === 'template' && category && (
            <div className="w-full max-w-4xl">
              <div className="text-center mb-10">
                <p className="text-[#A16207] tracking-[0.3em] text-xs uppercase mb-4">Choose Your World</p>
                <h1 className="font-['Playfair_Display'] text-4xl text-[#FAFAF9]">Pick a Template</h1>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {getTemplatesByCategory(category).map(t => (
                  <div
                    key={t.id}
                    className="group relative overflow-hidden border transition-all duration-500"
                    style={{
                      borderColor: templateId === t.id ? t.accentColor : 'rgba(255,255,255,0.08)',
                      background: templateId === t.id ? `${t.accentColor}10` : '#111009',
                    }}
                  >
                    <button
                      onClick={() => setTemplateId(t.id)}
                      className="w-full text-left"
                    >
                      <div className="h-36 flex items-center justify-center relative overflow-hidden"
                        style={{ background: `radial-gradient(ellipse at center, ${t.accentColor}15 0%, #0C0A09 70%)` }}>
                        <p className="text-4xl" style={{ fontFamily: `'${t.fonts.script}', cursive`, color: '#FAFAF9' }}>
                          {t.name}
                        </p>
                        {templateId === t.id && (
                          <div className="absolute top-2 right-2 w-5 h-5 rounded-full flex items-center justify-center text-xs"
                            style={{ background: t.accentColor, color: '#0C0A09' }}>✓</div>
                        )}
                      </div>
                      <div className="p-4 pb-2">
                        <p className="text-[#FAFAF9] text-sm font-['Cormorant_Infant'] opacity-50 leading-relaxed">{t.description}</p>
                      </div>
                    </button>
                    <div className="px-4 pb-4">
                      <button
                        onClick={() => setPreviewingTemplate(t.id)}
                        className="text-xs tracking-widest uppercase transition-all duration-200 hover:opacity-100"
                        style={{ color: t.accentColor, opacity: 0.6 }}
                      >
                        Preview →
                      </button>
                    </div>
                  </div>
                ))}
              </div>
              <div className="flex justify-between mt-8">
                <button onClick={goBack} className="px-6 py-3 border border-white/10 text-[#FAFAF9] opacity-50 hover:opacity-100 text-xs tracking-widest uppercase transition-all">
                  Back
                </button>
                <button
                  onClick={goNext}
                  disabled={!templateId}
                  className="px-10 py-3 text-xs tracking-widest uppercase font-semibold transition-all duration-300 disabled:opacity-30"
                  style={{ background: templateId ? '#A16207' : '#333', color: '#0C0A09' }}
                >
                  Continue →
                </button>
              </div>
            </div>
          )}

          {/* ── STEP 3: DETAILS ── */}
          {step === 'details' && (
            <div className="w-full max-w-2xl">
              <div className="text-center mb-10">
                <p className="text-[#A16207] tracking-[0.3em] text-xs uppercase mb-4">Tell Your Story</p>
                <h1 className="font-['Playfair_Display'] text-4xl text-[#FAFAF9]">
                  {category === 'wedding' ? 'About the Couple' : 'About the Celebrant'}
                </h1>
              </div>

              <div className="space-y-6">
                {category === 'wedding' ? (
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
                    <TextArea label="How did you meet?" value={howMet} onChange={setHowMet} placeholder="It was a monsoon evening in Bombay..." rows={3} />
                    <TextArea label="A favourite memory together" value={memory} onChange={setMemory} placeholder="A road trip where the car broke down..." rows={3} />
                    <TextArea label="The proposal story" value={proposal} onChange={setProposal} placeholder="He proposed at 2am on the terrace..." rows={3} />
                    <Field label="Shared passions (comma separated)" value={passions} onChange={setPassions} placeholder="Mountains, Old Bollywood, Filter Coffee" />
                    <Divider label="The Event" />
                    <div className="grid grid-cols-2 gap-4">
                      <Field label="Wedding Date *" value={wDate} onChange={setWDate} type="date" />
                      <Field label="Time" value={wTime} onChange={setWTime} placeholder="7:00 PM onwards" />
                    </div>
                    <Field label="Venue *" value={wVenue} onChange={setWVenue} placeholder="The Leela Palace" />
                    <Field label="Address" value={wAddress} onChange={setWAddress} placeholder="Diplomatic Enclave, Chanakyapuri" />
                    <Field label="City *" value={wCity} onChange={setWCity} placeholder="New Delhi" />
                    <div className="grid grid-cols-2 gap-4">
                      <Field label="Hashtag" value={hashtag} onChange={setHashtag} placeholder="ArjunWedsPriya" />
                      <Field label="RSVP Contact" value={rsvpContact} onChange={setRsvpContact} placeholder="+91 98765 43210" />
                    </div>
                    <Field label="Dress Code" value={dressCode} onChange={setDressCode} placeholder="Black Tie / Indian Formal" />
                    <Field label="Your Email (for RSVP alerts)" value={creatorEmail} onChange={setCreatorEmail} placeholder="you@email.com" type="email" />
                    <Field label="Background Music URL (optional)" value={wMusicUrl} onChange={setWMusicUrl} placeholder="https://your-music.mp3" />
                    <TextArea label="A message to your guests" value={customMsg} onChange={setCustomMsg} placeholder="Two imperfect people who found something perfect..." rows={2} />
                    <Divider label="Customise" />
                    <div>
                      <label className="block text-[#FAFAF9] opacity-50 text-xs tracking-widest uppercase mb-2">Accent Color (optional)</label>
                      <div className="flex items-center gap-3">
                        <input
                          type="color"
                          value={customAccentColor || selectedTemplate?.accentColor || '#A16207'}
                          onChange={e => setCustomAccentColor(e.target.value)}
                          className="w-10 h-10 rounded cursor-pointer border-0 bg-transparent"
                        />
                        <span className="text-[#FAFAF9] opacity-40 text-sm">{customAccentColor || selectedTemplate?.accentColor || '#A16207'}</span>
                        {customAccentColor && (
                          <button onClick={() => setCustomAccentColor('')} className="text-[#FAFAF9] opacity-30 hover:opacity-60 text-xs tracking-widest uppercase transition-opacity">
                            Reset
                          </button>
                        )}
                      </div>
                      <p className="text-[#FAFAF9] opacity-20 text-xs mt-1">Overrides the template's default accent color</p>
                    </div>
                    <FontPicker
                      value={customFonts}
                      onChange={setCustomFonts}
                      accentColor={selectedTemplate?.accentColor}
                    />
                    <Field label="Invite Password (optional)" value={invitePassword} onChange={setInvitePassword} placeholder="Leave blank for public access" type="password" />
                    <Divider label="Photos (optional)" />
                    <PhotoUploader
                      photos={wPhotos}
                      onChange={setWPhotos}
                      accentColor={selectedTemplate?.accentColor}
                    />
                  </>
                ) : (
                  <>
                    <div className="grid grid-cols-2 gap-4">
                      <Field label="Name *" value={celebrantName} onChange={setCelebrantName} placeholder="Riya" />
                      <Field label="Nickname" value={celebrantNick} onChange={setCelebrantNick} placeholder="The Force of Nature" />
                    </div>
                    <div>
                      <label className="block text-[#FAFAF9] opacity-50 text-xs tracking-widest uppercase mb-3">Gender</label>
                      <div className="flex gap-2">
                        {(['woman', 'man', 'other'] as const).map(g => (
                          <button key={g} onClick={() => setCelebrantGender(g)}
                            className="px-4 py-2 text-xs tracking-wider uppercase transition-all duration-200 capitalize"
                            style={{
                              border: `1px solid ${celebrantGender === g ? (selectedTemplate?.accentColor ?? '#A16207') : 'rgba(255,255,255,0.1)'}`,
                              color: celebrantGender === g ? (selectedTemplate?.accentColor ?? '#A16207') : 'rgba(255,255,255,0.4)',
                              background: celebrantGender === g ? `${selectedTemplate?.accentColor ?? '#A16207'}15` : 'transparent',
                            }}>
                            {g}
                          </button>
                        ))}
                      </div>
                    </div>
                    <Field label="Age (optional)" value={age} onChange={setAge} placeholder="30" type="number" />
                    <Divider label="Their Story" />
                    <TextArea label="Life highlights (one per line)" value={highlights} onChange={setHighlights}
                      placeholder={"Moved to a new city at 22 with one suitcase\nStarted a business that failed — then started another\nClimbed Kedarnath in the rain"} rows={5} />
                    <TextArea label="Fun facts (one per line)" value={funFacts} onChange={setFunFacts}
                      placeholder={"Has read 200+ books but judges them by covers\nCan parallel park but cannot fold a fitted sheet"} rows={4} />
                    <Divider label="The Event" />
                    <div className="grid grid-cols-2 gap-4">
                      <Field label="Date *" value={bDate} onChange={setBDate} type="date" />
                      <Field label="Time" value={bTime} onChange={setBTime} placeholder="8:00 PM onwards" />
                    </div>
                    <Field label="Venue *" value={bVenue} onChange={setBVenue} placeholder="Rooftop at The Taj" />
                    <Field label="Address" value={bAddress} onChange={setBAddress} placeholder="Mansingh Road" />
                    <Field label="City *" value={bCity} onChange={setBCity} placeholder="New Delhi" />
                    <Field label="RSVP Contact" value={bRsvp} onChange={setBRsvp} placeholder="+91 98765 43210" />
                    <TextArea label="A message to your guests" value={bMsg} onChange={setBMsg}
                      placeholder="She did not come this far to only come this far..." rows={2} />
                    <Divider label="Photos (optional)" />
                    <PhotoUploader
                      photos={bPhotos}
                      onChange={setBPhotos}
                      accentColor={selectedTemplate?.accentColor}
                    />
                  </>
                )}
              </div>

              <div className="flex flex-col gap-3 mt-8">
                {validationError && (
                  <p className="text-center text-sm py-2 px-4 border border-red-500/30 text-red-400 bg-red-500/5">
                    {validationError}
                  </p>
                )}
                <div className="flex justify-between">
                  <button onClick={goBack} className="px-6 py-3 border border-white/10 text-[#FAFAF9] opacity-50 hover:opacity-100 text-xs tracking-widest uppercase transition-all">
                    Back
                  </button>
                  <button
                    onClick={() => {
                      const err = validateDetails()
                      if (err) { setValidationError(err); return }
                      setValidationError(null)
                      goNext()
                    }}
                    className="px-10 py-3 bg-[#A16207] text-[#0C0A09] text-xs tracking-widest uppercase font-semibold hover:bg-[#FAFAF9] transition-all duration-300"
                  >
                    Continue →
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* ── STEP 4: PERSONAS ── */}
          {step === 'personas' && (
            <div className="w-full max-w-3xl">
              <div className="text-center mb-10">
                <p className="text-[#A16207] tracking-[0.3em] text-xs uppercase mb-4">Make It Personal</p>
                <h1 className="font-['Playfair_Display'] text-4xl text-[#FAFAF9]">Customise the Look</h1>
                <p className="font-['Cormorant_Infant'] text-lg text-[#FAFAF9] opacity-50 mt-2">
                  Your illustrated characters will appear throughout the invite.
                </p>
              </div>

              {category === 'wedding' ? (
                <div className="space-y-12">
                  <div>
                    <h3 className="font-['Playfair_Display'] text-xl text-[#FAFAF9] mb-6 pb-3 border-b border-white/10">
                      {p1Name || 'Partner 1'} — The Groom
                    </h3>
                    <PersonaCustomiser
                      gender="man"
                      initial={p1Appearance}
                      onChange={setP1Appearance}
                      accentColor={selectedTemplate?.accentColor}
                    />
                  </div>
                  <div>
                    <h3 className="font-['Playfair_Display'] text-xl text-[#FAFAF9] mb-6 pb-3 border-b border-white/10">
                      {p2Name || 'Partner 2'} — The Bride
                    </h3>
                    <PersonaCustomiser
                      gender="woman"
                      initial={p2Appearance}
                      onChange={setP2Appearance}
                      accentColor={selectedTemplate?.accentColor}
                    />
                  </div>
                </div>
              ) : (
                <div>
                  <h3 className="font-['Playfair_Display'] text-xl text-[#FAFAF9] mb-6 pb-3 border-b border-white/10">
                    {celebrantName || 'The Celebrant'}
                  </h3>
                  <PersonaCustomiser
                    gender={celebrantGender === 'man' ? 'man' : 'woman'}
                    initial={celebrantAppearance}
                    onChange={setCelebrantAppearance}
                    accentColor={selectedTemplate?.accentColor}
                  />
                </div>
              )}

              <div className="flex justify-between mt-10">
                <button onClick={goBack} className="px-6 py-3 border border-white/10 text-[#FAFAF9] opacity-50 hover:opacity-100 text-xs tracking-widest uppercase transition-all">
                  Back
                </button>
                <button
                  onClick={handlePersonasContinue}
                  disabled={isGenerating}
                  className="px-10 py-3 bg-[#A16207] text-[#0C0A09] text-xs tracking-widest uppercase font-semibold hover:bg-[#FAFAF9] transition-all duration-300 disabled:opacity-50"
                >
                  {isGenerating ? 'Generating...' : 'Preview Invite →'}
                </button>
              </div>
            </div>
          )}

          {/* ── STEP 5: PREVIEW ── */}
          {step === 'preview' && templateId && (
            <div className="w-full max-w-2xl text-center">
              <p className="text-[#A16207] tracking-[0.3em] text-xs uppercase mb-4">Almost There</p>
              <h1 className="font-['Playfair_Display'] text-4xl text-[#FAFAF9] mb-4">Your Invite is Ready</h1>
              <p className="font-['Cormorant_Infant'] text-lg text-[#FAFAF9] opacity-50 mb-10">
                Preview it, share it, and watch people fall in love with it.
              </p>

              <div className="border border-white/10 p-8 mb-8"
                style={{ background: `radial-gradient(ellipse at center, ${selectedTemplate?.accentColor}10 0%, #111009 70%)` }}>
                <p className="text-5xl mb-4" style={{ fontFamily: `'${selectedTemplate?.fonts.script}', cursive`, color: '#FAFAF9' }}>
                  {selectedTemplate?.name}
                </p>
                <p className="text-[#FAFAF9] opacity-40 text-sm font-['Cormorant_Infant']">{selectedTemplate?.description}</p>
              </div>

              {/* Share link */}
              {shareUrl ? (
                <div className="mb-8 space-y-3">
                  {/* Custom slug */}
                  <div>
                    <p className="text-[#FAFAF9] opacity-40 text-xs tracking-widest uppercase mb-2">Custom Link (optional)</p>
                    <div className="flex items-center gap-2">
                      <span className="text-[#FAFAF9] opacity-30 text-sm flex-shrink-0">invitely.in/i/</span>
                      <input
                        value={customSlugInput}
                        onChange={async e => {
                          const val = e.target.value.toLowerCase().replace(/[^a-z0-9-]/g, '')
                          setCustomSlugInput(val)
                          if (val.length < 3) { setSlugStatus('idle'); return }
                          setSlugStatus('checking')
                          const res = await fetch(`/api/slug-check?slug=${val}`)
                          const json = await res.json()
                          if (json.reason) { setSlugStatus('invalid'); setSlugError(json.reason) }
                          else setSlugStatus(json.available ? 'available' : 'taken')
                        }}
                        placeholder="arjun-weds-priya"
                        className="flex-1 bg-[#111009] border border-white/10 text-[#FAFAF9] px-3 py-2 text-sm focus:outline-none transition-colors placeholder:opacity-20"
                        style={{ borderColor: slugStatus === 'available' ? '#16A34A' : slugStatus === 'taken' || slugStatus === 'invalid' ? '#DC2626' : undefined }}
                      />
                      {slugStatus === 'available' && customSlugInput && (
                        <button
                          onClick={async () => {
                            const currentSlug = shareUrl.split('/i/')[1]
                            const res = await fetch('/api/slug-rename', {
                              method: 'POST',
                              headers: { 'Content-Type': 'application/json' },
                              body: JSON.stringify({ oldSlug: currentSlug, newSlug: customSlugInput }),
                            })
                            const json = await res.json()
                            if (json.slug) {
                              const newUrl = `${window.location.origin}/i/${json.slug}`
                              setShareUrl(newUrl)
                              setSlugStatus('idle')
                              setCustomSlugInput('')
                            }
                          }}
                          className="flex-shrink-0 px-3 py-2 text-xs tracking-widest uppercase font-semibold"
                          style={{ background: '#16A34A', color: 'white' }}
                        >
                          Set
                        </button>
                      )}
                    </div>
                    {slugStatus === 'available' && <p className="text-[#16A34A] text-xs mt-1">✓ Available</p>}
                    {slugStatus === 'taken' && <p className="text-red-400 text-xs mt-1">Already taken — try another</p>}
                    {slugStatus === 'invalid' && <p className="text-red-400 text-xs mt-1">{slugError}</p>}
                  </div>
                  <div>
                    <p className="text-[#A16207] text-xs tracking-widest uppercase mb-2">Invite Link</p>
                    <div className="flex items-center gap-2 border border-[#A16207] border-opacity-30 p-3 bg-[#111009]">
                      <span className="flex-1 text-[#FAFAF9] opacity-60 text-sm truncate text-left">{shareUrl}</span>
                      <button
                        onClick={copyLink}
                        className="flex-shrink-0 px-4 py-1.5 text-xs tracking-widest uppercase transition-all duration-300"
                        style={{ background: copied ? '#16A34A' : '#A16207', color: '#0C0A09', fontWeight: 600 }}
                      >
                        {copied ? 'Copied!' : 'Copy'}
                      </button>
                    </div>
                    <p className="text-[#FAFAF9] opacity-30 text-xs mt-1">Share on WhatsApp, Instagram, or anywhere</p>
                  </div>
                  <div>
                    <p className="text-[#7C3AED] text-xs tracking-widest uppercase mb-2">RSVP Dashboard</p>
                    <a
                      href={shareUrl.replace('/i/', '/dashboard/')}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 border border-[#7C3AED] border-opacity-30 p-3 bg-[#111009] hover:border-opacity-60 transition-all group"
                    >
                      <span className="flex-1 text-[#FAFAF9] opacity-60 text-sm truncate text-left">
                        {shareUrl.replace('/i/', '/dashboard/')}
                      </span>
                      <span className="flex-shrink-0 text-[#7C3AED] text-xs tracking-widest uppercase group-hover:opacity-70">Open →</span>
                    </a>
                    <p className="text-[#FAFAF9] opacity-30 text-xs mt-1">Track who's coming — bookmark this link</p>
                  </div>
                </div>
              ) : (
                <button
                  onClick={generateShareLink}
                  disabled={isGenerating}
                  className="w-full mb-6 px-8 py-4 border border-[#A16207] border-opacity-40 text-[#A16207] text-sm tracking-[0.2em] uppercase hover:bg-[#A16207] hover:text-[#0C0A09] transition-all duration-500 disabled:opacity-40"
                >
                  {isGenerating ? 'Generating...' : '✦ Generate Shareable Link'}
                </button>
              )}

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button
                  onClick={handlePreview}
                  className="px-12 py-4 bg-[#A16207] text-[#0C0A09] text-sm tracking-[0.2em] uppercase font-semibold hover:bg-[#FAFAF9] transition-all duration-500"
                >
                  Open Full Preview
                </button>
                {shareUrl && (
                  <a
                    href={`https://wa.me/?text=${encodeURIComponent(`You're invited! Open your invitation: ${shareUrl}`)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 px-8 py-4 text-sm tracking-[0.2em] uppercase font-semibold transition-all duration-500"
                    style={{ background: '#25D366', color: 'white' }}
                  >
                    <svg viewBox="0 0 24 24" className="w-4 h-4 flex-shrink-0" fill="currentColor">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                    </svg>
                    Share on WhatsApp
                  </a>
                )}
                <button
                  onClick={goBack}
                  className="px-8 py-4 border border-white/10 text-[#FAFAF9] opacity-50 hover:opacity-100 text-sm tracking-widest uppercase transition-all"
                >
                  Edit
                </button>
              </div>
            </div>
          )}
        </div>
        </div>{/* end form panel */}

        {/* Preview panel — desktop only, shows when template is selected */}
        {templateId && step !== 'category' && (
          <div className="hidden lg:flex lg:w-1/2 flex-col sticky top-20 h-[calc(100vh-5rem)] overflow-hidden">
            <div className="flex items-center justify-between px-4 py-3 border-b border-white/5 bg-[#0C0A09] flex-shrink-0">
              <p className="text-[#FAFAF9] opacity-40 text-xs tracking-widest uppercase">
                Preview: <span style={{ color: selectedTemplate?.accentColor }}>{selectedTemplate?.name}</span>
              </p>
              <a href={`/preview/${templateId}`} target="_blank"
                className="text-xs tracking-widest uppercase transition-opacity hover:opacity-100"
                style={{ color: selectedTemplate?.accentColor, opacity: 0.6 }}>
                Full Screen →
              </a>
            </div>
            <div className="flex-1 overflow-hidden bg-[#0C0A09]">
              <iframe
                key={templateId}
                src={`/preview/${templateId}`}
                className="w-full h-full border-0 scale-[0.85] origin-top-left"
                style={{ width: '117.6%', height: '117.6%' }}
                title={`Preview of ${selectedTemplate?.name}`}
                loading="lazy"
              />
            </div>
          </div>
        )}
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
      <input
        type={type}
        value={value}
        onChange={e => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full bg-[#111009] border border-white/10 text-[#FAFAF9] px-4 py-3 text-sm focus:outline-none focus:border-[#A16207] transition-colors placeholder:opacity-20"
      />
    </div>
  )
}

function TextArea({ label, value, onChange, placeholder, rows = 3 }: {
  label: string; value: string; onChange: (v: string) => void; placeholder?: string; rows?: number
}) {
  return (
    <div>
      <label className="block text-[#FAFAF9] opacity-50 text-xs tracking-widest uppercase mb-2">{label}</label>
      <textarea
        value={value}
        onChange={e => onChange(e.target.value)}
        placeholder={placeholder}
        rows={rows}
        className="w-full bg-[#111009] border border-white/10 text-[#FAFAF9] px-4 py-3 text-sm focus:outline-none focus:border-[#A16207] transition-colors placeholder:opacity-20 resize-none"
      />
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
