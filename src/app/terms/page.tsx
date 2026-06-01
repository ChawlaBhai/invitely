import Link from 'next/link'

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-[#0C0A09] text-[#FAFAF9] px-6 py-20">
      <div className="max-w-3xl mx-auto">
        <div className="mb-12">
          <Link href="/" className="font-['Great_Vibes'] text-2xl text-[#FAFAF9] opacity-50 hover:opacity-100 transition-opacity">Invitely</Link>
        </div>

        <p className="text-[#A16207] tracking-[0.3em] text-xs uppercase mb-4">Legal</p>
        <h1 className="font-['Playfair_Display'] text-4xl text-[#FAFAF9] mb-2">Terms of Service</h1>
        <p className="text-[#FAFAF9] opacity-30 text-sm mb-12">Last updated: June 2025</p>

        <div className="space-y-10 font-['Cormorant_Infant'] text-lg text-[#FAFAF9] opacity-70 leading-relaxed">
          <section>
            <h2 className="font-['Playfair_Display'] text-xl text-[#FAFAF9] opacity-100 mb-3">1. Acceptance of Terms</h2>
            <p>By using Invitely ("the Service"), you agree to these Terms of Service. If you do not agree, please do not use the Service. These terms are governed by the laws of India.</p>
          </section>

          <section>
            <h2 className="font-['Playfair_Display'] text-xl text-[#FAFAF9] opacity-100 mb-3">2. The Service</h2>
            <p>Invitely provides a platform for creating animated, scrollytelling digital invitations for weddings and birthdays. We provide shareable links, RSVP tracking, and related features.</p>
          </section>

          <section>
            <h2 className="font-['Playfair_Display'] text-xl text-[#FAFAF9] opacity-100 mb-3">3. Payments</h2>
            <p>Payments are processed securely via Razorpay. All prices are in Indian Rupees (INR) and inclusive of applicable taxes. Payments are non-refundable except as described in our refund policy below.</p>
          </section>

          <section>
            <h2 className="font-['Playfair_Display'] text-xl text-[#FAFAF9] opacity-100 mb-3">4. Refund Policy</h2>
            <p>If you are not satisfied with your invite within 24 hours of creation, contact us at hello@invitely.in for a full refund. After 24 hours, refunds are at our discretion.</p>
          </section>

          <section>
            <h2 className="font-['Playfair_Display'] text-xl text-[#FAFAF9] opacity-100 mb-3">5. Invite Validity</h2>
            <p>Classic invites are valid for 90 days from creation. Premium and Luxury invites are valid for 1 year (Premium) or 2 years (Luxury). After expiry, invites show a "celebration has passed" page. Validity can be extended from your dashboard.</p>
          </section>

          <section>
            <h2 className="font-['Playfair_Display'] text-xl text-[#FAFAF9] opacity-100 mb-3">6. User Content</h2>
            <p>You retain ownership of all content you upload (photos, text, stories). By uploading content, you grant Invitely a limited license to display it as part of your invite. You are responsible for ensuring you have the right to use all content you upload.</p>
          </section>

          <section>
            <h2 className="font-['Playfair_Display'] text-xl text-[#FAFAF9] opacity-100 mb-3">7. Prohibited Use</h2>
            <p>You may not use Invitely for illegal purposes, to harass others, to distribute spam, or to infringe on intellectual property rights. We reserve the right to terminate accounts that violate these terms.</p>
          </section>

          <section>
            <h2 className="font-['Playfair_Display'] text-xl text-[#FAFAF9] opacity-100 mb-3">8. Limitation of Liability</h2>
            <p>Invitely is provided "as is." We are not liable for any indirect, incidental, or consequential damages arising from your use of the Service. Our total liability is limited to the amount you paid for the specific invite in question.</p>
          </section>

          <section>
            <h2 className="font-['Playfair_Display'] text-xl text-[#FAFAF9] opacity-100 mb-3">9. Changes to Terms</h2>
            <p>We may update these terms from time to time. Continued use of the Service after changes constitutes acceptance of the new terms.</p>
          </section>

          <section>
            <h2 className="font-['Playfair_Display'] text-xl text-[#FAFAF9] opacity-100 mb-3">10. Contact</h2>
            <p>For questions about these terms, contact us at <a href="mailto:hello@invitely.in" className="text-[#A16207] hover:opacity-70 transition-opacity">hello@invitely.in</a>.</p>
          </section>
        </div>

        <div className="mt-16 pt-8 border-t border-white/5 flex gap-6">
          <Link href="/privacy" className="text-[#A16207] text-xs tracking-widest uppercase hover:opacity-70 transition-opacity">Privacy Policy</Link>
          <Link href="/" className="text-[#FAFAF9] opacity-30 text-xs tracking-widest uppercase hover:opacity-60 transition-opacity">Home</Link>
        </div>
      </div>
    </div>
  )
}
