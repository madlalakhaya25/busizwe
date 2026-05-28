import React from 'react'
import Link from 'next/link'
import { Phone, Mail, MapPin, Globe, ExternalLink, Share2 } from 'lucide-react'
import Logo from './Logo'
import { Separator } from '@/components/ui/separator'

const LINKS = {
  company: [
    { label: 'About Us', href: '/about' },
    { label: 'Our Products', href: '/products' },
    { label: 'FAQ', href: '/faq' },
    { label: 'Contact', href: '/contact' },
  ],
  legal: [
    { label: 'Privacy Policy', href: '/privacy' },
    { label: 'Terms & Conditions', href: '/terms' },
    { label: 'POPIA Compliance', href: '/popia' },
  ],
  account: [
    { label: 'Member Login', href: '/sign-in' },
    { label: 'Register', href: '/sign-up' },
    { label: 'My Dashboard', href: '/dashboard' },
    { label: 'My Policies', href: '/dashboard/policies' },
  ],
}

export default function Footer() {
  return (
    <footer className="bg-[#014D4E] text-white">
      {/* Gold accent line */}
      <div className="h-1 bg-gradient-to-r from-transparent via-[#C89B3C] to-transparent" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand column */}
          <div className="lg:col-span-1">
            <div className="mb-6">
              <Logo size="md" variant="full" href="/" />
            </div>
            <p className="text-sm text-white/70 leading-relaxed mb-6">
              Providing dignified and affordable funeral cover to South African families since 2024.
              Trusted. Caring. Reliable.
            </p>
            <div className="flex gap-3">
              {[Globe, Share2, ExternalLink].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  className="w-9 h-9 rounded-full border border-white/20 flex items-center justify-center hover:border-[#C89B3C] hover:text-[#C89B3C] transition-colors"
                  aria-label="Social link"
                >
                  <Icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Company links */}
          <div>
            <h3 className="text-sm font-semibold text-[#C89B3C] uppercase tracking-widest mb-5">
              Company
            </h3>
            <ul className="space-y-3">
              {LINKS.company.map((l) => (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    className="text-sm text-white/70 hover:text-[#C89B3C] transition-colors"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Account links */}
          <div>
            <h3 className="text-sm font-semibold text-[#C89B3C] uppercase tracking-widest mb-5">
              My Account
            </h3>
            <ul className="space-y-3">
              {LINKS.account.map((l) => (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    className="text-sm text-white/70 hover:text-[#C89B3C] transition-colors"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-sm font-semibold text-[#C89B3C] uppercase tracking-widest mb-5">
              Contact Us
            </h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <Phone className="w-4 h-4 text-[#C89B3C] mt-0.5 shrink-0" />
                <div>
                  <p className="text-sm text-white">0800 000 000</p>
                  <p className="text-xs text-white/50">Mon–Fri 8am–5pm</p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <Mail className="w-4 h-4 text-[#C89B3C] mt-0.5 shrink-0" />
                <p className="text-sm text-white">info@busizwe.co.za</p>
              </li>
              <li className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-[#C89B3C] mt-0.5 shrink-0" />
                <p className="text-sm text-white/70">
                  123 Main Street<br />
                  Johannesburg, 2000<br />
                  South Africa
                </p>
              </li>
            </ul>
          </div>
        </div>

        <Separator className="my-10 bg-white/10" />

        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-white/50">
            © {new Date().getFullYear()} Busizwe Burial Society. All rights reserved.
          </p>
          <div className="flex gap-6">
            {LINKS.legal.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className="text-xs text-white/50 hover:text-[#C89B3C] transition-colors"
              >
                {l.label}
              </Link>
            ))}
          </div>
          <p className="text-xs text-white/40">
            FSP Reg. No. XXXXXXX | FSCA Authorised
          </p>
        </div>
      </div>
    </footer>
  )
}
