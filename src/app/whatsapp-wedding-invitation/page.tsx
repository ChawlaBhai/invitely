import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'WhatsApp Wedding Invitation — Share Your Invite on WhatsApp | Invitely',
  description: 'Create a beautiful animated wedding invitation and share it on WhatsApp in one tap. No printing, no courier. Works on any phone. India\'s most loved digital invite platform.',
  keywords: 'WhatsApp wedding invitation, share wedding invite WhatsApp, digital wedding card WhatsApp, wedding invitation link WhatsApp India',
  openGraph: {
    title: 'WhatsApp Wedding Invitation | Invitely',
    description: 'Create animated wedding invitations. Share on WhatsApp instantly.',
    type: 'website',
  },
}

export default function WhatsAppWeddingInvitationPage() {
  return (
    <div className="min-h-screen bg-[#0C0A09] text-[#FAFAF9]">
      <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-8 py-5 bg-[#0C0A09]/80 backdrop-blur-md border-b border-white/5">
        <Link href="/" className="font-['Great_Vibes'] text-2xl text-[#FAFAF9]">Invitely</Link>
        <Link href="/builder" className="px-5 py-2 bg-[#25D366] text-white text-xs tracking-widest uppercase font-semibold hover:bg-[#128C7E] transition-colors">
          Create &amp; Share
        </Link>
      </nav>

      {/* Hero */}
      <section className="relative pt-40 pb-20 px-6 text-center overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_#1C1917_0%,_#0C0A09_60%)]" />
        <div className="relative z-10 max-w-3xl mx-auto">
          <div className="flex items-center justify-center gap-3 mb-6">
            <svg viewBox="0 0 24 24" className="w-8 h-8" fill="#25D366">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
            </svg>
            <span className="text-[#25D366] tracking-[0.3em] text-xs uppercase font-semibold">WhatsApp-First</span>
          </div>
          <h1 className="font-['Playfair_Display'] text-5xl md:text-7xl text-[#FAFAF9] leading-tight mb-4">
            Share Your Wedding Invite on WhatsApp
          </h1>
          <p className="font-['Cormorant_Infant'] text-xl text-[#FAFAF9] opacity-50 max-w-2xl mx-auto leading-relaxed mb-10">
            Create a beautiful animated wedding invitation. Get a link. Share it on WhatsApp in one tap. Every guest opens it instantly — no app, no download, no friction.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/builder"
              className="flex items-center justify-center gap-2 px-12 py-4 text-sm tracking-[0.2em] uppercase font-semibold transition-all duration-500"
              style={{ background: '#25D366', color: 'white' }}>
              <svg viewBox="0 0 24 24" className="w-4 h-4" fill="currentColor">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
              </svg>
              Create &amp; Share on WhatsApp
            </Link>
            <Link href="/preview/wedding-modern-elegant" className="px-10 py-4 border border-[#A16207] border-opacity-40 text-[#A16207] text-sm tracking-[0.2em] uppercase hover:bg-[#A16207] hover:text-[#0C0A09] transition-all duration-500">
              See Live Demo
            </Link>
          </div>
        </div>
      </section>

      {/* How WhatsApp sharing works */}
      <section className="relative py-20 px-6 overflow-hidden">
        <div className="absolute inset-0 bg-[#111009]" />
        <div className="relative z-10 max-w-3xl mx-auto">
          <h2 className="font-['Playfair_Display'] text-4xl text-[#FAFAF9] text-center mb-12">How It Works on WhatsApp</h2>
          <div className="space-y-8">
            {[
              { step: '01', title: 'Create Your Invite', desc: 'Pick a template, add your names, date, venue, and love story. Takes about 2 minutes.' },
              { step: '02', title: 'Get Your Link', desc: 'Your invite is live instantly at a unique URL like invitely.in/i/arjun-weds-priya.' },
              { step: '03', title: 'Share on WhatsApp', desc: 'Tap "Share on WhatsApp" — the link goes with a preview message. One tap, done.' },
              { step: '04', title: 'Guests Open Instantly', desc: 'Guests tap the link. The invite opens in their browser — no app, no download, no friction. Works on any phone.' },
            ].map(({ step, title, desc }) => (
              <div key={step} className="flex gap-6">
                <p className="font-['Playfair_Display'] text-4xl text-[#25D366] opacity-30 flex-shrink-0 w-12">{step}</p>
                <div>
                  <h3 className="font-['Playfair_Display'] text-xl text-[#FAFAF9] mb-2">{title}</h3>
                  <p className="font-['Cormorant_Infant'] text-lg text-[#FAFAF9] opacity-50 leading-relaxed">{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why WhatsApp */}
      <section className="relative py-20 px-6 overflow-hidden">
        <div className="absolute inset-0 bg-[#0C0A09]" />
        <div className="relative z-10 max-w-4xl mx-auto">
          <h2 className="font-['Playfair_Display'] text-4xl text-[#FAFAF9] text-center mb-12">Why WhatsApp is the Best Way to Share</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[
              { icon: '📱', title: 'Everyone is on WhatsApp', desc: 'In India, WhatsApp is how families communicate. Your invite reaches everyone — relatives, friends, colleagues — in one tap.' },
              { icon: '⚡', title: 'Opens Instantly', desc: 'No app to download. No account to create. Guests tap the link and the invite opens in 2 seconds.' },
              { icon: '🔗', title: 'Rich Link Preview', desc: 'WhatsApp shows a beautiful preview card with the couple\'s names and a preview image. Guests know what they\'re opening.' },
              { icon: '📊', title: 'Track Who Opened', desc: 'See how many times your invite was viewed. Know who RSVPed and who needs a follow-up.' },
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

      {/* vs printed cards */}
      <section className="relative py-20 px-6 overflow-hidden">
        <div className="absolute inset-0 bg-[#111009]" />
        <div className="relative z-10 max-w-3xl mx-auto">
          <h2 className="font-['Playfair_Display'] text-4xl text-[#FAFAF9] text-center mb-12">WhatsApp Invite vs Printed Card</h2>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-white/10">
                  <th className="text-left py-3 font-['Playfair_Display'] text-[#FAFAF9] opacity-50 text-sm">Feature</th>
                  <th className="text-center py-3 font-['Playfair_Display'] text-[#25D366] text-sm">Invitely (WhatsApp)</th>
                  <th className="text-center py-3 font-['Playfair_Display'] text-[#FAFAF9] opacity-30 text-sm">Printed Card</th>
                </tr>
              </thead>
              <tbody className="font-['Cormorant_Infant'] text-base">
                {[
                  ['Cost', '₹999 for all guests', '₹15,000+ for 200 cards'],
                  ['Delivery', 'Instant', '1-2 weeks'],
                  ['RSVP tracking', '✓ Built-in', '✗ Manual'],
                  ['Animations', '✓ Full scrollytelling', '✗ Static'],
                  ['Edit after sending', '✓ Anytime', '✗ Reprint required'],
                  ['Eco-friendly', '✓ Zero paper', '✗ Paper waste'],
                  ['Works on WhatsApp', '✓ One tap share', '✗ Physical only'],
                ].map(([feature, invitely, printed]) => (
                  <tr key={feature} className="border-b border-white/5">
                    <td className="py-3 text-[#FAFAF9] opacity-50">{feature}</td>
                    <td className="py-3 text-center text-[#25D366]">{invitely}</td>
                    <td className="py-3 text-center text-[#FAFAF9] opacity-30">{printed}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative py-20 px-6 overflow-hidden">
        <div className="absolute inset-0 bg-[#0C0A09]" />
        <div className="relative z-10 text-center max-w-xl mx-auto">
          <h2 className="font-['Great_Vibes'] text-7xl text-[#FAFAF9] mb-4">Share the Love</h2>
          <p className="font-['Cormorant_Infant'] text-xl text-[#FAFAF9] opacity-50 mb-10">
            Create your WhatsApp wedding invitation in 2 minutes. Free to start.
          </p>
          <Link href="/builder"
            className="inline-flex items-center gap-2 px-14 py-5 text-sm tracking-[0.2em] uppercase font-semibold transition-all duration-500"
            style={{ background: '#25D366', color: 'white' }}>
            <svg viewBox="0 0 24 24" className="w-4 h-4" fill="currentColor">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
            </svg>
            Create WhatsApp Invite
          </Link>
        </div>
      </section>

      <footer className="relative py-10 px-6 border-t border-white/5">
        <div className="max-w-4xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <Link href="/" className="font-['Great_Vibes'] text-2xl text-[#FAFAF9] opacity-30">Invitely</Link>
          <div className="flex gap-6">
            <Link href="/wedding-invitation-maker" className="text-[#FAFAF9] opacity-25 text-xs tracking-widest uppercase hover:opacity-50">Wedding Invites</Link>
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
