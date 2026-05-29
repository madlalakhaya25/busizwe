'use client'

import React from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { Phone, Shield } from 'lucide-react'

export default function CTASection() {
  return (
    <section className="py-32 bg-white">
      <div className="max-w-3xl mx-auto px-6 sm:px-8 lg:px-12 text-center">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          {/* Eyebrow */}
          <div className="inline-flex items-center gap-2 bg-[#014D4E]/6 border border-[#014D4E]/12 rounded-full px-4 py-2 mb-8">
            <Shield className="w-3.5 h-3.5 text-[#014D4E] shrink-0" />
            <span className="text-xs font-semibold text-[#014D4E] uppercase tracking-widest">FSCA Authorised</span>
          </div>

          <h2 className="font-serif font-semibold text-[#014D4E] text-4xl sm:text-5xl lg:text-[3.25rem] leading-[1.08] mb-6">
            Protect Your Family Today
          </h2>

          <p className="text-[#6b6b6b] text-lg leading-relaxed mb-12 max-w-xl mx-auto">
            Join over 5,000 South African families who trust Busizwe Burial Society.
            Apply online in minutes — from as little as R19.60 per month.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/sign-up"
              className="flex items-center justify-center h-14 px-10 rounded-xl text-base font-semibold bg-[#C89B3C] text-white hover:bg-[#A8832A] shadow-lg hover:shadow-xl transition-all duration-200"
            >
              Apply for Cover Now
            </Link>
            <a
              href="tel:+27800000000"
              className="flex items-center justify-center gap-2 h-14 px-10 rounded-xl text-base font-semibold text-[#014D4E] border-2 border-[#014D4E]/25 hover:bg-[#014D4E] hover:text-white hover:border-[#014D4E] transition-all duration-200"
            >
              <Phone className="w-4 h-4 shrink-0" />
              Call 0800 000 000
            </a>
          </div>

          <p className="mt-8 text-sm text-[#9a9a9a]">
            No medical examination required. Cover starts immediately on approval.
          </p>
        </motion.div>
      </div>
    </section>
  )
}
