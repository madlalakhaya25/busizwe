'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { LayoutDashboard, FileText, FileSearch, FolderOpen, CreditCard } from 'lucide-react'
import { cn } from '@/lib/utils'

const NAV_ITEMS = [
  { icon: LayoutDashboard, label: 'Home',     href: '/dashboard' },
  { icon: FileText,        label: 'Policies', href: '/dashboard/policies' },
  { icon: FileSearch,      label: 'Claims',   href: '/dashboard/claims' },
  { icon: FolderOpen,      label: 'Docs',     href: '/dashboard/documents' },
  { icon: CreditCard,      label: 'Payments', href: '/dashboard/payments' },
]

export default function MobileBottomNav() {
  const pathname = usePathname()

  const isActive = (href: string) =>
    href === '/dashboard' ? pathname === '/dashboard' : pathname.startsWith(href)

  return (
    <nav className="lg:hidden fixed bottom-0 left-0 right-0 z-30 bg-white/95 backdrop-blur-md border-t border-[#e0d9cc] safe-area-inset-bottom">
      <div className="flex items-stretch justify-around h-[60px]">
        {NAV_ITEMS.map(({ icon: Icon, label, href }) => {
          const active = isActive(href)
          return (
            <Link
              key={href}
              href={href}
              className={cn(
                'flex flex-col items-center justify-center gap-1 flex-1 relative transition-colors',
                active ? 'text-[#014D4E]' : 'text-[#9a9a9a] hover:text-[#014D4E]'
              )}
            >
              {active && (
                <span className="absolute top-0 left-1/2 -translate-x-1/2 w-8 h-0.5 bg-[#C89B3C] rounded-full" />
              )}
              <Icon className={cn('w-5 h-5 transition-all', active && 'stroke-[2.5]')} />
              <span className={cn('text-[9px] font-semibold leading-none tracking-wide uppercase transition-all', active ? 'text-[#014D4E]' : 'text-[#9a9a9a]')}>
                {label}
              </span>
            </Link>
          )
        })}
      </div>
    </nav>
  )
}
