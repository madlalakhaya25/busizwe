'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { UserPlus, FileText, CreditCard, Shield } from 'lucide-react'
import SectionHeading from '@/components/public/SectionHeading'

const STEPS = [
  {
    icon: UserPlus,
    step: '01',
    title: 'Register Online',
    description: 'Create your account in minutes. Fill in your personal details and choose your cover plan.',
  },
  {
    icon: FileText,
    step: '02',
    title: 'Upload Documents',
    description: 'Submit your ID document and proof of residence. Our team reviews within 24 hours.',
  },
  {
    icon: CreditCard,
    step: '03',
    title: 'Make Your Payment',
    description: 'Pay your first monthly premium via EFT, debit order, or cash at selected outlets.',
  },
  {
    icon: Shield,
    step: '04',
    title: 'You Are Covered',
    description: 'Your policy is activated. You and your family are now protected with funeral cover.',
  },
]

export default function HowItWorksSection() {
  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        <SectionHeading
          eyebrow="How It Works"
          title="Getting Covered Is Simple"
          subtitle="Join thousands of South African families who trust Busizwe. Four easy steps to peace of mind."
          className="mb-16"
        />

        <div className="relative">
          {/* Connector line (desktop) */}
          <div className="hidden lg:block absolute top-[52px] left-[12.5%] right-[12.5%] h-0.5 bg-gradient-to-r from-[#014D4E] via-[#C89B3C] to-[#014D4E] opacity-20" />

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-10">
            {STEPS.map((step, i) => (
              <motion.div
                key={step.step}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.15 }}
                className="flex flex-col items-center text-center"
              >
                <div className="relative mb-7">
                  <div className="w-[104px] h-[104px] rounded-full bg-[#F7F3EA] border-2 border-[#e0d9cc] flex items-center justify-center">
                    <div className="w-[80px] h-[80px] rounded-full bg-[#014D4E] flex items-center justify-center">
                      <step.icon className="w-8 h-8 text-[#C89B3C]" />
                    </div>
                  </div>
                  <div className="absolute -top-1 -right-1 w-8 h-8 rounded-full bg-[#C89B3C] text-white text-xs font-bold flex items-center justify-center ring-4 ring-white">
                    {step.step}
                  </div>
                </div>
                <h3 className="font-serif font-semibold text-xl text-[#014D4E] mb-2.5">{step.title}</h3>
                <p className="text-sm text-[#6b6b6b] leading-relaxed max-w-[16rem]">{step.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
