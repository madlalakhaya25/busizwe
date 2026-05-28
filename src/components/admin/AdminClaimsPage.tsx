'use client'

import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import {
  FileSearch, CheckCircle2, Clock, AlertCircle, DollarSign,
  ChevronDown, ChevronUp, User, Calendar,
} from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { formatCurrency, formatDate } from '@/lib/utils'

interface Claim {
  id: string
  claimNumber: string
  status: string
  deceasedFirstName: string
  deceasedLastName: string
  deceasedDateOfDeath: Date
  relationship: string
  claimAmount: unknown
  notes: string | null
  adminNotes: string | null
  rejectionReason: string | null
  createdAt: Date
  approvedAt: Date | null
  paidAt: Date | null
  funeralDate: Date | null
  funeralHome: string | null
  user: {
    email: string
    profile: { firstName: string; lastName: string; phone: string | null } | null
  }
  policy: { policyNumber: string; coverAmount: unknown; product: { name: string } }
}

const STATUS_BADGE: Record<string, { bg: string; text: string; label: string }> = {
  SUBMITTED: { bg: 'bg-[#C89B3C]/10', text: 'text-[#C89B3C]', label: 'Submitted' },
  UNDER_REVIEW: { bg: 'bg-amber-100', text: 'text-amber-700', label: 'Under Review' },
  APPROVED: { bg: 'bg-blue-100', text: 'text-blue-700', label: 'Approved' },
  PAID: { bg: 'bg-green-100', text: 'text-green-700', label: 'Paid Out' },
  REJECTED: { bg: 'bg-red-100', text: 'text-red-700', label: 'Rejected' },
}

function StatusBadge({ status }: { status: string }) {
  const s = STATUS_BADGE[status] ?? { bg: 'bg-gray-100', text: 'text-gray-600', label: status }
  return (
    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold ${s.bg} ${s.text}`}>
      {status === 'PAID' && <CheckCircle2 className="w-3 h-3" />}
      {status === 'REJECTED' && <AlertCircle className="w-3 h-3" />}
      {status === 'UNDER_REVIEW' && <Clock className="w-3 h-3" />}
      {s.label}
    </span>
  )
}

function ReviewPanel({ claim, onDone }: { claim: Claim; onDone: () => void }) {
  const router = useRouter()
  const [adminNotes, setAdminNotes] = useState(claim.adminNotes ?? '')
  const [rejectionReason, setRejectionReason] = useState(claim.rejectionReason ?? '')
  const [loading, setLoading] = useState<string | null>(null)

  const act = async (action: string) => {
    setLoading(action)
    try {
      const res = await fetch(`/api/claims/${claim.id}/review`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action, adminNotes, rejectionReason }),
      })
      if (res.ok) { onDone(); router.refresh() }
    } catch { /* noop */ }
    finally { setLoading(null) }
  }

  return (
    <div className="mt-4 pt-4 border-t border-[#e0d9cc] space-y-4">
      <div className="space-y-1.5">
        <Label className="text-xs text-[#6b6b6b] uppercase tracking-widest">Admin Notes</Label>
        <Textarea
          value={adminNotes}
          onChange={(e) => setAdminNotes(e.target.value)}
          placeholder="Internal notes visible to admins only…"
          className="min-h-[72px] text-sm"
        />
      </div>

      {(claim.status === 'SUBMITTED' || claim.status === 'UNDER_REVIEW') && (
        <div className="space-y-1.5">
          <Label className="text-xs text-[#6b6b6b] uppercase tracking-widest">Rejection Reason (if rejecting)</Label>
          <Textarea
            value={rejectionReason}
            onChange={(e) => setRejectionReason(e.target.value)}
            placeholder="Provide a reason shown to the member…"
            className="min-h-[60px] text-sm"
          />
        </div>
      )}

      <div className="flex flex-wrap gap-2">
        {claim.status === 'SUBMITTED' && (
          <Button size="sm" variant="outline" disabled={!!loading} onClick={() => act('UNDER_REVIEW')}>
            {loading === 'UNDER_REVIEW' ? 'Saving…' : 'Mark Under Review'}
          </Button>
        )}
        {(claim.status === 'SUBMITTED' || claim.status === 'UNDER_REVIEW') && (
          <>
            <Button size="sm" variant="default" disabled={!!loading} onClick={() => act('APPROVE')}>
              {loading === 'APPROVE' ? 'Saving…' : 'Approve'}
            </Button>
            <Button size="sm" variant="destructive" disabled={!!loading} onClick={() => act('REJECT')}>
              {loading === 'REJECT' ? 'Saving…' : 'Reject'}
            </Button>
          </>
        )}
        {claim.status === 'APPROVED' && (
          <Button size="sm" variant="default" disabled={!!loading} onClick={() => act('MARK_PAID')}>
            {loading === 'MARK_PAID' ? 'Saving…' : <><DollarSign className="w-3.5 h-3.5" /> Mark as Paid</>}
          </Button>
        )}
        {['PAID', 'REJECTED'].includes(claim.status) && (
          <Button size="sm" variant="outline" disabled={!!loading} onClick={() => act('UNDER_REVIEW')}>
            Reopen
          </Button>
        )}
      </div>
    </div>
  )
}

const FILTER_OPTIONS = ['ALL', 'SUBMITTED', 'UNDER_REVIEW', 'APPROVED', 'PAID', 'REJECTED']

export default function AdminClaimsPage({ claims }: { claims: unknown[] }) {
  const typedClaims = claims as Claim[]
  const [filter, setFilter] = useState('ALL')
  const [expandedId, setExpandedId] = useState<string | null>(null)

  const filtered = filter === 'ALL' ? typedClaims : typedClaims.filter((c) => c.status === filter)

  return (
    <div className="space-y-6">
      {/* Filter tabs */}
      <div className="flex flex-wrap gap-2">
        {FILTER_OPTIONS.map((f) => {
          const count = f === 'ALL' ? typedClaims.length : typedClaims.filter((c) => c.status === f).length
          return (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${
                filter === f
                  ? 'bg-[#014D4E] text-white'
                  : 'bg-white text-[#6b6b6b] border border-[#e0d9cc] hover:border-[#014D4E] hover:text-[#014D4E]'
              }`}
            >
              {f === 'ALL' ? 'All' : STATUS_BADGE[f]?.label ?? f} ({count})
            </button>
          )
        })}
      </div>

      {filtered.length === 0 && (
        <div className="text-center py-20 bg-white rounded-2xl border border-[#e0d9cc]">
          <FileSearch className="w-16 h-16 text-[#e0d9cc] mx-auto mb-4" />
          <h3 className="text-xl font-bold text-[#014D4E] mb-2" style={{ fontFamily: 'Georgia, serif' }}>
            No Claims
          </h3>
          <p className="text-[#6b6b6b] text-sm">
            {filter === 'ALL' ? 'No claims have been submitted yet.' : `No claims with status "${STATUS_BADGE[filter]?.label ?? filter}".`}
          </p>
        </div>
      )}

      <div className="space-y-4">
        {filtered.map((claim, i) => {
          const isExpanded = expandedId === claim.id
          const memberName = claim.user.profile
            ? `${claim.user.profile.firstName} ${claim.user.profile.lastName}`
            : claim.user.email

          return (
            <motion.div
              key={claim.id}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: i * 0.05 }}
            >
              <Card className={claim.status === 'REJECTED' ? 'border-red-200' : ''}>
                <div className={`h-1 ${
                  claim.status === 'PAID' ? 'bg-green-500' :
                  claim.status === 'APPROVED' ? 'bg-blue-500' :
                  claim.status === 'UNDER_REVIEW' ? 'bg-amber-500' :
                  claim.status === 'REJECTED' ? 'bg-red-500' :
                  'bg-[#C89B3C]'
                }`} />
                <CardContent className="p-5">
                  <div className="flex flex-wrap items-start justify-between gap-4">
                    <div className="flex-1 min-w-0">
                      <div className="flex flex-wrap items-center gap-2 mb-1">
                        <p className="font-mono text-sm font-bold text-[#014D4E]">{claim.claimNumber}</p>
                        <StatusBadge status={claim.status} />
                      </div>
                      <p className="text-lg font-bold text-[#1C1C1C]">
                        {claim.deceasedFirstName} {claim.deceasedLastName}
                      </p>
                      <div className="flex flex-wrap gap-x-4 gap-y-1 mt-1">
                        <span className="text-sm text-[#6b6b6b] flex items-center gap-1">
                          <User className="w-3.5 h-3.5" /> {memberName}
                        </span>
                        <span className="text-sm text-[#6b6b6b] flex items-center gap-1">
                          <Calendar className="w-3.5 h-3.5" /> Passed {formatDate(claim.deceasedDateOfDeath)}
                        </span>
                      </div>
                      <p className="text-xs text-[#6b6b6b] mt-1">
                        Policy: <span className="font-medium text-[#014D4E]">{claim.policy.policyNumber}</span>
                        <span className="mx-2">·</span>
                        Submitted: <span className="font-medium">{formatDate(claim.createdAt)}</span>
                      </p>
                    </div>
                    <div className="text-right shrink-0">
                      <p className="text-2xl font-bold text-[#C89B3C]">{formatCurrency(Number(claim.claimAmount))}</p>
                      <p className="text-xs text-[#6b6b6b]">Claim amount</p>
                      <p className="text-xs text-[#6b6b6b] mt-0.5">
                        Cover: {formatCurrency(Number(claim.policy.coverAmount))}
                      </p>
                    </div>
                  </div>

                  <div className="mt-3 flex justify-end">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setExpandedId(isExpanded ? null : claim.id)}
                    >
                      {isExpanded ? (
                        <><ChevronUp className="w-4 h-4" /> Collapse</>
                      ) : (
                        <><ChevronDown className="w-4 h-4" /> Review</>
                      )}
                    </Button>
                  </div>

                  {isExpanded && (
                    <div className="mt-2 space-y-3">
                      {/* Claim details */}
                      <div className="grid sm:grid-cols-2 gap-3 bg-[#F7F3EA] rounded-xl p-4 text-sm">
                        <div>
                          <p className="text-xs text-[#6b6b6b] uppercase tracking-widest mb-0.5">Relationship</p>
                          <p className="font-medium text-[#1C1C1C]">{claim.relationship}</p>
                        </div>
                        {claim.funeralDate && (
                          <div>
                            <p className="text-xs text-[#6b6b6b] uppercase tracking-widest mb-0.5">Funeral Date</p>
                            <p className="font-medium text-[#1C1C1C]">{formatDate(claim.funeralDate)}</p>
                          </div>
                        )}
                        {claim.funeralHome && (
                          <div>
                            <p className="text-xs text-[#6b6b6b] uppercase tracking-widest mb-0.5">Funeral Home</p>
                            <p className="font-medium text-[#1C1C1C]">{claim.funeralHome}</p>
                          </div>
                        )}
                        {claim.user.profile?.phone && (
                          <div>
                            <p className="text-xs text-[#6b6b6b] uppercase tracking-widest mb-0.5">Member Phone</p>
                            <p className="font-medium text-[#1C1C1C]">{claim.user.profile.phone}</p>
                          </div>
                        )}
                        <div className="sm:col-span-2">
                          <p className="text-xs text-[#6b6b6b] uppercase tracking-widest mb-0.5">Member Email</p>
                          <p className="font-medium text-[#1C1C1C]">{claim.user.email}</p>
                        </div>
                      </div>

                      {claim.notes && (
                        <div className="bg-white rounded-xl p-4 border border-[#e0d9cc]">
                          <p className="text-xs text-[#6b6b6b] uppercase tracking-widest mb-1 font-semibold">Member Notes</p>
                          <p className="text-sm text-[#1C1C1C]">{claim.notes}</p>
                        </div>
                      )}

                      {claim.paidAt && (
                        <div className="flex items-center gap-2 bg-green-50 rounded-xl p-3 border border-green-200">
                          <CheckCircle2 className="w-4 h-4 text-green-600" />
                          <p className="text-sm text-green-700">
                            Payout processed on <strong>{formatDate(claim.paidAt)}</strong>
                          </p>
                        </div>
                      )}

                      <ReviewPanel claim={claim} onDone={() => setExpandedId(null)} />
                    </div>
                  )}
                </CardContent>
              </Card>
            </motion.div>
          )
        })}
      </div>
    </div>
  )
}
