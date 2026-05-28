'use client'

import React from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { Heart, Shield, Users, CheckCircle2, ArrowRight } from 'lucide-react'
import { Button } from '@/components/ui/button'

const VALUES = [
  {
    icon: Heart,
    title: 'Family First',
    description: 'We understand that losing a loved one is painful. Our products ease the financial burden so you can focus on what matters.',
  },
  {
    icon: Shield,
    title: 'Trustworthy',
    description: 'As an FSCA-authorised burial society, we operate with full transparency and accountability to our members.',
  },
  {
    icon: Users,
    title: 'Community Driven',
    description: 'Built for South African families, by people who understand the Ubuntu spirit of togetherness and support.',
  },
]

export default function AboutSection() {
  return (
    <section className="py-24 bg-white" id="about">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-block text-xs font-semibold text-[#C89B3C] uppercase tracking-widest mb-4 border border-[#C89B3C]/30 rounded-full px-4 py-1.5">
              About Busizwe
            </span>
            <h2
              className="text-4xl font-bold text-[#014D4E] mb-6 leading-tight"
              style={{ fontFamily: 'Georgia, serif' }}
            >
              Serving South African Families with Dignity
            </h2>
            <p className="text-[#6b6b6b] leading-relaxed mb-6">
              Busizwe Burial Society was founded with a single mission: to ensure that every South
              African family can give their loved ones the dignified farewell they deserve —
              regardless of financial circumstances.
            </p>
            <p className="text-[#6b6b6b] leading-relaxed mb-8">
              Our burial society offers flexible funeral cover plans for individuals, families, and
              single-parent households, with monthly premiums designed to fit every budget. We
              believe that peace of mind should never be a luxury.
            </p>

            <ul className="space-y-3 mb-8">
              {[
                'Affordable premiums from R19.60/month',
                'Cover for ages 16 to 84 years',
                'Household cover for the whole family',
                'Quick 48-hour claims processing',
                'No medical examination required',
              ].map((item) => (
                <li key={item} className="flex items-center gap-3">
                  <CheckCircle2 className="w-5 h-5 text-[#C89B3C] shrink-0" />
                  <span className="text-sm text-[#1C1C1C]">{item}</span>
                </li>
              ))}
            </ul>

            <Button variant="default" size="lg" asChild>
              <Link href="/about">
                Learn More About Us
                <ArrowRight className="w-4 h-4" />
              </Link>
            </Button>
          </motion.div>

          {/* Right */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="space-y-5"
          >
            {VALUES.map((value, i) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 + 0.3 }}
                className="flex gap-5 p-6 bg-[#F7F3EA] rounded-2xl border border-[#e0d9cc] hover:border-[#C89B3C]/40 hover:shadow-[0_4px_16px_rgba(200,155,60,0.1)] transition-all duration-200"
              >
                <div className="w-12 h-12 rounded-xl bg-[#014D4E] flex items-center justify-center shrink-0">
                  <value.icon className="w-6 h-6 text-[#C89B3C]" />
                </div>
                <div>
                  <h3 className="font-bold text-[#014D4E] mb-2">{value.title}</h3>
                  <p className="text-sm text-[#6b6b6b] leading-relaxed">{value.description}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  )
}
