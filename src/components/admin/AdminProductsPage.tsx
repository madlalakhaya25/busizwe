'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { Package, CheckCircle2, XCircle } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { formatCurrency, getAgeGroupLabel } from '@/lib/utils'

interface PricingTier {
  id: string
  ageGroup: string
  coverAmount: unknown
  premium: unknown
}

interface Product {
  id: string
  name: string
  description: string | null
  category: string
  isActive: boolean
  pricingTiers: PricingTier[]
}

const CATEGORY_LABELS: Record<string, string> = {
  PRINCIPAL_MEMBER_SINGLE: 'Principal Member (Single)',
  IMMEDIATE_FAMILY: 'Immediate Family',
  SINGLE_PARENT_FAMILY: 'Single Parent Family',
  ADULT_DEPENDANT_ADDON: 'Adult Dependant Add-On',
}

export default function AdminProductsPage({ products }: { products: unknown[] }) {
  const typedProducts = products as Product[]

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <p className="text-[#6b6b6b] text-sm">{typedProducts.length} products</p>
      </div>

      {typedProducts.length === 0 ? (
        <div className="text-center py-20 bg-white rounded-2xl border border-[#e0d9cc]">
          <Package className="w-16 h-16 text-[#e0d9cc] mx-auto mb-4" />
          <h3 className="text-xl font-bold text-[#014D4E] mb-2 font-serif">No Products</h3>
          <p className="text-[#6b6b6b] text-sm mb-4">Run the database seed to populate products.</p>
          <code className="text-xs bg-[#F7F3EA] px-3 py-1.5 rounded-lg border border-[#e0d9cc]">
            npx prisma db seed
          </code>
        </div>
      ) : (
        <div className="grid gap-6">
          {typedProducts.map((product, i) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: i * 0.08 }}
            >
              <Card>
                <CardHeader className="pb-0">
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle className="text-lg">{product.name}</CardTitle>
                      <p className="text-sm text-[#6b6b6b] mt-1">{product.description}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge variant={product.isActive ? 'success' : 'muted'}>
                        {product.isActive ? (
                          <><CheckCircle2 className="w-3 h-3" /> Active</>
                        ) : (
                          <><XCircle className="w-3 h-3" /> Inactive</>
                        )}
                      </Badge>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="pt-4">
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="border-b border-[#e0d9cc]">
                          <th className="py-2 text-left text-[#6b6b6b] font-medium">Age Group</th>
                          <th className="py-2 text-center text-[#6b6b6b] font-medium">Cover Amount</th>
                          <th className="py-2 text-center text-[#6b6b6b] font-medium">Monthly Premium</th>
                        </tr>
                      </thead>
                      <tbody>
                        {product.pricingTiers.map((tier) => (
                          <tr key={tier.id} className="border-b border-[#e0d9cc] last:border-0">
                            <td className="py-2.5 text-[#1C1C1C]">{getAgeGroupLabel(tier.ageGroup)}</td>
                            <td className="py-2.5 text-center font-medium text-[#014D4E]">{formatCurrency(Number(tier.coverAmount))}</td>
                            <td className="py-2.5 text-center font-bold text-[#C89B3C]">{formatCurrency(Number(tier.premium))}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  )
}
