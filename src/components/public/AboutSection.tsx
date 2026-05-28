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
    description: 'We understand that losing a loved one is painful. Our cover eases the financial burden so you can focus on what matters.',
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

const POINTS = [
  'Affordable premiums from R19.60 per month',
  'Cover for ages 16 to 84 years',
  'Household cover for the whole family',
  'Quick 48-hour claims processing',
  'No medical examination required',
]

export default function AboutSection() {
  return (
    <section className="py-24 bg-white" id="about">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        <div className="grid lg:grid-cols-2 gap-14 lg:gap-20 items-center">
          {/* Left — narrative */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <span className="eyebrow mb-6">About Busizwe</span>
            <h2 className="font-serif font-semibold text-[#014D4E] text-3xl sm:text-4xl lg:text-[2.75rem] leading-[1.1] mt-6 mb-6">
              Serving South African Families with Dignity
            </h2>
            <p className="text-[#6b6b6b] text-lg leading-relaxed mb-5">
              Busizwe Burial Society was founded with a single mission: to ensure that every South
              African family can give their loved ones the dignified farewell they deserve —
              regardless of financial circumstances.
            </p>
            <p className="text-[#6b6b6b] leading-relaxed mb-8">
              We offer flexible funeral cover for individuals, families, and single-parent
              households, with monthly premiums designed to fit every budget. Peace of mind should
              never be a luxury.
            </p>

            <ul className="space-y-3.5 mb-10">
              {POINTS.map((item) => (
                <li key={item} className="flex items-center gap-3">
                  <span className="w-5 h-5 rounded-full bg-[#C89B3C]/15 flex items-center justify-center shrink-0">
                    <CheckCircle2 className="w-4 h-4 text-[#C89B3C]" />
                  </span>
                  <span className="text-[#1C1C1C]">{item}</span>
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

          {/* Right — value cards */}
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
                className="flex gap-5 p-6 sm:p-7 bg-[#F7F3EA] rounded-2xl border border-[#e0d9cc] hover:border-[#C89B3C]/40 hover:shadow-[0_8px_24px_rgba(200,155,60,0.12)] transition-all duration-200"
              >
                <div className="w-12 h-12 rounded-2xl bg-[#014D4E] flex items-center justify-center shrink-0">
                  <value.icon className="w-6 h-6 text-[#C89B3C]" />
                </div>
                <div className="min-w-0">
                  <h3 className="font-serif font-semibold text-lg text-[#014D4E] mb-2">{value.title}</h3>
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
