'use client'

import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { CreditCard, CheckCircle2, Search, TrendingUp, AlertCircle, Clock, Plus, X } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { formatCurrency, formatDate, getStatusColor } from '@/lib/utils'

interface Payment {
  id: string
  amount: unknown
  status: string
  dueDate: Date
  paidAt: Date | null
  reference: string | null
  paymentMethod: string | null
  user: {
    email: string
    profile: { firstName: string; lastName: string } | null
  }
  policy: { policyNumber: string; product: { name: string } }
}

export default function AdminPaymentsPage({ payments: initial }: { payments: unknown[] }) {
  const [payments, setPayments] = useState(initial as Payment[])
  const [search, setSearch]     = useState('')
  const [markingId, setMarkingId] = useState<string | null>(null)
  // Pre-fill refs with each payment's policy number (members use it as their reference)
  const [refs, setRefs] = useState<Record<string, string>>(
    () => Object.fromEntries((initial as Payment[]).map((p) => [p.id, p.policy.policyNumber]))
  )
  const [showAdd, setShowAdd]   = useState(false)
  const [adding, setAdding]     = useState(false)
  const [addError, setAddError] = useState('')
  const [form, setForm]         = useState({
    policyNumber: '', dueDate: new Date().toISOString().slice(0, 10),
    reference: '', paymentMethod: 'EFT', markPaid: false,
  })

  const filtered = payments.filter((p) => {
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
      const res = await fetch(`/api/payments/${paymentId}/mark-paid`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ reference: refs[paymentId] || undefined, paymentMethod: 'EFT' }),
      })
      if (res.ok) window.location.reload()
    } finally {
      setMarkingId(null)
    }
  }

  const addPayment = async () => {
    setAdding(true)
    setAddError('')
    try {
      const res = await fetch('/api/payments', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form }),
      })
      if (!res.ok) {
        const d = await res.json()
        setAddError(d.error ?? 'Failed to add payment.')
        return
      }
      setShowAdd(false)
      setForm({ policyNumber: '', dueDate: new Date().toISOString().slice(0, 10), reference: '', paymentMethod: 'EFT', markPaid: false })
      window.location.reload()
    } catch {
      setAddError('Something went wrong.')
    } finally {
      setAdding(false)
    }
  }

  const totalCollected = payments.filter((p) => p.status === 'PAID').reduce((s, p) => s + Number(p.amount), 0)

  const STAT_CARDS = [
    { icon: TrendingUp,   label: 'Total Collected', value: formatCurrency(totalCollected),                           color: '#16a34a', bg: '#16a34a12' },
    { icon: CheckCircle2, label: 'Paid',             value: payments.filter((p) => p.status === 'PAID').length,      color: '#16a34a', bg: '#16a34a12' },
    { icon: AlertCircle,  label: 'Overdue',          value: payments.filter((p) => p.status === 'OVERDUE').length,   color: '#dc2626', bg: '#dc262610' },
    { icon: Clock,        label: 'Pending',          value: payments.filter((p) => p.status === 'PENDING').length,   color: '#C89B3C', bg: '#C89B3C12' },
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

      {/* Toolbar */}
      <div className="flex gap-3 items-center">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#6b6b6b]" />
          <Input placeholder="Search by member or policy..." className="pl-10" value={search} onChange={(e) => setSearch(e.target.value)} />
        </div>
        <span className="text-sm text-[#6b6b6b] shrink-0">{filtered.length} results</span>
        <button
          onClick={() => setShowAdd(v => !v)}
          className="ml-auto flex items-center gap-2 h-10 px-5 rounded-xl text-sm font-semibold bg-[#014D4E] text-white hover:bg-[#013638] transition-colors shrink-0"
        >
          {showAdd ? <X className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
          {showAdd ? 'Cancel' : 'Add Payment'}
        </button>
      </div>

      {/* Add payment form */}
      <AnimatePresence>
        {showAdd && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
          >
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-semibold text-[#014D4E]">Record Payment</CardTitle>
              </CardHeader>
              <CardContent className="pt-0">
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-4">
                  <div className="space-y-1.5">
                    <Label className="text-xs font-medium text-[#6B7280]">Policy Number *</Label>
                    <Input placeholder="BSW-2024-XXXX" value={form.policyNumber} onChange={e => setForm(f => ({ ...f, policyNumber: e.target.value }))} className="h-10" />
                  </div>
                  <div className="space-y-1.5">
                    <Label className="text-xs font-medium text-[#6B7280]">Due Date *</Label>
                    <Input type="date" value={form.dueDate} onChange={e => setForm(f => ({ ...f, dueDate: e.target.value }))} className="h-10" />
                  </div>
                  <div className="space-y-1.5">
                    <Label className="text-xs font-medium text-[#6B7280]">Reference (optional)</Label>
                    <Input placeholder="Bank ref or receipt no." value={form.reference} onChange={e => setForm(f => ({ ...f, reference: e.target.value }))} className="h-10" />
                  </div>
                  <div className="space-y-1.5">
                    <Label className="text-xs font-medium text-[#6B7280]">Payment Method</Label>
                    <select
                      value={form.paymentMethod}
                      onChange={e => setForm(f => ({ ...f, paymentMethod: e.target.value }))}
                      className="flex h-10 w-full rounded-lg border border-input bg-background px-3 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                    >
                      {['EFT', 'Cash', 'Debit Order', 'Other'].map(m => <option key={m}>{m}</option>)}
                    </select>
                  </div>
                  <div className="flex items-center gap-3 pt-6">
                    <input
                      type="checkbox"
                      id="markPaid"
                      checked={form.markPaid}
                      onChange={e => setForm(f => ({ ...f, markPaid: e.target.checked }))}
                      className="w-4 h-4 accent-[#014D4E]"
                    />
                    <Label htmlFor="markPaid" className="text-sm font-medium text-[#374151] cursor-pointer">Already paid</Label>
                  </div>
                </div>
                {addError && <p className="text-sm text-red-600 bg-red-50 border border-red-200 rounded-lg px-3 py-2 mb-3">{addError}</p>}
                <button
                  onClick={addPayment}
                  disabled={adding || !form.policyNumber || !form.dueDate}
                  className="flex items-center gap-2 h-10 px-6 rounded-xl text-sm font-semibold bg-[#C89B3C] text-white hover:bg-[#A8832A] disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
                >
                  {adding ? 'Saving...' : 'Save Payment Record'}
                </button>
              </CardContent>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Table */}
      <Card>
        <CardContent className="p-0">
          {filtered.length === 0 ? (
            <div className="text-center py-16">
              <div className="w-16 h-16 rounded-2xl bg-[#F9FAFB] flex items-center justify-center mx-auto mb-4">
                <CreditCard className="w-8 h-8 text-[#d0c9bc]" />
              </div>
              <p className="text-[#6b6b6b]">No payments found.</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm min-w-[750px]">
                <thead>
                  <tr className="border-b border-[#E5E7EB] bg-[#F9FAFB]">
                    <th className="py-3 px-6 text-left text-[#9a9a9a] text-xs font-semibold uppercase tracking-wide">Member</th>
                    <th className="py-3 px-4 text-left text-[#9a9a9a] text-xs font-semibold uppercase tracking-wide">Policy</th>
                    <th className="py-3 px-4 text-left text-[#9a9a9a] text-xs font-semibold uppercase tracking-wide">Amount</th>
                    <th className="py-3 px-4 text-left text-[#9a9a9a] text-xs font-semibold uppercase tracking-wide">Due Date</th>
                    <th className="py-3 px-4 text-left text-[#9a9a9a] text-xs font-semibold uppercase tracking-wide">Status</th>
                    <th className="py-3 px-4 text-left text-[#9a9a9a] text-xs font-semibold uppercase tracking-wide">Reference</th>
                    <th className="py-3 px-4 text-left text-[#9a9a9a] text-xs font-semibold uppercase tracking-wide">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filtered.map((payment) => (
                    <tr key={payment.id} className="border-b border-[#E5E7EB] last:border-0 hover:bg-[#F9FAFB]/60 transition-colors">
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
                      <td className="py-3 px-4 text-[#6b6b6b] text-xs">{formatDate(payment.dueDate)}</td>
                      <td className="py-3 px-4">
                        <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium border ${getStatusColor(payment.status)}`}>
                          {payment.status}
                        </span>
                      </td>
                      <td className="py-3 px-4 text-[#9a9a9a] font-mono text-xs">{payment.reference ?? '–'}</td>
                      <td className="py-3 px-4">
                        {(payment.status === 'PENDING' || payment.status === 'OVERDUE') && (
                          <div className="flex items-center gap-2">
                            <Input
                              placeholder="Ref (optional)"
                              className="h-8 text-xs w-28"
                              value={refs[payment.id] ?? ''}
                              onChange={e => setRefs(r => ({ ...r, [payment.id]: e.target.value }))}
                            />
                            <button
                              onClick={() => markAsPaid(payment.id)}
                              disabled={markingId === payment.id}
                              className="flex items-center gap-1 h-8 px-3 rounded-lg text-xs font-semibold bg-green-600 text-white hover:bg-green-700 disabled:opacity-50 transition-colors whitespace-nowrap"
                            >
                              <CheckCircle2 className="w-3 h-3" />
                              {markingId === payment.id ? '...' : 'Mark Paid'}
                            </button>
                          </div>
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
