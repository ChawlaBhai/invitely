import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Wedding Invitation Maker India — Animated Digital Wedding Cards | Invitely',
  description: 'Create stunning animated wedding invitations online. Share on WhatsApp instantly. 18 unique templates for Indian weddings. No printing, no waiting. Start free.',
  keywords: 'wedding invitation maker India, digital wedding card, WhatsApp wedding invite, online wedding invitation, animated wedding card',
  openGraph: {
    title: 'Wedding Invitation Maker India | Invitely',
    description: 'Create animated wedding invitations. Share on WhatsApp. 18 templates.',
    type: 'website',
  },
}

const TEMPLATES = [
  { id: 'wedding-traditional-indian', name: 'Shaadi Rang', desc: 'Traditional Indian — jewel tones, mandala, diyas', color: '#DC2626' },
  { id: 'wedding-modern-elegant', name: 'Noir & Gold', desc: 'Modern luxury — dark, cinematic, gold accents', color: '#A16207' },
  { id: 'wedding-retro-bollywood', name: 'Filmi Shaadi', desc: 'Vintage Bollywood — dramatic, warm, desi', color: '#C8860A' },
  { id: 'wedding-celestial', name: 'Written in Stars', desc: 'Celestial — deep navy, constellations, cosmic', color: '#7C3AED' },
  { id: 'wedding-royal', name: 'The Grand Affair', desc: 'Royal — palatial, opulent, burgundy gold', color: '#B45309' },
  { id: 'wedding-beach', name: 'Salt & Sundown', desc: 'Beach — golden hour, waves, destination wedding', color: '#0891B2' },
]

export default function WeddingInvitationMakerPage() {
  return (
    <div className="min-h-screen bg-[#0C0A09] text-[#FAFAF9]">
      <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-8 py-5 bg-[#0C0A09]/80 backdrop-blur-md border-b border-white/5">
        <Link href="/" className="font-['Great_Vibes'] text-2xl text-[#FAFAF9]">Invitely</Link>
        <Link href="/builder" className="px-5 py-2 bg-[#A16207] text-[#0C0A09] text-xs tracking-widest uppercase font-semibold hover:bg-[#FAFAF9] transition-colors">
          Create Free
        </Link>
      </nav>

      {/* Hero */}
      <section className="relative pt-40 pb-20 px-6 text-center overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_#1C1917_0%,_#0C0A09_60%)]" />
        <div className="relative z-10 max-w-3xl mx-auto">
          <p className="text-[#A16207] tracking-[0.4em] text-xs uppercase mb-4">India's Most Beautiful</p>
          <h1 className="font-['Playfair_Display'] text-5xl md:text-7xl text-[#FAFAF9] leading-tight mb-4">
            Wedding Invitation Maker
          </h1>
          <p className="font-['Cormorant_Infant'] text-xl text-[#FAFAF9] opacity-50 max-w-2xl mx-auto leading-relaxed mb-10">
            Create animated, scrollytelling wedding invitations that guests actually open. Share on WhatsApp in seconds. No printing, no waiting, no boring templates.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/builder" className="px-12 py-4 bg-[#A16207] text-[#0C0A09] text-sm tracking-[0.2em] uppercase font-semibold hover:bg-[#FAFAF9] transition-all duration-500">
              Create Your Invite — Free
            </Link>
            <Link href="/preview/wedding-traditional-indian" className="px-10 py-4 border border-[#A16207] border-opacity-40 text-[#A16207] text-sm tracking-[0.2em] uppercase hover:bg-[#A16207] hover:text-[#0C0A09] transition-all duration-500">
              See Live Demo
            </Link>
          </div>
        </div>
      </section>

      {/* Why digital */}
      <section className="relative py-20 px-6 overflow-hidden">
        <div className="absolute inset-0 bg-[#111009]" />
        <div className="relative z-10 max-w-4xl mx-auto">
          <h2 className="font-['Playfair_Display'] text-4xl text-[#FAFAF9] text-center mb-12">Why Digital Wedding Invitations?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { icon: '📱', title: 'WhatsApp-First', desc: 'Share your invite link on WhatsApp. Guests open it instantly — no app, no login, no friction.' },
              { icon: '✨', title: 'Actually Beautiful', desc: 'Not a PDF. Not a static image. A full scrollytelling experience that makes guests feel the love.' },
              { icon: '💰', title: 'Save ₹10,000+', desc: 'Skip the printing, the courier, the delays. One link reaches everyone in seconds.' },
              { icon: '📊', title: 'Know Who\'s Coming', desc: 'Built-in RSVP tracking. See who opened, who responded, who needs a follow-up.' },
              { icon: '🎨', title: '18 Unique Templates', desc: 'From traditional Indian to modern minimalist. Each template is a world of its own.' },
              { icon: '👤', title: 'Illustrated Personas', desc: 'Customisable illustrated characters that look like the actual couple. Nothing like this exists anywhere else.' },
            ].map(({ icon, title, desc }) => (
              <div key={title} className="text-center">
                <div className="text-3xl mb-3">{icon}</div>
                <h3 className="font-['Playfair_Display'] text-lg text-[#FAFAF9] mb-2">{title}</h3>
                <p className="font-['Cormorant_Infant'] text-base text-[#FAFAF9] opacity-50 leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Templates */}
      <section className="relative py-20 px-6 overflow-hidden">
        <div className="absolute inset-0 bg-[#0C0A09]" />
        <div className="relative z-10 max-w-5xl mx-auto">
          <h2 className="font-['Playfair_Display'] text-4xl text-[#FAFAF9] text-center mb-4">Wedding Invitation Templates</h2>
          <p className="font-['Cormorant_Infant'] text-xl text-[#FAFAF9] opacity-50 text-center mb-12">
            9 wedding templates — from traditional Indian to modern minimalist
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {TEMPLATES.map(t => (
              <Link key={t.id} href={`/preview/${t.id}`}
                className="group border border-white/5 hover:border-opacity-50 transition-all duration-500 overflow-hidden"
                style={{ '--t': t.color } as React.CSSProperties}>
                <div className="h-40 flex items-center justify-center relative"
                  style={{ background: `radial-gradient(ellipse at center, ${t.color}20 0%, #0C0A09 70%)` }}>
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-black/30 flex items-center justify-center">
                    <span className="text-xs tracking-widest uppercase border px-4 py-2" style={{ borderColor: t.color, color: t.color }}>Preview</span>
                  </div>
                  <p className="text-3xl text-[#FAFAF9]" style={{ fontFamily: "'Great Vibes', cursive" }}>{t.name}</p>
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

      {/* How it works */}
      <section className="relative py-20 px-6 overflow-hidden">
        <div className="absolute inset-0 bg-[#111009]" />
        <div className="relative z-10 max-w-3xl mx-auto">
          <h2 className="font-['Playfair_Display'] text-4xl text-[#FAFAF9] text-center mb-12">How to Create a Wedding Invitation</h2>
          <div className="space-y-8">
            {[
              { step: '01', title: 'Pick a Template', desc: 'Choose from 18 handcrafted templates. Each one is a complete visual world — not just a theme.' },
              { step: '02', title: 'Add Your Story', desc: 'Enter names, date, venue, and your love story. Customise how you both look with illustrated personas.' },
              { step: '03', title: 'Get Your Link', desc: 'Your invite is live instantly. Share the link on WhatsApp, Instagram, or anywhere.' },
              { step: '04', title: 'Track RSVPs', desc: 'See who\'s coming from your dashboard. Export to CSV for your wedding planner.' },
            ].map(({ step, title, desc }) => (
              <div key={step} className="flex gap-6">
                <p className="font-['Playfair_Display'] text-4xl text-[#A16207] opacity-20 flex-shrink-0 w-12">{step}</p>
                <div>
                  <h3 className="font-['Playfair_Display'] text-xl text-[#FAFAF9] mb-2">{title}</h3>
                  <p className="font-['Cormorant_Infant'] text-lg text-[#FAFAF9] opacity-50 leading-relaxed">{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="relative py-20 px-6 overflow-hidden">
        <div className="absolute inset-0 bg-[#0C0A09]" />
        <div className="relative z-10 max-w-2xl mx-auto">
          <h2 className="font-['Playfair_Display'] text-4xl text-[#FAFAF9] text-center mb-12">Frequently Asked Questions</h2>
          <div className="space-y-6">
            {[
              { q: 'Is Invitely free to use?', a: 'You can create and preview your invite for free. To share it with guests, plans start at ₹999 per invite.' },
              { q: 'Can I share on WhatsApp?', a: 'Yes. Every invite is a link that works perfectly on WhatsApp. Guests open it instantly on any phone.' },
              { q: 'Do guests need to download an app?', a: 'No. Guests just open the link in their browser. No app, no login, no friction.' },
              { q: 'Can I use it for Indian weddings?', a: 'Absolutely. We have dedicated templates for traditional Indian weddings — Shaadi Rang, Filmi Shaadi, and more.' },
              { q: 'How long does it take to create?', a: 'About 2 minutes. Fill in the details, pick the look, get your link.' },
              { q: 'Can I edit after creating?', a: 'Yes. Edit names, dates, story, and photos anytime from your dashboard.' },
            ].map(({ q, a }) => (
              <div key={q} className="border border-white/5 p-5 bg-[#111009]">
                <h3 className="font-['Playfair_Display'] text-lg text-[#FAFAF9] mb-2">{q}</h3>
                <p className="font-['Cormorant_Infant'] text-base text-[#FAFAF9] opacity-50 leading-relaxed">{a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative py-20 px-6 overflow-hidden">
        <div className="absolute inset-0 bg-[#111009]" />
        <div className="relative z-10 text-center max-w-xl mx-auto">
          <h2 className="font-['Great_Vibes'] text-7xl text-[#FAFAF9] mb-4">Start Today</h2>
          <p className="font-['Cormorant_Infant'] text-xl text-[#FAFAF9] opacity-50 mb-10">
            Create your wedding invitation in 2 minutes. No credit card required.
          </p>
          <Link href="/builder" className="inline-block px-14 py-5 bg-[#A16207] text-[#0C0A09] text-sm tracking-[0.2em] uppercase font-semibold hover:bg-[#FAFAF9] transition-all duration-500">
            Create Your Wedding Invite
          </Link>
        </div>
      </section>

      <footer className="relative py-10 px-6 border-t border-white/5">
        <div className="max-w-4xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <Link href="/" className="font-['Great_Vibes'] text-2xl text-[#FAFAF9] opacity-30">Invitely</Link>
          <div className="flex gap-6">
            <Link href="/pricing" className="text-[#FAFAF9] opacity-25 text-xs tracking-widest uppercase hover:opacity-50">Pricing</Link>
            <Link href="/for-planners" className="text-[#FAFAF9] opacity-25 text-xs tracking-widest uppercase hover:opacity-50">For Planners</Link>
            <Link href="/terms" className="text-[#FAFAF9] opacity-25 text-xs tracking-widest uppercase hover:opacity-50">Terms</Link>
            <Link href="/privacy" className="text-[#FAFAF9] opacity-25 text-xs tracking-widest uppercase hover:opacity-50">Privacy</Link>
          </div>
          <p className="text-[#FAFAF9] opacity-15 text-xs">Made with love · India</p>
        </div>
      </footer>
    </div>
  )
}
