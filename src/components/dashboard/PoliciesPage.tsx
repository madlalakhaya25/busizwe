'use client'

import React from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { FileText, ArrowRight, Calendar, Users, CreditCard, Shield, Download } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { formatCurrency, formatDate, getStatusColor } from '@/lib/utils'

interface Policy {
  id: string
  policyNumber: string
  status: string
  monthlyPremium: unknown
  coverAmount: unknown
  startDate: Date | null
  endDate: Date | null
  createdAt: Date
  product: { name: string; category: string }
  pricingTier: { ageGroup: string }
  dependants: { id: string }[]
}

const STATUS_MAP: Record<string, string> = {
  PENDING: 'warning',
  ACTIVE: 'success',
  SUSPENDED: 'warning',
  CANCELLED: 'danger',
  LAPSED: 'muted',
}

export default function PoliciesPage({ policies }: { policies: unknown[] }) {
  const typedPolicies = policies as Policy[]

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-[#6b6b6b] text-sm mt-1">{typedPolicies.length} {typedPolicies.length === 1 ? 'policy' : 'policies'} found</p>
        </div>
        <Button variant="gold" size="sm" asChild>
          <Link href="/products">
            Browse Plans <ArrowRight className="w-4 h-4" />
          </Link>
        </Button>
      </div>

      {typedPolicies.length === 0 ? (
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center py-20 bg-white rounded-2xl border border-[#e0d9cc]"
        >
          <FileText className="w-16 h-16 text-[#e0d9cc] mx-auto mb-4" />
          <h3 className="text-xl font-bold text-[#014D4E] mb-2" style={{ fontFamily: 'Georgia, serif' }}>No Policies Yet</h3>
          <p className="text-[#6b6b6b] mb-6 max-w-sm mx-auto">
            You have not applied for any funeral cover yet. Browse our plans and apply today.
          </p>
          <Button variant="default" asChild>
            <Link href="/products">Browse Cover Plans</Link>
          </Button>
        </motion.div>
      ) : (
        <div className="grid gap-5">
          {typedPolicies.map((policy, i) => (
            <motion.div
              key={policy.id}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: i * 0.08 }}
            >
              <Card className="overflow-hidden">
                <div className={`h-1 ${policy.status === 'ACTIVE' ? 'bg-green-500' : policy.status === 'PENDING' ? 'bg-[#C89B3C]' : 'bg-gray-300'}`} />
                <CardHeader className="pb-0">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-[#014D4E] flex items-center justify-center">
                        <Shield className="w-5 h-5 text-[#C89B3C]" />
                      </div>
                      <div>
                        <CardTitle className="text-base">{policy.product.name}</CardTitle>
                        <p className="text-xs text-[#6b6b6b] font-mono mt-0.5">{policy.policyNumber}</p>
                      </div>
                    </div>
                    <Badge variant={(STATUS_MAP[policy.status] as 'success' | 'warning' | 'danger' | 'muted') ?? 'muted'}>
                      {policy.status}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="pt-4">
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                    <div className="bg-[#F7F3EA] rounded-xl p-3">
                      <div className="flex items-center gap-1.5 mb-1">
                        <CreditCard className="w-3.5 h-3.5 text-[#C89B3C]" />
                        <span className="text-xs text-[#6b6b6b]">Monthly Premium</span>
                      </div>
                      <p className="font-bold text-[#014D4E]">{formatCurrency(Number(policy.monthlyPremium))}</p>
                    </div>
                    <div className="bg-[#F7F3EA] rounded-xl p-3">
                      <div className="flex items-center gap-1.5 mb-1">
                        <Shield className="w-3.5 h-3.5 text-[#C89B3C]" />
                        <span className="text-xs text-[#6b6b6b]">Cover Amount</span>
                      </div>
                      <p className="font-bold text-[#014D4E]">{formatCurrency(Number(policy.coverAmount))}</p>
                    </div>
                    <div className="bg-[#F7F3EA] rounded-xl p-3">
                      <div className="flex items-center gap-1.5 mb-1">
                        <Users className="w-3.5 h-3.5 text-[#C89B3C]" />
                        <span className="text-xs text-[#6b6b6b]">Dependants</span>
                      </div>
                      <p className="font-bold text-[#014D4E]">{policy.dependants.length}</p>
                    </div>
                    <div className="bg-[#F7F3EA] rounded-xl p-3">
                      <div className="flex items-center gap-1.5 mb-1">
                        <Calendar className="w-3.5 h-3.5 text-[#C89B3C]" />
                        <span className="text-xs text-[#6b6b6b]">Start Date</span>
                      </div>
                      <p className="font-bold text-[#014D4E] text-sm">
                        {policy.startDate ? formatDate(policy.startDate) : 'Pending'}
                      </p>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-2 mt-4">
                    <Button variant="outline" size="sm" asChild>
                      <Link href={`/dashboard/dependants?policy=${policy.id}`}>
                        <Users className="w-3.5 h-3.5" /> Manage Dependants
                      </Link>
                    </Button>
                    <Button variant="ghost" size="sm" asChild>
                      <Link href="/dashboard/payments">
                        <CreditCard className="w-3.5 h-3.5" /> Payment History
                      </Link>
                    </Button>
                    {policy.status === 'ACTIVE' && (
                      <Button variant="ghost" size="sm" asChild>
                        <a href={`/api/policies/${policy.id}/certificate`} download>
                          <Download className="w-3.5 h-3.5" /> Certificate
                        </a>
                      </Button>
                    )}
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
