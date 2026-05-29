'use client'

import React from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowRight, User, Users, Baby, UserPlus } from 'lucide-react'
import SectionHeading from '@/components/public/SectionHeading'
import { formatCurrency } from '@/lib/utils'

const PRODUCTS = [
  {
    icon: User,
    title: 'Principal Member (Single)',
    description: 'Individual cover for a single principal member.',
    startFrom: 19.60,
    maxCover: 10000,
    popular: false,
    color: '#014D4E',
    colorBg: '#014D4E15',
  },
  {
    icon: Users,
    title: 'Immediate Family',
    description: 'Whole household cover for your entire immediate family.',
    startFrom: 31.60,
    maxCover: 10000,
    popular: true,
    color: '#C89B3C',
    colorBg: '#C89B3C15',
  },
  {
    icon: Baby,
    title: 'Single Parent Family',
    description: 'Tailored cover for single parent households.',
    startFrom: 29.04,
    maxCover: 10000,
    popular: false,
    color: '#014D4E',
    colorBg: '#014D4E15',
  },
  {
    icon: UserPlus,
    title: 'Adult Dependant Add-On',
    description: 'Add-on cover for adult dependants outside the main policy.',
    startFrom: 18.80,
    maxCover: 10000,
    popular: false,
    color: '#014D4E',
    colorBg: '#014D4E15',
  },
]

export default function ProductsPreviewSection() {
  return (
    <section className="bg-[#F9FAFB] py-24 lg:py-32" id="products">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        <SectionHeading
          eyebrow="Our Plans"
          title="Choose Your Cover Plan"
          subtitle="Flexible funeral cover designed to protect every South African family, at every stage of life. All plans include up to R10,000 cover."
          className="mb-14"
        />

        {/* Cards */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {PRODUCTS.map((product, i) => (
            <motion.div
              key={product.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="relative pt-3"
            >
              {product.popular && (
                <div className="absolute top-0 left-1/2 -translate-x-1/2 z-10 bg-[#C89B3C] text-white text-xs font-bold px-4 py-1 rounded-full shadow-lg whitespace-nowrap">
                  Most Popular
                </div>
              )}
              <div
                className={`h-full flex flex-col bg-white rounded-2xl border shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 overflow-hidden ${
                  product.popular
                    ? 'border-[#C89B3C] ring-1 ring-[#C89B3C]'
                    : 'border-[#E5E7EB]'
                }`}
              >
                <div className="p-6 pb-3">
                  <div
                    className="w-12 h-12 rounded-xl flex items-center justify-center mb-4"
                    style={{ background: product.colorBg }}
                  >
                    <product.icon className="w-6 h-6" style={{ color: product.color }} />
                  </div>
                  <h3 className="text-base font-semibold text-[#111827] leading-snug mb-1">
                    {product.title}
                  </h3>
                  <p className="text-sm text-[#6B7280] leading-relaxed">{product.description}</p>
                </div>

                <div className="flex flex-col flex-1 justify-end gap-5 p-6 pt-2">
                  <div>
                    <p className="text-xs text-[#6B7280] mb-1.5">From per month</p>
                    <p className="font-serif font-semibold text-3xl text-[#014D4E]">
                      {formatCurrency(product.startFrom)}
                    </p>
                  </div>
                  <div className="text-sm text-[#6B7280] leading-relaxed">
                    Up to{' '}
                    <strong className="text-[#111827]">{formatCurrency(product.maxCover)}</strong>{' '}
                    cover
                  </div>
                  <Link
                    href="/products"
                    className={`flex items-center justify-center h-10 px-4 rounded-lg text-sm font-semibold transition-all duration-200 w-full ${
                      product.popular
                        ? 'bg-[#C89B3C] text-white hover:bg-[#A8832A] shadow-sm hover:shadow-md'
                        : 'border-2 border-[#014D4E] text-[#014D4E] hover:bg-[#014D4E] hover:text-white'
                    }`}
                  >
                    View Details
                  </Link>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="text-center">
          <Link
            href="/products"
            className="inline-flex items-center justify-center gap-2 h-12 px-8 rounded-lg text-sm font-semibold bg-[#014D4E] text-white hover:bg-[#013638] transition-all duration-200"
          >
            View Full Pricing Tables
            <ArrowRight className="w-4 h-4 shrink-0" />
          </Link>
        </div>
      </div>
    </section>
  )
}
