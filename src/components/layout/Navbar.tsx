'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, Phone, ChevronRight } from 'lucide-react'
import { useAuth, UserButton } from '@clerk/nextjs'
import Logo from './Logo'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

const NAV_LINKS = [
  { label: 'Home',     href: '/'        },
  { label: 'About',   href: '/about'   },
  { label: 'Products', href: '/products' },
  { label: 'FAQ',     href: '/faq'     },
  { label: 'Contact', href: '/contact' },
]

export default function Navbar() {
  const [isOpen, setIsOpen]   = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const pathname  = usePathname()
  const { isSignedIn } = useAuth()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
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
        transition={{ duration: 0.5, ease: 'easeOut' }}
        className={cn(
          'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
          scrolled
            ? 'bg-white/95 backdrop-blur-md shadow-[0_2px_20px_rgba(1,77,78,0.12)] border-b border-[#e0d9cc]'
            : 'bg-transparent'
        )}
      >
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-10">
          <div className="flex items-center justify-between h-20 gap-8">

            {/* Logo */}
            <Logo size="sm" variant="full" />

            {/* Desktop nav — pill container */}
            <nav
              className={cn(
                'hidden lg:flex items-center gap-0.5 rounded-2xl p-1.5 transition-all duration-300',
                scrolled
                  ? 'bg-[#014D4E]/6 border border-[#014D4E]/10'
                  : 'bg-white/10 border border-white/15 backdrop-blur-sm'
              )}
              aria-label="Main navigation"
            >
              {NAV_LINKS.map((link) => {
                const active = isActive(link.href)
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={cn(
                      'relative px-4 py-2 text-sm font-medium rounded-xl transition-all duration-200 select-none',
                      scrolled
                        ? active
                          ? 'text-[#014D4E] font-semibold'
                          : 'text-[#4a4a4a] hover:text-[#014D4E] hover:bg-[#014D4E]/6'
                        : active
                          ? 'text-white font-semibold'
                          : 'text-white/75 hover:text-white hover:bg-white/10'
                    )}
                  >
                    {active && (
                      <motion.span
                        layoutId="nav-pill"
                        className={cn(
                          'absolute inset-0 rounded-xl',
                          scrolled ? 'bg-[#014D4E]/10' : 'bg-white/15'
                        )}
                        transition={{ type: 'spring', stiffness: 400, damping: 32 }}
                      />
                    )}
                    <span className="relative">
                      {link.label}
                      {active && (
                        <span className="absolute -bottom-0.5 left-1/2 -translate-x-1/2 w-4 h-0.5 bg-[#C89B3C] rounded-full block" />
                      )}
                    </span>
                  </Link>
                )
              })}
            </nav>

            {/* Right side */}
            <div className="hidden lg:flex items-center gap-3">
              <a
                href="tel:+27800000000"
                className={cn(
                  'flex items-center gap-1.5 text-sm font-medium transition-colors px-3 py-2 rounded-xl',
                  scrolled
                    ? 'text-[#6b6b6b] hover:text-[#014D4E] hover:bg-[#014D4E]/6'
                    : 'text-white/75 hover:text-white hover:bg-white/10'
                )}
              >
                <Phone className="w-3.5 h-3.5 text-[#C89B3C] shrink-0" />
                <span>0800 000 000</span>
              </a>

              <div className={cn('w-px h-5', scrolled ? 'bg-[#e0d9cc]' : 'bg-white/20')} />

              {isSignedIn ? (
                <>
                  <Button
                    variant={scrolled ? 'outline' : 'ghost'}
                    size="sm"
                    asChild
                    className={!scrolled ? 'text-white border border-white/30 hover:bg-white/10 hover:text-white' : ''}
                  >
                    <Link href="/dashboard">Dashboard</Link>
                  </Button>
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
                    className={cn(
                      'text-sm font-medium px-4 py-2 rounded-xl transition-colors',
                      scrolled
                        ? 'text-[#4a4a4a] hover:text-[#014D4E] hover:bg-[#014D4E]/6'
                        : 'text-white/80 hover:text-white hover:bg-white/10'
                    )}
                  >
                    Sign In
                  </Link>
                  <Button variant="gold" size="sm" asChild>
                    <Link href="/sign-up" className="flex items-center gap-1.5">
                      Apply Now <ChevronRight className="w-3.5 h-3.5 shrink-0" />
                    </Link>
                  </Button>
                </>
              )}
            </div>

            {/* Mobile hamburger */}
            <button
              className={cn(
                'lg:hidden p-2.5 rounded-xl transition-colors',
                scrolled ? 'text-[#1C1C1C] hover:bg-[#014D4E]/10' : 'text-white hover:bg-white/10'
              )}
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
            transition={{ duration: 0.2 }}
            className="fixed inset-x-0 top-20 z-40 bg-white border-b border-[#e0d9cc] shadow-xl lg:hidden"
          >
            <div className="max-w-7xl mx-auto px-6 py-6 flex flex-col gap-1">
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
              <div className="mt-4 pt-4 border-t border-[#e0d9cc] flex flex-col gap-3">
                {isSignedIn ? (
                  <Button variant="default" asChild className="w-full">
                    <Link href="/dashboard">My Dashboard</Link>
                  </Button>
                ) : (
                  <>
                    <Button variant="outline" asChild className="w-full">
                      <Link href="/sign-in">Sign In</Link>
                    </Button>
                    <Button variant="gold" asChild className="w-full">
                      <Link href="/sign-up">Apply Now</Link>
                    </Button>
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
