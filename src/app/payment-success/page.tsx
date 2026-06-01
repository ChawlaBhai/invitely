import Link from 'next/link'

export default function PaymentSuccessPage() {
  return (
    <div className="min-h-screen bg-[#0C0A09] flex flex-col items-center justify-center px-6 text-center">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_#1C1917_0%,_#0C0A09_70%)]" />

      <div className="relative z-10 max-w-lg">
        <div className="flex items-center justify-center gap-4 mb-8">
          <div className="h-px w-16 bg-[#A16207] opacity-30" />
          <span className="text-[#A16207] text-3xl">✦</span>
          <div className="h-px w-16 bg-[#A16207] opacity-30" />
        </div>

        <p className="text-[#A16207] tracking-[0.4em] text-xs uppercase mb-4 opacity-70">Payment Successful</p>
        <h1 className="font-['Great_Vibes'] text-7xl text-[#FAFAF9] mb-4">Thank You</h1>
        <h2 className="font-['Playfair_Display'] text-3xl text-[#FAFAF9] mb-6">
          Your invite has been upgraded
        </h2>
        <p className="font-['Cormorant_Infant'] text-xl text-[#FAFAF9] opacity-50 mb-12 leading-relaxed">
          Your premium features are now active. Refresh your invite to see the changes.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/my-invites"
            className="px-10 py-4 bg-[#A16207] text-[#0C0A09] text-sm tracking-[0.2em] uppercase font-semibold hover:bg-[#FAFAF9] transition-all duration-500">
            View My Invites
          </Link>
          <Link href="/"
            className="px-10 py-4 border border-[#A16207] border-opacity-30 text-[#A16207] text-sm tracking-[0.2em] uppercase hover:bg-[#A16207] hover:text-[#0C0A09] transition-all duration-500">
            Browse Templates
          </Link>
        </div>

        <div className="mt-16">
          <p className="font-['Great_Vibes'] text-3xl text-[#FAFAF9] opacity-15">Invitely</p>
        </div>
      </div>
    </div>
  )
}
