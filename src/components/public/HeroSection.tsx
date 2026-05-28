'use client'

import React from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowRight, Shield, Heart, CheckCircle2 } from 'lucide-react'
import { Button } from '@/components/ui/button'

const FEATURES = [
  'Cover from R5,000 to R10,000',
  'Premiums from R19.60 per month',
  'Join online in minutes',
  'Ages 16 to 84 eligible',
]

export default function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center bg-[#014D4E]">
      {/* Decorative background — clipped to its own layer, not the section */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-[600px] h-[600px] rounded-full bg-white/[0.03] blur-3xl" />
        <div className="absolute -bottom-40 -left-40 w-[500px] h-[500px] rounded-full bg-[#C89B3C]/[0.08] blur-3xl" />
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23C89B3C' fill-opacity='1' fill-rule='evenodd'%3E%3Cpath d='M0 40L40 0H20L0 20M40 40V20L20 40'/%3E%3C/g%3E%3C/svg%3E")`,
          }}
        />
      </div>

      <div className="relative w-full max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 pt-32 pb-24">
        <div className="grid lg:grid-cols-2 gap-12 xl:gap-16 items-center">

          {/* ── Left content ── */}
          <div className="min-w-0">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 bg-[#C89B3C]/15 border border-[#C89B3C]/30 rounded-full px-4 py-2 mb-8"
            >
              <Shield className="w-4 h-4 text-[#C89B3C] shrink-0" />
              <span className="text-sm font-medium text-[#C89B3C]">FSCA Authorised Burial Society</span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="font-serif font-semibold text-white text-5xl sm:text-6xl lg:text-7xl leading-[1.05] mb-6"
            >
              Dignity in
              <br />
              <span className="text-[#C89B3C] italic">Every Farewell</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-lg text-white/75 leading-relaxed mb-8 max-w-lg"
            >
              Busizwe Burial Society provides affordable, dignified funeral cover to South African
              families. Cover your loved ones from as little as{' '}
              <span className="text-[#C89B3C] font-semibold">R19.60 per month</span>.
            </motion.p>

            <motion.ul
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="grid grid-cols-1 sm:grid-cols-2 gap-y-3 gap-x-6 mb-10"
            >
              {FEATURES.map((feature) => (
                <li key={feature} className="flex items-center gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-[#C89B3C] shrink-0" />
                  <span className="text-sm text-white/85">{feature}</span>
                </li>
              ))}
            </motion.ul>

            {/* CTAs — stack on mobile, side by side on sm+ */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="flex flex-col sm:flex-row gap-4"
            >
              <Button variant="gold" size="lg" asChild className="w-full sm:w-auto">
                <Link href="/sign-up">
                  Apply for Cover
                  <ArrowRight className="w-5 h-5" />
                </Link>
              </Button>
              <Button
                variant="ghost"
                size="lg"
                asChild
                className="w-full sm:w-auto text-white hover:text-white hover:bg-white/10 border border-white/25"
              >
                <Link href="/products">View Plans</Link>
              </Button>
            </motion.div>
          </div>

          {/* ── Right side – hero card ── */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="hidden lg:block"
          >
            {/* Extra padding to ensure floating badges are never clipped */}
            <div className="relative pt-8 pb-10 pl-10 pr-6">
              {/* Main card */}
              <div className="bg-white/95 backdrop-blur-sm rounded-3xl p-8 shadow-[0_24px_80px_rgba(0,0,0,0.3)]">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 rounded-full bg-[#014D4E] flex items-center justify-center shrink-0">
                    <Heart className="w-6 h-6 text-[#C89B3C]" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-xs text-[#6b6b6b] uppercase tracking-widest">Sample Policy</p>
                    <p className="font-bold text-[#014D4E] truncate">Immediate Family Cover</p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 mb-6">
                  {[
                    { label: 'Cover Amount', value: 'R10,000' },
                    { label: 'Monthly Premium', value: 'R59.25' },
                    { label: 'Age Group', value: '16 – 64 years' },
                    { label: 'Members Covered', value: 'Whole Family' },
                  ].map((item) => (
                    <div key={item.label} className="bg-[#F7F3EA] rounded-xl p-3.5">
                      <p className="text-xs text-[#6b6b6b] mb-1.5 truncate">{item.label}</p>
                      <p className="font-bold text-[#014D4E] text-sm">{item.value}</p>
                    </div>
                  ))}
                </div>

                <div className="flex items-center gap-2.5 px-4 py-3 bg-green-50 rounded-xl border border-green-200">
                  <CheckCircle2 className="w-5 h-5 text-green-600 shrink-0" />
                  <span className="text-sm text-green-700 font-medium">Policy Active – Fully Covered</span>
                </div>
              </div>

              {/* Floating badge – top right */}
              <motion.div
                animate={{ y: [0, -6, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                className="absolute top-0 right-0 bg-[#C89B3C] text-white rounded-2xl px-5 py-4 shadow-xl"
              >
                <p className="text-2xl font-bold leading-none">5,000+</p>
                <p className="text-xs text-white/85 mt-1 whitespace-nowrap">Families Covered</p>
              </motion.div>

              {/* Floating badge – bottom left */}
              <motion.div
                animate={{ y: [0, 6, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
                className="absolute bottom-0 left-0 bg-white rounded-2xl px-5 py-4 shadow-xl border border-[#e0d9cc]"
              >
                <p className="text-2xl font-bold text-[#014D4E] leading-none">R19.60</p>
                <p className="text-xs text-[#6b6b6b] mt-1 whitespace-nowrap">From per month</p>
              </motion.div>
            </div>
          </motion.div>

        </div>
      </div>

      {/* Wave separator */}
      <div className="absolute bottom-0 left-0 right-0 pointer-events-none">
        <svg viewBox="0 0 1440 80" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
          <path d="M0,40 C360,80 1080,0 1440,40 L1440,80 L0,80 Z" fill="#F7F3EA" />
        </svg>
      </div>
    </section>
  )
}
