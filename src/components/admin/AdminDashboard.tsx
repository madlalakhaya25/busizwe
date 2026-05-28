'use client'

import React from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { Users, FileText, FolderOpen, CreditCard, TrendingUp, Clock, AlertCircle, ArrowRight } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
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

export default function AdminDashboard({ stats, recentMembers }: { stats: Stats; recentMembers: unknown[] }) {
  const members = recentMembers as Member[]

  const STAT_CARDS = [
    { icon: Users, label: 'Total Members', value: stats.totalMembers, color: '#014D4E', href: '/admin/members' },
    { icon: FileText, label: 'Active Policies', value: stats.activePolices, color: '#16a34a', href: '/admin/members' },
    { icon: Clock, label: 'Pending Approval', value: stats.pendingPolicies, color: '#C89B3C', href: '/admin/members' },
    { icon: TrendingUp, label: 'Total Premiums Collected', value: formatCurrency(stats.totalPremiums), color: '#014D4E', href: '/admin/payments' },
    { icon: FolderOpen, label: 'Pending Documents', value: stats.pendingDocuments, color: '#C89B3C', href: '/admin/members' },
    { icon: AlertCircle, label: 'Overdue Payments', value: stats.overduePayments, color: '#dc2626', href: '/admin/payments' },
  ]

  return (
    <div className="space-y-8">
      <div>
        <p className="text-[#6b6b6b]">Welcome to the Busizwe administration panel.</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
        {STAT_CARDS.map((stat, i) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: i * 0.07 }}
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
                  <p className="text-sm text-[#6b6b6b] mt-1">{stat.label}</p>
                </CardContent>
              </Card>
            </Link>
          </motion.div>
        ))}
      </div>

      {/* Quick actions */}
      <div className="grid sm:grid-cols-3 gap-4">
        {[
          { label: 'Manage Members', desc: 'View & approve member policies', href: '/admin/members', color: '#014D4E' },
          { label: 'Manage Products', desc: 'Update products & pricing', href: '/admin/products', color: '#C89B3C' },
          { label: 'Record Payments', desc: 'Mark premiums as paid', href: '/admin/payments', color: '#014D4E' },
        ].map((action) => (
          <Link key={action.href} href={action.href}>
            <div className="p-5 bg-white rounded-xl border border-[#e0d9cc] hover:border-[#C89B3C]/50 hover:shadow-[0_4px_16px_rgba(200,155,60,0.1)] transition-all duration-200 group">
              <p className="font-bold text-[#014D4E] mb-1 group-hover:text-[#C89B3C] transition-colors">{action.label}</p>
              <p className="text-xs text-[#6b6b6b]">{action.desc}</p>
              <ArrowRight className="w-4 h-4 text-[#6b6b6b] group-hover:text-[#C89B3C] mt-3 transition-colors" />
            </div>
          </Link>
        ))}
      </div>

      {/* Recent members */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="text-base">Recent Members</CardTitle>
          <Button variant="ghost" size="sm" asChild>
            <Link href="/admin/members">View all <ArrowRight className="w-3 h-3" /></Link>
          </Button>
        </CardHeader>
        <CardContent>
          {members.length === 0 ? (
            <div className="text-center py-8">
              <Users className="w-10 h-10 text-[#e0d9cc] mx-auto mb-3" />
              <p className="text-sm text-[#6b6b6b]">No members yet</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-[#e0d9cc]">
                    <th className="py-3 text-left text-[#6b6b6b] font-medium">Member</th>
                    <th className="py-3 text-left text-[#6b6b6b] font-medium">Email</th>
                    <th className="py-3 text-left text-[#6b6b6b] font-medium">Policies</th>
                    <th className="py-3 text-left text-[#6b6b6b] font-medium">Joined</th>
                    <th className="py-3 text-left text-[#6b6b6b] font-medium">Role</th>
                  </tr>
                </thead>
                <tbody>
                  {members.map((member) => (
                    <tr key={member.id} className="border-b border-[#e0d9cc] last:border-0 hover:bg-[#F7F3EA] transition-colors">
                      <td className="py-3">
                        <div className="flex items-center gap-2">
                          <div className="w-8 h-8 rounded-full bg-[#014D4E] text-white text-xs font-bold flex items-center justify-center">
                            {member.profile ? `${member.profile.firstName[0]}${member.profile.lastName[0]}` : '?'}
                          </div>
                          <span className="font-medium text-[#1C1C1C]">
                            {member.profile ? `${member.profile.firstName} ${member.profile.lastName}` : 'Incomplete'}
                          </span>
                        </div>
                      </td>
                      <td className="py-3 text-[#6b6b6b]">{member.email}</td>
                      <td className="py-3">
                        <span className="font-medium text-[#1C1C1C]">{member.policies.length}</span>
                        {member.policies.filter((p) => p.status === 'PENDING').length > 0 && (
                          <span className="ml-2 inline-flex items-center px-1.5 py-0.5 rounded-full text-xs font-medium bg-amber-50 text-amber-700 border border-amber-200">
                            {member.policies.filter((p) => p.status === 'PENDING').length} pending
                          </span>
                        )}
                      </td>
                      <td className="py-3 text-[#6b6b6b]">{formatDate(member.createdAt)}</td>
                      <td className="py-3">
                        <Badge variant={member.role === 'ADMIN' ? 'default' : 'secondary'}>
                          {member.role}
                        </Badge>
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
