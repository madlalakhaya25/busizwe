import React from 'react'

interface PageHeroProps {
  eyebrow: string
  title: React.ReactNode
  subtitle?: React.ReactNode
}

const PATTERN =
  `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23C89B3C' fill-rule='evenodd'%3E%3Cpath d='M0 40L40 0H20L0 20M40 40V20L20 40'/%3E%3C/g%3E%3C/svg%3E")`

/**
 * Shared inner-page hero (About / FAQ / Contact / Products).
 * Green band + subtle pattern + glow + wave separator — consistent everywhere.
 */
export default function PageHero({ eyebrow, title, subtitle }: PageHeroProps) {
  return (
    <section className="relative bg-[#014D4E] pt-36 pb-24 overflow-hidden">
      {/* Pattern overlay */}
      <div
        className="absolute inset-0 opacity-[0.04] pointer-events-none"
        style={{ backgroundImage: PATTERN }}
      />
      {/* Soft glows */}
      <div className="absolute -top-24 right-0 w-[420px] h-[420px] rounded-full bg-[#C89B3C]/10 blur-3xl pointer-events-none" />
      <div className="absolute -bottom-32 -left-24 w-[420px] h-[420px] rounded-full bg-white/[0.04] blur-3xl pointer-events-none" />

      <div className="relative max-w-4xl mx-auto px-6 sm:px-8 lg:px-12 text-center">
        <span className="eyebrow mb-6">{eyebrow}</span>
        <h1
          className="font-serif font-semibold text-white text-4xl sm:text-5xl lg:text-6xl leading-[1.08] mt-6 mb-6"
        >
          {title}
        </h1>
        {subtitle && (
          <p className="text-lg sm:text-xl text-white/70 leading-relaxed max-w-2xl mx-auto">
            {subtitle}
          </p>
        )}
      </div>

      {/* Wave separator */}
      <div className="absolute bottom-0 left-0 right-0 pointer-events-none">
        <svg viewBox="0 0 1440 60" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
          <path d="M0,30 C480,60 960,0 1440,30 L1440,60 L0,60 Z" fill="#F7F3EA" />
        </svg>
      </div>
    </section>
  )
}
