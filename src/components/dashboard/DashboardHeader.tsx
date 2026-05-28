'use client'

import React from 'react'
import { usePathname } from 'next/navigation'
import { UserButton } from '@clerk/nextjs'
import { Bell } from 'lucide-react'
import Logo from '@/components/layout/Logo'

const PAGE_TITLES: Record<string, string> = {
  '/dashboard': 'Overview',
  '/dashboard/policies': 'My Policies',
  '/dashboard/dependants': 'Dependants',
  '/dashboard/documents': 'Documents',
  '/dashboard/payments': 'Payments',
  '/dashboard/settings': 'Settings',
}

export default function DashboardHeader() {
  const pathname = usePathname()
  const title = PAGE_TITLES[pathname] ?? 'Dashboard'

  return (
    <header className="sticky top-0 z-20 bg-white border-b border-[#e0d9cc] shadow-sm h-[72px] flex items-center px-6 lg:px-8 gap-4">
      {/* Mobile logo */}
      <div className="lg:hidden">
        <Logo size="sm" variant="icon" href="/dashboard" />
      </div>

      <div className="flex-1">
        <h1 className="text-xl font-bold text-[#014D4E] font-serif">
          {title}
        </h1>
      </div>

      <div className="flex items-center gap-3">
        <button className="relative p-2 rounded-lg hover:bg-[#F7F3EA] transition-colors text-[#6b6b6b] hover:text-[#014D4E]">
          <Bell className="w-5 h-5" />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-[#C89B3C] rounded-full" />
        </button>
        <UserButton
          appearance={{
            elements: {
              avatarBox: 'w-9 h-9 ring-2 ring-[#C89B3C] ring-offset-1',
            },
          }}
        />
      </div>
    </header>
  )
}
