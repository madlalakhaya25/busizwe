'use client'

import React from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowRight, Phone } from 'lucide-react'
import { Button } from '@/components/ui/button'

export default function CTASection() {
  return (
    <section className="py-24 bg-[#F7F3EA]">
      <div className="max-w-4xl mx-auto px-6 sm:px-8 lg:px-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-[#014D4E] rounded-3xl p-10 sm:p-14 relative overflow-hidden text-center"
        >
          {/* Decorative blobs */}
          <div className="absolute top-0 right-0 w-64 h-64 rounded-full bg-[#C89B3C]/10 -translate-y-1/2 translate-x-1/2 pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-48 h-48 rounded-full bg-white/5 translate-y-1/2 -translate-x-1/2 pointer-events-none" />

          <div className="relative">
            <h2 className="font-serif font-semibold text-white text-3xl sm:text-4xl lg:text-[2.75rem] leading-[1.1] mb-5">
              Protect Your Family Today
            </h2>
            <p className="text-white/70 text-base sm:text-lg leading-relaxed mb-10 max-w-xl mx-auto">
              Join over 5,000 South African families who trust Busizwe Burial Society. Apply online
              in minutes and get covered from as little as R19.60 per month.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-stretch sm:items-center">
              <Button variant="gold" size="lg" asChild className="w-full sm:w-auto">
                <Link href="/sign-up">
                  Apply for Cover Now
                  <ArrowRight className="w-5 h-5" />
                </Link>
              </Button>
              <Button
                size="lg"
                className="w-full sm:w-auto bg-white/10 text-white border border-white/25 hover:bg-white/20"
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
