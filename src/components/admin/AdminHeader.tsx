'use client'

import { usePathname } from 'next/navigation'
import { UserButton } from '@clerk/nextjs'
import { Shield, ChevronRight } from 'lucide-react'

const PAGE_TITLES: Record<string, { title: string; sub?: string }> = {
  '/admin':          { title: 'Dashboard',  sub: 'Overview of platform activity' },
  '/admin/members':  { title: 'Members',    sub: 'Manage member accounts and policies' },
  '/admin/products': { title: 'Products',   sub: 'Manage cover products and pricing' },
  '/admin/claims':   { title: 'Claims',     sub: 'Review and process claim submissions' },
  '/admin/payments': { title: 'Payments',   sub: 'Track and record premium payments' },
  '/admin/settings': { title: 'Settings',   sub: 'Admin panel configuration' },
}

export default function AdminHeader() {
  const pathname = usePathname()
  const page = PAGE_TITLES[pathname] ?? { title: 'Admin' }

  return (
    <header className="sticky top-0 z-20 bg-white/95 backdrop-blur-sm border-b border-[#e0d9cc] h-[68px] flex items-center px-4 sm:px-6 lg:px-8 gap-4">
      {/* Admin badge — desktop only */}
      <div className="hidden lg:flex items-center gap-2 shrink-0">
        <div className="flex items-center gap-1.5 bg-[#1C1C1C] text-[#C89B3C] rounded-lg px-2.5 py-1">
          <Shield className="w-3.5 h-3.5" />
          <span className="text-[10px] font-bold uppercase tracking-wider">Admin</span>
        </div>
        <ChevronRight className="w-3 h-3 text-[#9a9a9a]" />
      </div>

      {/* Mobile: Shield icon only */}
      <div className="lg:hidden shrink-0">
        <div className="w-8 h-8 rounded-xl bg-[#1C1C1C] flex items-center justify-center">
          <Shield className="w-4 h-4 text-[#C89B3C]" />
        </div>
      </div>

      <div className="flex-1 min-w-0">
        <h1 className="text-base sm:text-lg font-bold text-[#1C1C1C] font-serif leading-tight truncate">{page.title}</h1>
        {page.sub && <p className="text-xs text-[#9a9a9a] hidden sm:block leading-none mt-0.5">{page.sub}</p>}
      </div>

      <UserButton appearance={{ elements: { avatarBox: 'w-8 h-8 ring-2 ring-[#C89B3C]/60 ring-offset-1' } }} />
    </header>
  )
}
