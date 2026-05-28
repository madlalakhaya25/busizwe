import React from 'react'
import { Metadata } from 'next'
import Link from 'next/link'
import { CheckCircle2, ArrowRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import CTASection from '@/components/public/CTASection'
import PageHero from '@/components/public/PageHero'
import { formatCurrency } from '@/lib/utils'

export const metadata: Metadata = {
  title: 'Products & Pricing',
  description: 'Browse all Busizwe Burial Society funeral cover plans and pricing. Affordable funeral insurance for South African families.',
}

const AGE_GROUPS = ['16 – 64 years', '65 – 75 years', '75 – 84 years']

const PRODUCTS = [
  {
    name: 'Principal Member (Single)',
    description: 'Individual cover for a single principal member aged 16–84.',
    tiers: [
      { ages: '16 – 64', r5000: 19.60, r10000: 36.75 },
      { ages: '65 – 75', r5000: 43.84, r10000: 82.20 },
      { ages: '75 – 84', r5000: 79.06, r10000: 148.20 },
    ],
    features: ['Single member cover', 'Monthly premiums', 'No medical exam', 'R5k or R10k cover'],
    popular: false,
  },
  {
    name: 'Immediate Family (Whole Household)',
    description: 'Comprehensive funeral cover for the entire immediate family household.',
    tiers: [
      { ages: '16 – 64', r5000: 31.60, r10000: 59.25 },
      { ages: '65 – 75', r5000: 79.04, r10000: 148.20 },
      { ages: '75 – 84', r5000: 125.12, r10000: 234.60 },
    ],
    features: ['Whole household covered', 'Spouse included', 'Children included', 'Best value plan'],
    popular: true,
  },
  {
    name: 'Single Parent Family',
    description: 'Tailored funeral cover for single parent households with dependent children.',
    tiers: [
      { ages: '16 – 64', r5000: 29.04, r10000: 54.45 },
      { ages: '65 – 75', r5000: 60.32, r10000: 113.10 },
      { ages: '75 – 84', r5000: 100.96, r10000: 189.30 },
    ],
    features: ['Single parent + children', 'Affordable rates', 'Monthly premiums', 'Quick application'],
    popular: false,
  },
  {
    name: 'Adult Dependant (Add-On)',
    description: 'Add-on cover for adult dependants not included in the main household policy.',
    tiers: [
      { ages: '16 – 64', r5000: 18.80, r10000: 38.25 },
      { ages: '65 – 75', r5000: 43.12, r10000: 80.85 },
      { ages: '75 – 84', r5000: 64.16, r10000: 120.30 },
    ],
    features: ['Extends existing policy', 'Per person add-on', 'Flexible coverage', 'Easy activation'],
    popular: false,
  },
]

export default function ProductsPage() {
  return (
    <>
      <PageHero
        eyebrow="Products & Pricing"
        title="Choose Your Cover Plan"
        subtitle="Affordable funeral cover designed for every South African family. No medical examination required."
      />

      {/* Pricing */}
      <section className="py-24 bg-[#F7F3EA]">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 space-y-12">
          {PRODUCTS.map((product) => (
            <div
              key={product.name}
              className={`bg-white rounded-3xl border overflow-hidden shadow-[0_4px_24px_rgba(1,77,78,0.08)] ${
                product.popular ? 'border-[#C89B3C] ring-1 ring-[#C89B3C]' : 'border-[#e0d9cc]'
              }`}
            >
              {product.popular && (
                <div className="bg-[#C89B3C] text-white text-center text-sm font-bold py-2 tracking-wide">
                  ★ Most Popular Plan
                </div>
              )}
              <div className="p-6 lg:p-8">
                <div className="grid lg:grid-cols-3 gap-8 items-start">
                  {/* Product info */}
                  <div>
                    <h2 className="font-serif font-semibold text-2xl text-[#014D4E] mb-3">
                      {product.name}
                    </h2>
                    <p className="text-[#6b6b6b] mb-6 leading-relaxed">{product.description}</p>
                    <ul className="space-y-2">
                      {product.features.map((f) => (
                        <li key={f} className="flex items-center gap-2 text-sm text-[#1C1C1C]">
                          <CheckCircle2 className="w-4 h-4 text-[#C89B3C] shrink-0" />
                          {f}
                        </li>
                      ))}
                    </ul>
                    <div className="mt-6">
                      <Button variant={product.popular ? 'gold' : 'default'} asChild>
                        <Link href="/sign-up">
                          Apply Now <ArrowRight className="w-4 h-4" />
                        </Link>
                      </Button>
                    </div>
                  </div>

                  {/* Pricing table */}
                  <div className="lg:col-span-2">
                    <div className="overflow-x-auto">
                      <table className="w-full text-sm">
                        <thead>
                          <tr className="border-b border-[#e0d9cc]">
                            <th className="py-3 text-left text-[#6b6b6b] font-medium">Age Group</th>
                            <th className="py-3 text-center">
                              <div className="font-bold text-[#014D4E]">R5,000 Cover</div>
                              <div className="text-xs text-[#6b6b6b] font-normal">Monthly Premium</div>
                            </th>
                            <th className="py-3 text-center">
                              <div className="font-bold text-[#014D4E]">R10,000 Cover</div>
                              <div className="text-xs text-[#6b6b6b] font-normal">Monthly Premium</div>
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          {product.tiers.map((tier) => (
                            <tr key={tier.ages} className="border-b border-[#e0d9cc] last:border-0 hover:bg-[#F7F3EA] transition-colors">
                              <td className="py-4 font-medium text-[#1C1C1C]">{tier.ages}</td>
                              <td className="py-4 text-center">
                                <span className="font-bold text-xl text-[#014D4E]">
                                  {formatCurrency(tier.r5000)}
                                </span>
                                <span className="text-xs text-[#6b6b6b] block">per month</span>
                              </td>
                              <td className="py-4 text-center">
                                <span className="font-bold text-xl text-[#C89B3C]">
                                  {formatCurrency(tier.r10000)}
                                </span>
                                <span className="text-xs text-[#6b6b6b] block">per month</span>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Joining ages note */}
      <section className="py-10 bg-white border-t border-[#e0d9cc]">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <p className="text-sm text-[#6b6b6b]">
            <strong className="text-[#014D4E]">Joining ages:</strong> 16 to 84 years. All premiums are monthly.
            Policies are subject to Busizwe Burial Society terms and conditions.
            Regulated by FSCA. Membership subject to approval.
          </p>
        </div>
      </section>

      <CTASection />
    </>
  )
}
