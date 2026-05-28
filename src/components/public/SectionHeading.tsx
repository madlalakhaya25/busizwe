'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'

interface SectionHeadingProps {
  eyebrow?: string
  title: React.ReactNode
  subtitle?: React.ReactNode
  align?: 'center' | 'left'
  tone?: 'dark' | 'light' // dark text on light bg, or light text on dark bg
  className?: string
}

/**
 * Unified section header: eyebrow pill + serif title + supporting copy.
 * Used across every public section so spacing and scale stay consistent.
 */
export default function SectionHeading({
  eyebrow,
  title,
  subtitle,
  align = 'center',
  tone = 'dark',
  className,
}: SectionHeadingProps) {
  const isLight = tone === 'light'
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className={cn(
        'max-w-2xl',
        align === 'center' ? 'mx-auto text-center' : 'text-left',
        className
      )}
    >
      {eyebrow && <span className="eyebrow mb-5">{eyebrow}</span>}
      <h2
        className={cn(
          'font-serif font-semibold tracking-tight mt-5',
          'text-3xl sm:text-4xl lg:text-[2.75rem] lg:leading-[1.1]',
          isLight ? 'text-white' : 'text-[#014D4E]'
        )}
      >
        {title}
      </h2>
      {subtitle && (
        <p
          className={cn(
            'mt-5 text-base sm:text-lg leading-relaxed',
            align === 'center' && 'mx-auto',
            isLight ? 'text-white/65' : 'text-[#6b6b6b]'
          )}
        >
          {subtitle}
        </p>
      )}
    </motion.div>
  )
}
