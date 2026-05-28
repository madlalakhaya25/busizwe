'use client'

import React from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowRight, User, Users, Baby, UserPlus } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
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
  },
  {
    icon: Users,
    title: 'Immediate Family',
    description: 'Whole household cover for your entire immediate family.',
    startFrom: 31.60,
    maxCover: 10000,
    popular: true,
    color: '#C89B3C',
  },
  {
    icon: Baby,
    title: 'Single Parent Family',
    description: 'Tailored cover for single parent households.',
    startFrom: 29.04,
    maxCover: 10000,
    popular: false,
    color: '#014D4E',
  },
  {
    icon: UserPlus,
    title: 'Adult Dependant Add-On',
    description: 'Add-on cover for adult dependants outside the main policy.',
    startFrom: 18.80,
    maxCover: 10000,
    popular: false,
    color: '#014D4E',
  },
]

export default function ProductsPreviewSection() {
  return (
    <section className="py-24 bg-[#F7F3EA]" id="products">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <span className="inline-block text-xs font-semibold text-[#C89B3C] uppercase tracking-widest mb-4 border border-[#C89B3C]/30 rounded-full px-4 py-1.5">
            Our Plans
          </span>
          <h2
            className="text-4xl font-bold text-[#014D4E] mb-4"
            style={{ fontFamily: 'Georgia, serif' }}
          >
            Choose Your Cover Plan
          </h2>
          <p className="text-[#6b6b6b] max-w-2xl mx-auto">
            Flexible funeral cover options designed to protect every South African family, at every
            stage of life. All plans include up to R10,000 cover.
          </p>
        </motion.div>

        {/* Cards */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
          {PRODUCTS.map((product, i) => (
            <motion.div
              key={product.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="relative"
            >
              {product.popular && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 z-10 bg-[#C89B3C] text-white text-xs font-bold px-4 py-1 rounded-full shadow-lg">
                  Most Popular
                </div>
              )}
              <Card
                className={`h-full flex flex-col transition-all duration-200 hover:-translate-y-1 hover:shadow-[0_8px_32px_rgba(1,77,78,0.14)] ${
                  product.popular ? 'border-[#C89B3C] ring-1 ring-[#C89B3C]' : ''
                }`}
              >
                <CardHeader>
                  <div
                    className="w-12 h-12 rounded-xl flex items-center justify-center mb-4"
                    style={{ background: `${product.color}15` }}
                  >
                    <product.icon className="w-6 h-6" style={{ color: product.color }} />
                  </div>
                  <CardTitle className="text-lg">{product.title}</CardTitle>
                  <CardDescription>{product.description}</CardDescription>
                </CardHeader>
                <CardContent className="flex flex-col flex-1 justify-end gap-4">
                  <div>
                    <p className="text-xs text-[#6b6b6b] mb-1">From per month</p>
                    <p className="text-3xl font-bold text-[#014D4E]" style={{ fontFamily: 'Georgia, serif' }}>
                      {formatCurrency(product.startFrom)}
                    </p>
                  </div>
                  <div className="text-sm text-[#6b6b6b]">
                    Up to <strong className="text-[#1C1C1C]">{formatCurrency(product.maxCover)}</strong> cover
                  </div>
                  <Button
                    variant={product.popular ? 'gold' : 'outline'}
                    className="w-full"
                    asChild
                  >
                    <Link href="/products">View Details</Link>
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        <div className="text-center">
          <Button variant="default" size="lg" asChild>
            <Link href="/products">
              View Full Pricing Tables
              <ArrowRight className="w-4 h-4" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  )
}
