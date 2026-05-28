'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { CreditCard, CheckCircle2, AlertCircle, Clock, TrendingUp } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { formatCurrency, formatDate, getStatusColor } from '@/lib/utils'

interface Payment {
  id: string
  amount: unknown
  status: string
  dueDate: Date
  paidAt: Date | null
  reference: string | null
  paymentMethod: string | null
  policy: { policyNumber: string; product: { name: string } }
}

const STATUS_ICONS = {
  PAID: CheckCircle2,
  OVERDUE: AlertCircle,
  FAILED: AlertCircle,
  PENDING: Clock,
}

export default function PaymentsPage({ payments }: { payments: unknown[] }) {
  const typedPayments = payments as Payment[]

  const totalPaid = typedPayments
    .filter((p) => p.status === 'PAID')
    .reduce((sum, p) => sum + Number(p.amount), 0)

  const overdue = typedPayments.filter((p) => p.status === 'OVERDUE').length
  const pending = typedPayments.filter((p) => p.status === 'PENDING').length

  return (
    <div className="space-y-6">
      {/* Summary cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: 'Total Paid', value: formatCurrency(totalPaid), icon: TrendingUp, color: '#16a34a' },
          { label: 'Total Payments', value: typedPayments.length, icon: CreditCard, color: '#014D4E' },
          { label: 'Overdue', value: overdue, icon: AlertCircle, color: '#dc2626' },
          { label: 'Pending', value: pending, icon: Clock, color: '#C89B3C' },
        ].map((stat, i) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: i * 0.08 }}
          >
            <Card>
              <CardContent className="p-5">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-9 h-9 rounded-lg flex items-center justify-center shrink-0" style={{ background: `${stat.color}15` }}>
                    <stat.icon className="w-4 h-4" style={{ color: stat.color }} />
                  </div>
                </div>
                <p className="text-2xl font-bold text-[#1C1C1C] truncate">{stat.value}</p>
                <p className="text-sm text-[#6b6b6b] mt-1 truncate">{stat.label}</p>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Payment history */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Payment History</CardTitle>
        </CardHeader>
        <CardContent>
          {typedPayments.length === 0 ? (
            <div className="text-center py-12">
              <CreditCard className="w-16 h-16 text-[#e0d9cc] mx-auto mb-4" />
              <h3 className="text-lg font-bold text-[#014D4E] mb-2 font-serif">No Payments Yet</h3>
              <p className="text-[#6b6b6b] text-sm">Your payment history will appear here once your policy is activated.</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-[#e0d9cc]">
                    <th className="py-3 text-left text-[#6b6b6b] font-medium">Policy</th>
                    <th className="py-3 text-left text-[#6b6b6b] font-medium">Amount</th>
                    <th className="py-3 text-left text-[#6b6b6b] font-medium">Due Date</th>
                    <th className="py-3 text-left text-[#6b6b6b] font-medium">Paid On</th>
                    <th className="py-3 text-left text-[#6b6b6b] font-medium">Status</th>
                    <th className="py-3 text-left text-[#6b6b6b] font-medium">Reference</th>
                  </tr>
                </thead>
                <tbody>
                  {typedPayments.map((payment, i) => {
                    const StatusIcon = STATUS_ICONS[payment.status as keyof typeof STATUS_ICONS] ?? Clock
                    return (
                      <motion.tr
                        key={payment.id}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: i * 0.05 }}
                        className="border-b border-[#e0d9cc] last:border-0 hover:bg-[#F7F3EA] transition-colors"
                      >
                        <td className="py-3">
                          <p className="font-medium text-[#1C1C1C]">{payment.policy.product.name}</p>
                          <p className="text-xs text-[#6b6b6b] font-mono">{payment.policy.policyNumber}</p>
                        </td>
                        <td className="py-3 font-bold text-[#014D4E]">{formatCurrency(Number(payment.amount))}</td>
                        <td className="py-3 text-[#6b6b6b]">{formatDate(payment.dueDate)}</td>
                        <td className="py-3 text-[#6b6b6b]">{payment.paidAt ? formatDate(payment.paidAt) : '–'}</td>
                        <td className="py-3">
                          <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium border ${getStatusColor(payment.status)}`}>
                            <StatusIcon className="w-3 h-3" />
                            {payment.status}
                          </span>
                        </td>
                        <td className="py-3 text-[#6b6b6b] font-mono text-xs">{payment.reference ?? '–'}</td>
                      </motion.tr>
                    )
                  })}
                </tbody>
              </table>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Payment info */}
      <div className="bg-[#014D4E] rounded-2xl p-6 text-white">
        <h3 className="font-bold mb-2 text-lg font-serif">Payment Information</h3>
        <div className="grid sm:grid-cols-2 gap-4 text-sm text-white/80">
          <div>
            <p className="font-medium text-[#C89B3C] mb-1">Bank Details for EFT</p>
            <p>Bank: First National Bank</p>
            <p>Account: Busizwe Burial Society</p>
            <p>Account No: 62XXXXXXXX</p>
            <p>Branch: 250655</p>
          </div>
          <div>
            <p className="font-medium text-[#C89B3C] mb-1">Payment Reference</p>
            <p>Always use your policy number as payment reference to ensure correct allocation.</p>
            <p className="mt-2">Contact us at 0800 000 000 for debit order setup.</p>
          </div>
        </div>
      </div>
    </div>
  )
}
