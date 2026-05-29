'use client'

import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  FileSearch, Plus, CheckCircle2, Clock, AlertCircle,
  DollarSign, ChevronRight, Heart, Share2, Loader2, ChevronDown,
} from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { formatCurrency, formatDate } from '@/lib/utils'
import ClaimWizard from './ClaimWizard'

interface Memorial { token: string }

interface Claim {
  id: string
  claimNumber: string
  status: string
  deceasedFirstName: string
  deceasedLastName: string
  deceasedDateOfDeath: Date
  relationship: string
  claimAmount: unknown
  createdAt: Date
  notes: string | null
  adminNotes: string | null
  rejectionReason: string | null
  approvedAt: Date | null
  paidAt: Date | null
  memorial: Memorial | null
  policy: { policyNumber: string; coverAmount: unknown; product: { name: string } }
}

interface Policy {
  id: string
  policyNumber: string
  coverAmount: unknown
  product: { name: string }
}

const STATUS_STEPS = [
  { key: 'SUBMITTED',    label: 'Submitted',    icon: FileSearch  },
  { key: 'UNDER_REVIEW', label: 'Under Review', icon: Clock       },
  { key: 'APPROVED',     label: 'Approved',     icon: CheckCircle2 },
  { key: 'PAID',         label: 'Paid Out',     icon: DollarSign  },
]

const STATUS_STRIPE: Record<string, string> = {
  PAID:         'bg-green-500',
  APPROVED:     'bg-blue-500',
  UNDER_REVIEW: 'bg-amber-400',
  SUBMITTED:    'bg-[#C89B3C]',
  REJECTED:     'bg-red-500',
}

function ClaimTimeline({ status }: { status: string }) {
  if (status === 'REJECTED') {
    return (
      <div className="flex items-center gap-2.5 px-4 py-2.5 bg-red-50 border border-red-200 rounded-xl">
        <AlertCircle className="w-4 h-4 text-red-500 shrink-0" />
        <span className="text-sm text-red-700 font-semibold">Claim Rejected</span>
      </div>
    )
  }

  const currentIndex = STATUS_STEPS.findIndex((s) => s.key === status)

  return (
    <div className="flex items-center gap-1 overflow-x-auto pb-0.5">
      {STATUS_STEPS.map((step, i) => {
        const done   = i <= currentIndex
        const active = i === currentIndex
        return (
          <React.Fragment key={step.key}>
            <div className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all ${
              active ? 'bg-[#014D4E] text-white shadow-sm' :
              done   ? 'bg-green-100 text-green-700' :
                       'bg-[#F9FAFB] text-[#9a9a9a]'
            }`}>
              <step.icon className="w-3 h-3 shrink-0" />
              <span className="hidden sm:block">{step.label}</span>
            </div>
            {i < STATUS_STEPS.length - 1 && (
              <ChevronRight className={`w-3 h-3 shrink-0 ${done && i < currentIndex ? 'text-green-400' : 'text-[#d0c9bc]'}`} />
            )}
          </React.Fragment>
        )
      })}
    </div>
  )
}

function MemorialCreator({ claim, onCreated }: { claim: Claim; onCreated: (token: string) => void }) {
  const [open,      setOpen]      = useState(false)
  const [tribute,   setTribute]   = useState('')
  const [birthYear, setBirthYear] = useState('')
  const [loading,   setLoading]   = useState(false)

  const handleCreate = async () => {
    setLoading(true)
    try {
      const res = await fetch('/api/memorial', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          claimId: claim.id,
          tribute: tribute || undefined,
          birthYear: birthYear ? parseInt(birthYear) : undefined,
        }),
      })
      if (res.ok) {
        const memorial = await res.json() as { token: string }
        onCreated(memorial.token)
      }
    } catch { /* noop */ }
    finally { setLoading(false) }
  }

  if (!open) {
    return (
      <Button variant="ghost" size="sm" onClick={() => setOpen(true)} className="text-rose-600 hover:text-rose-700 hover:bg-rose-50">
        <Heart className="w-3.5 h-3.5" /> Create Memorial Page
      </Button>
    )
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: -6 }}
      animate={{ opacity: 1, y: 0 }}
      className="mt-3 bg-[#0a0f1e]/5 rounded-2xl p-4 border border-[#E5E7EB] space-y-3"
    >
      <p className="text-sm font-semibold text-[#014D4E]">
        Create a memorial page for {claim.deceasedFirstName}
      </p>
      <div className="grid sm:grid-cols-2 gap-3">
        <div className="space-y-1.5">
          <label className="text-xs font-medium text-[#6b6b6b]">Birth year <span className="text-[#9a9a9a] font-normal">(optional)</span></label>
          <input
            type="number"
            min={1900}
            max={2030}
            value={birthYear}
            onChange={(e) => setBirthYear(e.target.value)}
            placeholder="e.g. 1952"
            className="w-full h-10 rounded-lg border border-[#E5E7EB] px-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#014D4E]/20 bg-white"
          />
        </div>
      </div>
      <div className="space-y-1.5">
        <label className="text-xs font-medium text-[#6b6b6b]">Tribute message <span className="text-[#9a9a9a] font-normal">(optional)</span></label>
        <Textarea
          value={tribute}
          onChange={(e) => setTribute(e.target.value)}
          placeholder="A few words to remember them by…"
          className="min-h-[72px] text-sm resize-none"
          maxLength={2000}
        />
      </div>
      <div className="flex gap-2">
        <Button size="sm" variant="default" disabled={loading} onClick={handleCreate}>
          {loading ? <><Loader2 className="w-3.5 h-3.5 animate-spin" /> Creating…</> : 'Create Page'}
        </Button>
        <Button size="sm" variant="ghost" onClick={() => setOpen(false)}>Cancel</Button>
      </div>
    </motion.div>
  )
}

type ViewState = 'list' | 'wizard' | 'success'

export default function ClaimsPage({ claims, policies }: { claims: unknown[]; policies: unknown[] }) {
  const typedClaims   = claims as Claim[]
  const typedPolicies = policies as Policy[]
  const [view, setView]                     = useState<ViewState>('list')
  const [submittedClaimNumber, setSubmittedClaimNumber] = useState('')
  const [expandedId, setExpandedId]         = useState<string | null>(null)
  const [memorialTokens, setMemorialTokens] = useState<Record<string, string>>(() => {
    const map: Record<string, string> = {}
    for (const c of typedClaims) {
      if (c.memorial?.token) map[c.id] = c.memorial.token
    }
    return map
  })

  const APP_URL = typeof window !== 'undefined' ? window.location.origin : 'https://busizwe.co.za'

  if (view === 'wizard') {
    return (
      <div className="max-w-3xl">
        <div className="bg-white rounded-2xl border border-[#E5E7EB] p-6 sm:p-8">
          <ClaimWizard
            policies={typedPolicies}
            onCancel={() => setView('list')}
            onComplete={(claimNumber) => {
              setSubmittedClaimNumber(claimNumber)
              setView('success')
            }}
          />
        </div>
      </div>
    )
  }

  if (view === 'success') {
    const waText = encodeURIComponent(`My funeral claim ${submittedClaimNumber} has been submitted to Busizwe Burial Society.`)
    return (
      <div className="max-w-xl mx-auto">
        <motion.div
          initial={{ opacity: 0, scale: 0.97 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center py-16 bg-white rounded-2xl border border-[#E5E7EB] px-6"
        >
          <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-5">
            <CheckCircle2 className="w-8 h-8 text-green-600" />
          </div>
          <h3 className="text-2xl font-bold text-[#014D4E] mb-2 font-serif">Claim Submitted</h3>
          <p className="text-[#9a9a9a] text-sm max-w-xs mx-auto mb-3">
            Our team will review it within 48 hours and contact you by phone and WhatsApp.
          </p>
          <p className="text-[#C89B3C] font-mono font-bold text-lg mb-8 bg-[#C89B3C]/8 px-4 py-2 rounded-xl inline-block">
            {submittedClaimNumber}
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Button variant="default" onClick={() => { setView('list'); window.location.reload() }}>
              View My Claims
            </Button>
            <a href={`https://wa.me/?text=${waText}`} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center px-4 py-2 rounded-lg text-sm font-medium text-[#014D4E] hover:bg-[#014D4E]/10 transition-colors">
              <Share2 className="w-4 h-4" /> Share on WhatsApp
            </a>
          </div>
        </motion.div>
      </div>
    )
  }

  return (
    <div className="space-y-6 max-w-4xl">

      {/* Header */}
      <div className="flex items-center justify-between gap-4">
        <p className="text-sm text-[#9a9a9a]">
          <span className="font-bold text-[#1C1C1C]">{typedClaims.length}</span>{' '}
          claim{typedClaims.length !== 1 ? 's' : ''}
        </p>
        {typedPolicies.length > 0 && (
          <Button variant="gold" size="sm" onClick={() => setView('wizard')}>
            <Plus className="w-4 h-4" /> Submit Claim
          </Button>
        )}
      </div>

      {/* Empty */}
      {typedClaims.length === 0 && (
        <div className="text-center py-16 bg-white rounded-2xl border border-[#E5E7EB]">
          <div className="w-16 h-16 rounded-2xl bg-[#F9FAFB] flex items-center justify-center mx-auto mb-4">
            <FileSearch className="w-8 h-8 text-[#d0c9bc]" />
          </div>
          <h3 className="text-lg font-bold text-[#014D4E] mb-2 font-serif">No Claims Submitted</h3>
          <p className="text-[#9a9a9a] text-sm max-w-xs mx-auto mb-6">
            {typedPolicies.length === 0
              ? 'You need an active policy before you can submit a claim.'
              : 'If you have experienced a loss, you can submit a claim against your active policy.'}
          </p>
          {typedPolicies.length > 0 && (
            <Button variant="default" onClick={() => setView('wizard')}>
              <Plus className="w-4 h-4" /> Submit a Claim
            </Button>
          )}
        </div>
      )}

      {/* Claim cards */}
      {typedClaims.length > 0 && (
        <div className="space-y-4">
          {typedClaims.map((claim, i) => (
            <motion.div
              key={claim.id}
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: i * 0.07 }}
            >
              <Card className={`overflow-hidden ${claim.status === 'REJECTED' ? 'border-red-200' : ''}`}>
                {/* Status stripe */}
                <div className={`h-1 ${STATUS_STRIPE[claim.status] ?? 'bg-[#C89B3C]'}`} />

                <CardContent className="p-5">
                  {/* Claim header */}
                  <div className="flex flex-wrap items-start justify-between gap-4 mb-4">
                    <div className="min-w-0">
                      <p className="text-[11px] font-bold text-[#9a9a9a] font-mono uppercase tracking-wider mb-1">
                        {claim.claimNumber}
                      </p>
                      <p className="text-lg font-bold text-[#1C1C1C] leading-snug">
                        {claim.deceasedFirstName} {claim.deceasedLastName}
                      </p>
                      <p className="text-sm text-[#9a9a9a] mt-0.5">
                        {claim.relationship} · Passed {formatDate(claim.deceasedDateOfDeath)}
                      </p>
                    </div>
                    <div className="text-right shrink-0">
                      <p className="text-2xl font-bold text-[#C89B3C] tabular-nums">
                        {formatCurrency(Number(claim.claimAmount))}
                      </p>
                      <p className="text-[10px] text-[#9a9a9a] mt-0.5">Claim amount</p>
                    </div>
                  </div>

                  {/* Timeline */}
                  <ClaimTimeline status={claim.status} />

                  {/* Footer row */}
                  <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
                    <div className="text-xs text-[#9a9a9a] flex flex-wrap gap-3">
                      <span>
                        Policy: <span className="font-semibold text-[#014D4E] font-mono">{claim.policy.policyNumber}</span>
                      </span>
                      <span>
                        Submitted: <span className="font-semibold text-[#014D4E]">{formatDate(claim.createdAt)}</span>
                      </span>
                    </div>
                    <button
                      onClick={() => setExpandedId(expandedId === claim.id ? null : claim.id)}
                      className="flex items-center gap-1 text-xs font-semibold text-[#014D4E] hover:text-[#C89B3C] transition-colors"
                    >
                      {expandedId === claim.id ? 'Hide details' : 'View details'}
                      <ChevronDown className={`w-3.5 h-3.5 transition-transform ${expandedId === claim.id ? 'rotate-180' : ''}`} />
                    </button>
                  </div>

                  {/* Expandable details */}
                  <AnimatePresence>
                    {expandedId === claim.id && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        className="overflow-hidden"
                      >
                        <div className="mt-4 pt-4 border-t border-[#E5E7EB] space-y-3">
                          {claim.notes && (
                            <div>
                              <p className="text-[10px] font-semibold text-[#9a9a9a] uppercase tracking-widest mb-2">Your Notes</p>
                              <p className="text-sm text-[#1C1C1C] leading-relaxed">{claim.notes}</p>
                            </div>
                          )}
                          {claim.adminNotes && (
                            <div className="bg-[#014D4E]/5 rounded-xl p-4">
                              <p className="text-[10px] font-semibold text-[#C89B3C] uppercase tracking-widest mb-2">Admin Notes</p>
                              <p className="text-sm text-[#1C1C1C] leading-relaxed">{claim.adminNotes}</p>
                            </div>
                          )}
                          {claim.rejectionReason && (
                            <div className="bg-red-50 rounded-xl p-4 border border-red-200">
                              <p className="text-[10px] font-semibold text-red-600 uppercase tracking-widest mb-2">Rejection Reason</p>
                              <p className="text-sm text-red-700 leading-relaxed">{claim.rejectionReason}</p>
                            </div>
                          )}
                          {claim.paidAt && (
                            <div className="flex items-center gap-2.5 bg-green-50 rounded-xl p-3.5 border border-green-200">
                              <CheckCircle2 className="w-4 h-4 text-green-600 shrink-0" />
                              <p className="text-sm text-green-700 font-medium">
                                Payout processed on <strong>{formatDate(claim.paidAt)}</strong>
                              </p>
                            </div>
                          )}

                          {/* Memorial */}
                          {['APPROVED', 'PAID'].includes(claim.status) && (
                            <div className="pt-1">
                              {memorialTokens[claim.id] ? (
                                <div className="flex flex-wrap gap-3 items-center bg-[#0a0f1e]/5 rounded-xl p-3.5">
                                  <Heart className="w-4 h-4 text-rose-400 shrink-0" />
                                  <p className="text-sm text-[#1C1C1C] flex-1 font-medium">Memorial page created</p>
                                  <div className="flex gap-2">
                                    <a href={`/memorial/${memorialTokens[claim.id]}`} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center px-4 py-2 rounded-lg text-sm font-medium text-[#014D4E] hover:bg-[#014D4E]/10 transition-colors">
                                      View
                                    </a>
                                    <a
                                      href={`https://wa.me/?text=${encodeURIComponent(
                                        `Please light a candle in memory of ${claim.deceasedFirstName} ${claim.deceasedLastName}: ${APP_URL}/memorial/${memorialTokens[claim.id]}`
                                      )}`}
                                      target="_blank"
                                      rel="noopener noreferrer"
                                      className="flex items-center justify-center px-4 py-2 rounded-lg text-sm font-medium text-[#014D4E] hover:bg-[#014D4E]/10 transition-colors"
                                    >
                                      <Share2 className="w-3.5 h-3.5" /> Share
                                    </a>
                                  </div>
                                </div>
                              ) : (
                                <MemorialCreator
                                  claim={claim}
                                  onCreated={(token) =>
                                    setMemorialTokens((prev) => ({ ...prev, [claim.id]: token }))
                                  }
                                />
                              )}
                            </div>
                          )}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  )
}
