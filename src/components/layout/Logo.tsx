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
  sm: { w: 80  },
  md: { w: 110 },
  lg: { w: 140 },
  xl: { w: 200 },
}

// Fixed icon width — must fit inside the 40px slot of the collapsed sidebar
const ICON_W = 36
const ICON_H = Math.round(ICON_W / LOGO_RATIO)

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
  const w = variant === 'icon' ? ICON_W : sizes[size].w
  const h = variant === 'icon' ? ICON_H : Math.round(sizes[size].w / LOGO_RATIO)

  const content = (
    <div className={cn('flex items-center select-none', className)}>
      <Image
        src={LOGO_SRC}
        alt="Busizwe Burial Society"
        width={w}
        height={h}
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
