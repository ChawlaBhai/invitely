import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Birthday Invitation Maker Online India — Animated Digital Birthday Cards | Invitely',
  description: 'Create stunning animated birthday invitations online. Share on WhatsApp instantly. 9 unique birthday templates. Personalised with illustrated characters. Start free.',
  keywords: 'birthday invitation maker online India, digital birthday card, WhatsApp birthday invite, online birthday invitation, animated birthday card',
  openGraph: {
    title: 'Birthday Invitation Maker Online India | Invitely',
    description: 'Create animated birthday invitations. Share on WhatsApp. 9 templates.',
    type: 'website',
  },
}

const TEMPLATES = [
  { id: 'birthday-celestial', name: 'Another Trip Around the Sun', desc: 'Cosmic tribute — stars, orbits, wonder', color: '#7C3AED' },
  { id: 'birthday-midnight', name: 'Midnight', desc: 'Dark, dramatic, deeply personal', color: '#4C1D95' },
  { id: 'birthday-neon-nights', name: 'Neon Nights', desc: 'Electric, bold, neon-lit party energy', color: '#FF006E' },
  { id: 'birthday-traditional-indian', name: 'Jashn', desc: 'Dholak, mithai, whole mohalla invited', color: '#DC2626' },
  { id: 'birthday-modern-elegant', name: 'The Edit', desc: 'Editorial magazine spread for one person', color: '#A16207' },
  { id: 'birthday-beach', name: 'Golden Hour', desc: 'Sun-soaked, salty, full of joy', color: '#F59E0B' },
]

export default function BirthdayInvitationMakerPage() {
  return (
    <div className="min-h-screen bg-[#0C0A09] text-[#FAFAF9]">
      <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-8 py-5 bg-[#0C0A09]/80 backdrop-blur-md border-b border-white/5">
        <Link href="/" className="font-['Great_Vibes'] text-2xl text-[#FAFAF9]">Invitely</Link>
        <Link href="/builder" className="px-5 py-2 bg-[#A16207] text-[#0C0A09] text-xs tracking-widest uppercase font-semibold hover:bg-[#FAFAF9] transition-colors">
          Create Free
        </Link>
      </nav>

      <section className="relative pt-40 pb-20 px-6 text-center overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_#1C1917_0%,_#0C0A09_60%)]" />
        <div className="relative z-10 max-w-3xl mx-auto">
          <p className="text-[#A16207] tracking-[0.4em] text-xs uppercase mb-4">Celebrate in Style</p>
          <h1 className="font-['Playfair_Display'] text-5xl md:text-7xl text-[#FAFAF9] leading-tight mb-4">
            Birthday Invitation Maker
          </h1>
          <p className="font-['Cormorant_Infant'] text-xl text-[#FAFAF9] opacity-50 max-w-2xl mx-auto leading-relaxed mb-10">
            Create animated birthday invitations that feel like the celebration starting. Share on WhatsApp in seconds. 9 unique templates for every personality.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/builder" className="px-12 py-4 bg-[#A16207] text-[#0C0A09] text-sm tracking-[0.2em] uppercase font-semibold hover:bg-[#FAFAF9] transition-all duration-500">
              Create Birthday Invite — Free
            </Link>
            <Link href="/preview/birthday-celestial" className="px-10 py-4 border border-[#A16207] border-opacity-40 text-[#A16207] text-sm tracking-[0.2em] uppercase hover:bg-[#A16207] hover:text-[#0C0A09] transition-all duration-500">
              See Live Demo
            </Link>
          </div>
        </div>
      </section>

      <section className="relative py-20 px-6 overflow-hidden">
        <div className="absolute inset-0 bg-[#111009]" />
        <div className="relative z-10 max-w-4xl mx-auto">
          <h2 className="font-['Playfair_Display'] text-4xl text-[#FAFAF9] text-center mb-12">Birthday Invitation Templates</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {TEMPLATES.map(t => (
              <Link key={t.id} href={`/preview/${t.id}`}
                className="group border border-white/5 hover:border-opacity-50 transition-all duration-500 overflow-hidden">
                <div className="h-40 flex items-center justify-center relative"
                  style={{ background: `radial-gradient(ellipse at center, ${t.color}20 0%, #0C0A09 70%)` }}>
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-black/30 flex items-center justify-center">
                    <span className="text-xs tracking-widest uppercase border px-4 py-2" style={{ borderColor: t.color, color: t.color }}>Preview</span>
                  </div>
                  <p className="text-2xl text-[#FAFAF9] text-center px-4" style={{ fontFamily: "'Great Vibes', cursive" }}>{t.name}</p>
                </div>
                <div className="p-4">
                  <p className="text-[#FAFAF9] opacity-40 text-sm font-['Cormorant_Infant']">{t.desc}</p>
                </div>
              </Link>
            ))}
          </div>
          <div className="text-center mt-8">
            <Link href="/#templates" className="text-[#A16207] text-xs tracking-widest uppercase hover:opacity-70 transition-opacity">
              View all 18 templates →
            </Link>
          </div>
        </div>
      </section>

      <section className="relative py-20 px-6 overflow-hidden">
        <div className="absolute inset-0 bg-[#0C0A09]" />
        <div className="relative z-10 max-w-3xl mx-auto">
          <h2 className="font-['Playfair_Display'] text-4xl text-[#FAFAF9] text-center mb-12">What Makes Invitely Different</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[
              { icon: '🎬', title: 'Scrollytelling', desc: 'The invite unfolds as guests scroll — animations, story chapters, countdown. Not a static card.' },
              { icon: '👤', title: 'Illustrated Persona', desc: 'A customisable illustrated character that looks like the birthday person. Skin tone, hair, outfit — all yours.' },
              { icon: '📖', title: 'Life Story', desc: 'Add highlights, fun facts, and a message. The invite becomes a tribute to the person.' },
              { icon: '⏱', title: 'Live Countdown', desc: 'A real-time countdown to the birthday on every invite. Builds excitement as the day approaches.' },
            ].map(({ icon, title, desc }) => (
              <div key={title} className="flex gap-4">
                <div className="text-2xl flex-shrink-0">{icon}</div>
                <div>
                  <h3 className="font-['Playfair_Display'] text-lg text-[#FAFAF9] mb-1">{title}</h3>
                  <p className="font-['Cormorant_Infant'] text-base text-[#FAFAF9] opacity-50 leading-relaxed">{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="relative py-20 px-6 overflow-hidden">
        <div className="absolute inset-0 bg-[#111009]" />
        <div className="relative z-10 text-center max-w-xl mx-auto">
          <h2 className="font-['Great_Vibes'] text-7xl text-[#FAFAF9] mb-4">Make It Special</h2>
          <p className="font-['Cormorant_Infant'] text-xl text-[#FAFAF9] opacity-50 mb-10">
            Create a birthday invitation that feels as special as the person. Start free.
          </p>
          <Link href="/builder" className="inline-block px-14 py-5 bg-[#A16207] text-[#0C0A09] text-sm tracking-[0.2em] uppercase font-semibold hover:bg-[#FAFAF9] transition-all duration-500">
            Create Birthday Invite
          </Link>
        </div>
      </section>

      <footer className="relative py-10 px-6 border-t border-white/5">
        <div className="max-w-4xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <Link href="/" className="font-['Great_Vibes'] text-2xl text-[#FAFAF9] opacity-30">Invitely</Link>
          <div className="flex gap-6">
            <Link href="/pricing" className="text-[#FAFAF9] opacity-25 text-xs tracking-widest uppercase hover:opacity-50">Pricing</Link>
            <Link href="/terms" className="text-[#FAFAF9] opacity-25 text-xs tracking-widest uppercase hover:opacity-50">Terms</Link>
            <Link href="/privacy" className="text-[#FAFAF9] opacity-25 text-xs tracking-widest uppercase hover:opacity-50">Privacy</Link>
          </div>
          <p className="text-[#FAFAF9] opacity-15 text-xs">Made with love · India</p>
        </div>
      </footer>
    </div>
  )
}
