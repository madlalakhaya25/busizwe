'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, Phone } from 'lucide-react'
import { useAuth, UserButton } from '@clerk/nextjs'
import Logo from './Logo'
import { cn } from '@/lib/utils'

const NAV_LINKS = [
  { label: 'Home',     href: '/'        },
  { label: 'About',   href: '/about'   },
  { label: 'Products', href: '/products' },
  { label: 'FAQ',     href: '/faq'     },
  { label: 'Contact', href: '/contact' },
]

export default function Navbar() {
  const [isOpen, setIsOpen]     = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const pathname   = usePathname()
  const { isSignedIn } = useAuth()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => { setIsOpen(false) }, [pathname])

  const isActive = (href: string) =>
    href === '/' ? pathname === '/' : pathname.startsWith(href)

  return (
    <>
      <motion.header
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.45, ease: 'easeOut' }}
        className={cn(
          'fixed top-0 left-0 right-0 z-50 bg-white transition-shadow duration-300',
          scrolled
            ? 'shadow-[0_2px_24px_rgba(1,77,78,0.10)] border-b border-[#e0d9cc]'
            : 'border-b border-[#e8e2d8]'
        )}
      >
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-10">
          <div className="flex items-center justify-between h-[72px] gap-6">

            {/* Logo */}
            <Logo size="sm" variant="full" />

            {/* Desktop nav links */}
            <nav className="hidden lg:flex items-center gap-1 flex-1" aria-label="Main navigation">
              {NAV_LINKS.map((link) => {
                const active = isActive(link.href)
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={cn(
                      'relative flex items-center justify-center px-4 py-2 rounded-xl text-sm font-medium transition-colors duration-150 select-none',
                      active
                        ? 'text-[#014D4E] font-semibold bg-[#014D4E]/[0.07]'
                        : 'text-[#4a4a4a] hover:text-[#014D4E] hover:bg-[#014D4E]/[0.05]'
                    )}
                  >
                    {link.label}
                    {active && (
                      <motion.span
                        layoutId="nav-underline"
                        className="absolute bottom-1 left-1/2 -translate-x-1/2 w-5 h-0.5 bg-[#C89B3C] rounded-full"
                        transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                      />
                    )}
                  </Link>
                )
              })}
            </nav>

            {/* Right — phone + auth */}
            <div className="hidden lg:flex items-center gap-2 shrink-0">
              <a
                href="tel:+27800000000"
                className="flex items-center gap-1.5 text-sm font-medium text-[#6b6b6b] hover:text-[#014D4E] hover:bg-[#014D4E]/[0.05] px-3 py-2 rounded-xl transition-colors"
              >
                <Phone className="w-3.5 h-3.5 text-[#C89B3C] shrink-0" />
                0800 000 000
              </a>

              <div className="w-px h-5 bg-[#e0d9cc] mx-1" />

              {isSignedIn ? (
                <>
                  <Link
                    href="/dashboard"
                    className="flex items-center justify-center px-4 py-2 rounded-xl text-sm font-medium text-[#014D4E] border border-[#014D4E]/30 hover:bg-[#014D4E] hover:text-white transition-colors"
                  >
                    Dashboard
                  </Link>
                  <UserButton
                    appearance={{
                      elements: { avatarBox: 'w-9 h-9 ring-2 ring-[#C89B3C] ring-offset-1' },
                    }}
                  />
                </>
              ) : (
                <>
                  <Link
                    href="/sign-in"
                    className="flex items-center justify-center px-4 py-2 rounded-xl text-sm font-medium text-[#4a4a4a] hover:text-[#014D4E] hover:bg-[#014D4E]/[0.05] transition-colors"
                  >
                    Sign In
                  </Link>
                  <Link
                    href="/sign-up"
                    className="flex items-center justify-center gap-1.5 h-9 px-5 rounded-lg text-sm font-semibold bg-[#C89B3C] text-white hover:bg-[#A8832A] shadow-md hover:shadow-lg transition-all"
                  >
                    Apply Now
                  </Link>
                </>
              )}
            </div>

            {/* Mobile hamburger */}
            <button
              className="lg:hidden p-2.5 rounded-xl text-[#1C1C1C] hover:bg-[#014D4E]/8 transition-colors"
              onClick={() => setIsOpen(!isOpen)}
              aria-label="Toggle menu"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>

          </div>
        </div>
      </motion.header>

      {/* Mobile menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.18 }}
            className="fixed inset-x-0 top-[72px] z-40 bg-white border-b border-[#e0d9cc] shadow-xl lg:hidden"
          >
            <div className="max-w-7xl mx-auto px-6 py-5 flex flex-col gap-1">
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    'flex items-center px-4 py-3.5 rounded-xl text-sm font-medium transition-colors',
                    isActive(link.href)
                      ? 'text-white bg-[#014D4E]'
                      : 'text-[#1C1C1C] hover:bg-[#014D4E]/8 hover:text-[#014D4E]'
                  )}
                >
                  {isActive(link.href) && (
                    <span className="w-1.5 h-1.5 rounded-full bg-[#C89B3C] mr-2.5 shrink-0" />
                  )}
                  {link.label}
                </Link>
              ))}

              <div className="mt-4 pt-4 border-t border-[#e0d9cc] flex flex-col gap-2.5">
                {isSignedIn ? (
                  <Link
                    href="/dashboard"
                    className="flex items-center justify-center h-11 px-6 rounded-lg text-sm font-semibold bg-[#014D4E] text-white hover:bg-[#013638] transition-colors"
                  >
                    My Dashboard
                  </Link>
                ) : (
                  <>
                    <Link
                      href="/sign-in"
                      className="flex items-center justify-center h-11 px-6 rounded-lg text-sm font-semibold text-[#014D4E] border-2 border-[#014D4E] hover:bg-[#014D4E] hover:text-white transition-colors"
                    >
                      Sign In
                    </Link>
                    <Link
                      href="/sign-up"
                      className="flex items-center justify-center h-11 px-6 rounded-lg text-sm font-semibold bg-[#C89B3C] text-white hover:bg-[#A8832A] shadow-md transition-all"
                    >
                      Apply Now
                    </Link>
                  </>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
