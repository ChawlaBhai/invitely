import Link from 'next/link'

export default function GlobalFooter() {
  return (
    <footer className="relative py-12 px-6 border-t border-white/5 bg-[#0C0A09]">
      <div className="max-w-5xl mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-10">
          <div>
            <p className="text-[#A16207] text-xs tracking-widest uppercase mb-4">Product</p>
            <div className="space-y-2">
              <Link href="/#templates" className="block text-[#FAFAF9] opacity-30 text-xs hover:opacity-60 transition-opacity">Templates</Link>
              
              <Link href="/builder" className="block text-[#FAFAF9] opacity-30 text-xs hover:opacity-60 transition-opacity">Create Invite</Link>
              <Link href="/my-invites" className="block text-[#FAFAF9] opacity-30 text-xs hover:opacity-60 transition-opacity">My Invites</Link>
            </div>
          </div>
          <div>
            <p className="text-[#A16207] text-xs tracking-widest uppercase mb-4">Business</p>
            <div className="space-y-2">
              <Link href="/for-planners" className="block text-[#FAFAF9] opacity-30 text-xs hover:opacity-60 transition-opacity">For Planners</Link>
              <Link href="/for-planners#contact" className="block text-[#FAFAF9] opacity-30 text-xs hover:opacity-60 transition-opacity">Contact Sales</Link>
              <a href="mailto:hello@invitely.in" className="block text-[#FAFAF9] opacity-30 text-xs hover:opacity-60 transition-opacity">hello@invitely.in</a>
            </div>
          </div>
          <div>
            <p className="text-[#A16207] text-xs tracking-widest uppercase mb-4">Resources</p>
            <div className="space-y-2">
              <Link href="/wedding-invitation-maker" className="block text-[#FAFAF9] opacity-30 text-xs hover:opacity-60 transition-opacity">Wedding Invitation Maker</Link>
              <Link href="/birthday-invitation-maker" className="block text-[#FAFAF9] opacity-30 text-xs hover:opacity-60 transition-opacity">Birthday Invitation Maker</Link>
              <Link href="/whatsapp-wedding-invitation" className="block text-[#FAFAF9] opacity-30 text-xs hover:opacity-60 transition-opacity">WhatsApp Wedding Invite</Link>
            </div>
          </div>
          <div>
            <p className="text-[#A16207] text-xs tracking-widest uppercase mb-4">Legal</p>
            <div className="space-y-2">
              <Link href="/terms" className="block text-[#FAFAF9] opacity-30 text-xs hover:opacity-60 transition-opacity">Terms of Service</Link>
              <Link href="/privacy" className="block text-[#FAFAF9] opacity-30 text-xs hover:opacity-60 transition-opacity">Privacy Policy</Link>
            </div>
          </div>
        </div>
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 pt-8 border-t border-white/5">
          <Link href="/" className="font-['Great_Vibes'] text-2xl text-[#FAFAF9] opacity-30 hover:opacity-60 transition-opacity">
            Invitely
          </Link>
          <p className="text-[#FAFAF9] opacity-15 text-xs">Made with love · India · © 2025 Invitely</p>
        </div>
      </div>
    </footer>
  )
}
