'use client'

import React from 'react'
import { usePathname } from 'next/navigation'
import { UserButton } from '@clerk/nextjs'
import { Bell, ChevronRight } from 'lucide-react'
import Logo from '@/components/layout/Logo'

const PAGE_TITLES: Record<string, { title: string; sub?: string }> = {
  '/dashboard':             { title: 'Overview',     sub: 'Welcome back' },
  '/dashboard/policies':   { title: 'My Policies',  sub: 'Manage your cover plans' },
  '/dashboard/dependants': { title: 'Dependants',   sub: 'Family members on your policy' },
  '/dashboard/claims':     { title: 'Claims',       sub: 'Track your claim submissions' },
  '/dashboard/documents':  { title: 'Documents',    sub: 'Upload and manage files' },
  '/dashboard/payments':   { title: 'Payments',     sub: 'Premium history and dues' },
  '/dashboard/settings':   { title: 'Settings',     sub: 'Account and profile details' },
}

export default function DashboardHeader() {
  const pathname = usePathname()
  const page = PAGE_TITLES[pathname] ?? { title: 'Dashboard' }

  return (
    <header className="sticky top-0 z-20 bg-white/95 backdrop-blur-sm border-b border-[#E5E7EB] h-[68px] flex items-center px-4 sm:px-6 lg:px-8 gap-4">
      {/* Mobile logo */}
      <div className="lg:hidden shrink-0">
        <Logo size="sm" variant="icon" href="/dashboard" />
      </div>

      {/* Breadcrumb / title */}
      <div className="flex-1 min-w-0 flex items-center gap-2">
        <span className="hidden sm:flex items-center gap-1.5 text-xs text-[#9a9a9a] font-medium shrink-0">
          Dashboard <ChevronRight className="w-3 h-3" />
        </span>
        <div className="min-w-0">
          <h1 className="text-base sm:text-lg font-bold text-[#014D4E] font-serif leading-tight truncate">
            {page.title}
          </h1>
          {page.sub && (
            <p className="text-xs text-[#9a9a9a] hidden sm:block leading-none mt-0.5">{page.sub}</p>
          )}
        </div>
      </div>

      {/* Right actions */}
      <div className="flex items-center gap-2 shrink-0">
        <button
          className="relative p-2 rounded-xl hover:bg-[#F9FAFB] transition-colors text-[#9a9a9a] hover:text-[#014D4E]"
          aria-label="Notifications"
        >
          <Bell className="w-[18px] h-[18px]" />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-[#C89B3C] rounded-full ring-2 ring-white" />
        </button>
        <UserButton
          appearance={{
            elements: {
              avatarBox: 'w-8 h-8 ring-2 ring-[#C89B3C]/60 ring-offset-1',
            },
          }}
        />
      </div>
    </header>
  )
}
