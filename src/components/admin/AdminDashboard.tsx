'use client'

import React from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { Users, FileText, FolderOpen, CreditCard, TrendingUp, Clock, AlertCircle, ArrowRight, Shield } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { formatCurrency, formatDate, getStatusColor } from '@/lib/utils'

interface Stats {
  totalMembers: number
  activePolices: number
  pendingPolicies: number
  totalPremiums: number
  pendingDocuments: number
  overduePayments: number
}

interface Member {
  id: string
  email: string
  createdAt: Date
  role: string
  profile: { firstName: string; lastName: string } | null
  policies: { id: string; status: string }[]
}

const fade = (delay = 0) => ({
  initial: { opacity: 0, y: 14 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.4, delay },
})

export default function AdminDashboard({ stats, recentMembers }: { stats: Stats; recentMembers: unknown[] }) {
  const members = recentMembers as Member[]

  const STAT_CARDS = [
    { icon: Users,       label: 'Total Members',     value: stats.totalMembers,                    color: '#014D4E', bg: '#014D4E12', href: '/admin/members' },
    { icon: FileText,    label: 'Active Policies',   value: stats.activePolices,                   color: '#16a34a', bg: '#16a34a12', href: '/admin/members' },
    { icon: Clock,       label: 'Pending Approval',  value: stats.pendingPolicies,                 color: '#C89B3C', bg: '#C89B3C12', href: '/admin/members' },
    { icon: TrendingUp,  label: 'Total Premiums',    value: formatCurrency(stats.totalPremiums),   color: '#014D4E', bg: '#014D4E10', href: '/admin/payments' },
    { icon: FolderOpen,  label: 'Pending Docs',      value: stats.pendingDocuments,                color: '#C89B3C', bg: '#C89B3C10', href: '/admin/members' },
    { icon: AlertCircle, label: 'Overdue Payments',  value: stats.overduePayments,                 color: '#dc2626', bg: '#dc262610', href: '/admin/payments' },
  ]

  return (
    <div className="space-y-8 max-w-6xl">

      {/* Admin welcome banner */}
      <motion.div {...fade(0)} className="relative overflow-hidden bg-[#1C1C1C] rounded-2xl px-6 py-7 sm:px-8">
        <div className="absolute top-0 right-0 w-48 h-48 bg-[#C89B3C]/8 rounded-full -translate-y-1/2 translate-x-1/4 blur-2xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-32 h-32 bg-white/3 rounded-full translate-y-1/2 -translate-x-1/4 blur-xl pointer-events-none" />
        <div className="relative flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <div>
            <div className="flex items-center gap-2 mb-1.5">
              <Shield className="w-4 h-4 text-[#C89B3C]" />
              <p className="text-[#C89B3C] text-xs font-semibold uppercase tracking-widest">Admin Panel</p>
            </div>
            <h2 className="font-serif text-2xl sm:text-3xl font-semibold text-white leading-snug">Platform Overview</h2>
            <p className="text-white/50 text-sm mt-1.5">Busizwe Burial Society · Administration</p>
          </div>
        </div>
      </motion.div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
        {STAT_CARDS.map((stat, i) => (
          <motion.div key={stat.label} {...fade(0.06 + i * 0.07)}>
            <Link href={stat.href}>
              <Card className="h-full hover:shadow-[0_6px_20px_rgba(1,77,78,0.12)] hover:-translate-y-0.5 transition-all duration-200 cursor-pointer group">
                <CardContent className="p-4 sm:p-5">
                  <div className="w-9 h-9 rounded-xl flex items-center justify-center mb-4 transition-transform group-hover:scale-110" style={{ background: stat.bg }}>
                    <stat.icon className="w-4 h-4 sm:w-5 sm:h-5" style={{ color: stat.color }} />
                  </div>
                  <p className="text-2xl sm:text-3xl font-bold text-[#1C1C1C] leading-none tabular-nums">{stat.value}</p>
                  <p className="text-xs sm:text-sm font-medium text-[#6b6b6b] mt-2 truncate">{stat.label}</p>
                </CardContent>
              </Card>
            </Link>
          </motion.div>
        ))}
      </div>

      {/* Quick actions */}
      <div>
        <h3 className="text-xs font-semibold text-[#9a9a9a] uppercase tracking-widest mb-3">Quick Actions</h3>
        <div className="grid sm:grid-cols-3 gap-3">
          {[
            { label: 'Manage Members',  desc: 'View & approve member policies', href: '/admin/members',  color: '#014D4E' },
            { label: 'Review Claims',   desc: 'Process claim submissions',       href: '/admin/claims',   color: '#C89B3C' },
            { label: 'Record Payments', desc: 'Mark premiums as paid',           href: '/admin/payments', color: '#014D4E' },
          ].map((action, i) => (
            <motion.div key={action.href} {...fade(0.42 + i * 0.06)}>
              <Link href={action.href}>
                <div className="flex items-center gap-3 p-4 bg-white rounded-2xl border border-[#e0d9cc] hover:border-[#C89B3C]/50 hover:shadow-[0_4px_12px_rgba(200,155,60,0.10)] transition-all duration-200 group h-full">
                  <div className="w-9 h-9 rounded-xl bg-[#014D4E] flex items-center justify-center shrink-0 transition-transform group-hover:scale-110">
                    <ArrowRight className="w-4 h-4 text-[#C89B3C]" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-[#014D4E] truncate">{action.label}</p>
                    <p className="text-xs text-[#9a9a9a] truncate">{action.desc}</p>
                  </div>
                  <ArrowRight className="w-3.5 h-3.5 text-[#d0c9bc] group-hover:text-[#C89B3C] transition-colors shrink-0" />
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Recent members */}
      <motion.div {...fade(0.6)}>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-3 pt-5 px-5">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-lg bg-[#014D4E]/10 flex items-center justify-center">
                <Users className="w-3.5 h-3.5 text-[#014D4E]" />
              </div>
              <CardTitle className="text-sm font-semibold text-[#014D4E]">Recent Members</CardTitle>
            </div>
            <Link href="/admin/members" className="flex items-center gap-1 h-7 px-2 rounded-lg text-xs font-medium text-[#9a9a9a] hover:text-[#014D4E] hover:bg-[#014D4E]/10 transition-colors">View all <ArrowRight className="w-3 h-3" /></Link>
          </CardHeader>
          <CardContent className="pt-0 px-0 pb-0">
            {members.length === 0 ? (
              <div className="text-center py-12 px-5">
                <div className="w-12 h-12 rounded-2xl bg-[#F7F3EA] flex items-center justify-center mx-auto mb-3">
                  <Users className="w-5 h-5 text-[#d0c9bc]" />
                </div>
                <p className="text-sm text-[#9a9a9a]">No members yet</p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-sm min-w-[520px]">
                  <thead>
                    <tr className="border-b border-[#F0EDE6]">
                      <th className="py-3 px-5 text-left text-[#9a9a9a] text-xs font-semibold uppercase tracking-wide">Member</th>
                      <th className="py-3 px-3 text-left text-[#9a9a9a] text-xs font-semibold uppercase tracking-wide">Policies</th>
                      <th className="py-3 px-3 text-left text-[#9a9a9a] text-xs font-semibold uppercase tracking-wide">Joined</th>
                      <th className="py-3 px-5 text-left text-[#9a9a9a] text-xs font-semibold uppercase tracking-wide">Role</th>
                    </tr>
                  </thead>
                  <tbody>
                    {members.map((member) => (
                      <tr key={member.id} className="border-b border-[#F0EDE6] last:border-0 hover:bg-[#F7F3EA]/60 transition-colors">
                        <td className="py-3.5 px-5">
                          <div className="flex items-center gap-2.5">
                            <div className="w-8 h-8 rounded-full bg-[#014D4E] text-white text-xs font-bold flex items-center justify-center shrink-0">
                              {member.profile ? `${member.profile.firstName[0]}${member.profile.lastName[0]}` : '?'}
                            </div>
                            <div className="min-w-0">
                              <p className="font-semibold text-[#1C1C1C] truncate text-sm">
                                {member.profile ? `${member.profile.firstName} ${member.profile.lastName}` : 'Incomplete'}
                              </p>
                              <p className="text-[10px] text-[#9a9a9a] truncate">{member.email}</p>
                            </div>
                          </div>
                        </td>
                        <td className="py-3.5 px-3">
                          <div className="flex flex-wrap gap-1">
                            <span className="font-semibold text-[#1C1C1C] text-sm">{member.policies.length}</span>
                            {member.policies.filter((p) => p.status === 'PENDING').length > 0 && (
                              <span className="inline-flex items-center px-1.5 py-0.5 rounded-full text-[10px] font-semibold bg-amber-50 text-amber-700 border border-amber-200">
                                {member.policies.filter((p) => p.status === 'PENDING').length} pending
                              </span>
                            )}
                          </div>
                        </td>
                        <td className="py-3.5 px-3 text-[#9a9a9a] text-xs whitespace-nowrap">{formatDate(member.createdAt)}</td>
                        <td className="py-3.5 px-5">
                          <Badge variant={member.role === 'ADMIN' ? 'default' : 'muted'}>{member.role}</Badge>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </CardContent>
        </Card>
      </motion.div>

    </div>
  )
}
