'use client'

import React from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowRight, User, Users, Baby, UserPlus } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
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
              <Card
                className={`h-full flex flex-col transition-all duration-200 hover:-translate-y-1 hover:shadow-[0_8px_32px_rgba(1,77,78,0.14)] ${
                  product.popular ? 'border-[#C89B3C] ring-1 ring-[#C89B3C]' : ''
                }`}
              >
                <CardHeader className="pb-3">
                  <div
                    className="w-12 h-12 rounded-xl flex items-center justify-center mb-4"
                    style={{ background: `${product.color}15` }}
                  >
                    <product.icon className="w-6 h-6" style={{ color: product.color }} />
                  </div>
                  <CardTitle className="text-base leading-snug">{product.title}</CardTitle>
                  <CardDescription className="text-sm leading-relaxed mt-1">{product.description}</CardDescription>
                </CardHeader>
                <CardContent className="flex flex-col flex-1 justify-end gap-5 pt-2">
                  <div>
                    <p className="text-xs text-[#6b6b6b] mb-1.5">From per month</p>
                    <p className="font-serif font-semibold text-3xl text-[#014D4E]">
                      {formatCurrency(product.startFrom)}
                    </p>
                  </div>
                  <div className="text-sm text-[#6b6b6b] leading-relaxed">
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
