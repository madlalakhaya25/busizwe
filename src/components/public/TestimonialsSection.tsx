'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { Quote, Star } from 'lucide-react'
import SectionHeading from '@/components/public/SectionHeading'

const TESTIMONIALS = [
  {
    name: 'Nomsa Dlamini',
    location: 'Soweto, Gauteng',
    text: 'When I lost my mother, Busizwe was there for us. The claim was processed in two days and we could give her the dignity she deserved. I am forever grateful.',
    rating: 5,
    initials: 'ND',
  },
  {
    name: 'Thabo Molefe',
    location: 'Durban, KwaZulu-Natal',
    text: 'The premiums are very affordable and the sign-up process was quick online. I have covered my whole family for less than I expected. Highly recommended.',
    rating: 5,
    initials: 'TM',
  },
  {
    name: 'Lerato Sithole',
    location: 'Cape Town, Western Cape',
    text: 'As a single parent, I needed affordable cover for my children and me. Busizwe’s Single Parent plan is perfect. Excellent service and very responsive staff.',
    rating: 5,
    initials: 'LS',
  },
]

const PATTERN =
  `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23C89B3C' fill-rule='evenodd'%3E%3Cpath d='M0 40L40 0H20L0 20M40 40V20L20 40'/%3E%3C/g%3E%3C/svg%3E")`

export default function TestimonialsSection() {
  return (
    <section className="py-24 bg-[#014D4E] relative overflow-hidden">
      <div className="absolute inset-0 opacity-[0.04] pointer-events-none" style={{ backgroundImage: PATTERN }} />
      <div className="absolute -top-24 -right-24 w-[420px] h-[420px] rounded-full bg-[#C89B3C]/10 blur-3xl pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        <SectionHeading
          eyebrow="Testimonials"
          tone="light"
          title="What Our Members Say"
          subtitle="Real stories from South African families who trust Busizwe Burial Society."
          className="mb-16"
        />

        <div className="grid md:grid-cols-3 gap-6">
          {TESTIMONIALS.map((t, i) => (
            <motion.div
              key={t.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.15 }}
              className="flex flex-col bg-white/[0.07] backdrop-blur-sm border border-white/10 rounded-2xl p-7 hover:bg-white/[0.11] hover:border-white/20 transition-all duration-200"
            >
              <Quote className="w-9 h-9 text-[#C89B3C] mb-5 opacity-70" />
              <p className="text-white/85 leading-relaxed mb-7 flex-1">{t.text}</p>
              <div className="flex items-center gap-3 pt-5 border-t border-white/10">
                <div className="w-11 h-11 rounded-full bg-[#C89B3C] text-white font-bold text-sm flex items-center justify-center shrink-0">
                  {t.initials}
                </div>
                <div className="min-w-0">
                  <p className="font-semibold text-white text-sm truncate">{t.name}</p>
                  <p className="text-xs text-white/50 truncate">{t.location}</p>
                </div>
                <div className="ml-auto flex gap-0.5 shrink-0">
                  {Array.from({ length: t.rating }).map((_, j) => (
                    <Star key={j} className="w-3.5 h-3.5 text-[#C89B3C] fill-[#C89B3C]" />
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
