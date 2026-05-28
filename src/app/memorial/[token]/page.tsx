import { notFound } from 'next/navigation'
import { prisma } from '@/lib/prisma'
import type { Metadata } from 'next'
import CandleLighter from './CandleLighter'

const APP_URL = process.env.NEXT_PUBLIC_APP_URL ?? 'https://busizwe.co.za'

export const metadata: Metadata = {
  robots: { index: false, follow: false },
}

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
  const whatsappUrl = `https://wa.me/?text=${shareText}`

  return (
    <div
      className="min-h-screen flex flex-col items-center"
      style={{ background: 'linear-gradient(180deg, #0a0f1e 0%, #111827 50%, #0f172a 100%)' }}
    >
      {/* Stars background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none" aria-hidden>
        {Array.from({ length: 60 }).map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full bg-white"
            style={{
              width: Math.random() * 2 + 1,
              height: Math.random() * 2 + 1,
              top: `${Math.random() * 60}%`,
              left: `${Math.random() * 100}%`,
              opacity: Math.random() * 0.6 + 0.2,
            }}
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
            className="text-4xl font-bold text-amber-100"
            style={{ fontFamily: 'Georgia, serif', textShadow: '0 2px 20px rgba(251,191,36,0.15)' }}
          >
            {fullName}
          </h1>
          <p className="text-amber-400/70 tracking-[0.25em] text-sm uppercase font-light">{years}</p>
        </div>

        {/* Divider */}
        <div className="w-16 h-px bg-amber-400/30" />

        {/* Tribute */}
        {memorial.tribute && (
          <div className="text-center max-w-sm">
            <p
              className="text-amber-100/70 text-lg leading-relaxed"
              style={{ fontFamily: 'Georgia, serif', fontStyle: 'italic' }}
            >
              &ldquo;{memorial.tribute}&rdquo;
            </p>
          </div>
        )}

        {/* Candle lighter */}
        <CandleLighter token={token} initialCount={memorial.candleCount} />

        {/* Share */}
        <div className="flex flex-col items-center gap-3">
          <p className="text-amber-200/40 text-xs uppercase tracking-widest">Share this memorial</p>
          <div className="flex gap-3">
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-4 py-2 rounded-full border border-green-500/30 text-green-400 text-sm hover:bg-green-500/10 transition-all"
            >
              <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/><path d="M11.999 2C6.477 2 2 6.477 2 12c0 1.89.518 3.66 1.417 5.177L2 22l4.978-1.401A9.96 9.96 0 0012 22c5.523 0 10-4.477 10-10S17.523 2 12 2z" opacity=".1"/><path d="M12 0C5.373 0 0 5.373 0 12c0 2.138.563 4.14 1.546 5.876L0 24l6.311-1.654A11.933 11.933 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.818a9.816 9.816 0 01-5.028-1.381l-.36-.216-3.748.982.998-3.657-.235-.374A9.817 9.817 0 012.182 12C2.182 6.567 6.568 2.182 12 2.182c5.434 0 9.818 4.385 9.818 9.818 0 5.434-4.384 9.818-9.818 9.818z"/></svg>
              WhatsApp
            </a>
            <button
              onClick={() => navigator.clipboard.writeText(`${APP_URL}/memorial/${token}`)}
              className="px-4 py-2 rounded-full border border-amber-400/30 text-amber-300/70 text-sm hover:bg-amber-400/10 transition-all"
            >
              Copy link
            </button>
          </div>
        </div>

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
