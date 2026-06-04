'use client'

import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Users, Search, CheckCircle2, XCircle, Eye, Filter } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { formatCurrency, formatDate, getStatusColor } from '@/lib/utils'

const AGE_LABELS: Record<string, string> = {
  AGE_16_64: '16 – 64 yrs',
  AGE_65_75: '65 – 75 yrs',
  AGE_75_84: '75 – 84 yrs',
}

interface Dependant {
  id: string
  firstName: string
  lastName: string
  relationship: string
  dateOfBirth: Date
}

interface Policy {
  id: string
  policyNumber: string
  status: string
  monthlyPremium: unknown
  coverAmount: unknown
  startDate: Date | null
  endDate: Date | null
  approvedAt: Date | null
  createdAt: Date
  product: { name: string; category: string }
  pricingTier: { ageGroup: string }
  dependants: Dependant[]
}

interface Member {
  id: string
  email: string
  role: string
  createdAt: Date
  profile: { firstName: string; lastName: string; phone: string | null; idNumber: string | null } | null
  policies: Policy[]
  documents: { id: string; status: string; type: string }[]
}

export default function AdminMembersPage({ members }: { members: unknown[] }) {
  const typedMembers = members as Member[]
  const [search, setSearch] = useState('')
  const [approvingId, setApprovingId] = useState<string | null>(null)
  const [expandedId, setExpandedId] = useState<string | null>(null)

  const filtered = typedMembers.filter((m) => {
    const q = search.toLowerCase()
    const name = m.profile ? `${m.profile.firstName} ${m.profile.lastName}`.toLowerCase() : ''
    return m.email.toLowerCase().includes(q) || name.includes(q)
  })

  const approvePolicy = async (policyId: string) => {
    setApprovingId(policyId)
    try {
      await fetch(`/api/policies/${policyId}/approve`, { method: 'POST' })
      window.location.reload()
    } catch {
      //
    } finally {
      setApprovingId(null)
    }
  }

  return (
    <div className="space-y-6 max-w-6xl">
      {/* Search */}
      <div className="flex gap-3">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#6b6b6b]" />
          <Input
            placeholder="Search members..."
            className="pl-10"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <div className="text-sm text-[#6b6b6b] flex items-center">
          {filtered.length} of {typedMembers.length} members
        </div>
      </div>

      {/* Members table */}
      <Card>
        <CardContent className="p-0">
          {filtered.length === 0 ? (
            <div className="text-center py-16">
              <div className="w-16 h-16 rounded-2xl bg-[#F7F3EA] flex items-center justify-center mx-auto mb-4">
                <Users className="w-8 h-8 text-[#d0c9bc]" />
              </div>
              <p className="text-[#6b6b6b]">{search ? 'No members match your search.' : 'No members yet.'}</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm min-w-[700px]">
                <thead>
                  <tr className="border-b border-[#e0d9cc] bg-[#F7F3EA]">
                    <th className="py-3 px-6 text-left text-[#9a9a9a] text-xs font-semibold uppercase tracking-wide">Member</th>
                    <th className="py-3 px-4 text-left text-[#9a9a9a] text-xs font-semibold uppercase tracking-wide">ID Number</th>
                    <th className="py-3 px-4 text-left text-[#9a9a9a] text-xs font-semibold uppercase tracking-wide">Policies</th>
                    <th className="py-3 px-4 text-left text-[#9a9a9a] text-xs font-semibold uppercase tracking-wide">Documents</th>
                    <th className="py-3 px-4 text-left text-[#9a9a9a] text-xs font-semibold uppercase tracking-wide">Joined</th>
                    <th className="py-3 px-4 text-left text-[#9a9a9a] text-xs font-semibold uppercase tracking-wide">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filtered.map((member) => (
                    <React.Fragment key={member.id}>
                      <tr className="border-b border-[#e0d9cc] hover:bg-[#F7F3EA]/50 transition-colors">
                        <td className="py-3 px-6">
                          <div className="flex items-center gap-3">
                            <div className="w-9 h-9 rounded-full bg-[#014D4E] text-white text-xs font-bold flex items-center justify-center shrink-0">
                              {member.profile ? `${member.profile.firstName[0]}${member.profile.lastName[0]}` : '?'}
                            </div>
                            <div>
                              <p className="font-medium text-[#1C1C1C]">
                                {member.profile ? `${member.profile.firstName} ${member.profile.lastName}` : 'Incomplete Profile'}
                              </p>
                              <p className="text-xs text-[#6b6b6b]">{member.email}</p>
                            </div>
                          </div>
                        </td>
                        <td className="py-3 px-4 font-mono text-xs text-[#6b6b6b]">
                          {member.profile?.idNumber ?? '–'}
                        </td>
                        <td className="py-3 px-4">
                          <div className="flex flex-wrap gap-1">
                            {member.policies.length === 0 ? (
                              <span className="text-[#6b6b6b] text-xs">None</span>
                            ) : (
                              member.policies.slice(0, 2).map((p) => (
                                <span key={p.id} className={`inline-flex items-center px-1.5 py-0.5 rounded-full text-xs font-medium border ${getStatusColor(p.status)}`}>
                                  {p.status}
                                </span>
                              ))
                            )}
                            {member.policies.length > 2 && (
                              <span className="text-xs text-[#6b6b6b]">+{member.policies.length - 2} more</span>
                            )}
                          </div>
                        </td>
                        <td className="py-3 px-4">
                          <div className="flex gap-1">
                            {['PENDING', 'APPROVED', 'REJECTED'].map((s) => {
                              const count = member.documents.filter((d) => d.status === s).length
                              if (count === 0) return null
                              return (
                                <span key={s} className={`inline-flex items-center px-1.5 py-0.5 rounded-full text-xs font-medium border ${getStatusColor(s)}`}>
                                  {count} {s.toLowerCase()}
                                </span>
                              )
                            })}
                            {member.documents.length === 0 && <span className="text-xs text-[#6b6b6b]">None</span>}
                          </div>
                        </td>
                        <td className="py-3 px-4 text-[#6b6b6b] text-xs">{formatDate(member.createdAt)}</td>
                        <td className="py-3 px-4">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => setExpandedId(expandedId === member.id ? null : member.id)}
                          >
                            <Eye className="w-3.5 h-3.5" />
                            {expandedId === member.id ? ' Close' : ' View'}
                          </Button>
                        </td>
                      </tr>
                      {expandedId === member.id && (
                        <tr className="bg-[#F9FAFB]">
                          <td colSpan={6} className="p-5">
                            <div className="space-y-4">
                              <h4 className="font-bold text-[#014D4E] text-sm">
                                Policies — {member.profile ? `${member.profile.firstName} ${member.profile.lastName}` : member.email}
                              </h4>
                              {member.policies.length === 0 ? (
                                <p className="text-sm text-[#6b6b6b]">No policies on record.</p>
                              ) : (
                                member.policies.map((p) => (
                                  <div key={p.id} className="bg-white rounded-2xl border border-[#E5E7EB] overflow-hidden">
                                    {/* Policy header */}
                                    <div className="flex items-center justify-between px-5 py-3.5 border-b border-[#E5E7EB]">
                                      <div>
                                        <p className="font-semibold text-[#014D4E] text-sm">{p.product.name}</p>
                                        <p className="text-xs font-mono text-[#9a9a9a] mt-0.5">{p.policyNumber}</p>
                                      </div>
                                      <div className="flex items-center gap-2">
                                        <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium border ${getStatusColor(p.status)}`}>
                                          {p.status}
                                        </span>
                                        {p.status === 'PENDING' && (
                                          <Button variant="default" size="sm" onClick={() => approvePolicy(p.id)} disabled={approvingId === p.id}>
                                            <CheckCircle2 className="w-3.5 h-3.5" />
                                            {approvingId === p.id ? 'Approving...' : 'Approve'}
                                          </Button>
                                        )}
                                      </div>
                                    </div>
                                    {/* Policy details grid */}
                                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-px bg-[#E5E7EB]">
                                      {[
                                        { label: 'Monthly Premium', value: formatCurrency(Number(p.monthlyPremium)) },
                                        { label: 'Cover Amount',    value: formatCurrency(Number(p.coverAmount)) },
                                        { label: 'Age Group',       value: AGE_LABELS[p.pricingTier?.ageGroup] ?? p.pricingTier?.ageGroup ?? '–' },
                                        { label: 'Start Date',      value: p.startDate ? formatDate(p.startDate) : 'Pending' },
                                        { label: 'Applied',         value: formatDate(p.createdAt) },
                                        { label: 'Approved',        value: p.approvedAt ? formatDate(p.approvedAt) : '–' },
                                        { label: 'Dependants',      value: `${p.dependants.length}` },
                                        { label: 'End Date',        value: p.endDate ? formatDate(p.endDate) : 'Ongoing' },
                                      ].map(({ label, value }) => (
                                        <div key={label} className="bg-white px-4 py-3">
                                          <p className="text-[10px] text-[#9a9a9a] uppercase tracking-wider font-medium">{label}</p>
                                          <p className="text-sm font-semibold text-[#1C1C1C] mt-0.5">{value}</p>
                                        </div>
                                      ))}
                                    </div>
                                    {/* Dependants list */}
                                    {p.dependants.length > 0 && (
                                      <div className="px-5 py-3 border-t border-[#E5E7EB]">
                                        <p className="text-[10px] text-[#9a9a9a] uppercase tracking-wider font-medium mb-2">Dependants</p>
                                        <div className="flex flex-wrap gap-2">
                                          {p.dependants.map((d) => (
                                            <span key={d.id} className="inline-flex items-center gap-1.5 px-3 py-1 bg-[#F9FAFB] border border-[#E5E7EB] rounded-full text-xs font-medium text-[#374151]">
                                              {d.firstName} {d.lastName}
                                              <span className="text-[#9a9a9a]">· {d.relationship.toLowerCase()}</span>
                                            </span>
                                          ))}
                                        </div>
                                      </div>
                                    )}
                                  </div>
                                ))
                              )}
                            </div>
                          </td>
                        </tr>
                      )}
                    </React.Fragment>
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
