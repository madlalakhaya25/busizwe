import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { cn } from '@/lib/utils'

const LOGO_SRC = '/busizwe.png'
// PNG is 1580×996 — aspect ratio ≈ 1.587 : 1
const LOGO_RATIO = 1580 / 996

interface LogoProps {
  className?: string
  size?: 'sm' | 'md' | 'lg' | 'xl'
  variant?: 'full' | 'icon'
  href?: string
}

const sizes = {
  sm: { w: 80,  text: 'text-sm',  sub: 'text-[8px]'  },
  md: { w: 110, text: 'text-base', sub: 'text-[10px]' },
  lg: { w: 140, text: 'text-lg',  sub: 'text-xs'     },
  xl: { w: 200, text: 'text-2xl', sub: 'text-sm'     },
}

export function LogoSVG({ size = 'md' }: { size?: LogoProps['size'] }) {
  const w = sizes[size ?? 'md'].w
  const h = Math.round(w / LOGO_RATIO)

  return (
    <Image
      src={LOGO_SRC}
      alt="Busizwe Burial Society"
      width={w}
      height={h}
      className="object-contain"
      priority
    />
  )
}

export default function Logo({ className, size = 'md', variant = 'full', href }: LogoProps) {
  const { w } = sizes[size]
  const h = Math.round(w / LOGO_RATIO)

  // The real logo PNG already contains "Busizwe Burial Society" text
  const content = (
    <div className={cn('flex items-center select-none', className)}>
      <Image
        src={LOGO_SRC}
        alt="Busizwe Burial Society"
        width={variant === 'icon' ? Math.round(w * 0.55) : w}
        height={variant === 'icon' ? Math.round(h * 0.55) : h}
        className="object-contain"
        priority
      />
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
