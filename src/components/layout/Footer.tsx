import React from 'react'
import Link from 'next/link'
import { Phone, Mail, MapPin } from 'lucide-react'
import Logo from './Logo'

const LINKS = {
  company: [
    { label: 'About Us',     href: '/about'    },
    { label: 'Our Products', href: '/products' },
    { label: 'FAQ',          href: '/faq'      },
    { label: 'Contact',      href: '/contact'  },
  ],
  legal: [
    { label: 'Privacy Policy',    href: '/privacy' },
    { label: 'Terms & Conditions', href: '/terms'   },
    { label: 'POPIA Compliance',  href: '/popia'   },
  ],
  account: [
    { label: 'Member Login', href: '/sign-in'            },
    { label: 'Register',     href: '/sign-up'            },
    { label: 'My Dashboard', href: '/dashboard'          },
    { label: 'My Policies',  href: '/dashboard/policies' },
  ],
}

export default function Footer() {
  return (
    <footer>
      {/* ── Main footer — matches top nav ── */}
      <div className="bg-white border-t border-[#E5E7EB]">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">

            {/* Brand */}
            <div className="lg:col-span-1">
              <div className="mb-6">
                <Logo size="md" variant="full" href="/" />
              </div>
              <p className="text-sm text-[#6b6b6b] leading-relaxed mb-6">
                Providing dignified and affordable funeral cover to South African families since 2024.
                Trusted. Caring. Reliable.
              </p>
            </div>

            {/* Company links */}
            <div>
              <h3 className="text-sm font-semibold text-[#C89B3C] uppercase tracking-widest mb-5">
                Company
              </h3>
              <ul className="space-y-3">
                {LINKS.company.map((l) => (
                  <li key={l.href}>
                    <Link href={l.href} className="text-sm text-[#5a5a5a] hover:text-[#014D4E] transition-colors">
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
                    <Link href={l.href} className="text-sm text-[#5a5a5a] hover:text-[#014D4E] transition-colors">
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
                    <p className="text-sm text-[#1C1C1C]">061 463 1973</p>
                    <p className="text-sm text-[#1C1C1C]">076 380 1555</p>
                    <p className="text-xs text-[#6b6b6b] mt-1">Mon–Fri 8am–5pm</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <Mail className="w-4 h-4 text-[#C89B3C] mt-0.5 shrink-0" />
                  <a href="mailto:busizwebs@gmail.com" className="text-sm text-[#5a5a5a] hover:text-[#014D4E] transition-colors">
                    busizwebs@gmail.com
                  </a>
                </li>
                <li className="flex items-start gap-3">
                  <MapPin className="w-4 h-4 text-[#C89B3C] mt-0.5 shrink-0" />
                  <p className="text-sm text-[#6b6b6b]">
                    52 Wembley Road<br />
                    Kenville, Durban<br />
                    4051
                  </p>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* ── Bottom bar — matches top nav: white, clean border ── */}
      <div className="bg-white border-t border-[#E5E7EB]">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 py-4 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-[#6b6b6b]">
            © {new Date().getFullYear()} Busizwe Burial Society. All rights reserved.
          </p>
          <div className="flex gap-6">
            {LINKS.legal.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className="text-xs text-[#5a5a5a] hover:text-[#014D4E] transition-colors"
              >
                {l.label}
              </Link>
            ))}
          </div>
          <p className="text-xs text-[#6b6b6b]">
            Scheme No. MG0003500 | FSCA Authorised
          </p>
        </div>
      </div>
    </footer>
  )
}
