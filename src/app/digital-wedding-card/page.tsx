import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Digital Wedding Card India — Animated Online Wedding Invitations | Invitely',
  description: 'Create beautiful digital wedding cards online. Animated, scrollytelling invitations that guests actually open. Share on WhatsApp. 18 unique designs. Start free.',
  keywords: 'digital wedding card India, online wedding card, e-wedding invitation, digital shaadi card, animated wedding invitation India',
  openGraph: {
    title: 'Digital Wedding Card India | Invitely',
    description: 'Create animated digital wedding cards. Share on WhatsApp. 18 designs.',
    type: 'website',
  },
}

export default function DigitalWeddingCardPage() {
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
          <p className="text-[#A16207] tracking-[0.4em] text-xs uppercase mb-4">The Future of Wedding Invitations</p>
          <h1 className="font-['Playfair_Display'] text-5xl md:text-7xl text-[#FAFAF9] leading-tight mb-4">
            Digital Wedding Card
          </h1>
          <p className="font-['Cormorant_Infant'] text-xl text-[#FAFAF9] opacity-50 max-w-2xl mx-auto leading-relaxed mb-10">
            Not a PDF. Not a static image. A fully animated, scrollytelling digital wedding card that makes every guest feel the love before they even arrive.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/builder" className="px-12 py-4 bg-[#A16207] text-[#0C0A09] text-sm tracking-[0.2em] uppercase font-semibold hover:bg-[#FAFAF9] transition-all duration-500">
              Create Digital Card — Free
            </Link>
            <Link href="/preview/wedding-traditional-indian" className="px-10 py-4 border border-[#A16207] border-opacity-40 text-[#A16207] text-sm tracking-[0.2em] uppercase hover:bg-[#A16207] hover:text-[#0C0A09] transition-all duration-500">
              See Live Demo
            </Link>
          </div>
        </div>
      </section>

      <section className="relative py-20 px-6 overflow-hidden">
        <div className="absolute inset-0 bg-[#111009]" />
        <div className="relative z-10 max-w-4xl mx-auto">
          <h2 className="font-['Playfair_Display'] text-4xl text-[#FAFAF9] text-center mb-12">What is a Digital Wedding Card?</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            <div>
              <h3 className="font-['Playfair_Display'] text-xl text-[#A16207] mb-4">What it is</h3>
              <ul className="space-y-3 font-['Cormorant_Infant'] text-lg text-[#FAFAF9] opacity-60">
                {[
                  'A shareable link that opens in any browser',
                  'Fully animated — every element moves as guests scroll',
                  'Tells your love story in chapters',
                  'Shows illustrated characters that look like you',
                  'Has a live countdown to your wedding day',
                  'Collects RSVPs automatically',
                ].map(item => (
                  <li key={item} className="flex items-start gap-2">
                    <span className="text-[#A16207] flex-shrink-0 mt-1">✦</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="font-['Playfair_Display'] text-xl text-[#DC2626] mb-4">What it's not</h3>
              <ul className="space-y-3 font-['Cormorant_Infant'] text-lg text-[#FAFAF9] opacity-40">
                {[
                  'Not a PDF you have to download',
                  'Not a static image on WhatsApp',
                  'Not a boring template from Canva',
                  'Not something guests need an app to open',
                  'Not a printed card that gets lost',
                  'Not something you have to design yourself',
                ].map(item => (
                  <li key={item} className="flex items-start gap-2">
                    <span className="text-[#DC2626] flex-shrink-0 mt-1">✗</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="relative py-20 px-6 overflow-hidden">
        <div className="absolute inset-0 bg-[#0C0A09]" />
        <div className="relative z-10 max-w-4xl mx-auto">
          <h2 className="font-['Playfair_Display'] text-4xl text-[#FAFAF9] text-center mb-4">18 Digital Wedding Card Designs</h2>
          <p className="font-['Cormorant_Infant'] text-xl text-[#FAFAF9] opacity-50 text-center mb-12">
            From traditional Indian to modern minimalist — each design is a complete world
          </p>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {[
              { id: 'wedding-traditional-indian', name: 'Shaadi Rang', desc: 'Traditional Indian', color: '#DC2626' },
              { id: 'wedding-modern-elegant', name: 'Noir & Gold', desc: 'Modern Luxury', color: '#A16207' },
              { id: 'wedding-retro-bollywood', name: 'Filmi Shaadi', desc: 'Retro Bollywood', color: '#C8860A' },
              { id: 'wedding-celestial', name: 'Written in Stars', desc: 'Celestial', color: '#7C3AED' },
              { id: 'wedding-royal', name: 'The Grand Affair', desc: 'Royal', color: '#B45309' },
              { id: 'wedding-minimalist', name: 'The Quiet Luxury', desc: 'Minimalist', color: '#1A1A1A' },
            ].map(t => (
              <Link key={t.id} href={`/preview/${t.id}`}
                className="group border border-white/5 hover:border-opacity-50 transition-all duration-500 overflow-hidden">
                <div className="h-32 flex items-center justify-center relative"
                  style={{ background: `radial-gradient(ellipse at center, ${t.color}20 0%, #0C0A09 70%)` }}>
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-black/30 flex items-center justify-center">
                    <span className="text-xs tracking-widest uppercase border px-3 py-1" style={{ borderColor: t.color, color: t.color }}>Preview</span>
                  </div>
                  <p className="text-2xl text-[#FAFAF9]" style={{ fontFamily: "'Great Vibes', cursive" }}>{t.name}</p>
                </div>
                <div className="p-3">
                  <p className="text-[#FAFAF9] opacity-40 text-xs font-['Cormorant_Infant']">{t.desc}</p>
                </div>
              </Link>
            ))}
          </div>
          <div className="text-center mt-8">
            <Link href="/#templates" className="text-[#A16207] text-xs tracking-widest uppercase hover:opacity-70 transition-opacity">
              View all 18 designs →
            </Link>
          </div>
        </div>
      </section>

      <section className="relative py-20 px-6 overflow-hidden">
        <div className="absolute inset-0 bg-[#111009]" />
        <div className="relative z-10 max-w-3xl mx-auto">
          <h2 className="font-['Playfair_Display'] text-4xl text-[#FAFAF9] text-center mb-12">Digital vs Printed Wedding Card</h2>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-white/10">
                  <th className="text-left py-3 font-['Playfair_Display'] text-[#FAFAF9] opacity-50 text-sm">Feature</th>
                  <th className="text-center py-3 font-['Playfair_Display'] text-[#A16207] text-sm">Digital (Invitely)</th>
                  <th className="text-center py-3 font-['Playfair_Display'] text-[#FAFAF9] opacity-30 text-sm">Printed Card</th>
                </tr>
              </thead>
              <tbody className="font-['Cormorant_Infant'] text-base">
                {[
                  ['Cost', '₹999 for all guests', '₹15,000+ for 200 cards'],
                  ['Delivery', 'Instant via WhatsApp', '1-2 weeks courier'],
                  ['Animations', '✓ Full scrollytelling', '✗ Static'],
                  ['RSVP tracking', '✓ Automatic', '✗ Manual calls'],
                  ['Edit after sending', '✓ Anytime', '✗ Reprint required'],
                  ['Lost/damaged', '✓ Never', '✗ Common'],
                  ['Eco-friendly', '✓ Zero paper', '✗ Paper waste'],
                ].map(([feature, digital, printed]) => (
                  <tr key={feature} className="border-b border-white/5">
                    <td className="py-3 text-[#FAFAF9] opacity-50">{feature}</td>
                    <td className="py-3 text-center text-[#A16207]">{digital}</td>
                    <td className="py-3 text-center text-[#FAFAF9] opacity-30">{printed}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <section className="relative py-20 px-6 overflow-hidden">
        <div className="absolute inset-0 bg-[#0C0A09]" />
        <div className="relative z-10 text-center max-w-xl mx-auto">
          <h2 className="font-['Great_Vibes'] text-7xl text-[#FAFAF9] mb-4">Create Yours</h2>
          <p className="font-['Cormorant_Infant'] text-xl text-[#FAFAF9] opacity-50 mb-10">
            Create your digital wedding card in 2 minutes. Free to start.
          </p>
          <Link href="/builder" className="inline-block px-14 py-5 bg-[#A16207] text-[#0C0A09] text-sm tracking-[0.2em] uppercase font-semibold hover:bg-[#FAFAF9] transition-all duration-500">
            Create Digital Wedding Card
          </Link>
        </div>
      </section>

      <footer className="relative py-10 px-6 border-t border-white/5">
        <div className="max-w-4xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <Link href="/" className="font-['Great_Vibes'] text-2xl text-[#FAFAF9] opacity-30">Invitely</Link>
          <div className="flex gap-6">
            <Link href="/wedding-invitation-maker" className="text-[#FAFAF9] opacity-25 text-xs tracking-widest uppercase hover:opacity-50">Wedding Invites</Link>
            <Link href="/whatsapp-wedding-invitation" className="text-[#FAFAF9] opacity-25 text-xs tracking-widest uppercase hover:opacity-50">WhatsApp Invite</Link>
            <Link href="/pricing" className="text-[#FAFAF9] opacity-25 text-xs tracking-widest uppercase hover:opacity-50">Pricing</Link>
          </div>
          <p className="text-[#FAFAF9] opacity-15 text-xs">Made with love · India</p>
        </div>
      </footer>
    </div>
  )
}
