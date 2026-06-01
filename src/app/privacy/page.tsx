import Link from 'next/link'

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-[#0C0A09] text-[#FAFAF9] px-6 py-20">
      <div className="max-w-3xl mx-auto">
        <div className="mb-12">
          <Link href="/" className="font-['Great_Vibes'] text-2xl text-[#FAFAF9] opacity-50 hover:opacity-100 transition-opacity">Invitely</Link>
        </div>

        <p className="text-[#A16207] tracking-[0.3em] text-xs uppercase mb-4">Legal</p>
        <h1 className="font-['Playfair_Display'] text-4xl text-[#FAFAF9] mb-2">Privacy Policy</h1>
        <p className="text-[#FAFAF9] opacity-30 text-sm mb-12">Last updated: June 2025</p>

        <div className="space-y-10 font-['Cormorant_Infant'] text-lg text-[#FAFAF9] opacity-70 leading-relaxed">
          <section>
            <h2 className="font-['Playfair_Display'] text-xl text-[#FAFAF9] opacity-100 mb-3">1. Information We Collect</h2>
            <p>When you create an invite, we collect the information you provide: names, event details, photos, and story text. When guests RSVP, we collect their name, phone number (optional), and attendance response. We also collect basic usage data (page views, invite opens) to improve the service.</p>
          </section>

          <section>
            <h2 className="font-['Playfair_Display'] text-xl text-[#FAFAF9] opacity-100 mb-3">2. How We Use Your Information</h2>
            <p>We use your information to: display your invite to guests, send RSVP notifications to you (if you provide your email), process payments, and improve the Service. We do not sell your personal information to third parties.</p>
          </section>

          <section>
            <h2 className="font-['Playfair_Display'] text-xl text-[#FAFAF9] opacity-100 mb-3">3. Data Storage</h2>
            <p>Invite data is stored securely. Photos you upload are stored on our servers. Invite data is retained for the duration of your invite's validity period, plus 30 days after expiry. You can request deletion of your data at any time by contacting us.</p>
          </section>

          <section>
            <h2 className="font-['Playfair_Display'] text-xl text-[#FAFAF9] opacity-100 mb-3">4. Cookies and Local Storage</h2>
            <p>We use browser local storage to remember your recent invites on your device. We use cookies only for essential functions (password-protected invite authentication). We do not use tracking cookies or third-party advertising cookies.</p>
          </section>

          <section>
            <h2 className="font-['Playfair_Display'] text-xl text-[#FAFAF9] opacity-100 mb-3">5. Payment Information</h2>
            <p>Payments are processed by Razorpay. We do not store your card details. Razorpay's privacy policy applies to payment processing. We receive only a confirmation of successful payment.</p>
          </section>

          <section>
            <h2 className="font-['Playfair_Display'] text-xl text-[#FAFAF9] opacity-100 mb-3">6. Guest Data</h2>
            <p>RSVP responses (name, phone, attendance) are visible only to the invite creator via their dashboard. Guests' data is not shared with third parties. Guests may request deletion of their RSVP by contacting the invite creator or us directly.</p>
          </section>

          <section>
            <h2 className="font-['Playfair_Display'] text-xl text-[#FAFAF9] opacity-100 mb-3">7. Third-Party Services</h2>
            <p>We use the following third-party services: Razorpay (payments), Resend (email notifications), Supabase (database, in production), Google Fonts (typography). Each has their own privacy policy.</p>
          </section>

          <section>
            <h2 className="font-['Playfair_Display'] text-xl text-[#FAFAF9] opacity-100 mb-3">8. Your Rights</h2>
            <p>Under Indian data protection law, you have the right to access, correct, or delete your personal data. To exercise these rights, contact us at hello@invitely.in. We will respond within 30 days.</p>
          </section>

          <section>
            <h2 className="font-['Playfair_Display'] text-xl text-[#FAFAF9] opacity-100 mb-3">9. Children's Privacy</h2>
            <p>Invitely is not directed at children under 13. We do not knowingly collect personal information from children under 13.</p>
          </section>

          <section>
            <h2 className="font-['Playfair_Display'] text-xl text-[#FAFAF9] opacity-100 mb-3">10. Contact</h2>
            <p>For privacy questions or data requests, contact us at <a href="mailto:hello@invitely.in" className="text-[#A16207] hover:opacity-70 transition-opacity">hello@invitely.in</a>.</p>
          </section>
        </div>

        <div className="mt-16 pt-8 border-t border-white/5 flex gap-6">
          <Link href="/terms" className="text-[#A16207] text-xs tracking-widest uppercase hover:opacity-70 transition-opacity">Terms of Service</Link>
          <Link href="/" className="text-[#FAFAF9] opacity-30 text-xs tracking-widest uppercase hover:opacity-60 transition-opacity">Home</Link>
        </div>
      </div>
    </div>
  )
}
