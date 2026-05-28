import { notFound } from 'next/navigation'
import { prisma } from '@/lib/prisma'
import type { Metadata } from 'next'
import CandleLighter from './CandleLighter'

const APP_URL = process.env.NEXT_PUBLIC_APP_URL ?? 'https://busizwe.co.za'

export const metadata: Metadata = {
  robots: { index: false, follow: false },
}

// Deterministic star positions — no Math.random() to avoid hydration mismatch
const STARS = Array.from({ length: 55 }, (_, i) => ({
  left: ((i * 17 + 3) * 137.5) % 100,
  top: ((i * 23 + 7) * 97.3) % 58,
  size: 1 + (i % 3) * 0.6,
  opacity: 0.15 + (i % 5) * 0.1,
}))

export default async function MemorialPage({ params }: { params: Promise<{ token: string }> }) {
  const { token } = await params

  let memorial: {
    token: string
    firstName: string
    lastName: string
    birthYear: number | null
    deathYear: number
    tribute: string | null
    photoUrl: string | null
    candleCount: number
  } | null = null

  try {
    memorial = await prisma.memorial.findUnique({
      where: { token },
      select: {
        token: true,
        firstName: true,
        lastName: true,
        birthYear: true,
        deathYear: true,
        tribute: true,
        photoUrl: true,
        candleCount: true,
      },
    })
  } catch {
    // DB not configured
  }

  if (!memorial) notFound()

  const fullName = `${memorial.firstName} ${memorial.lastName}`
  const years = memorial.birthYear
    ? `${memorial.birthYear} – ${memorial.deathYear}`
    : memorial.deathYear.toString()

  const shareText = encodeURIComponent(
    `Please light a candle in memory of ${fullName}: ${APP_URL}/memorial/${token}`
  )

  return (
    <div
      className="min-h-screen flex flex-col items-center"
      style={{ background: 'linear-gradient(180deg, #0a0f1e 0%, #111827 50%, #0f172a 100%)' }}
    >
      {/* Deterministic star field — no Math.random() = no hydration mismatch */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none" aria-hidden>
        {STARS.map((s, i) => (
          <div
            key={i}
            className="absolute rounded-full bg-white"
            style={{ width: s.size, height: s.size, left: `${s.left}%`, top: `${s.top}%`, opacity: s.opacity }}
          />
        ))}
      </div>

      <div className="relative z-10 w-full max-w-lg px-6 py-16 flex flex-col items-center gap-10">
        {/* Photo */}
        {memorial.photoUrl ? (
          <div
            className="w-28 h-28 rounded-full border-2 border-amber-400/40 bg-cover bg-center"
            style={{ backgroundImage: `url(${memorial.photoUrl})` }}
          />
        ) : (
          <div className="w-28 h-28 rounded-full border-2 border-amber-400/30 bg-white/5 flex items-center justify-center">
            <span className="text-4xl select-none">🕊️</span>
          </div>
        )}

        {/* Name & years */}
        <div className="text-center space-y-2">
          <h1
            className="font-serif text-4xl font-bold text-amber-100"
            style={{ textShadow: '0 2px 20px rgba(251,191,36,0.15)' }}
          >
            {fullName}
          </h1>
          <p className="text-amber-400/70 tracking-[0.25em] text-sm uppercase font-light">{years}</p>
        </div>

        <div className="w-16 h-px bg-amber-400/30" />

        {/* Tribute */}
        {memorial.tribute && (
          <p className="font-serif italic text-center text-amber-100/70 text-lg leading-relaxed max-w-sm">
            &ldquo;{memorial.tribute}&rdquo;
          </p>
        )}

        {/* Candle + share — all interactive elements in a single client component */}
        <CandleLighter
          token={token}
          initialCount={memorial.candleCount}
          shareUrl={`${APP_URL}/memorial/${token}`}
          shareText={`https://wa.me/?text=${shareText}`}
          fullName={fullName}
        />

        {/* Footer */}
        <div className="text-center border-t border-white/5 pt-8 w-full">
          <p className="text-white/20 text-xs">Created with love by</p>
          <p className="text-amber-400/50 text-sm font-semibold tracking-wider mt-1">Busizwe Burial Society</p>
          <p className="text-white/15 text-xs mt-1">Dignity in every farewell</p>
        </div>
      </div>
    </div>
  )
}
