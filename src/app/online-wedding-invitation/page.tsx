import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Online Wedding Invitation India — Create & Share Instantly | Invitely',
  description: 'Create stunning online wedding invitations in minutes. Animated, scrollytelling cards that guests love. Share on WhatsApp. 18 unique designs. Start free today.',
  keywords: 'online wedding invitation India, create wedding invitation online, wedding e-invite India, digital wedding invitation maker, online shaadi card',
  openGraph: {
    title: 'Online Wedding Invitation India | Invitely',
    description: 'Create animated online wedding invitations. Share on WhatsApp. 18 designs.',
    type: 'website',
  },
}

export default function OnlineWeddingInvitationPage() {
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
          <p className="text-[#A16207] tracking-[0.4em] text-xs uppercase mb-4">India's Most Beautiful</p>
          <h1 className="font-['Playfair_Display'] text-5xl md:text-7xl text-[#FAFAF9] leading-tight mb-4">
            Online Wedding Invitation
          </h1>
          <p className="font-['Cormorant_Infant'] text-xl text-[#FAFAF9] opacity-50 max-w-2xl mx-auto leading-relaxed mb-10">
            Create a beautiful online wedding invitation in 2 minutes. Animated, scrollytelling, and designed to make every guest feel the love before they even arrive.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/builder" className="px-12 py-4 bg-[#A16207] text-[#0C0A09] text-sm tracking-[0.2em] uppercase font-semibold hover:bg-[#FAFAF9] transition-all duration-500">
              Create Online Invitation — Free
            </Link>
            <Link href="/preview/wedding-modern-elegant" className="px-10 py-4 border border-[#A16207] border-opacity-40 text-[#A16207] text-sm tracking-[0.2em] uppercase hover:bg-[#A16207] hover:text-[#0C0A09] transition-all duration-500">
              See Live Demo
            </Link>
          </div>
        </div>
      </section>

      <section className="relative py-20 px-6 overflow-hidden">
        <div className="absolute inset-0 bg-[#111009]" />
        <div className="relative z-10 max-w-4xl mx-auto">
          <h2 className="font-['Playfair_Display'] text-4xl text-[#FAFAF9] text-center mb-12">Why Create an Online Wedding Invitation?</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { icon: '⚡', title: 'Instant Delivery', desc: 'Share your invite link on WhatsApp the moment it\'s ready. No printing, no courier, no waiting.' },
              { icon: '💰', title: 'Save ₹10,000+', desc: 'Skip the printing costs. One link reaches all your guests — family, friends, colleagues — for ₹999.' },
              { icon: '✨', title: 'Actually Beautiful', desc: 'Not a PDF. A fully animated, scrollytelling experience that makes guests feel the celebration starting.' },
              { icon: '📊', title: 'Track RSVPs', desc: 'Know exactly who\'s coming. Built-in RSVP tracking with a dashboard. No more calling everyone.' },
              { icon: '✏️', title: 'Edit Anytime', desc: 'Change the venue, update the time, add photos — edit your invite anytime from your dashboard.' },
              { icon: '🌍', title: 'Reach Everyone', desc: 'Send to guests in any city, any country. The link works on any phone, anywhere in the world.' },
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

      <section className="relative py-20 px-6 overflow-hidden">
        <div className="absolute inset-0 bg-[#0C0A09]" />
        <div className="relative z-10 max-w-3xl mx-auto">
          <h2 className="font-['Playfair_Display'] text-4xl text-[#FAFAF9] text-center mb-12">How to Create an Online Wedding Invitation</h2>
          <div className="space-y-8">
            {[
              { step: '01', title: 'Choose a Template', desc: '18 handcrafted designs — from traditional Indian to modern minimalist. Each one is a complete visual world.' },
              { step: '02', title: 'Add Your Details', desc: 'Enter names, date, venue, and your love story. Customise illustrated characters that look like you both.' },
              { step: '03', title: 'Get Your Link', desc: 'Your online invitation is live instantly at a unique URL. Share it anywhere.' },
              { step: '04', title: 'Collect RSVPs', desc: 'Guests RSVP directly on the invite. You see all responses in your dashboard.' },
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

      <section className="relative py-20 px-6 overflow-hidden">
        <div className="absolute inset-0 bg-[#111009]" />
        <div className="relative z-10 text-center max-w-xl mx-auto">
          <h2 className="font-['Great_Vibes'] text-7xl text-[#FAFAF9] mb-4">Start Today</h2>
          <p className="font-['Cormorant_Infant'] text-xl text-[#FAFAF9] opacity-50 mb-10">
            Create your online wedding invitation in 2 minutes. No credit card required.
          </p>
          <Link href="/builder" className="inline-block px-14 py-5 bg-[#A16207] text-[#0C0A09] text-sm tracking-[0.2em] uppercase font-semibold hover:bg-[#FAFAF9] transition-all duration-500">
            Create Online Wedding Invitation
          </Link>
        </div>
      </section>

      <footer className="relative py-10 px-6 border-t border-white/5">
        <div className="max-w-4xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <Link href="/" className="font-['Great_Vibes'] text-2xl text-[#FAFAF9] opacity-30">Invitely</Link>
          <div className="flex gap-6">
            <Link href="/wedding-invitation-maker" className="text-[#FAFAF9] opacity-25 text-xs tracking-widest uppercase hover:opacity-50">Wedding Invites</Link>
            <Link href="/digital-wedding-card" className="text-[#FAFAF9] opacity-25 text-xs tracking-widest uppercase hover:opacity-50">Digital Cards</Link>
            <Link href="/pricing" className="text-[#FAFAF9] opacity-25 text-xs tracking-widest uppercase hover:opacity-50">Pricing</Link>
          </div>
          <p className="text-[#FAFAF9] opacity-15 text-xs">Made with love · India</p>
        </div>
      </footer>
    </div>
  )
}
