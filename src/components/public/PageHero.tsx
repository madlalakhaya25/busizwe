import React from 'react'

interface PageHeroProps {
  eyebrow?: string
  title: React.ReactNode
  subtitle?: React.ReactNode
  className?: string
}

export default function PageHero({ eyebrow, title, subtitle }: PageHeroProps) {
  return (
    <section className="pt-32 pb-16 bg-[#014D4E] relative overflow-hidden">
      <div className="absolute -top-32 -right-32 w-[500px] h-[500px] rounded-full bg-[#C89B3C]/[0.07] blur-3xl pointer-events-none" />
      <div className="absolute -bottom-20 -left-20 w-[300px] h-[300px] rounded-full bg-white/[0.03] blur-3xl pointer-events-none" />
      <div className="relative max-w-4xl mx-auto px-6 sm:px-8 lg:px-12 text-center">
        {eyebrow && (
          <p className="text-xs font-semibold text-[#C89B3C] uppercase tracking-widest mb-4">
            {eyebrow}
          </p>
        )}
        <h1 className="font-serif font-semibold text-white text-4xl sm:text-5xl leading-tight mb-5">
          {title}
        </h1>
        {subtitle && (
          <p className="text-white/70 text-lg leading-relaxed max-w-2xl mx-auto">
            {subtitle}
          </p>
        )}
      </div>
    </section>
  )
}
