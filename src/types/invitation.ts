export type SkinTone = 'fair' | 'light' | 'medium' | 'tan' | 'deep'
export type HairStyle = 'short' | 'medium' | 'long' | 'curly' | 'bun' | 'braid'
export type OutfitStyle = 'modern' | 'traditional' | 'indo-western' | 'casual'

export interface PersonaAppearance {
  skinTone: SkinTone
  hairColor: string       // hex
  hairStyle: HairStyle
  outfitColor: string     // hex
  outfitStyle: OutfitStyle
  accentColor: string     // jewelry, accessories
}

export interface Person {
  name: string
  nickname?: string
  appearance: PersonaAppearance
}

export interface EventDetails {
  date: string            // ISO date string
  time?: string
  venue: string
  address?: string
  city: string
  mapUrl?: string
}

export interface WeddingData {
  type: 'wedding'
  partner1: Person
  partner2: Person
  story: {
    howTheyMet?: string
    favoriteMemory?: string
    proposalStory?: string
    sharedPassions?: string[]
  }
  ceremony: EventDetails
  reception?: EventDetails
  rsvpDeadline?: string
  rsvpContact?: string
  hashtag?: string
  photos?: string[]       // uploaded photo URLs
  customMessage?: string
  dressCode?: string
  customAccentColor?: string
  creatorEmail?: string
  musicUrl?: string
  customFonts?: { display?: string; script?: string; body?: string }
  invitePassword?: string
  referredBy?: string
}

export interface BirthdayData {
  type: 'birthday'
  celebrant: Person
  age?: number
  gender?: 'woman' | 'man' | 'other'
  story: {
    highlights?: string[]   // life milestones
    funFacts?: string[]
    message?: string
  }
  event: EventDetails
  rsvpContact?: string
  photos?: string[]
  customMessage?: string
  theme?: string
  customAccentColor?: string
  creatorEmail?: string
  customFonts?: { display?: string; script?: string; body?: string }
  invitePassword?: string
  referredBy?: string
}

export type InvitationData = WeddingData | BirthdayData

export type TemplateCategory = 'wedding' | 'birthday'
export type TemplateVibe =
  | 'modern-elegant'
  | 'traditional-indian'
  | 'mountain'
  | 'beach'
  | 'celestial'
  | 'garden'
  | 'royal'
  | 'bohemian'

export interface TemplateConfig {
  id: string
  name: string
  category: TemplateCategory
  vibe: TemplateVibe
  description: string
  previewImage: string
  accentColor: string
  fonts: {
    display: string
    script: string
    body: string
  }
  tier: 'classic' | 'premium' | 'luxury'
}
