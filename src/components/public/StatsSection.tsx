'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { Users, Shield, Clock, Star } from 'lucide-react'

const STATS = [
  { icon: Users, value: '5,000+', label: 'Members Covered', color: '#014D4E', bg: '#014D4E15' },
  { icon: Shield, value: 'R10,000', label: 'Maximum Cover', color: '#C89B3C', bg: '#C89B3C15' },
  { icon: Clock, value: '48hrs', label: 'Claims Processing', color: '#014D4E', bg: '#014D4E15' },
  { icon: Star, value: '4.9/5', label: 'Member Rating', color: '#C89B3C', bg: '#C89B3C15' },
]

export default function StatsSection() {
  return (
    <section className="py-20 bg-[#F9FAFB]">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6">
          {STATS.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="bg-white rounded-2xl border border-[#E5E7EB] p-8 text-center shadow-sm hover:shadow-md transition-all"
            >
              <div
                className="w-14 h-14 rounded-2xl flex items-center justify-center mx-auto mb-5"
                style={{ background: stat.bg }}
              >
                <stat.icon className="w-6 h-6" style={{ color: stat.color }} />
              </div>
              <p className="font-serif font-semibold text-4xl sm:text-5xl text-[#111827] mb-1">
                {stat.value}
              </p>
              <p className="text-sm text-[#6B7280]">{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
