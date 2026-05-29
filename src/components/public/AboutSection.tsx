'use client'

import React from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { Heart, Shield, Users, CheckCircle2, ArrowRight } from 'lucide-react'

const VALUES = [
  {
    icon: Heart,
    title: 'Family First',
    description:
      'This started because of family. Every member is someone\'s parent, grandchild, or sibling. We do not forget that.',
  },
  {
    icon: Shield,
    title: 'FSCA Authorised',
    description:
      'Fully registered and regulated. Your policy and your money are handled properly, always.',
  },
  {
    icon: Users,
    title: 'Community Built',
    description:
      'Not built in a boardroom. Started by someone who had seen enough families struggle and decided to do something about it.',
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
    <section className="py-24 lg:py-32 bg-white" id="about">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        <div className="grid lg:grid-cols-2 gap-14 lg:gap-20 items-center">

          {/* Left — narrative */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <p className="text-xs font-semibold text-[#C89B3C] uppercase tracking-widest mb-3">
              About Busizwe
            </p>
            <h2 className="font-serif font-semibold text-[#014D4E] text-3xl sm:text-4xl leading-tight mb-6">
              There When It Matters Most
            </h2>

            <div className="space-y-6">
              <p className="text-[#6B7280] text-lg leading-relaxed">
                Busizwe was started because too many South African families were facing a funeral
                bill on top of their grief. We exist to make sure that does not happen to yours.
              </p>
              <p className="text-[#6B7280] leading-relaxed">
                We cover individuals, whole households, and single-parent families. Premiums from
                R19.60 a month. No medical exam. No complicated forms.
              </p>
            </div>

            <ul className="space-y-3.5 mt-8 mb-10">
              {POINTS.map((item) => (
                <li key={item} className="flex items-center gap-3">
                  <CheckCircle2 className="w-5 h-5 text-[#C89B3C] shrink-0" />
                  <span className="text-[#374151]">{item}</span>
                </li>
              ))}
            </ul>

            <Link
              href="/about"
              className="inline-flex items-center justify-center gap-2 h-12 px-8 rounded-lg text-sm font-semibold bg-[#014D4E] text-white hover:bg-[#013638] transition-all duration-200"
            >
              Learn More About Us
              <ArrowRight className="w-4 h-4 shrink-0" />
            </Link>
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
                className="flex gap-5 p-6 sm:p-7 bg-[#F9FAFB] rounded-2xl border border-[#E5E7EB] hover:border-[#C89B3C]/40 hover:shadow-md transition-all duration-200"
              >
                <div className="w-12 h-12 rounded-2xl bg-[#014D4E] flex items-center justify-center shrink-0">
                  <value.icon className="w-6 h-6 text-[#C89B3C]" />
                </div>
                <div className="min-w-0">
                  <h3 className="font-serif font-semibold text-lg text-[#014D4E] mb-2">
                    {value.title}
                  </h3>
                  <p className="text-sm text-[#6B7280] leading-relaxed">{value.description}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>

        </div>
      </div>
    </section>
  )
}
