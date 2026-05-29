'use client'

import React from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { Shield, CheckCircle2 } from 'lucide-react'

const FEATURES = [
  'Cover from R5,000 to R10,000',
  'Premiums from R19.60 per month',
  'Join online in minutes',
  'Ages 16 to 84 eligible',
]

const BENEFITS = [
  'Cover from R5,000 to R10,000',
  'Whole family in one policy',
  'No medical exam required',
  'Pay out within 48 hours',
]

const STATS = [
  { value: '100+', label: 'Families covered' },
  { value: '48 hrs', label: 'Pay out time' },
  { value: 'R10k', label: 'Max cover' },
]

export default function HeroSection() {
  return (
    <section className="relative bg-[#014D4E] pt-36 pb-28 lg:pt-40 lg:pb-32">
      {/* Subtle background glows only — no SVG pattern, no wave */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-[600px] h-[600px] rounded-full bg-white/[0.03] blur-3xl" />
        <div className="absolute -bottom-40 -left-40 w-[500px] h-[500px] rounded-full bg-[#C89B3C]/[0.08] blur-3xl" />
      </div>

      <div className="relative w-full max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        <div className="grid lg:grid-cols-2 gap-12 xl:gap-20 items-center">

          {/* ── Left ── */}
          <div>
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
              Funeral cover for South African families, from as little as{' '}
              <span className="text-[#C89B3C] font-semibold">R19.60 per month</span>.
            </motion.p>

            <motion.ul
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="grid grid-cols-1 sm:grid-cols-2 gap-y-3 gap-x-6 mb-10"
            >
              {FEATURES.map((f) => (
                <li key={f} className="flex items-center gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-[#C89B3C] shrink-0" />
                  <span className="text-sm text-white/85">{f}</span>
                </li>
              ))}
            </motion.ul>

            {/* CTAs — plain Links, no Button/asChild/Slot */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="flex flex-col sm:flex-row gap-3"
            >
              <Link
                href="/sign-up"
                className="flex items-center justify-center h-14 px-10 rounded-xl text-base font-semibold bg-[#C89B3C] text-white hover:bg-[#A8832A] shadow-md hover:shadow-lg transition-all duration-200"
              >
                Apply for Cover
              </Link>
              <Link
                href="/products"
                className="flex items-center justify-center h-14 px-10 rounded-xl text-base font-semibold text-white border border-white/30 hover:bg-white/10 transition-all duration-200"
              >
                View Plans
              </Link>
            </motion.div>
          </div>

          {/* ── Right: coverage card ── */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="hidden lg:block"
          >
            <div className="bg-white rounded-3xl shadow-[0_24px_80px_rgba(0,0,0,0.25)] overflow-hidden">
              {/* Gold accent bar */}
              <div className="h-1 bg-gradient-to-r from-[#C89B3C]/40 via-[#C89B3C] to-[#C89B3C]/40" />

              <div className="p-10">
                {/* Header row */}
                <div className="flex items-center justify-between mb-10">
                  <div className="flex items-center gap-2">
                    <Shield className="w-4 h-4 text-[#C89B3C]" />
                    <span className="text-xs font-semibold text-[#6B7280] uppercase tracking-widest">
                      FSCA Authorised
                    </span>
                  </div>
                  <div className="flex items-center gap-1.5 bg-green-50 border border-green-200 rounded-full px-3 py-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse shrink-0" />
                    <span className="text-xs font-semibold text-green-700">Cover Available</span>
                  </div>
                </div>

                {/* Pricing */}
                <div className="mb-10">
                  <p className="text-sm text-[#6B7280] font-medium mb-3">
                    Cover your family from as little as
                  </p>
                  <div className="flex items-baseline gap-2">
                    <span className="font-serif font-semibold text-5xl text-[#014D4E] leading-none">
                      R19.60
                    </span>
                    <span className="text-xl text-[#6B7280] font-medium">/ month</span>
                  </div>
                </div>

                {/* Benefits */}
                <div className="space-y-4">
                  {BENEFITS.map((b) => (
                    <div key={b} className="flex items-center gap-3.5">
                      <div className="w-6 h-6 rounded-full bg-[#014D4E]/[0.08] flex items-center justify-center shrink-0">
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#014D4E]" />
                      </div>
                      <span className="text-sm font-medium text-[#111827]">{b}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Stats footer */}
              <div className="bg-[#014D4E] px-10 py-6 grid grid-cols-3 divide-x divide-white/10">
                {STATS.map(({ value, label }) => (
                  <div key={label} className="px-4 first:pl-0 last:pr-0">
                    <p className="text-xl font-bold text-white leading-none">{value}</p>
                    <p className="text-xs text-white/50 mt-2 leading-tight">{label}</p>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  )
}
