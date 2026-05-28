'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import {
  LayoutDashboard, FileText, Users, FolderOpen, CreditCard, Settings,
  ChevronLeft, ChevronRight, LogOut, HelpCircle, FileSearch
} from 'lucide-react'
import { useClerk } from '@clerk/nextjs'
import Logo from '@/components/layout/Logo'
import { cn } from '@/lib/utils'

const NAV_ITEMS = [
  { icon: LayoutDashboard, label: 'Overview', href: '/dashboard' },
  { icon: FileText, label: 'My Policies', href: '/dashboard/policies' },
  { icon: Users, label: 'Dependants', href: '/dashboard/dependants' },
  { icon: FileSearch, label: 'Claims', href: '/dashboard/claims' },
  { icon: FolderOpen, label: 'Documents', href: '/dashboard/documents' },
  { icon: CreditCard, label: 'Payments', href: '/dashboard/payments' },
]

const BOTTOM_ITEMS = [
  { icon: HelpCircle, label: 'Help & FAQ', href: '/faq' },
  { icon: Settings, label: 'Settings', href: '/dashboard/settings' },
]

export default function DashboardSidebar() {
  const [collapsed, setCollapsed] = useState(false)
  const pathname = usePathname()
  const { signOut } = useClerk()

  const isActive = (href: string) => {
    if (href === '/dashboard') return pathname === '/dashboard'
    return pathname.startsWith(href)
  }

  return (
    <motion.aside
      animate={{ width: collapsed ? 72 : 256 }}
      transition={{ duration: 0.25, ease: 'easeInOut' }}
      className="hidden lg:flex flex-col bg-[#014D4E] text-white h-screen sticky top-0 z-30 overflow-hidden"
    >
      {/* Logo */}
      <div className="p-4 h-[72px] flex items-center border-b border-white/10">
        {collapsed ? (
          <Logo size="sm" variant="icon" href="/dashboard" />
        ) : (
          <Logo size="sm" variant="full" href="/dashboard" />
        )}
      </div>

      {/* Nav */}
      <nav className="flex-1 py-4 px-2 space-y-1 overflow-y-auto">
        {NAV_ITEMS.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={cn(
              'flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-150 group',
              isActive(item.href)
                ? 'bg-[#C89B3C] text-white'
                : 'text-white/70 hover:text-white hover:bg-white/10'
            )}
            title={collapsed ? item.label : undefined}
          >
            <item.icon className="w-5 h-5 shrink-0" />
            <AnimatePresence>
              {!collapsed && (
                <motion.span
                  initial={{ opacity: 0, width: 0 }}
                  animate={{ opacity: 1, width: 'auto' }}
                  exit={{ opacity: 0, width: 0 }}
                  className="text-sm font-medium whitespace-nowrap overflow-hidden"
                >
                  {item.label}
                </motion.span>
              )}
            </AnimatePresence>
          </Link>
        ))}
      </nav>

      {/* Bottom */}
      <div className="py-4 px-2 border-t border-white/10 space-y-1">
        {BOTTOM_ITEMS.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-white/60 hover:text-white hover:bg-white/10 transition-colors"
            title={collapsed ? item.label : undefined}
          >
            <item.icon className="w-5 h-5 shrink-0" />
            {!collapsed && <span className="text-sm font-medium">{item.label}</span>}
          </Link>
        ))}
        <button
          onClick={() => signOut({ redirectUrl: '/' })}
          className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-white/60 hover:text-red-300 hover:bg-red-500/10 transition-colors"
          title={collapsed ? 'Sign Out' : undefined}
        >
          <LogOut className="w-5 h-5 shrink-0" />
          {!collapsed && <span className="text-sm font-medium">Sign Out</span>}
        </button>
      </div>

      {/* Collapse toggle */}
      <button
        onClick={() => setCollapsed(!collapsed)}
        className="absolute top-[72px] -right-3.5 w-7 h-7 bg-[#C89B3C] rounded-full border-2 border-white flex items-center justify-center hover:bg-[#A8832A] transition-colors shadow-md"
        aria-label="Toggle sidebar"
      >
        {collapsed ? (
          <ChevronRight className="w-3.5 h-3.5 text-white" />
        ) : (
          <ChevronLeft className="w-3.5 h-3.5 text-white" />
        )}
      </button>
    </motion.aside>
  )
}
