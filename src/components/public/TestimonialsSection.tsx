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
    text: "As a single parent, I needed affordable cover for my children and me. Busizwe's Single Parent plan is perfect. Excellent service and very responsive staff.",
    rating: 5,
    initials: 'LS',
  },
]

export default function TestimonialsSection() {
  return (
    <section className="bg-[#014D4E] py-24 lg:py-32 relative overflow-hidden">
      {/* Decorative blobs — subtle, no SVG pattern */}
      <div className="absolute -top-24 -right-24 w-[420px] h-[420px] rounded-full bg-[#C89B3C]/10 blur-3xl pointer-events-none" />
      <div className="absolute -bottom-32 -left-24 w-[380px] h-[380px] rounded-full bg-white/[0.03] blur-3xl pointer-events-none" />

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
              className="flex flex-col bg-white/[0.07] border border-white/10 rounded-2xl p-8 hover:bg-white/[0.11] hover:border-white/20 transition-all duration-200"
            >
              <Quote className="w-9 h-9 text-[#C89B3C] mb-5 opacity-70" />
              <p className="text-white/85 leading-relaxed mb-8 flex-1">{t.text}</p>
              <div className="flex items-center gap-3 pt-5 border-t border-white/10">
                {/* Gold avatar with white initials */}
                <div className="w-11 h-11 rounded-full bg-[#C89B3C] text-white font-bold text-sm flex items-center justify-center shrink-0">
                  {t.initials}
                </div>
                <div className="min-w-0 flex-1">
                  <p className="font-semibold text-white text-sm truncate">{t.name}</p>
                  <p className="text-xs text-white/50 truncate">{t.location}</p>
                </div>
                {/* Gold star icons */}
                <div className="flex gap-0.5 shrink-0">
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
