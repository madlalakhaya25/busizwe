'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { Users, Shield, Clock, Star } from 'lucide-react'

const STATS = [
  { icon: Users, value: '5,000+', label: 'Members Covered', color: '#014D4E' },
  { icon: Shield, value: 'R10,000', label: 'Max Cover Amount', color: '#C89B3C' },
  { icon: Clock, value: '48hrs', label: 'Claims Processing', color: '#014D4E' },
  { icon: Star, value: '4.9/5', label: 'Member Rating', color: '#C89B3C' },
]

export default function StatsSection() {
  return (
    <section className="py-16 bg-[#F7F3EA]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          {STATS.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="bg-white rounded-2xl p-6 border border-[#e0d9cc] shadow-[0_4px_16px_rgba(1,77,78,0.06)] text-center"
            >
              <div
                className="w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4"
                style={{ background: `${stat.color}15` }}
              >
                <stat.icon className="w-6 h-6" style={{ color: stat.color }} />
              </div>
              <p className="text-3xl font-bold text-[#1C1C1C] mb-1" style={{ fontFamily: 'Georgia, serif' }}>
                {stat.value}
              </p>
              <p className="text-sm text-[#6b6b6b]">{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
