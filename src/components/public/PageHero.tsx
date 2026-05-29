import React from 'react'

interface PageHeroProps {
  eyebrow?: string
  title: React.ReactNode
  subtitle?: React.ReactNode
  className?: string
}

export default function PageHero({ eyebrow, title, subtitle }: PageHeroProps) {
  return (
    <section className="pt-32 pb-16 bg-white border-b border-[#E5E7EB]">
      <div className="max-w-4xl mx-auto px-6 sm:px-8 lg:px-12 text-center">
        {eyebrow && (
          <p className="text-xs font-semibold text-[#C89B3C] uppercase tracking-widest mb-4">
            {eyebrow}
          </p>
        )}
        <h1 className="font-serif font-semibold text-[#014D4E] text-4xl sm:text-5xl leading-tight mb-5">
          {title}
        </h1>
        {subtitle && (
          <p className="text-[#6B7280] text-lg leading-relaxed max-w-2xl mx-auto">
            {subtitle}
          </p>
        )}
      </div>
    </section>
  )
}
