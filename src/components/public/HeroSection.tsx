'use client'

import React from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowRight, Shield, Heart, CheckCircle2 } from 'lucide-react'
import { Button } from '@/components/ui/button'

const FEATURES = [
  'Cover from R5,000 to R10,000',
  'Premiums from R19.60/month',
  'Join online in minutes',
  'Age 16–84 eligible',
]

export default function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden bg-[#014D4E]">
      {/* Decorative background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-[600px] h-[600px] rounded-full bg-white/3 blur-3xl" />
        <div className="absolute -bottom-40 -left-40 w-[500px] h-[500px] rounded-full bg-[#C89B3C]/8 blur-3xl" />
        {/* Pattern */}
        <div
          className="absolute inset-0 opacity-5"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23C89B3C' fill-opacity='1' fill-rule='evenodd'%3E%3Cpath d='M0 40L40 0H20L0 20M40 40V20L20 40'/%3E%3C/g%3E%3C/svg%3E")`,
          }}
        />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 pb-16">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left content */}
          <div>
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 bg-[#C89B3C]/15 border border-[#C89B3C]/30 rounded-full px-4 py-2 mb-6"
            >
              <Shield className="w-4 h-4 text-[#C89B3C]" />
              <span className="text-sm font-medium text-[#C89B3C]">
                FSCA Authorised Burial Society
              </span>
            </motion.div>

            {/* Heading */}
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-[1.1] mb-6"
              style={{ fontFamily: 'Georgia, serif' }}
            >
              Dignity in
              <br />
              <span className="text-[#C89B3C]">Every Farewell</span>
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

            {/* Features */}
            <motion.ul
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="grid grid-cols-2 gap-3 mb-10"
            >
              {FEATURES.map((feature) => (
                <li key={feature} className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#C89B3C] shrink-0" />
                  <span className="text-sm text-white/80">{feature}</span>
                </li>
              ))}
            </motion.ul>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="flex flex-wrap gap-4"
            >
              <Button variant="gold" size="xl" asChild>
                <Link href="/sign-up">
                  Apply for Cover
                  <ArrowRight className="w-5 h-5" />
                </Link>
              </Button>
              <Button
                variant="ghost"
                size="xl"
                asChild
                className="text-white hover:text-white hover:bg-white/10 border border-white/20"
              >
                <Link href="/products">View Plans</Link>
              </Button>
            </motion.div>
          </div>

          {/* Right side – hero card */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="hidden lg:block"
          >
            <div className="relative">
              {/* Main card */}
              <div className="bg-white/95 backdrop-blur-sm rounded-3xl p-8 shadow-[0_24px_80px_rgba(0,0,0,0.3)]">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 rounded-full bg-[#014D4E] flex items-center justify-center">
                    <Heart className="w-6 h-6 text-[#C89B3C]" />
                  </div>
                  <div>
                    <p className="text-xs text-[#6b6b6b] uppercase tracking-widest">Sample Policy</p>
                    <p className="font-bold text-[#014D4E]">Immediate Family Cover</p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 mb-6">
                  {[
                    { label: 'Cover Amount', value: 'R10,000' },
                    { label: 'Monthly Premium', value: 'R59.25' },
                    { label: 'Age Group', value: '16–64 years' },
                    { label: 'Members Covered', value: 'Whole Family' },
                  ].map((item) => (
                    <div key={item.label} className="bg-[#F7F3EA] rounded-xl p-4">
                      <p className="text-xs text-[#6b6b6b] mb-1">{item.label}</p>
                      <p className="font-bold text-[#014D4E]">{item.value}</p>
                    </div>
                  ))}
                </div>

                <div className="flex items-center gap-2 px-4 py-3 bg-green-50 rounded-xl border border-green-200">
                  <CheckCircle2 className="w-5 h-5 text-green-600 shrink-0" />
                  <span className="text-sm text-green-700 font-medium">
                    Policy Active – Fully Covered
                  </span>
                </div>
              </div>

              {/* Floating stats */}
              <motion.div
                animate={{ y: [0, -8, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                className="absolute -top-6 -right-6 bg-[#C89B3C] text-white rounded-2xl px-5 py-4 shadow-xl"
              >
                <p className="text-2xl font-bold">5,000+</p>
                <p className="text-xs text-white/80">Families Covered</p>
              </motion.div>

              <motion.div
                animate={{ y: [0, 8, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
                className="absolute -bottom-6 -left-6 bg-white rounded-2xl px-5 py-4 shadow-xl border border-[#e0d9cc]"
              >
                <p className="text-2xl font-bold text-[#014D4E]">R19.60</p>
                <p className="text-xs text-[#6b6b6b]">From per month</p>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Wave bottom */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg viewBox="0 0 1440 80" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
          <path d="M0,40 C360,80 1080,0 1440,40 L1440,80 L0,80 Z" fill="#F7F3EA" />
        </svg>
      </div>
    </section>
  )
}
