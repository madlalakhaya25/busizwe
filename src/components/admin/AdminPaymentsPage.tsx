'use client'

import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { CreditCard, CheckCircle2, Search } from 'lucide-react'
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

  return (
    <div className="space-y-6">
      {/* Summary */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {[
          { label: 'Total Collected', value: formatCurrency(totalCollected), color: '#16a34a' },
          { label: 'Paid', value: typedPayments.filter((p) => p.status === 'PAID').length, color: '#16a34a' },
          { label: 'Overdue', value: typedPayments.filter((p) => p.status === 'OVERDUE').length, color: '#dc2626' },
          { label: 'Pending', value: typedPayments.filter((p) => p.status === 'PENDING').length, color: '#C89B3C' },
        ].map((stat) => (
          <Card key={stat.label}>
            <CardContent className="p-4">
              <p className="text-2xl font-bold text-[#1C1C1C]">{stat.value}</p>
              <p className="text-xs text-[#6b6b6b]">{stat.label}</p>
            </CardContent>
          </Card>
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
              <CreditCard className="w-16 h-16 text-[#e0d9cc] mx-auto mb-4" />
              <p className="text-[#6b6b6b]">No payments found.</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-[#e0d9cc] bg-[#F7F3EA]">
                    <th className="py-3 px-6 text-left text-[#6b6b6b] font-medium">Member</th>
                    <th className="py-3 px-4 text-left text-[#6b6b6b] font-medium">Policy</th>
                    <th className="py-3 px-4 text-left text-[#6b6b6b] font-medium">Amount</th>
                    <th className="py-3 px-4 text-left text-[#6b6b6b] font-medium">Due Date</th>
                    <th className="py-3 px-4 text-left text-[#6b6b6b] font-medium">Status</th>
                    <th className="py-3 px-4 text-left text-[#6b6b6b] font-medium">Actions</th>
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
