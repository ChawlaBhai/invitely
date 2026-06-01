export default function TemplateSkeleton() {
  return (
    <div className="min-h-screen bg-[#0C0A09] flex flex-col items-center justify-center overflow-hidden">
      {/* Ambient glow */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_#1C1917_0%,_#0C0A09_70%)]" />

      {/* Animated skeleton content */}
      <div className="relative z-10 text-center max-w-lg mx-auto px-6 w-full">
        {/* Eyebrow */}
        <div className="flex justify-center mb-6">
          <div className="h-2 w-32 rounded-full bg-[#A16207] opacity-20 animate-pulse" />
        </div>

        {/* Title lines */}
        <div className="space-y-3 mb-8">
          <div className="h-12 w-3/4 mx-auto rounded-sm bg-white opacity-5 animate-pulse" style={{ animationDelay: '0.1s' }} />
          <div className="h-4 w-16 mx-auto rounded-full bg-[#A16207] opacity-15 animate-pulse" style={{ animationDelay: '0.15s' }} />
          <div className="h-12 w-2/3 mx-auto rounded-sm bg-white opacity-5 animate-pulse" style={{ animationDelay: '0.2s' }} />
        </div>

        {/* Subtitle */}
        <div className="h-3 w-48 mx-auto rounded-full bg-white opacity-5 animate-pulse mb-2" style={{ animationDelay: '0.25s' }} />
        <div className="h-3 w-36 mx-auto rounded-full bg-white opacity-5 animate-pulse" style={{ animationDelay: '0.3s' }} />

        {/* Loading indicator */}
        <div className="mt-16 flex flex-col items-center gap-3">
          <div className="flex gap-1.5">
            {[0, 1, 2].map(i => (
              <div
                key={i}
                className="w-1.5 h-1.5 rounded-full bg-[#A16207]"
                style={{
                  opacity: 0.4,
                  animation: 'skeleton-dot 1.2s ease-in-out infinite',
                  animationDelay: `${i * 0.2}s`,
                }}
              />
            ))}
          </div>
          <p className="text-[#FAFAF9] opacity-20 text-[10px] tracking-[0.3em] uppercase">Loading</p>
        </div>
      </div>

      <style>{`
        @keyframes skeleton-dot {
          0%, 80%, 100% { transform: scale(0.6); opacity: 0.2; }
          40% { transform: scale(1); opacity: 0.8; }
        }
      `}</style>
    </div>
  )
}
