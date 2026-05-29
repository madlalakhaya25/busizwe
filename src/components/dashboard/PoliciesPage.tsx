'use client'

import React from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { FileText, ArrowRight, Calendar, Users, CreditCard, Shield, Download, Plus } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
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

const STATUS_MAP: Record<string, 'success' | 'warning' | 'danger' | 'muted'> = {
  PENDING:   'warning',
  ACTIVE:    'success',
  SUSPENDED: 'warning',
  CANCELLED: 'danger',
  LAPSED:    'muted',
}

const STATUS_STRIPE: Record<string, string> = {
  ACTIVE:    'bg-green-500',
  PENDING:   'bg-[#C89B3C]',
  SUSPENDED: 'bg-amber-400',
  CANCELLED: 'bg-red-400',
  LAPSED:    'bg-gray-300',
}

export default function PoliciesPage({ policies }: { policies: unknown[] }) {
  const typedPolicies = policies as Policy[]

  return (
    <div className="space-y-6 max-w-5xl">

      {/* Header row */}
      <div className="flex items-center justify-between gap-4">
        <p className="text-sm text-[#9a9a9a]">
          <span className="font-bold text-[#1C1C1C]">{typedPolicies.length}</span>{' '}
          {typedPolicies.length === 1 ? 'policy' : 'policies'} found
        </p>
        <Link href="/products" className="flex items-center justify-center h-9 px-4 rounded-lg text-sm font-semibold bg-[#C89B3C] text-white hover:bg-[#A8832A] shadow-sm hover:shadow-md transition-all duration-200">
          <Plus className="w-4 h-4" /> Browse Plans
        </Link>
      </div>

      {/* Empty state */}
      {typedPolicies.length === 0 && (
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center py-20 bg-white rounded-2xl border border-[#e0d9cc]"
        >
          <div className="w-16 h-16 rounded-2xl bg-[#F7F3EA] flex items-center justify-center mx-auto mb-4">
            <FileText className="w-8 h-8 text-[#d0c9bc]" />
          </div>
          <h3 className="text-xl font-bold text-[#014D4E] mb-2 font-serif">No Policies Yet</h3>
          <p className="text-[#9a9a9a] text-sm mb-6 max-w-sm mx-auto">
            You have not applied for any funeral cover yet. Browse our plans and apply today.
          </p>
          <Link href="/products" className="flex items-center justify-center h-11 px-6 rounded-lg text-sm font-semibold bg-[#014D4E] text-white hover:bg-[#013638] shadow-sm transition-all duration-200">Browse Cover Plans</Link>
        </motion.div>
      )}

      {/* Policy cards */}
      <div className="grid gap-4">
        {typedPolicies.map((policy, i) => (
          <motion.div
            key={policy.id}
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: i * 0.08 }}
          >
            <Card className="overflow-hidden">
              {/* Status stripe */}
              <div className={`h-1 ${STATUS_STRIPE[policy.status] ?? 'bg-gray-300'}`} />

              <CardHeader className="pb-0 pt-5 px-5">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="w-10 h-10 rounded-xl bg-[#014D4E] flex items-center justify-center shrink-0">
                      <Shield className="w-5 h-5 text-[#C89B3C]" />
                    </div>
                    <div className="min-w-0">
                      <CardTitle className="text-base truncate">{policy.product.name}</CardTitle>
                      <p className="text-[11px] text-[#9a9a9a] font-mono mt-0.5 truncate">{policy.policyNumber}</p>
                    </div>
                  </div>
                  <Badge variant={STATUS_MAP[policy.status] ?? 'muted'} className="shrink-0">
                    {policy.status}
                  </Badge>
                </div>
              </CardHeader>

              <CardContent className="pt-5 px-5 pb-5">
                {/* Stat cells */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  {[
                    { icon: CreditCard, label: 'Premium/month', value: formatCurrency(Number(policy.monthlyPremium)) },
                    { icon: Shield,     label: 'Cover Amount',  value: formatCurrency(Number(policy.coverAmount)) },
                    { icon: Users,      label: 'Dependants',    value: `${policy.dependants.length}` },
                    { icon: Calendar,   label: 'Start Date',    value: policy.startDate ? formatDate(policy.startDate) : 'Pending' },
                  ].map(({ icon: Icon, label, value }) => (
                    <div key={label} className="bg-[#F7F3EA] rounded-xl p-3.5 min-w-0">
                      <div className="flex items-center gap-1.5 mb-2">
                        <Icon className="w-3.5 h-3.5 text-[#C89B3C] shrink-0" />
                        <span className="text-[10px] text-[#9a9a9a] font-medium truncate uppercase tracking-wide">{label}</span>
                      </div>
                      <p className="font-bold text-[#014D4E] text-sm truncate">{value}</p>
                    </div>
                  ))}
                </div>

                {/* Action buttons */}
                <div className="flex flex-wrap gap-2 mt-4">
                  <Link href={`/dashboard/dependants?policy=${policy.id}`} className="flex items-center justify-center h-9 px-4 rounded-lg text-sm font-semibold border-2 border-[#014D4E] text-[#014D4E] hover:bg-[#014D4E] hover:text-white transition-all duration-200">
                    <Users className="w-3.5 h-3.5" /> Dependants
                  </Link>
                  <Link href="/dashboard/payments" className="flex items-center justify-center px-4 py-2 rounded-lg text-sm font-medium text-[#014D4E] hover:bg-[#014D4E]/10 transition-colors">
                    <CreditCard className="w-3.5 h-3.5" /> Payments
                  </Link>
                  {policy.status === 'ACTIVE' && (
                    <a href={`/api/policies/${policy.id}/certificate`} download className="flex items-center justify-center px-4 py-2 rounded-lg text-sm font-medium text-[#014D4E] hover:bg-[#014D4E]/10 transition-colors">
                      <Download className="w-3.5 h-3.5" /> Certificate
                    </a>
                  )}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  )
}
