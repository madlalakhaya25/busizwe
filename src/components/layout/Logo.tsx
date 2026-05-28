import React from 'react'
import Link from 'next/link'
import { cn } from '@/lib/utils'

interface LogoProps {
  className?: string
  size?: 'sm' | 'md' | 'lg' | 'xl'
  variant?: 'full' | 'icon'
  href?: string
}

const sizes = {
  sm: { svg: 32, text: 'text-sm', sub: 'text-[8px]' },
  md: { svg: 44, text: 'text-base', sub: 'text-[10px]' },
  lg: { svg: 56, text: 'text-lg', sub: 'text-xs' },
  xl: { svg: 80, text: 'text-2xl', sub: 'text-sm' },
}

export function LogoSVG({ size = 'md' }: { size?: LogoProps['size'] }) {
  const s = sizes[size ?? 'md']
  const w = s.svg
  const h = Math.round(w * 0.65)

  return (
    <svg
      width={w}
      height={h}
      viewBox="0 0 120 78"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-label="Busizwe Burial Society Logo"
    >
      {/* Oval background */}
      <ellipse cx="60" cy="39" rx="58" ry="37" fill="#014D4E" />
      {/* Gold border */}
      <ellipse cx="60" cy="39" rx="58" ry="37" stroke="#C89B3C" strokeWidth="3" fill="none" />
      {/* Inner gold ring */}
      <ellipse cx="60" cy="39" rx="53" ry="32" stroke="#C89B3C" strokeWidth="1" strokeOpacity="0.5" fill="none" />
      {/* Cross symbol */}
      <rect x="57" y="12" width="6" height="22" rx="2" fill="#C89B3C" />
      <rect x="48" y="18" width="24" height="6" rx="2" fill="#C89B3C" />
      {/* Text: BBS */}
      <text
        x="60"
        y="52"
        textAnchor="middle"
        fill="white"
        fontFamily="Georgia, serif"
        fontSize="14"
        fontWeight="bold"
        letterSpacing="3"
      >
        BBS
      </text>
      {/* Decorative line */}
      <line x1="25" y1="57" x2="95" y2="57" stroke="#C89B3C" strokeWidth="0.8" strokeOpacity="0.6" />
      <text
        x="60"
        y="68"
        textAnchor="middle"
        fill="#C89B3C"
        fontFamily="Georgia, serif"
        fontSize="7"
        letterSpacing="1.5"
      >
        EST. 2024
      </text>
    </svg>
  )
}

export default function Logo({ className, size = 'md', variant = 'full', href = '/' }: LogoProps) {
  const s = sizes[size]

  const content = (
    <div className={cn('flex items-center gap-3 select-none', className)}>
      <LogoSVG size={size} />
      {variant === 'full' && (
        <div className="flex flex-col justify-center leading-tight">
          <span
            className={cn('font-bold text-[#014D4E] tracking-tight', s.text)}
            style={{ fontFamily: 'Georgia, serif' }}
          >
            Busizwe
          </span>
          <span
            className={cn('font-semibold text-[#C89B3C] tracking-widest uppercase', s.sub)}
            style={{ fontFamily: 'Georgia, serif' }}
          >
            Burial Society
          </span>
        </div>
      )}
    </div>
  )

  if (href) {
    return (
      <Link href={href} className="focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C89B3C] rounded-md">
        {content}
      </Link>
    )
  }
  return content
}
