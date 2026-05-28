'use client'

import React from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { FileText, Users, FolderOpen, CreditCard, ArrowRight, AlertCircle, CheckCircle2, Clock } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { formatCurrency, formatDate, getStatusColor } from '@/lib/utils'

interface Props {
  user: { profile?: { firstName: string; lastName: string } | null } | null
  stats: {
    totalPolicies: number
    activePolicies: number
    pendingPolicies: number
    totalDocuments: number
    approvedDocuments: number
    overduePayments: number
  }
  recentPolicies: { id: string; status: string; monthlyPremium: unknown; coverAmount: unknown; policyNumber: string; product: { name: string } }[]
  recentPayments: { id: string; status: string; amount: unknown; dueDate: Date }[]
}

const STAT_CARDS = (stats: Props['stats']) => [
  {
    icon: FileText,
    label: 'Active Policies',
    value: stats.activePolicies,
    sub: `${stats.totalPolicies} total`,
    color: '#014D4E',
    href: '/dashboard/policies',
  },
  {
    icon: Clock,
    label: 'Pending Policies',
    value: stats.pendingPolicies,
    sub: 'Awaiting approval',
    color: '#C89B3C',
    href: '/dashboard/policies',
  },
  {
    icon: FolderOpen,
    label: 'Documents',
    value: stats.approvedDocuments,
    sub: `${stats.totalDocuments} uploaded`,
    color: '#014D4E',
    href: '/dashboard/documents',
  },
  {
    icon: CreditCard,
    label: 'Overdue Payments',
    value: stats.overduePayments,
    sub: stats.overduePayments > 0 ? 'Action required' : 'All up to date',
    color: stats.overduePayments > 0 ? '#dc2626' : '#16a34a',
    href: '/dashboard/payments',
  },
]

const QUICK_ACTIONS = [
  { icon: FileText, label: 'View Policies', href: '/dashboard/policies', desc: 'Manage your cover plans' },
  { icon: Users, label: 'Add Dependant', href: '/dashboard/dependants', desc: 'Add family members' },
  { icon: FolderOpen, label: 'Upload Docs', href: '/dashboard/documents', desc: 'Submit required documents' },
  { icon: CreditCard, label: 'View Payments', href: '/dashboard/payments', desc: 'Track premium history' },
]

export default function DashboardOverview({ user, stats, recentPolicies, recentPayments }: Props) {
  const name = user?.profile ? `${user.profile.firstName}` : 'Member'

  return (
    <div className="space-y-8">
      {/* Welcome */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <h2 className="text-2xl font-bold text-[#1C1C1C]" style={{ fontFamily: 'Georgia, serif' }}>
          Welcome back, {name} 👋
        </h2>
        <p className="text-[#6b6b6b] mt-1">Here&apos;s an overview of your Busizwe membership.</p>
      </motion.div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {STAT_CARDS(stats).map((stat, i) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: i * 0.08 }}
          >
            <Link href={stat.href}>
              <Card className="hover:shadow-[0_8px_24px_rgba(1,77,78,0.12)] hover:-translate-y-0.5 transition-all duration-200 cursor-pointer">
                <CardContent className="p-5">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: `${stat.color}15` }}>
                      <stat.icon className="w-5 h-5" style={{ color: stat.color }} />
                    </div>
                  </div>
                  <p className="text-3xl font-bold text-[#1C1C1C]">{stat.value}</p>
                  <p className="text-sm font-medium text-[#1C1C1C] mt-0.5">{stat.label}</p>
                  <p className="text-xs text-[#6b6b6b] mt-0.5">{stat.sub}</p>
                </CardContent>
              </Card>
            </Link>
          </motion.div>
        ))}
      </div>

      {/* Quick actions */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {QUICK_ACTIONS.map((action, i) => (
          <motion.div
            key={action.label}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.32 + i * 0.06 }}
          >
            <Link href={action.href}>
              <div className="flex items-center gap-3 p-4 bg-white rounded-xl border border-[#e0d9cc] hover:border-[#C89B3C]/50 hover:shadow-[0_4px_12px_rgba(200,155,60,0.12)] transition-all duration-200 group">
                <div className="w-9 h-9 rounded-lg bg-[#014D4E] flex items-center justify-center shrink-0">
                  <action.icon className="w-4 h-4 text-[#C89B3C]" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-[#014D4E]">{action.label}</p>
                  <p className="text-xs text-[#6b6b6b]">{action.desc}</p>
                </div>
                <ArrowRight className="w-4 h-4 text-[#6b6b6b] group-hover:text-[#C89B3C] transition-colors shrink-0" />
              </div>
            </Link>
          </motion.div>
        ))}
      </div>

      {/* Recent activity */}
      <div className="grid lg:grid-cols-2 gap-6">
        {/* Recent policies */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-base">Recent Policies</CardTitle>
            <Button variant="ghost" size="sm" asChild>
              <Link href="/dashboard/policies">View all <ArrowRight className="w-3 h-3" /></Link>
            </Button>
          </CardHeader>
          <CardContent>
            {recentPolicies.length === 0 ? (
              <div className="text-center py-8">
                <FileText className="w-10 h-10 text-[#e0d9cc] mx-auto mb-3" />
                <p className="text-sm text-[#6b6b6b] mb-3">No policies yet</p>
                <Button variant="default" size="sm" asChild>
                  <Link href="/products">Browse Plans</Link>
                </Button>
              </div>
            ) : (
              <div className="space-y-3">
                {recentPolicies.map((policy) => (
                  <div key={policy.id} className="flex items-center justify-between p-3 bg-[#F7F3EA] rounded-xl">
                    <div>
                      <p className="text-sm font-semibold text-[#1C1C1C]">{policy.product.name}</p>
                      <p className="text-xs text-[#6b6b6b]">{policy.policyNumber}</p>
                    </div>
                    <div className="text-right">
                      <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium border ${getStatusColor(policy.status)}`}>
                        {policy.status}
                      </span>
                      <p className="text-xs text-[#6b6b6b] mt-1">{formatCurrency(Number(policy.monthlyPremium))}/mo</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Recent payments */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-base">Recent Payments</CardTitle>
            <Button variant="ghost" size="sm" asChild>
              <Link href="/dashboard/payments">View all <ArrowRight className="w-3 h-3" /></Link>
            </Button>
          </CardHeader>
          <CardContent>
            {recentPayments.length === 0 ? (
              <div className="text-center py-8">
                <CreditCard className="w-10 h-10 text-[#e0d9cc] mx-auto mb-3" />
                <p className="text-sm text-[#6b6b6b]">No payment history</p>
              </div>
            ) : (
              <div className="space-y-3">
                {recentPayments.map((payment) => (
                  <div key={payment.id} className="flex items-center justify-between p-3 bg-[#F7F3EA] rounded-xl">
                    <div className="flex items-center gap-2">
                      {payment.status === 'PAID' ? (
                        <CheckCircle2 className="w-4 h-4 text-green-600 shrink-0" />
                      ) : payment.status === 'OVERDUE' ? (
                        <AlertCircle className="w-4 h-4 text-red-600 shrink-0" />
                      ) : (
                        <Clock className="w-4 h-4 text-amber-600 shrink-0" />
                      )}
                      <div>
                        <p className="text-sm font-semibold text-[#1C1C1C]">{formatCurrency(Number(payment.amount))}</p>
                        <p className="text-xs text-[#6b6b6b]">Due {formatDate(payment.dueDate)}</p>
                      </div>
                    </div>
                    <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium border ${getStatusColor(payment.status)}`}>
                      {payment.status}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
