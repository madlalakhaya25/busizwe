'use client'

import { usePathname } from 'next/navigation'
import { UserButton } from '@clerk/nextjs'
import { Shield } from 'lucide-react'

const PAGE_TITLES: Record<string, string> = {
  '/admin': 'Admin Dashboard',
  '/admin/members': 'Members',
  '/admin/products': 'Products',
  '/admin/payments': 'Payments',
  '/admin/settings': 'Settings',
}

export default function AdminHeader() {
  const pathname = usePathname()
  const title = PAGE_TITLES[pathname] ?? 'Admin'

  return (
    <header className="sticky top-0 z-20 bg-white border-b border-[#e0d9cc] shadow-sm h-[72px] flex items-center px-6 lg:px-8 gap-4">
      <div className="flex-1">
        <div className="flex items-center gap-2">
          <Shield className="w-4 h-4 text-[#C89B3C]" />
          <h1 className="text-xl font-bold text-[#1C1C1C] font-serif">{title}</h1>
        </div>
        <p className="text-xs text-[#6b6b6b]">Admin Control Panel</p>
      </div>
      <UserButton
        appearance={{
          elements: { avatarBox: 'w-9 h-9 ring-2 ring-[#C89B3C] ring-offset-1' },
        }}
      />
    </header>
  )
}
