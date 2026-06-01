import Link from 'next/link'

interface Props {
  eventName: string
  eventDate: string
  city: string
}

export default function CelebrationPassedPage({ eventName, eventDate, city }: Props) {
  return (
    <div className="min-h-screen bg-[#0C0A09] flex flex-col items-center justify-center px-6 text-center overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_#1C1917_0%,_#0C0A09_70%)]" />

      {/* Floating petals */}
      {[...Array(8)].map((_, i) => (
        <div
          key={i}
          className="absolute w-2 h-3 rounded-full opacity-10 animate-pulse"
          style={{
            background: '#A16207',
            left: `${10 + i * 11}%`,
            top: `${15 + (i % 3) * 25}%`,
            animationDelay: `${i * 0.3}s`,
          }}
        />
      ))}

      <div className="relative z-10 max-w-lg">
        <div className="flex items-center justify-center gap-4 mb-8">
          <div className="h-px w-16 bg-[#A16207] opacity-30" />
          <span className="text-[#A16207] text-2xl opacity-60">✦</span>
          <div className="h-px w-16 bg-[#A16207] opacity-30" />
        </div>

        <p className="text-[#A16207] tracking-[0.4em] text-xs uppercase mb-6 opacity-70">
          The Celebration Has Passed
        </p>

        <h1
          className="text-6xl md:text-8xl text-[#FAFAF9] mb-4 leading-none"
          style={{ fontFamily: "'Great Vibes', cursive" }}
        >
          {eventName}
        </h1>

        <p
          className="text-xl text-[#FAFAF9] opacity-40 mb-2"
          style={{ fontFamily: "'Cormorant Infant', serif" }}
        >
          {new Date(eventDate).toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' })}
        </p>
        <p
          className="text-lg text-[#A16207] opacity-60 mb-12"
          style={{ fontFamily: "'Cormorant Infant', serif" }}
        >
          {city}
        </p>

        <p
          className="text-xl text-[#FAFAF9] opacity-50 leading-relaxed mb-12 max-w-md mx-auto"
          style={{ fontFamily: "'Cormorant Infant', serif" }}
        >
          This invitation has expired, but the memories made that day will last forever.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/builder"
            className="px-10 py-4 bg-[#A16207] text-[#0C0A09] text-sm tracking-[0.2em] uppercase font-semibold hover:bg-[#FAFAF9] transition-all duration-500"
          >
            Create Your Own Invite
          </Link>
          <Link
            href="/"
            className="px-10 py-4 border border-[#A16207] border-opacity-30 text-[#A16207] text-sm tracking-[0.2em] uppercase hover:bg-[#A16207] hover:text-[#0C0A09] transition-all duration-500"
          >
            Browse Templates
          </Link>
        </div>

        <div className="mt-16">
          <p
            className="text-3xl text-[#FAFAF9] opacity-15"
            style={{ fontFamily: "'Great Vibes', cursive" }}
          >
            Invitely
          </p>
        </div>
      </div>
    </div>
  )
}
