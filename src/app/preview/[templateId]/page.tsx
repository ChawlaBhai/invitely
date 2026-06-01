import { WeddingData, BirthdayData } from '@/types/invitation'
import dynamic from 'next/dynamic'
import { notFound } from 'next/navigation'
import { getTemplate } from '@/lib/templates'

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

// ── DEMO DATA ──────────────────────────────────────────────────────────────

const DEMO_MODERN_ELEGANT: WeddingData = {
  type: 'wedding',
  partner1: { name: 'Arjun', nickname: 'The Dreamer', appearance: { skinTone: 'tan', hairColor: '#1A0A00', hairStyle: 'short', outfitColor: '#1C1917', outfitStyle: 'indo-western', accentColor: '#A16207' } },
  partner2: { name: 'Priya', nickname: 'The Soul', appearance: { skinTone: 'medium', hairColor: '#2C1810', hairStyle: 'long', outfitColor: '#8B1A1A', outfitStyle: 'traditional', accentColor: '#A16207' } },
  story: {
    howTheyMet: 'It was a monsoon evening in Bombay. She was reading Neruda at a café that smelled of old books and cardamom chai. He sat down at the wrong table. Neither of them moved.',
    favoriteMemory: 'A road trip to Coorg where the car broke down, the rain wouldn\'t stop, and they talked for six hours straight under a tin roof. That was the night they knew.',
    proposalStory: 'He proposed at 2am on their building terrace, surrounded by fairy lights he\'d spent three days secretly stringing up. She said yes before he finished the question.',
    sharedPassions: ['Old Bollywood', 'Midnight Drives', 'Filter Coffee', 'Terrible Puns'],
  },
  ceremony: { date: '2025-12-20', time: '7:00 PM onwards', venue: 'The Leela Palace', address: 'Diplomatic Enclave', city: 'New Delhi' },
  reception: { date: '2025-12-21', time: '8:00 PM onwards', venue: 'The Grand Ballroom', city: 'New Delhi' },
  rsvpContact: '+91 98765 43210', hashtag: 'ArjunWedsPriya',
  customMessage: 'Two imperfect people who found something perfect in each other.',
  dressCode: 'Black Tie / Indian Formal',
}

const DEMO_TRADITIONAL: WeddingData = {
  type: 'wedding',
  partner1: { name: 'Vikram', nickname: 'Vicky', appearance: { skinTone: 'medium', hairColor: '#1A0A00', hairStyle: 'short', outfitColor: '#8B1A1A', outfitStyle: 'traditional', accentColor: '#F59E0B' } },
  partner2: { name: 'Meera', nickname: 'Meeru', appearance: { skinTone: 'light', hairColor: '#2C1810', hairStyle: 'bun', outfitColor: '#DC2626', outfitStyle: 'traditional', accentColor: '#F59E0B' } },
  story: {
    howTheyMet: 'Their families had been neighbours in Jaipur for three generations. They grew up sharing the same courtyard, the same festivals, the same marigold-scented evenings. Love was never a surprise — it was always the plan.',
    favoriteMemory: 'Holi, three years ago. She threw colour at him first. He chased her through the entire mohalla. By evening, they were both pink and laughing and completely certain.',
    proposalStory: 'He asked her father first, then her grandmother, then her. She made him wait three whole minutes before saying yes — just to watch him sweat.',
    sharedPassions: ['Classical Music', 'Rajasthani Food', 'Old Temples', 'Chai at Sunrise'],
  },
  ceremony: { date: '2025-11-28', time: '11:00 AM', venue: 'Rambagh Palace', address: 'Bhawani Singh Road', city: 'Jaipur' },
  reception: { date: '2025-11-28', time: '7:00 PM onwards', venue: 'The Palace Lawns', city: 'Jaipur' },
  rsvpContact: '+91 98765 43210', hashtag: 'VikramWeedsMeera',
  customMessage: 'दो दिल, एक परिवार। Two hearts, one family.',
  dressCode: 'Traditional Indian Attire',
}

const DEMO_CELESTIAL: WeddingData = {
  type: 'wedding',
  partner1: { name: 'Karan', nickname: 'The Stargazer', appearance: { skinTone: 'tan', hairColor: '#1A0A00', hairStyle: 'medium', outfitColor: '#1E1B4B', outfitStyle: 'modern', accentColor: '#7C3AED' } },
  partner2: { name: 'Aisha', nickname: 'The Moon', appearance: { skinTone: 'medium', hairColor: '#1A0A00', hairStyle: 'long', outfitColor: '#4C1D95', outfitStyle: 'modern', accentColor: '#7C3AED' } },
  story: {
    howTheyMet: 'At an astronomy club in Pune, 2019. She was explaining why Pluto deserved to be a planet. He disagreed. They argued for two hours. He asked for her number before she finished her point.',
    favoriteMemory: 'A night in Ladakh, lying on a sleeping bag at 4am, watching the Milky Way. No words. Just the universe doing its thing and the two of them in it.',
    proposalStory: 'He mapped out the exact coordinates where they\'d first met, drove her there at midnight, and pointed out the constellation that was overhead that night. Then he asked.',
    sharedPassions: ['Astrophysics', 'Night Drives', 'Science Fiction', 'Cold Brew Coffee'],
  },
  ceremony: { date: '2025-12-21', time: '8:00 PM', venue: 'Jai Mahal Palace', address: 'Jacob Road', city: 'Jaipur' },
  rsvpContact: '+91 98765 43210', hashtag: 'KaranLovesAisha',
  customMessage: 'The universe is 13.8 billion years old. Every second of it led to this.',
  dressCode: 'Celestial — Deep Blues & Purples',
}

const DEMO_MOUNTAIN: WeddingData = {
  type: 'wedding',
  partner1: { name: 'Rohan', nickname: 'The Climber', appearance: { skinTone: 'tan', hairColor: '#2C1810', hairStyle: 'medium', outfitColor: '#374151', outfitStyle: 'casual', accentColor: '#4A5568' } },
  partner2: { name: 'Tara', nickname: 'The Summit', appearance: { skinTone: 'medium', hairColor: '#1A0A00', hairStyle: 'braid', outfitColor: '#4B5563', outfitStyle: 'casual', accentColor: '#4A5568' } },
  story: {
    howTheyMet: 'Base camp, Kedarnath, 2021. She was the only other person who\'d brought a book. He asked what she was reading. She said she\'d tell him at the top. He climbed faster than he ever had.',
    favoriteMemory: 'Getting caught in a snowstorm on Roopkund. Tent too small, sleeping bags zipped together, instant noodles for dinner. Best night of both their lives.',
    proposalStory: 'He proposed at 5,000 metres, at sunrise, with a ring he\'d carried in his jacket pocket for six months waiting for the right peak. She said yes before he got the ring out.',
    sharedPassions: ['Trekking', 'Cold Weather', 'Maggi at 4am', 'Silence'],
  },
  ceremony: { date: '2025-10-15', time: '10:00 AM', venue: 'The Wildflower Hall', address: 'Mashobra', city: 'Shimla' },
  rsvpContact: '+91 98765 43210', hashtag: 'RohanAndTara',
  customMessage: 'Love is not about finding the right person. It\'s about climbing the right mountain together.',
  dressCode: 'Mountain Casual — Layers Welcome',
}

const DEMO_BEACH: WeddingData = {
  type: 'wedding',
  partner1: { name: 'Dev', nickname: 'The Wave', appearance: { skinTone: 'tan', hairColor: '#2C1810', hairStyle: 'short', outfitColor: '#0C4A6E', outfitStyle: 'casual', accentColor: '#F59E0B' } },
  partner2: { name: 'Sia', nickname: 'The Shore', appearance: { skinTone: 'light', hairColor: '#5C3317', hairStyle: 'long', outfitColor: '#0891B2', outfitStyle: 'modern', accentColor: '#F59E0B' } },
  story: {
    howTheyMet: 'Goa, 2020. She was reading on the beach. He was learning to surf and kept falling off. She laughed every time. He kept falling on purpose.',
    favoriteMemory: 'A spontaneous ferry to Divar Island. No plan, no phone signal, just a rented bicycle and the whole afternoon. They got lost three times and didn\'t care once.',
    proposalStory: 'Sunset on Palolem beach. He\'d buried the ring in a sandcastle they built together. She found it when she knocked it down. He was already on one knee.',
    sharedPassions: ['Surfing', 'Seafood', 'Sunsets', 'Doing Nothing Beautifully'],
  },
  ceremony: { date: '2025-12-27', time: '5:30 PM', venue: 'Taj Exotica Resort', address: 'Benaulim Beach', city: 'Goa' },
  rsvpContact: '+91 98765 43210', hashtag: 'DevAndSia',
  customMessage: 'Some love stories are written in sand. Ours is written in the ocean.',
  dressCode: 'Beach Formal — Whites & Blues',
}

const DEMO_GARDEN: WeddingData = {
  type: 'wedding',
  partner1: { name: 'Aarav', nickname: 'The Gardener', appearance: { skinTone: 'light', hairColor: '#2C1810', hairStyle: 'short', outfitColor: '#14532D', outfitStyle: 'modern', accentColor: '#16A34A' } },
  partner2: { name: 'Nisha', nickname: 'The Bloom', appearance: { skinTone: 'fair', hairColor: '#5C3317', hairStyle: 'curly', outfitColor: '#166534', outfitStyle: 'modern', accentColor: '#16A34A' } },
  story: {
    howTheyMet: 'A community garden in Bangalore. She was trying to grow tomatoes. He told her she was doing it wrong. She told him to mind his own business. He came back the next Sunday anyway.',
    favoriteMemory: 'A weekend in Coorg during the monsoon. The estate, the mist, the coffee smell, the rain on the roof. They didn\'t leave the veranda for two days.',
    proposalStory: 'He planted a garden for her — her favourite flowers, arranged to spell her name. It took him four months. She cried before she even read it.',
    sharedPassions: ['Gardening', 'Slow Mornings', 'Coorg Coffee', 'Rainy Days'],
  },
  ceremony: { date: '2025-11-08', time: '4:00 PM', venue: 'The Tamara Coorg', address: 'Yavakapadi', city: 'Coorg' },
  rsvpContact: '+91 98765 43210', hashtag: 'AaravAndNisha',
  customMessage: 'Love is patient. Love is kind. Love is also very good at growing things.',
  dressCode: 'Garden Party — Florals & Pastels',
}

const DEMO_ROYAL: WeddingData = {
  type: 'wedding',
  partner1: { name: 'Ishaan', nickname: 'The Prince', appearance: { skinTone: 'medium', hairColor: '#1A0A00', hairStyle: 'short', outfitColor: '#1A0505', outfitStyle: 'traditional', accentColor: '#B45309' } },
  partner2: { name: 'Ananya', nickname: 'The Queen', appearance: { skinTone: 'light', hairColor: '#2C1810', hairStyle: 'bun', outfitColor: '#7F1D1D', outfitStyle: 'traditional', accentColor: '#B45309' } },
  story: {
    howTheyMet: 'A heritage walk through Old Delhi, 2018. The guide was terrible. They both started whispering corrections to each other. By the end of the walk, they\'d rewritten the entire tour.',
    favoriteMemory: 'A private dinner at a 400-year-old haveli in Udaipur. Candlelight, old stone, the sound of the lake. They talked until the candles burned out.',
    proposalStory: 'He arranged a private viewing of the Amber Fort at dawn — just the two of them, the palace, and the first light of morning. He asked her to be his queen. She said she already was.',
    sharedPassions: ['History', 'Architecture', 'Mughal Cuisine', 'Slow Travel'],
  },
  ceremony: { date: '2025-12-05', time: '7:00 PM', venue: 'Umaid Bhawan Palace', address: 'Circuit House Road', city: 'Jodhpur' },
  reception: { date: '2025-12-06', time: '8:00 PM', venue: 'The Palace Durbar Hall', city: 'Jodhpur' },
  rsvpContact: '+91 98765 43210', hashtag: 'IshaanWedAnanya',
  customMessage: 'A love story worthy of the palaces that witnessed it.',
  dressCode: 'Royal Indian Formal',
}

// Birthday demos
const DEMO_BDAY_CELESTIAL: BirthdayData = {
  type: 'birthday',
  celebrant: { name: 'Riya', nickname: 'The Force of Nature', appearance: { skinTone: 'medium', hairColor: '#2C1810', hairStyle: 'curly', outfitColor: '#4C1D95', outfitStyle: 'modern', accentColor: '#7C3AED' } },
  age: 30,
  story: {
    highlights: ['Moved to a new city at 22 with one suitcase and zero plans', 'Started a business that failed spectacularly — then started another', 'Climbed Kedarnath in the rain because someone dared her to', 'Built a life that looks nothing like the plan and everything like her'],
    funFacts: ['Has read 200+ books but still judges them by their covers', 'Can parallel park on the first try but cannot fold a fitted sheet', 'Knows every lyric to every 90s Bollywood song'],
    message: 'Thirty years of being exactly, unapologetically, magnificently herself.',
  },
  event: { date: '2025-11-15', time: '8:00 PM onwards', venue: 'Rooftop at The Taj', address: 'Mansingh Road', city: 'New Delhi' },
  rsvpContact: '+91 98765 43210',
  customMessage: 'She did not come this far to only come this far.',
}

const DEMO_BDAY_MODERN: BirthdayData = {
  type: 'birthday',
  celebrant: { name: 'Kabir', nickname: 'The Editor', appearance: { skinTone: 'tan', hairColor: '#1A0A00', hairStyle: 'short', outfitColor: '#1C1917', outfitStyle: 'modern', accentColor: '#A16207' } },
  age: 35,
  story: {
    highlights: ['Left a corporate job to write a novel — finished it in 14 months', 'Lived in three cities in two years and called it research', 'Built a creative studio from a spare bedroom and a lot of stubbornness'],
    funFacts: ['Owns 400 books and has read 380 of them', 'Makes the best chai in any room he\'s ever been in', 'Has never been on time for anything except flights'],
    message: 'Thirty-five years of editing the world into something worth reading.',
  },
  event: { date: '2025-12-10', time: '7:30 PM', venue: 'The Piano Man Jazz Club', address: 'Safdarjung Enclave', city: 'New Delhi' },
  rsvpContact: '+91 98765 43210',
  customMessage: 'The best chapters are still being written.',
}

const DEMO_BDAY_BOHEMIAN: BirthdayData = {
  type: 'birthday',
  celebrant: { name: 'Zara', nickname: 'The Free Spirit', appearance: { skinTone: 'medium', hairColor: '#7B3F00', hairStyle: 'curly', outfitColor: '#92400E', outfitStyle: 'casual', accentColor: '#D97706' } },
  age: 28,
  story: {
    highlights: ['Quit her job to travel Southeast Asia for six months', 'Learned to make pottery in Pondicherry', 'Started a plant shop that became a community space', 'Dyed her hair four different colours in one year'],
    funFacts: ['Has a plant for every emotion she\'s ever felt', 'Can identify 40 different bird calls', 'Makes jewellery from things she finds on beaches'],
    message: 'Twenty-eight years of living outside the lines.',
  },
  event: { date: '2025-10-20', time: '6:00 PM', venue: 'The Bungalow', address: 'Indiranagar', city: 'Bangalore' },
  rsvpContact: '+91 98765 43210',
  customMessage: 'Come as you are. Leave as you wish.',
}

const DEMO_BDAY_MOUNTAIN: BirthdayData = {
  type: 'birthday',
  celebrant: { name: 'Aryan', nickname: 'The Summit Seeker', appearance: { skinTone: 'tan', hairColor: '#2C1810', hairStyle: 'medium', outfitColor: '#374151', outfitStyle: 'casual', accentColor: '#4A5568' } },
  age: 32,
  story: {
    highlights: ['Summited 12 Himalayan peaks before turning 30', 'Ran his first ultramarathon on a broken toe', 'Quit a finance job to become a trek leader', 'Built a mountain rescue volunteer team from scratch'],
    funFacts: ['Has slept at altitudes higher than most people will ever visit', 'Can predict weather better than any app', 'Eats Maggi at every altitude'],
    message: 'Thirty-two peaks. Thirty-two years. Still climbing.',
  },
  event: { date: '2025-09-28', time: '7:00 PM', venue: 'The Himalayan Club', address: 'Chanakyapuri', city: 'New Delhi' },
  rsvpContact: '+91 98765 43210',
  customMessage: 'Every year is a new summit.',
}

const DEMO_BDAY_BEACH: BirthdayData = {
  type: 'birthday',
  celebrant: { name: 'Mia', nickname: 'The Golden Hour', appearance: { skinTone: 'light', hairColor: '#5C3317', hairStyle: 'long', outfitColor: '#0C4A6E', outfitStyle: 'casual', accentColor: '#F59E0B' } },
  age: 25,
  story: {
    highlights: ['Learned to surf at 23 and hasn\'t stopped since', 'Moved to Goa for a month and stayed for two years', 'Started a sunset photography project that went viral', 'Swam with whale sharks in the Maldives'],
    funFacts: ['Has watched 500+ sunsets and ranked every single one', 'Can name every beach in Goa by the sound of its waves', 'Eats seafood for breakfast without apology'],
    message: 'Twenty-five years of chasing golden hours.',
  },
  event: { date: '2025-12-30', time: '5:00 PM', venue: 'Palolem Beach', address: 'Canacona', city: 'Goa' },
  rsvpContact: '+91 98765 43210',
  customMessage: 'Life is better at the beach. Come prove it.',
}

const DEMO_BDAY_TRADITIONAL: BirthdayData = {
  type: 'birthday',
  celebrant: { name: 'Priya', nickname: 'Priyanka', appearance: { skinTone: 'medium', hairColor: '#1A0A00', hairStyle: 'bun', outfitColor: '#DC2626', outfitStyle: 'traditional', accentColor: '#F59E0B' } },
  age: 50,
  story: {
    highlights: ['Raised three children while running a business from home', 'Learned classical Bharatanatyam at 40 because she always wanted to', 'Cooked for 200 people at her daughter\'s wedding — refused all help', 'Has been the backbone of every family celebration for 25 years'],
    funFacts: ['Her biryani has never once been left unfinished', 'Knows the birthday of every person she has ever met', 'Can negotiate anything — from vegetable prices to wedding venues'],
    message: 'Fifty years of being the reason everyone shows up.',
  },
  event: { date: '2025-11-22', time: '6:00 PM', venue: 'The Oberoi Grand', address: 'Jawaharlal Nehru Road', city: 'Kolkata' },
  rsvpContact: '+91 98765 43210',
  customMessage: 'आप हमारी दुनिया हैं। You are our world.',
}

const DEMO_MAP: Record<string, WeddingData | BirthdayData> = {
  'wedding-petal': DEMO_GARDEN,
  'wedding-cosmos': DEMO_CELESTIAL,
  'wedding-sona-v2': DEMO_TRADITIONAL,
  'wedding-modern-indian': DEMO_TRADITIONAL,
  'wedding-cinematic': DEMO_MODERN_ELEGANT,
  'wedding-modern-elegant': DEMO_MODERN_ELEGANT,
  'wedding-traditional-indian': DEMO_TRADITIONAL,
  'wedding-celestial': DEMO_CELESTIAL,
  'wedding-mountain': DEMO_MOUNTAIN,
  'wedding-beach': DEMO_BEACH,
  'wedding-garden': DEMO_GARDEN,
  'wedding-royal': DEMO_ROYAL,
  'wedding-bohemian': DEMO_MOUNTAIN,
  'wedding-retro-bollywood': DEMO_TRADITIONAL,
  'wedding-minimalist': DEMO_MODERN_ELEGANT,
  'birthday-celestial': DEMO_BDAY_CELESTIAL,
  'birthday-modern-elegant': DEMO_BDAY_MODERN,
  'birthday-bohemian': DEMO_BDAY_BOHEMIAN,
  'birthday-mountain': DEMO_BDAY_MOUNTAIN,
  'birthday-beach': DEMO_BDAY_BEACH,
  'birthday-traditional-indian': DEMO_BDAY_TRADITIONAL,
  'birthday-midnight': DEMO_BDAY_CELESTIAL,
  'birthday-neon-nights': DEMO_BDAY_BOHEMIAN, // reuse celestial demo — same dark dramatic vibe
}

interface Props {
  params: Promise<{ templateId: string }>
}

export default async function PreviewPage({ params }: Props) {
  const { templateId } = await params
  const template = getTemplate(templateId)
  if (!template) notFound()

  const data = DEMO_MAP[templateId]
  if (!data) notFound()

  if (templateId === 'wedding-petal') return <WeddingPetal data={data as WeddingData} />
  if (templateId === 'wedding-cosmos') return <WeddingCosmos data={data as WeddingData} />
  if (templateId === 'wedding-sona-v2') return <WeddingSonaV2 data={data as WeddingData} />
  if (templateId === 'wedding-modern-indian') return <WeddingModernIndian data={data as WeddingData} />
  if (templateId === 'wedding-modern-elegant') return <WeddingModernElegant data={data as WeddingData} />
  if (templateId === 'wedding-traditional-indian') return <WeddingTraditionalIndian data={data as WeddingData} />
  if (templateId === 'wedding-celestial') return <WeddingCelestial data={data as WeddingData} />
  if (templateId === 'wedding-mountain') return <WeddingMountain data={data as WeddingData} />
  if (templateId === 'wedding-beach') return <WeddingBeach data={data as WeddingData} />
  if (templateId === 'wedding-garden') return <WeddingGarden data={data as WeddingData} />
  if (templateId === 'wedding-royal') return <WeddingRoyal data={data as WeddingData} />
  if (templateId === 'wedding-bohemian') return <WeddingBohemian data={data as WeddingData} />
  if (templateId === 'wedding-retro-bollywood') return <WeddingRetroBollywood data={data as WeddingData} />
  if (templateId === 'wedding-minimalist') return <WeddingMinimalist data={data as WeddingData} />

  if (templateId === 'birthday-celestial') return <BirthdayCelestial data={data as BirthdayData} />
  if (templateId === 'birthday-modern-elegant') return <BirthdayModernElegant data={data as BirthdayData} />
  if (templateId === 'birthday-bohemian') return <BirthdayBohemian data={data as BirthdayData} />
  if (templateId === 'birthday-mountain') return <BirthdayMountain data={data as BirthdayData} />
  if (templateId === 'birthday-beach') return <BirthdayBeach data={data as BirthdayData} />
  if (templateId === 'birthday-traditional-indian') return <BirthdayTraditionalIndian data={data as BirthdayData} />
  if (templateId === 'birthday-midnight') return <BirthdayMidnight data={data as BirthdayData} />
  if (templateId === 'birthday-neon-nights') return <BirthdayNeonNights data={data as BirthdayData} />

  notFound()
}
