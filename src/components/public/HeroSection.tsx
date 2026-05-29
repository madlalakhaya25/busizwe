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

const POLICY_DETAILS = [
  { label: 'Cover Amount',    value: 'R10,000' },
  { label: 'Age Group',       value: '16 – 64 years' },
  { label: 'Members Covered', value: 'Whole Family' },
  { label: 'Policy Type',     value: 'Immediate Family' },
]

export default function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center bg-[#014D4E]">
      {/* Decorative background */}
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

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="flex flex-col sm:flex-row gap-3"
            >
              <Button variant="gold" size="lg" asChild className="w-full sm:w-auto">
                <Link href="/sign-up" className="flex items-center justify-center gap-2">
                  Apply for Cover
                  <ArrowRight className="w-5 h-5 shrink-0" />
                </Link>
              </Button>
              {/* Direct Link avoids Slot alignment quirks on the ghost style */}
              <Link
                href="/products"
                className="inline-flex items-center justify-center h-12 px-8 rounded-lg text-base font-semibold text-white border border-white/30 hover:bg-white/10 transition-all duration-200 w-full sm:w-auto"
              >
                View Plans
              </Link>
            </motion.div>
          </div>

          {/* ── Right side – policy card ── */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="hidden lg:block"
          >
            <div className="space-y-4">
              {/* Main card */}
              <div className="bg-white rounded-3xl shadow-[0_24px_80px_rgba(0,0,0,0.35)] overflow-hidden">
                {/* Card header */}
                <div className="bg-[#014D4E] px-6 py-5 flex items-center justify-between border-b border-white/10">
                  <div className="flex items-center gap-3.5">
                    <div className="w-11 h-11 rounded-xl bg-[#C89B3C]/20 flex items-center justify-center shrink-0">
                      <Heart className="w-5 h-5 text-[#C89B3C]" />
                    </div>
                    <div>
                      <p className="text-[10px] text-white/50 uppercase tracking-widest font-semibold">Sample Policy</p>
                      <p className="font-bold text-white leading-tight">Immediate Family Cover</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-1.5 bg-green-500/15 border border-green-500/25 rounded-full px-3 py-1.5 shrink-0">
                    <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse shrink-0" />
                    <span className="text-xs text-green-300 font-semibold">Active</span>
                  </div>
                </div>

                {/* Details grid */}
                <div className="p-5 grid grid-cols-2 gap-3">
                  {POLICY_DETAILS.map((item) => (
                    <div key={item.label} className="bg-[#F7F3EA] rounded-xl p-3.5">
                      <p className="text-[10px] text-[#9a9a9a] uppercase tracking-wide font-medium mb-1.5">{item.label}</p>
                      <p className="font-bold text-[#014D4E] text-sm">{item.value}</p>
                    </div>
                  ))}
                </div>

                {/* Premium footer bar */}
                <div className="mx-5 mb-5 bg-[#014D4E] rounded-2xl px-5 py-4 flex items-center justify-between">
                  <div>
                    <p className="text-[10px] text-white/50 uppercase tracking-wide font-semibold">Monthly Premium</p>
                    <p className="text-2xl font-bold text-[#C89B3C] leading-none mt-1.5">R59.25</p>
                  </div>
                  <div className="text-right">
                    <p className="text-[10px] text-white/50 uppercase tracking-wide font-semibold">Cover Starts From</p>
                    <p className="text-xl font-bold text-white leading-none mt-1.5">R19.60</p>
                    <p className="text-[10px] text-white/40 mt-0.5">per month</p>
                  </div>
                </div>
              </div>

              {/* Stats row — clean, no overlap */}
              <div className="grid grid-cols-2 gap-3">
                <motion.div
                  animate={{ y: [0, -4, 0] }}
                  transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                  className="bg-white/8 backdrop-blur-sm border border-white/12 rounded-2xl px-5 py-4"
                >
                  <p className="text-2xl font-bold text-white leading-none">5,000+</p>
                  <p className="text-xs text-white/55 mt-1.5">Families Covered</p>
                </motion.div>
                <motion.div
                  animate={{ y: [0, -4, 0] }}
                  transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
                  className="bg-[#C89B3C]/12 backdrop-blur-sm border border-[#C89B3C]/20 rounded-2xl px-5 py-4"
                >
                  <p className="text-2xl font-bold text-[#C89B3C] leading-none">R5k–R10k</p>
                  <p className="text-xs text-white/55 mt-1.5">Cover Options</p>
                </motion.div>
              </div>
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
