'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { Quote, Star } from 'lucide-react'

const TESTIMONIALS = [
  {
    name: 'Nomsa Dlamini',
    location: 'Soweto, Gauteng',
    text: 'When I lost my mother, Busizwe was there for us. The claim was processed in 2 days and we could give her the dignity she deserved. I am forever grateful.',
    rating: 5,
    initials: 'ND',
  },
  {
    name: 'Thabo Molefe',
    location: 'Durban, KwaZulu-Natal',
    text: 'The premiums are very affordable and the sign-up process was quick online. I\'ve covered my whole family for less than I expected. Highly recommended!',
    rating: 5,
    initials: 'TM',
  },
  {
    name: 'Lerato Sithole',
    location: 'Cape Town, Western Cape',
    text: 'As a single parent, I needed affordable cover for my children and me. Busizwe\'s Single Parent plan is perfect. Excellent service and very responsive staff.',
    rating: 5,
    initials: 'LS',
  },
]

export default function TestimonialsSection() {
  return (
    <section className="py-24 bg-[#014D4E] relative overflow-hidden">
      <div className="absolute inset-0 opacity-5 pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23C89B3C' fill-rule='evenodd'%3E%3Cpath d='M0 40L40 0H20L0 20M40 40V20L20 40'/%3E%3C/g%3E%3C/svg%3E")`,
        }}
      />
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-14"
        >
          <span className="inline-block text-xs font-semibold text-[#C89B3C] uppercase tracking-widest mb-4 border border-[#C89B3C]/30 rounded-full px-4 py-1.5">
            Testimonials
          </span>
          <h2
            className="text-4xl font-bold text-white mb-4"
            style={{ fontFamily: 'Georgia, serif' }}
          >
            What Our Members Say
          </h2>
          <p className="text-white/60 max-w-xl mx-auto">
            Real stories from South African families who trust Busizwe Burial Society.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6">
          {TESTIMONIALS.map((t, i) => (
            <motion.div
              key={t.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.15 }}
              className="bg-white/8 backdrop-blur-sm border border-white/10 rounded-2xl p-6 hover:bg-white/12 transition-all duration-200"
            >
              <Quote className="w-8 h-8 text-[#C89B3C] mb-4 opacity-60" />
              <p className="text-white/80 text-sm leading-relaxed mb-6">{t.text}</p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-[#C89B3C] text-white font-bold text-sm flex items-center justify-center">
                  {t.initials}
                </div>
                <div>
                  <p className="font-semibold text-white text-sm">{t.name}</p>
                  <p className="text-xs text-white/50">{t.location}</p>
                </div>
                <div className="ml-auto flex gap-0.5">
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
