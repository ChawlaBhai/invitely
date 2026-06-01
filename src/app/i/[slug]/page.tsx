import { getInvite, incrementViews, isExpired } from '@/lib/store'
import { notFound } from 'next/navigation'
import { getTemplate } from '@/lib/templates'
import dynamic from 'next/dynamic'
import ShareBar from '@/components/ShareBar'
import RsvpWidget from '@/components/RsvpWidget'
import MusicPlayer from '@/components/MusicPlayer'
import InvitelyWatermark from '@/components/InvitelyWatermark'
import TemplateErrorBoundary from '@/components/TemplateErrorBoundary'
import CelebrationPassedPage from '@/components/CelebrationPassedPage'
import AccentColorWrapper from '@/components/AccentColorWrapper'
import FontWrapper from '@/components/FontWrapper'
import InvitePasswordGate from '@/components/InvitePasswordGate'
import { WeddingData, BirthdayData } from '@/types/invitation'

const WeddingPetal = dynamic(() => import('@/templates/wedding-petal'))
const WeddingCosmos = dynamic(() => import('@/templates/wedding-cosmos'))
const WeddingSonaV2 = dynamic(() => import('@/templates/wedding-sona-v2'))
const WeddingModernIndian = dynamic(() => import('@/templates/wedding-modern-indian'))
const WeddingCinematic = dynamic(() => import('@/templates/wedding-cinematic'))
const WeddingModernElegant = dynamic(() => import('@/templates/wedding-modern-elegant'))
const WeddingTraditionalIndian = dynamic(() => import('@/templates/wedding-traditional-indian'))
const WeddingCelestial = dynamic(() => import('@/templates/wedding-celestial'))
const WeddingMountain = dynamic(() => import('@/templates/wedding-mountain'))
const WeddingBeach = dynamic(() => import('@/templates/wedding-beach'))
const WeddingGarden = dynamic(() => import('@/templates/wedding-garden'))
const WeddingRoyal = dynamic(() => import('@/templates/wedding-royal'))
const WeddingBohemian = dynamic(() => import('@/templates/wedding-bohemian'))
const WeddingRetroBollywood = dynamic(() => import('@/templates/wedding-retro-bollywood'))
const WeddingMinimalist = dynamic(() => import('@/templates/wedding-minimalist'))
const BirthdayCelestial = dynamic(() => import('@/templates/birthday-celestial'))
const BirthdayModernElegant = dynamic(() => import('@/templates/birthday-modern-elegant'))
const BirthdayBohemian = dynamic(() => import('@/templates/birthday-bohemian'))
const BirthdayMountain = dynamic(() => import('@/templates/birthday-mountain'))
const BirthdayBeach = dynamic(() => import('@/templates/birthday-beach'))
const BirthdayTraditionalIndian = dynamic(() => import('@/templates/birthday-traditional-indian'))
const BirthdayMidnight = dynamic(() => import('@/templates/birthday-midnight'))
const BirthdayNeonNights = dynamic(() => import('@/templates/birthday-neon-nights'))
import type { Metadata } from 'next'
import { headers } from 'next/headers'

interface Props {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const record = await getInvite(slug)
  if (!record) return { title: 'Invitely' }

  const { data, templateId } = record
  const template = getTemplate(templateId)

  let title = 'You are invited!'
  let description = 'Open this invitation to celebrate with us.'

  if (data.type === 'wedding') {
    const w = data as WeddingData
    title = `${w.partner1.name} & ${w.partner2.name} are getting married!`
    description = `Join us to celebrate their wedding in ${w.ceremony.city}. Open to see the full invitation.`
  } else if (data.type === 'birthday') {
    const b = data as BirthdayData
    title = `${b.celebrant.name}${b.age ? `'s ${b.age}th Birthday` : "'s Birthday"} — You're Invited!`
    description = `Come celebrate ${b.celebrant.name} in ${b.event.city}. Open to see the full invitation.`
  }

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: 'website',
      images: [
        {
          url: `/api/og/${slug}`,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
    },
  }
}

export default async function InvitePage({ params }: Props) {
  const { slug } = await params
  const record = await getInvite(slug)
  if (!record) notFound()

  // Check expiry — show celebration-passed page instead of 404
  if (isExpired(record)) {
    const { data } = record
    let eventName = 'The Celebration'
    let eventDate = new Date().toISOString()
    let city = ''
    if (data.type === 'wedding') {
      const w = data as WeddingData
      eventName = `${w.partner1.name} & ${w.partner2.name}`
      eventDate = w.ceremony.date
      city = w.ceremony.city
    } else if (data.type === 'birthday') {
      const b = data as BirthdayData
      eventName = b.age ? `${b.celebrant.name}'s ${b.age}th Birthday` : `${b.celebrant.name}'s Birthday`
      eventDate = b.event.date
      city = b.event.city
    }
    return <CelebrationPassedPage eventName={eventName} eventDate={eventDate} city={city} />
  }

  // Fire-and-forget view increment
  incrementViews(slug).catch(() => {})

  const { templateId, data } = record

  // Check password protection
  const invitePassword = data.type === 'wedding' ? (data as WeddingData).invitePassword : undefined
  if (invitePassword) {
    const hdrs2 = await headers()
    const cookieHeader = hdrs2.get('cookie') ?? ''
    const isAuthed = cookieHeader.includes(`invite_auth_${slug}=1`)
    if (!isAuthed) {
      const accentForGate = templateId.includes('traditional') ? '#DC2626' :
        templateId.includes('celestial') ? '#7C3AED' :
        templateId.includes('mountain') ? '#4A5568' :
        templateId.includes('beach') ? '#0891B2' :
        templateId.includes('garden') ? '#16A34A' :
        templateId.includes('royal') ? '#B45309' : '#A16207'
      return <InvitePasswordGate slug={slug} accentColor={accentForGate} onUnlock={() => {}} />
    }
  }

  const hdrs = await headers()
  const host = hdrs.get('host') ?? 'invitely.in'
  const protocol = host.includes('localhost') ? 'http' : 'https'
  const fullUrl = `${protocol}://${host}/i/${slug}`

  let shareTitle = 'You are invited!'
  if (data.type === 'wedding') {
    const w = data as WeddingData
    shareTitle = `${w.partner1.name} & ${w.partner2.name} are getting married!`
  } else if (data.type === 'birthday') {
    const b = data as BirthdayData
    shareTitle = b.age ? `${b.celebrant.name}'s ${b.age}th Birthday!` : `${b.celebrant.name}'s Birthday!`
  }

  const templateAccentColor = record ? (
    templateId.includes('traditional') ? '#DC2626' :
    templateId.includes('celestial') ? '#7C3AED' :
    templateId.includes('mountain') ? '#4A5568' :
    templateId.includes('beach') ? '#0891B2' :
    templateId.includes('garden') ? '#16A34A' :
    templateId.includes('royal') ? '#B45309' :
    templateId.includes('bohemian') ? '#D97706' : '#A16207'
  ) : '#A16207'

  // Use custom accent color if set, otherwise fall back to template default
  const tier = record.tier ?? 'classic'
  const isPremium = tier === 'premium' || tier === 'luxury'

  const customAccent = isPremium
    ? (data.type === 'wedding' ? (data as WeddingData).customAccentColor : (data as BirthdayData).customAccentColor)
    : undefined
  const accentColor = customAccent || templateAccentColor

  function wrap(content: React.ReactNode) {
    const musicUrl = isPremium && data.type === 'wedding'
      ? (data as WeddingData & { musicUrl?: string }).musicUrl
      : undefined
    const customFonts = isPremium
      ? (data.type === 'wedding' ? (data as WeddingData).customFonts : (data as BirthdayData).customFonts)
      : undefined

    return (
      <TemplateErrorBoundary>
        <FontWrapper fonts={customFonts}>
          <AccentColorWrapper accentColor={accentColor}>
            {content}
            {/* Watermark only on classic tier */}
            <InvitelyWatermark tier={tier as 'classic' | 'premium' | 'luxury'} />
            {/* Music only on premium+ */}
            {isPremium && <MusicPlayer accentColor={accentColor} musicUrl={musicUrl} />}
            <RsvpWidget slug={slug} accentColor={accentColor} />
            <ShareBar url={fullUrl} title={shareTitle} />
          </AccentColorWrapper>
        </FontWrapper>
      </TemplateErrorBoundary>
    )
  }

  if (templateId === 'wedding-petal') return wrap(<WeddingPetal data={data as WeddingData} />)
  if (templateId === 'wedding-cosmos') return wrap(<WeddingCosmos data={data as WeddingData} />)
  if (templateId === 'wedding-sona-v2') return wrap(<WeddingSonaV2 data={data as WeddingData} />)
  if (templateId === 'wedding-modern-indian') return wrap(<WeddingModernIndian data={data as WeddingData} />)
  if (templateId === 'wedding-cinematic') return wrap(<WeddingCinematic data={data as WeddingData} />)
  if (templateId === 'wedding-modern-elegant') return wrap(<WeddingModernElegant data={data as WeddingData} />)
  if (templateId === 'wedding-traditional-indian') return wrap(<WeddingTraditionalIndian data={data as WeddingData} />)
  if (templateId === 'wedding-celestial') return wrap(<WeddingCelestial data={data as WeddingData} />)
  if (templateId === 'wedding-mountain') return wrap(<WeddingMountain data={data as WeddingData} />)
  if (templateId === 'wedding-beach') return wrap(<WeddingBeach data={data as WeddingData} />)
  if (templateId === 'wedding-garden') return wrap(<WeddingGarden data={data as WeddingData} />)
  if (templateId === 'wedding-royal') return wrap(<WeddingRoyal data={data as WeddingData} />)
  if (templateId === 'wedding-bohemian') return wrap(<WeddingBohemian data={data as WeddingData} />)
  if (templateId === 'wedding-retro-bollywood') return wrap(<WeddingRetroBollywood data={data as WeddingData} />)
  if (templateId === 'wedding-minimalist') return wrap(<WeddingMinimalist data={data as WeddingData} />)

  if (templateId === 'birthday-celestial') return wrap(<BirthdayCelestial data={data as BirthdayData} />)
  if (templateId === 'birthday-modern-elegant') return wrap(<BirthdayModernElegant data={data as BirthdayData} />)
  if (templateId === 'birthday-bohemian') return wrap(<BirthdayBohemian data={data as BirthdayData} />)
  if (templateId === 'birthday-mountain') return wrap(<BirthdayMountain data={data as BirthdayData} />)
  if (templateId === 'birthday-beach') return wrap(<BirthdayBeach data={data as BirthdayData} />)
  if (templateId === 'birthday-traditional-indian') return wrap(<BirthdayTraditionalIndian data={data as BirthdayData} />)
  if (templateId === 'birthday-midnight') return wrap(<BirthdayMidnight data={data as BirthdayData} />)
  if (templateId === 'birthday-neon-nights') return wrap(<BirthdayNeonNights data={data as BirthdayData} />)

  notFound()
}
