'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { LayoutDashboard, Users, Package, FileSearch, CreditCard } from 'lucide-react'
import { cn } from '@/lib/utils'

const NAV_ITEMS = [
  { icon: LayoutDashboard, label: 'Overview', href: '/admin' },
  { icon: Users,           label: 'Members',  href: '/admin/members' },
  { icon: Package,         label: 'Products', href: '/admin/products' },
  { icon: FileSearch,      label: 'Claims',   href: '/admin/claims' },
  { icon: CreditCard,      label: 'Payments', href: '/admin/payments' },
]

export default function AdminMobileNav() {
  const pathname = usePathname()
  const isActive = (href: string) =>
    href === '/admin' ? pathname === '/admin' : pathname.startsWith(href)

  return (
    <nav className="lg:hidden fixed bottom-0 left-0 right-0 z-30 bg-[#1C1C1C]/95 backdrop-blur-md border-t border-white/10">
      <div className="flex items-stretch justify-around h-[60px]">
        {NAV_ITEMS.map(({ icon: Icon, label, href }) => {
          const active = isActive(href)
          return (
            <Link key={href} href={href} className={cn(
              'flex flex-col items-center justify-center gap-1 flex-1 relative transition-colors',
              active ? 'text-[#C89B3C]' : 'text-white/50 hover:text-white'
            )}>
              {active && <span className="absolute top-0 left-1/2 -translate-x-1/2 w-8 h-0.5 bg-[#C89B3C] rounded-full" />}
              <Icon className={cn('w-5 h-5', active && 'stroke-[2.5]')} />
              <span className={cn('text-[9px] font-semibold leading-none tracking-wide uppercase', active ? 'text-[#C89B3C]' : 'text-white/50')}>{label}</span>
            </Link>
          )
        })}
      </div>
    </nav>
  )
}
