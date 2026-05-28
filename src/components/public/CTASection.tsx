'use client'

import React from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowRight, Phone } from 'lucide-react'
import { Button } from '@/components/ui/button'

export default function CTASection() {
  return (
    <section className="py-24 bg-[#F7F3EA]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-[#014D4E] rounded-3xl p-12 relative overflow-hidden"
        >
          {/* Decorative */}
          <div className="absolute top-0 right-0 w-64 h-64 rounded-full bg-[#C89B3C]/10 -translate-y-1/2 translate-x-1/2 pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-48 h-48 rounded-full bg-white/5 translate-y-1/2 -translate-x-1/2 pointer-events-none" />

          <div className="relative">
            <span className="inline-block text-xs font-semibold text-[#C89B3C] uppercase tracking-widest mb-4 border border-[#C89B3C]/30 rounded-full px-4 py-1.5">
              Get Started Today
            </span>
            <h2
              className="text-4xl font-bold text-white mb-4"
              style={{ fontFamily: 'Georgia, serif' }}
            >
              Protect Your Family Today
            </h2>
            <p className="text-white/70 text-lg mb-10 max-w-xl mx-auto">
              Join over 5,000 South African families who trust Busizwe. Apply online in minutes and get covered from as little as R19.60/month.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Button variant="gold" size="xl" asChild>
                <Link href="/sign-up">
                  Apply for Cover Now
                  <ArrowRight className="w-5 h-5" />
                </Link>
              </Button>
              <Button
                size="xl"
                className="bg-white/10 text-white border border-white/20 hover:bg-white/20"
                asChild
              >
                <a href="tel:+27800000000">
                  <Phone className="w-5 h-5" />
                  Call 0800 000 000
                </a>
              </Button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
