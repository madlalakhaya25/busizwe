'use client'

import React from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import {
  FileText, Users, FolderOpen, CreditCard, ArrowRight,
  AlertCircle, CheckCircle2, Clock, Shield, TrendingUp,
} from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { formatCurrency, formatDate, getStatusColor } from '@/lib/utils'

interface Props {
  displayName: string
  stats: {
    totalPolicies: number
    activePolicies: number
    pendingPolicies: number
    totalDocuments: number
    approvedDocuments: number
    overduePayments: number
  }
  recentPolicies: {
    id: string
    status: string
    monthlyPremium: unknown
    coverAmount: unknown
    policyNumber: string
    product: { name: string }
  }[]
  recentPayments: {
    id: string
    status: string
    amount: unknown
    dueDate: Date
  }[]
}

const fade = (delay = 0) => ({
  initial: { opacity: 0, y: 14 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.4, delay },
})

const QUICK_ACTIONS = [
  { icon: FileText,   label: 'My Policies',    href: '/dashboard/policies',   desc: 'View and manage cover' },
  { icon: Users,      label: 'Dependants',     href: '/dashboard/dependants', desc: 'Add family members' },
  { icon: FolderOpen, label: 'Upload Docs',    href: '/dashboard/documents',  desc: 'Submit required files' },
  { icon: CreditCard, label: 'Payments',       href: '/dashboard/payments',   desc: 'View premium history' },
]

export default function DashboardOverview({ displayName, stats, recentPolicies, recentPayments }: Props) {
  const firstName = displayName.split(' ')[0]

  const STAT_CARDS = [
    {
      icon: Shield,
      label: 'Active Policies',
      value: stats.activePolicies,
      sub: `${stats.totalPolicies} total`,
      color: '#014D4E',
      bg: '#014D4E12',
      href: '/dashboard/policies',
    },
    {
      icon: Clock,
      label: 'Pending',
      value: stats.pendingPolicies,
      sub: 'Awaiting approval',
      color: '#C89B3C',
      bg: '#C89B3C12',
      href: '/dashboard/policies',
    },
    {
      icon: FolderOpen,
      label: 'Docs Approved',
      value: stats.approvedDocuments,
      sub: `${stats.totalDocuments} uploaded`,
      color: '#014D4E',
      bg: '#014D4E10',
      href: '/dashboard/documents',
    },
    {
      icon: CreditCard,
      label: 'Overdue',
      value: stats.overduePayments,
      sub: stats.overduePayments > 0 ? 'Action required' : 'All up to date',
      color: stats.overduePayments > 0 ? '#dc2626' : '#16a34a',
      bg: stats.overduePayments > 0 ? '#dc262610' : '#16a34a10',
      href: '/dashboard/payments',
    },
  ]

  return (
    <div className="space-y-8 max-w-6xl">

      {/* Welcome banner */}
      <motion.div {...fade(0)} className="relative overflow-hidden bg-[#014D4E] rounded-2xl px-6 py-7 sm:px-8">
        {/* Subtle pattern */}
        <div
          className="absolute inset-0 opacity-[0.04] pointer-events-none"
          style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg width='32' height='32' viewBox='0 0 32 32' xmlns='http://www.w3.org/2000/svg'%3E%3Ccircle cx='16' cy='16' r='1.5' fill='%23C89B3C'/%3E%3C/svg%3E")` }}
        />
        <div className="absolute top-0 right-0 w-48 h-48 bg-[#C89B3C]/10 rounded-full -translate-y-1/2 translate-x-1/4 blur-2xl pointer-events-none" />

        <div className="relative flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <p className="text-[#C89B3C] text-xs font-semibold uppercase tracking-widest mb-1">Member Portal</p>
            <h2 className="font-serif text-2xl sm:text-3xl font-semibold text-white leading-snug">
              Welcome back, {firstName}
            </h2>
            <p className="text-white/60 text-sm mt-1.5">
              Here is your Busizwe Burial Society overview.
            </p>
          </div>
          {stats.activePolicies === 0 && (
            <Link href="/products" className="flex items-center justify-center h-9 px-4 rounded-lg text-sm font-semibold bg-[#C89B3C] text-white hover:bg-[#A8832A] shadow-sm hover:shadow-md transition-all duration-200 shrink-0 self-start sm:self-auto">
              Browse Plans <ArrowRight className="w-4 h-4" />
            </Link>
          )}
        </div>
      </motion.div>

      {/* Stat cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        {STAT_CARDS.map((stat, i) => (
          <motion.div key={stat.label} {...fade(0.06 + i * 0.07)}>
            <Link href={stat.href}>
              <Card className="h-full hover:shadow-[0_6px_20px_rgba(1,77,78,0.12)] hover:-translate-y-0.5 transition-all duration-200 cursor-pointer group">
                <CardContent className="p-4 sm:p-5">
                  <div
                    className="w-9 h-9 rounded-xl flex items-center justify-center mb-4 transition-transform group-hover:scale-110"
                    style={{ background: stat.bg }}
                  >
                    <stat.icon className="w-4 h-4 sm:w-5 sm:h-5" style={{ color: stat.color }} />
                  </div>
                  <p className="text-2xl sm:text-3xl font-bold text-[#1C1C1C] leading-none tabular-nums">{stat.value}</p>
                  <p className="text-xs sm:text-sm font-semibold text-[#1C1C1C] mt-2 leading-tight">{stat.label}</p>
                  <p className="text-xs text-[#9a9a9a] mt-0.5 truncate">{stat.sub}</p>
                </CardContent>
              </Card>
            </Link>
          </motion.div>
        ))}
      </div>

      {/* Quick actions */}
      <div>
        <h3 className="text-xs font-semibold text-[#9a9a9a] uppercase tracking-widest mb-3">Quick Actions</h3>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
          {QUICK_ACTIONS.map((action, i) => (
            <motion.div key={action.label} {...fade(0.28 + i * 0.05)}>
              <Link href={action.href}>
                <div className="flex items-center gap-3 p-4 bg-white rounded-2xl border border-[#e0d9cc] hover:border-[#C89B3C]/50 hover:shadow-[0_4px_12px_rgba(200,155,60,0.10)] transition-all duration-200 group h-full">
                  <div className="w-9 h-9 rounded-xl bg-[#014D4E] flex items-center justify-center shrink-0 transition-transform group-hover:scale-110">
                    <action.icon className="w-4 h-4 text-[#C89B3C]" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-[#014D4E] truncate">{action.label}</p>
                    <p className="text-xs text-[#9a9a9a] truncate hidden sm:block">{action.desc}</p>
                  </div>
                  <ArrowRight className="w-3.5 h-3.5 text-[#d0c9bc] group-hover:text-[#C89B3C] transition-colors shrink-0" />
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Recent activity */}
      <div className="grid lg:grid-cols-2 gap-5">

        {/* Recent policies */}
        <motion.div {...fade(0.5)}>
          <Card className="h-full">
            <CardHeader className="flex flex-row items-center justify-between pb-3 pt-5 px-5">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-lg bg-[#014D4E]/10 flex items-center justify-center">
                  <FileText className="w-3.5 h-3.5 text-[#014D4E]" />
                </div>
                <CardTitle className="text-sm font-semibold text-[#014D4E]">Recent Policies</CardTitle>
              </div>
              <Link href="/dashboard/policies" className="flex items-center gap-1 h-7 px-2 rounded-lg text-xs font-medium text-[#9a9a9a] hover:text-[#014D4E] hover:bg-[#014D4E]/10 transition-colors">
                View all <ArrowRight className="w-3 h-3" />
              </Link>
            </CardHeader>
            <CardContent className="pt-0 px-5 pb-5">
              {recentPolicies.length === 0 ? (
                <div className="text-center py-10">
                  <div className="w-12 h-12 rounded-2xl bg-[#F7F3EA] flex items-center justify-center mx-auto mb-3">
                    <FileText className="w-5 h-5 text-[#d0c9bc]" />
                  </div>
                  <p className="text-sm text-[#9a9a9a] mb-4">No policies yet</p>
                  <Link href="/products" className="flex items-center justify-center h-9 px-4 rounded-lg text-sm font-semibold bg-[#014D4E] text-white hover:bg-[#013638] shadow-sm transition-all duration-200">Browse Plans</Link>
                </div>
              ) : (
                <div className="space-y-2">
                  {recentPolicies.map((policy) => (
                    <div
                      key={policy.id}
                      className="flex items-center justify-between p-3.5 bg-[#F7F3EA] rounded-xl gap-3"
                    >
                      <div className="min-w-0 flex items-center gap-2.5">
                        <div className={`w-2 h-2 rounded-full shrink-0 ${policy.status === 'ACTIVE' ? 'bg-green-500' : policy.status === 'PENDING' ? 'bg-amber-400' : 'bg-gray-400'}`} />
                        <div className="min-w-0">
                          <p className="text-sm font-semibold text-[#1C1C1C] truncate">{policy.product.name}</p>
                          <p className="text-xs text-[#9a9a9a] font-mono">{policy.policyNumber}</p>
                        </div>
                      </div>
                      <div className="text-right shrink-0">
                        <p className="text-xs font-bold text-[#014D4E]">{formatCurrency(Number(policy.monthlyPremium))}<span className="text-[#9a9a9a] font-normal">/mo</span></p>
                        <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-semibold border mt-1 ${getStatusColor(policy.status)}`}>
                          {policy.status}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </motion.div>

        {/* Recent payments */}
        <motion.div {...fade(0.55)}>
          <Card className="h-full">
            <CardHeader className="flex flex-row items-center justify-between pb-3 pt-5 px-5">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-lg bg-[#C89B3C]/10 flex items-center justify-center">
                  <TrendingUp className="w-3.5 h-3.5 text-[#C89B3C]" />
                </div>
                <CardTitle className="text-sm font-semibold text-[#014D4E]">Recent Payments</CardTitle>
              </div>
              <Link href="/dashboard/payments" className="flex items-center gap-1 h-7 px-2 rounded-lg text-xs font-medium text-[#9a9a9a] hover:text-[#014D4E] hover:bg-[#014D4E]/10 transition-colors">
                View all <ArrowRight className="w-3 h-3" />
              </Link>
            </CardHeader>
            <CardContent className="pt-0 px-5 pb-5">
              {recentPayments.length === 0 ? (
                <div className="text-center py-10">
                  <div className="w-12 h-12 rounded-2xl bg-[#F7F3EA] flex items-center justify-center mx-auto mb-3">
                    <CreditCard className="w-5 h-5 text-[#d0c9bc]" />
                  </div>
                  <p className="text-sm text-[#9a9a9a]">No payment history</p>
                </div>
              ) : (
                <div className="space-y-2">
                  {recentPayments.map((payment) => (
                    <div
                      key={payment.id}
                      className="flex items-center justify-between p-3.5 bg-[#F7F3EA] rounded-xl gap-3"
                    >
                      <div className="flex items-center gap-2.5 min-w-0">
                        <div className={`w-7 h-7 rounded-lg flex items-center justify-center shrink-0 ${
                          payment.status === 'PAID' ? 'bg-green-100' :
                          payment.status === 'OVERDUE' ? 'bg-red-100' :
                          'bg-amber-100'
                        }`}>
                          {payment.status === 'PAID'
                            ? <CheckCircle2 className="w-3.5 h-3.5 text-green-600" />
                            : payment.status === 'OVERDUE'
                            ? <AlertCircle className="w-3.5 h-3.5 text-red-600" />
                            : <Clock className="w-3.5 h-3.5 text-amber-600" />
                          }
                        </div>
                        <div className="min-w-0">
                          <p className="text-sm font-bold text-[#1C1C1C]">{formatCurrency(Number(payment.amount))}</p>
                          <p className="text-xs text-[#9a9a9a]">Due {formatDate(payment.dueDate)}</p>
                        </div>
                      </div>
                      <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-semibold border shrink-0 ${getStatusColor(payment.status)}`}>
                        {payment.status}
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </motion.div>

      </div>
    </div>
  )
}
