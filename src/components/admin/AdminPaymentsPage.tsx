'use client'

import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { CreditCard, CheckCircle2, Search, TrendingUp, AlertCircle, Clock } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { formatCurrency, formatDate, getStatusColor } from '@/lib/utils'

interface Payment {
  id: string
  amount: unknown
  status: string
  dueDate: Date
  paidAt: Date | null
  reference: string | null
  user: {
    email: string
    profile: { firstName: string; lastName: string } | null
  }
  policy: { policyNumber: string; product: { name: string } }
}

export default function AdminPaymentsPage({ payments }: { payments: unknown[] }) {
  const typedPayments = payments as Payment[]
  const [search, setSearch] = useState('')
  const [markingId, setMarkingId] = useState<string | null>(null)

  const filtered = typedPayments.filter((p) => {
    const q = search.toLowerCase()
    const name = p.user.profile
      ? `${p.user.profile.firstName} ${p.user.profile.lastName}`.toLowerCase()
      : ''
    return (
      name.includes(q) ||
      p.user.email.toLowerCase().includes(q) ||
      p.policy.policyNumber.toLowerCase().includes(q)
    )
  })

  const markAsPaid = async (paymentId: string) => {
    setMarkingId(paymentId)
    try {
      await fetch(`/api/payments/${paymentId}/mark-paid`, { method: 'POST' })
      window.location.reload()
    } catch {
      //
    } finally {
      setMarkingId(null)
    }
  }

  const totalCollected = typedPayments
    .filter((p) => p.status === 'PAID')
    .reduce((sum, p) => sum + Number(p.amount), 0)

  const STAT_CARDS = [
    { icon: TrendingUp,   label: 'Total Collected', value: formatCurrency(totalCollected),                              color: '#16a34a', bg: '#16a34a12' },
    { icon: CheckCircle2, label: 'Paid',             value: typedPayments.filter((p) => p.status === 'PAID').length,    color: '#16a34a', bg: '#16a34a12' },
    { icon: AlertCircle,  label: 'Overdue',          value: typedPayments.filter((p) => p.status === 'OVERDUE').length, color: '#dc2626', bg: '#dc262610' },
    { icon: Clock,        label: 'Pending',          value: typedPayments.filter((p) => p.status === 'PENDING').length, color: '#C89B3C', bg: '#C89B3C12' },
  ]

  return (
    <div className="space-y-6 max-w-6xl">
      {/* Summary */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
        {STAT_CARDS.map((stat, i) => (
          <motion.div key={stat.label} initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: 0.06 + i * 0.07 }}>
            <Card className="h-full">
              <CardContent className="p-4 sm:p-5">
                <div className="w-9 h-9 rounded-xl flex items-center justify-center mb-4" style={{ background: stat.bg }}>
                  <stat.icon className="w-4 h-4 sm:w-5 sm:h-5" style={{ color: stat.color }} />
                </div>
                <p className="text-2xl sm:text-3xl font-bold text-[#1C1C1C] leading-none tabular-nums">{stat.value}</p>
                <p className="text-xs sm:text-sm font-medium text-[#6b6b6b] mt-2 truncate">{stat.label}</p>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Filter */}
      <div className="flex gap-3">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#6b6b6b]" />
          <Input
            placeholder="Search payments..."
            className="pl-10"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <div className="text-sm text-[#6b6b6b] flex items-center">{filtered.length} results</div>
      </div>

      {/* Table */}
      <Card>
        <CardContent className="p-0">
          {filtered.length === 0 ? (
            <div className="text-center py-16">
              <div className="w-16 h-16 rounded-2xl bg-[#F7F3EA] flex items-center justify-center mx-auto mb-4">
                <CreditCard className="w-8 h-8 text-[#d0c9bc]" />
              </div>
              <p className="text-[#6b6b6b]">No payments found.</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm min-w-[650px]">
                <thead>
                  <tr className="border-b border-[#e0d9cc] bg-[#F7F3EA]">
                    <th className="py-3 px-6 text-left text-[#9a9a9a] text-xs font-semibold uppercase tracking-wide">Member</th>
                    <th className="py-3 px-4 text-left text-[#9a9a9a] text-xs font-semibold uppercase tracking-wide">Policy</th>
                    <th className="py-3 px-4 text-left text-[#9a9a9a] text-xs font-semibold uppercase tracking-wide">Amount</th>
                    <th className="py-3 px-4 text-left text-[#9a9a9a] text-xs font-semibold uppercase tracking-wide">Due Date</th>
                    <th className="py-3 px-4 text-left text-[#9a9a9a] text-xs font-semibold uppercase tracking-wide">Status</th>
                    <th className="py-3 px-4 text-left text-[#9a9a9a] text-xs font-semibold uppercase tracking-wide">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filtered.map((payment) => (
                    <tr key={payment.id} className="border-b border-[#e0d9cc] last:border-0 hover:bg-[#F7F3EA]/50 transition-colors">
                      <td className="py-3 px-6">
                        <p className="font-medium text-[#1C1C1C]">
                          {payment.user.profile
                            ? `${payment.user.profile.firstName} ${payment.user.profile.lastName}`
                            : payment.user.email}
                        </p>
                        <p className="text-xs text-[#6b6b6b]">{payment.user.email}</p>
                      </td>
                      <td className="py-3 px-4">
                        <p className="text-[#1C1C1C]">{payment.policy.product.name}</p>
                        <p className="text-xs font-mono text-[#6b6b6b]">{payment.policy.policyNumber}</p>
                      </td>
                      <td className="py-3 px-4 font-bold text-[#014D4E]">{formatCurrency(Number(payment.amount))}</td>
                      <td className="py-3 px-4 text-[#6b6b6b]">{formatDate(payment.dueDate)}</td>
                      <td className="py-3 px-4">
                        <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium border ${getStatusColor(payment.status)}`}>
                          {payment.status}
                        </span>
                      </td>
                      <td className="py-3 px-4">
                        {(payment.status === 'PENDING' || payment.status === 'OVERDUE') && (
                          <Button
                            variant="default"
                            size="sm"
                            onClick={() => markAsPaid(payment.id)}
                            disabled={markingId === payment.id}
                          >
                            <CheckCircle2 className="w-3.5 h-3.5" />
                            {markingId === payment.id ? 'Marking...' : 'Mark Paid'}
                          </Button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
