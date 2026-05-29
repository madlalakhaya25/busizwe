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
  PAID:    CheckCircle2,
  OVERDUE: AlertCircle,
  FAILED:  AlertCircle,
  PENDING: Clock,
}

const STATUS_BG = {
  PAID:    'bg-green-50',
  OVERDUE: 'bg-red-50',
  FAILED:  'bg-red-50',
  PENDING: 'bg-amber-50',
}

export default function PaymentsPage({ payments }: { payments: unknown[] }) {
  const typedPayments = payments as Payment[]

  const totalPaid = typedPayments.filter((p) => p.status === 'PAID').reduce((s, p) => s + Number(p.amount), 0)
  const overdue   = typedPayments.filter((p) => p.status === 'OVERDUE').length
  const pending   = typedPayments.filter((p) => p.status === 'PENDING').length

  return (
    <div className="space-y-6 max-w-5xl">

      {/* Summary stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        {[
          { label: 'Total Paid',     value: formatCurrency(totalPaid), icon: TrendingUp,  color: '#16a34a', bg: '#16a34a10' },
          { label: 'Total Records',  value: typedPayments.length,      icon: CreditCard,  color: '#014D4E', bg: '#014D4E10' },
          { label: 'Overdue',        value: overdue,                   icon: AlertCircle, color: '#dc2626', bg: '#dc262610' },
          { label: 'Pending',        value: pending,                   icon: Clock,       color: '#C89B3C', bg: '#C89B3C12' },
        ].map((stat, i) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: i * 0.07 }}
          >
            <Card>
              <CardContent className="p-4 sm:p-5">
                <div
                  className="w-9 h-9 rounded-xl flex items-center justify-center mb-4"
                  style={{ background: stat.bg }}
                >
                  <stat.icon className="w-4 h-4" style={{ color: stat.color }} />
                </div>
                <p className="text-2xl font-bold text-[#1C1C1C] tabular-nums truncate">{stat.value}</p>
                <p className="text-xs text-[#9a9a9a] mt-1 font-medium">{stat.label}</p>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Payment history table */}
      <Card>
        <CardHeader className="pb-4">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-[#C89B3C]/10 flex items-center justify-center">
              <CreditCard className="w-3.5 h-3.5 text-[#C89B3C]" />
            </div>
            <CardTitle className="text-sm font-semibold text-[#014D4E]">Payment History</CardTitle>
          </div>
        </CardHeader>
        <CardContent className="pt-0">
          {typedPayments.length === 0 ? (
            <div className="text-center py-14">
              <div className="w-16 h-16 rounded-2xl bg-[#F9FAFB] flex items-center justify-center mx-auto mb-4">
                <CreditCard className="w-8 h-8 text-[#d0c9bc]" />
              </div>
              <h3 className="text-base font-bold text-[#014D4E] mb-2 font-serif">No Payments Yet</h3>
              <p className="text-[#9a9a9a] text-sm max-w-xs mx-auto">
                Your payment history will appear here once your policy is activated.
              </p>
            </div>
          ) : (
            <div className="overflow-x-auto -mx-5">
              <table className="w-full text-sm min-w-[600px]">
                <thead>
                  <tr className="border-b border-[#E5E7EB]">
                    <th className="py-3 px-5 text-left text-[#9a9a9a] text-xs font-semibold uppercase tracking-wide">Policy</th>
                    <th className="py-3 px-3 text-left text-[#9a9a9a] text-xs font-semibold uppercase tracking-wide">Amount</th>
                    <th className="py-3 px-3 text-left text-[#9a9a9a] text-xs font-semibold uppercase tracking-wide">Due</th>
                    <th className="py-3 px-3 text-left text-[#9a9a9a] text-xs font-semibold uppercase tracking-wide">Paid On</th>
                    <th className="py-3 px-3 text-left text-[#9a9a9a] text-xs font-semibold uppercase tracking-wide">Status</th>
                    <th className="py-3 px-5 text-left text-[#9a9a9a] text-xs font-semibold uppercase tracking-wide">Ref</th>
                  </tr>
                </thead>
                <tbody>
                  {typedPayments.map((payment, i) => {
                    const StatusIcon = STATUS_ICONS[payment.status as keyof typeof STATUS_ICONS] ?? Clock
                    const rowBg = STATUS_BG[payment.status as keyof typeof STATUS_BG]
                    return (
                      <motion.tr
                        key={payment.id}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: i * 0.04 }}
                        className={`border-b border-[#E5E7EB] last:border-0 transition-colors ${payment.status === 'OVERDUE' ? 'bg-red-50/30' : 'hover:bg-[#F9FAFB]/60'}`}
                      >
                        <td className="py-3.5 px-5">
                          <p className="font-semibold text-[#1C1C1C] truncate max-w-[140px]">{payment.policy.product.name}</p>
                          <p className="text-[10px] text-[#9a9a9a] font-mono mt-0.5">{payment.policy.policyNumber}</p>
                        </td>
                        <td className="py-3.5 px-3 font-bold text-[#014D4E] whitespace-nowrap">
                          {formatCurrency(Number(payment.amount))}
                        </td>
                        <td className="py-3.5 px-3 text-[#6b6b6b] whitespace-nowrap text-xs">
                          {formatDate(payment.dueDate)}
                        </td>
                        <td className="py-3.5 px-3 text-[#6b6b6b] whitespace-nowrap text-xs">
                          {payment.paidAt ? formatDate(payment.paidAt) : <span className="text-[#9a9a9a]">–</span>}
                        </td>
                        <td className="py-3.5 px-3">
                          <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold border ${getStatusColor(payment.status)}`}>
                            <StatusIcon className="w-3 h-3" />
                            {payment.status}
                          </span>
                        </td>
                        <td className="py-3.5 px-5 text-[#9a9a9a] font-mono text-xs">
                          {payment.reference ?? '–'}
                        </td>
                      </motion.tr>
                    )
                  })}
                </tbody>
              </table>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Payment info block */}
      <div className="bg-[#014D4E] rounded-2xl p-6 text-white">
        <h3 className="font-serif font-semibold text-lg mb-4">Payment Information</h3>
        <div className="grid sm:grid-cols-2 gap-6 text-sm text-white/75">
          <div className="space-y-2">
            <p className="text-[#C89B3C] font-semibold text-xs uppercase tracking-wider mb-3">Bank Details (EFT)</p>
            {[
              ['Bank',         'Capitec Bank'],
              ['Account Name', 'Busizwe Burial Society'],
              ['Account No',   '2542026544'],
              ['Branch Code',  '470010'],
              ['Account Type', 'Entrepreneur'],
            ].map(([label, value]) => (
              <div key={label} className="flex justify-between gap-4">
                <span className="text-white/50 shrink-0">{label}</span>
                <span className="text-white font-semibold text-right font-mono">{value}</span>
              </div>
            ))}
          </div>
          <div className="space-y-1">
            <p className="text-[#C89B3C] font-semibold text-xs uppercase tracking-wider mb-3">Payment Reference</p>
            <p>Always use your <span className="text-white font-semibold">policy number</span> as your payment reference to ensure correct allocation.</p>
            <p className="mt-3">Call <span className="text-white font-semibold">061 463 1973</span> to set up a debit order.</p>
          </div>
        </div>
      </div>
    </div>
  )
}
