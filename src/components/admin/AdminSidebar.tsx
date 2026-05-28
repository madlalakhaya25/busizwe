'use client'

import React from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { LayoutDashboard, Users, Package, CreditCard, Settings, LogOut } from 'lucide-react'
import { useClerk } from '@clerk/nextjs'
import Logo from '@/components/layout/Logo'
import { cn } from '@/lib/utils'

const NAV_ITEMS = [
  { icon: LayoutDashboard, label: 'Dashboard', href: '/admin' },
  { icon: Users, label: 'Members', href: '/admin/members' },
  { icon: Package, label: 'Products', href: '/admin/products' },
  { icon: CreditCard, label: 'Payments', href: '/admin/payments' },
]

export default function AdminSidebar() {
  const pathname = usePathname()
  const { signOut } = useClerk()

  const isActive = (href: string) => {
    if (href === '/admin') return pathname === '/admin'
    return pathname.startsWith(href)
  }

  return (
    <aside className="hidden lg:flex flex-col w-64 bg-[#1C1C1C] text-white h-screen sticky top-0 z-30">
      <div className="p-4 h-[72px] flex items-center border-b border-white/10">
        <Logo size="sm" variant="full" href="/admin" />
      </div>

      <div className="px-3 py-2 mt-2">
        <p className="text-xs text-white/40 uppercase tracking-widest px-3 mb-2">Admin Panel</p>
      </div>

      <nav className="flex-1 px-2 space-y-1 overflow-y-auto">
        {NAV_ITEMS.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={cn(
              'flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-150',
              isActive(item.href)
                ? 'bg-[#C89B3C] text-white'
                : 'text-white/70 hover:text-white hover:bg-white/10'
            )}
          >
            <item.icon className="w-5 h-5 shrink-0" />
            {item.label}
          </Link>
        ))}
      </nav>

      <div className="p-4 border-t border-white/10 space-y-1">
        <Link
          href="/admin/settings"
          className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm text-white/60 hover:text-white hover:bg-white/10 transition-colors"
        >
          <Settings className="w-5 h-5" /> Settings
        </Link>
        <button
          onClick={() => signOut({ redirectUrl: '/' })}
          className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm text-white/60 hover:text-red-300 hover:bg-red-500/10 transition-colors"
        >
          <LogOut className="w-5 h-5" /> Sign Out
        </button>
      </div>
    </aside>
  )
}
