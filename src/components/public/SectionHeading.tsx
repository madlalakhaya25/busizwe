import React from 'react'
import { cn } from '@/lib/utils'

interface SectionHeadingProps {
  eyebrow?: string
  title: React.ReactNode
  subtitle?: React.ReactNode
  tone?: 'light' | 'dark'
  className?: string
}

export default function SectionHeading({
  eyebrow,
  title,
  subtitle,
  tone = 'dark',
  className,
}: SectionHeadingProps) {
  const isLight = tone === 'light'
  return (
    <div className={cn('text-center max-w-2xl mx-auto mb-16', className)}>
      {eyebrow && (
        <p className="text-xs font-semibold text-[#C89B3C] uppercase tracking-widest mb-3">
          {eyebrow}
        </p>
      )}
      <h2
        className={cn(
          'font-serif font-semibold text-3xl sm:text-4xl leading-tight mb-4',
          isLight ? 'text-white' : 'text-[#014D4E]'
        )}
      >
        {title}
      </h2>
      {subtitle && (
        <p
          className={cn(
            'text-lg leading-relaxed',
            isLight ? 'text-white/70' : 'text-[#6B7280]'
          )}
        >
          {subtitle}
        </p>
      )}
    </div>
  )
}
