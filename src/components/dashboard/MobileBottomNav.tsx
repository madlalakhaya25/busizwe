'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { LayoutDashboard, FileText, Users, FolderOpen, CreditCard } from 'lucide-react'
import { cn } from '@/lib/utils'

const NAV_ITEMS = [
  { icon: LayoutDashboard, label: 'Home', href: '/dashboard' },
  { icon: FileText, label: 'Policies', href: '/dashboard/policies' },
  { icon: Users, label: 'Dependants', href: '/dashboard/dependants' },
  { icon: FolderOpen, label: 'Documents', href: '/dashboard/documents' },
  { icon: CreditCard, label: 'Payments', href: '/dashboard/payments' },
]

export default function MobileBottomNav() {
  const pathname = usePathname()

  const isActive = (href: string) =>
    href === '/dashboard' ? pathname === '/dashboard' : pathname.startsWith(href)

  return (
    <nav className="lg:hidden fixed bottom-0 left-0 right-0 z-30 bg-white border-t border-[#e0d9cc]">
      <div className="flex items-stretch justify-around">
        {NAV_ITEMS.map(({ icon: Icon, label, href }) => {
          const active = isActive(href)
          return (
            <Link
              key={href}
              href={href}
              className={cn(
                'flex flex-col items-center gap-1 py-2.5 px-1 flex-1 border-t-2 transition-colors',
                active
                  ? 'border-[#C89B3C] text-[#014D4E]'
                  : 'border-transparent text-[#6b6b6b] hover:text-[#014D4E]'
              )}
            >
              <Icon className={cn('w-5 h-5', active && 'stroke-[2.5]')} />
              <span className="text-[10px] font-medium leading-none">{label}</span>
            </Link>
          )
        })}
      </div>
    </nav>
  )
}
