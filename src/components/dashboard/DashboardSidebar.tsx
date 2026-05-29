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
import Image from 'next/image'
import { cn } from '@/lib/utils'

const NAV_ITEMS = [
  { icon: LayoutDashboard, label: 'Overview',    href: '/dashboard' },
  { icon: FileText,        label: 'My Policies', href: '/dashboard/policies' },
  { icon: Users,           label: 'Dependants',  href: '/dashboard/dependants' },
  { icon: FileSearch,      label: 'Claims',      href: '/dashboard/claims' },
  { icon: FolderOpen,      label: 'Documents',   href: '/dashboard/documents' },
  { icon: CreditCard,      label: 'Payments',    href: '/dashboard/payments' },
]

const BOTTOM_ITEMS = [
  { icon: HelpCircle, label: 'Help & FAQ', href: '/faq' },
  { icon: Settings,   label: 'Settings',   href: '/dashboard/settings' },
]

function NavLabel({ show, children }: { show: boolean; children: string }) {
  return (
    <AnimatePresence initial={false}>
      {show && (
        <motion.span
          key="label"
          initial={{ opacity: 0, width: 0 }}
          animate={{ opacity: 1, width: 'auto' }}
          exit={{ opacity: 0, width: 0 }}
          transition={{ duration: 0.2, ease: 'easeInOut' }}
          className="text-sm font-medium whitespace-nowrap overflow-hidden leading-none"
        >
          {children}
        </motion.span>
      )}
    </AnimatePresence>
  )
}

export default function DashboardSidebar() {
  const [collapsed, setCollapsed] = useState(false)
  const pathname = usePathname()
  const { signOut } = useClerk()

  const isActive = (href: string) =>
    href === '/dashboard' ? pathname === '/dashboard' : pathname.startsWith(href)

  return (
    <motion.aside
      animate={{ width: collapsed ? 72 : 256 }}
      transition={{ duration: 0.25, ease: 'easeInOut' }}
      className="hidden lg:flex relative flex-col bg-[#014D4E] text-white h-screen sticky top-0 z-30"
    >
      {/* Inner clip — keeps content inside while toggle can protrude */}
      <div className="flex flex-col h-full overflow-hidden">

        {/* Logo */}
        <Link href="/dashboard" className={cn(
          'h-[72px] flex items-center border-b border-white/10 shrink-0',
          collapsed ? 'justify-center px-2' : 'px-4'
        )}>
          <Image
            src="/busizwe-badge.png"
            alt="Busizwe Burial Society"
            width={collapsed ? 44 : 96}
            height={collapsed ? 28 : 61}
            className="object-contain transition-all duration-200"
            placeholder="empty"
          />
        </Link>

        {/* Main nav */}
        <nav className="flex-1 py-3 px-2 space-y-0.5 overflow-y-auto">
          {NAV_ITEMS.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              title={collapsed ? item.label : undefined}
              className={cn(
                'flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-150',
                collapsed && 'justify-center px-0',
                isActive(item.href)
                  ? 'bg-[#C89B3C] text-white'
                  : 'text-white/70 hover:text-white hover:bg-white/10'
              )}
            >
              <item.icon className="w-5 h-5 shrink-0" />
              <NavLabel show={!collapsed}>{item.label}</NavLabel>
            </Link>
          ))}
        </nav>

        {/* Bottom items */}
        <div className="py-3 px-2 border-t border-white/10 space-y-0.5 shrink-0">
          {BOTTOM_ITEMS.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              title={collapsed ? item.label : undefined}
              className={cn(
                'flex items-center gap-3 px-3 py-2.5 rounded-xl text-white/60 hover:text-white hover:bg-white/10 transition-colors',
                collapsed && 'justify-center px-0'
              )}
            >
              <item.icon className="w-5 h-5 shrink-0" />
              <NavLabel show={!collapsed}>{item.label}</NavLabel>
            </Link>
          ))}

          <button
            onClick={() => signOut({ redirectUrl: '/' })}
            title={collapsed ? 'Sign Out' : undefined}
            className={cn(
              'w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-white/60 hover:text-red-300 hover:bg-red-500/10 transition-colors',
              collapsed && 'justify-center px-0'
            )}
          >
            <LogOut className="w-5 h-5 shrink-0" />
            <NavLabel show={!collapsed}>Sign Out</NavLabel>
          </button>
        </div>

      </div>

      {/* Toggle — outside overflow-hidden so it's never clipped */}
      <button
        onClick={() => setCollapsed(!collapsed)}
        className="absolute top-[84px] -right-3 w-6 h-6 bg-[#C89B3C] rounded-full flex items-center justify-center hover:bg-[#A8832A] transition-colors shadow-lg ring-2 ring-white z-10"
        aria-label={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
      >
        {collapsed
          ? <ChevronRight className="w-3 h-3 text-white" />
          : <ChevronLeft  className="w-3 h-3 text-white" />
        }
      </button>
    </motion.aside>
  )
}
