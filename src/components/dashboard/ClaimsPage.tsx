'use client'

import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  FileSearch, Plus, CheckCircle2, Clock, AlertCircle,
  DollarSign, ChevronRight, Heart, Share2, Loader2,
} from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { formatCurrency, formatDate } from '@/lib/utils'
import ClaimWizard from './ClaimWizard'

interface Memorial {
  token: string
}

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
  { key: 'SUBMITTED', label: 'Submitted', icon: FileSearch },
  { key: 'UNDER_REVIEW', label: 'Under Review', icon: Clock },
  { key: 'APPROVED', label: 'Approved', icon: CheckCircle2 },
  { key: 'PAID', label: 'Paid Out', icon: DollarSign },
]

function ClaimTimeline({ status }: { status: string }) {
  const steps = STATUS_STEPS
  const currentIndex = status === 'REJECTED' ? -1 : steps.findIndex((s) => s.key === status)

  if (status === 'REJECTED') {
    return (
      <div className="flex items-center gap-2 px-4 py-2.5 bg-red-50 border border-red-200 rounded-xl">
        <AlertCircle className="w-4 h-4 text-red-600 shrink-0" />
        <span className="text-sm text-red-700 font-medium">Claim Rejected</span>
      </div>
    )
  }

  return (
    <div className="flex items-center gap-1">
      {steps.map((step, i) => {
        const done = i <= currentIndex
        const active = i === currentIndex
        return (
          <React.Fragment key={step.key}>
            <div className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-medium transition-all ${
              active ? 'bg-[#014D4E] text-white' :
              done ? 'bg-green-100 text-green-700' :
              'bg-[#F7F3EA] text-[#6b6b6b]'
            }`}>
              <step.icon className="w-3 h-3" />
              <span className="hidden sm:block">{step.label}</span>
            </div>
            {i < steps.length - 1 && (
              <ChevronRight className={`w-3 h-3 shrink-0 ${done && i < currentIndex ? 'text-green-500' : 'text-[#e0d9cc]'}`} />
            )}
          </React.Fragment>
        )
      })}
    </div>
  )
}

function MemorialCreator({ claim, onCreated }: { claim: Claim; onCreated: (token: string) => void }) {
  const [open, setOpen] = useState(false)
  const [tribute, setTribute] = useState('')
  const [birthYear, setBirthYear] = useState('')
  const [loading, setLoading] = useState(false)

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
      <Button variant="ghost" size="sm" onClick={() => setOpen(true)}>
        <Heart className="w-3.5 h-3.5 text-rose-400" /> Create Memorial Page
      </Button>
    )
  }

  return (
    <div className="mt-4 bg-[#F7F3EA] rounded-2xl p-4 border border-[#e0d9cc] space-y-3">
      <p className="text-sm font-semibold text-[#014D4E]">
        Create a memorial page for {claim.deceasedFirstName}
      </p>
      <div className="space-y-2">
        <label className="text-xs text-[#6b6b6b]">Birth year (optional)</label>
        <input
          type="number"
          min={1900}
          max={2025}
          value={birthYear}
          onChange={(e) => setBirthYear(e.target.value)}
          placeholder="e.g. 1952"
          className="w-full rounded-xl border border-[#e0d9cc] px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#014D4E]/20"
        />
      </div>
      <div className="space-y-2">
        <label className="text-xs text-[#6b6b6b]">A tribute (optional)</label>
        <Textarea
          value={tribute}
          onChange={(e) => setTribute(e.target.value)}
          placeholder="A few words to remember them by…"
          className="min-h-[72px] text-sm"
          maxLength={2000}
        />
      </div>
      <div className="flex gap-2">
        <Button size="sm" variant="default" disabled={loading} onClick={handleCreate}>
          {loading ? <><Loader2 className="w-3.5 h-3.5 animate-spin" /> Creating…</> : <>Create Page</>}
        </Button>
        <Button size="sm" variant="ghost" onClick={() => setOpen(false)}>Cancel</Button>
      </div>
    </div>
  )
}

type ViewState = 'list' | 'wizard' | 'success'

export default function ClaimsPage({ claims, policies }: { claims: unknown[]; policies: unknown[] }) {
  const typedClaims = claims as Claim[]
  const typedPolicies = policies as Policy[]
  const [view, setView] = useState<ViewState>('list')
  const [submittedClaimNumber, setSubmittedClaimNumber] = useState('')
  const [expandedId, setExpandedId] = useState<string | null>(null)
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
      <div className="bg-white rounded-2xl border border-[#e0d9cc] p-6 sm:p-8">
        <ClaimWizard
          policies={typedPolicies}
          onCancel={() => setView('list')}
          onComplete={(claimNumber) => {
            setSubmittedClaimNumber(claimNumber)
            setView('success')
          }}
        />
      </div>
    )
  }

  if (view === 'success') {
    const waText = encodeURIComponent(`My funeral claim ${submittedClaimNumber} has been submitted to Busizwe Burial Society.`)
    return (
      <div className="text-center py-20 bg-white rounded-2xl border border-[#e0d9cc] px-6">
        <CheckCircle2 className="w-16 h-16 text-green-500 mx-auto mb-4" />
        <h3 className="text-2xl font-bold text-[#014D4E] mb-2 font-serif">
          Claim Submitted
        </h3>
        <p className="text-[#6b6b6b] text-sm max-w-sm mx-auto mb-2">
          We have received your claim. Our team will review it within 48 hours and reach out by phone and WhatsApp.
        </p>
        <p className="text-[#C89B3C] font-mono font-bold text-lg mb-8">{submittedClaimNumber}</p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Button variant="default" onClick={() => { setView('list'); window.location.reload() }}>
            View My Claims
          </Button>
          <Button variant="ghost" asChild>
            <a href={`https://wa.me/?text=${waText}`} target="_blank" rel="noopener noreferrer">
              <Share2 className="w-4 h-4" /> Share on WhatsApp
            </a>
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <p className="text-[#6b6b6b] text-sm">
          {typedClaims.length} claim{typedClaims.length !== 1 ? 's' : ''}
        </p>
        {typedPolicies.length > 0 && (
          <Button variant="gold" size="sm" onClick={() => setView('wizard')}>
            <Plus className="w-4 h-4" /> Submit Claim
          </Button>
        )}
      </div>

      {typedClaims.length === 0 && (
        <div className="text-center py-20 bg-white rounded-2xl border border-[#e0d9cc]">
          <FileSearch className="w-16 h-16 text-[#e0d9cc] mx-auto mb-4" />
          <h3 className="text-xl font-bold text-[#014D4E] mb-2 font-serif">
            No Claims Submitted
          </h3>
          <p className="text-[#6b6b6b] text-sm max-w-sm mx-auto mb-6">
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

      {typedClaims.length > 0 && (
        <div className="space-y-4">
          {typedClaims.map((claim, i) => (
            <motion.div
              key={claim.id}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: i * 0.08 }}
            >
              <Card className={`overflow-hidden ${claim.status === 'REJECTED' ? 'border-red-200' : ''}`}>
                <div className={`h-1 ${
                  claim.status === 'PAID' ? 'bg-green-500' :
                  claim.status === 'APPROVED' ? 'bg-blue-500' :
                  claim.status === 'UNDER_REVIEW' ? 'bg-amber-500' :
                  claim.status === 'REJECTED' ? 'bg-red-500' :
                  'bg-[#C89B3C]'
                }`} />
                <CardContent className="p-5">
                  <div className="flex flex-wrap items-start justify-between gap-4 mb-4">
                    <div>
                      <p className="font-bold text-[#014D4E] font-mono text-sm">{claim.claimNumber}</p>
                      <p className="text-lg font-bold text-[#1C1C1C]">
                        {claim.deceasedFirstName} {claim.deceasedLastName}
                      </p>
                      <p className="text-sm text-[#6b6b6b]">
                        {claim.relationship} · Passed {formatDate(claim.deceasedDateOfDeath)}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-2xl font-bold text-[#C89B3C]">{formatCurrency(Number(claim.claimAmount))}</p>
                      <p className="text-xs text-[#6b6b6b]">Claim amount</p>
                    </div>
                  </div>

                  <ClaimTimeline status={claim.status} />

                  <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
                    <div className="text-sm text-[#6b6b6b]">
                      Policy: <span className="font-medium text-[#014D4E]">{claim.policy.policyNumber}</span>
                      <span className="mx-2">·</span>
                      Submitted: <span className="font-medium text-[#014D4E]">{formatDate(claim.createdAt)}</span>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setExpandedId(expandedId === claim.id ? null : claim.id)}
                    >
                      {expandedId === claim.id ? 'Hide details' : 'View details'}
                    </Button>
                  </div>

                  <AnimatePresence>
                    {expandedId === claim.id && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        className="overflow-hidden"
                      >
                        <div className="mt-4 pt-4 border-t border-[#e0d9cc] space-y-3">
                          {claim.notes && (
                            <div>
                              <p className="text-xs text-[#6b6b6b] uppercase tracking-widest mb-1">Your Notes</p>
                              <p className="text-sm text-[#1C1C1C]">{claim.notes}</p>
                            </div>
                          )}
                          {claim.adminNotes && (
                            <div className="bg-[#014D4E]/5 rounded-xl p-4">
                              <p className="text-xs text-[#C89B3C] uppercase tracking-widest mb-1 font-semibold">Admin Notes</p>
                              <p className="text-sm text-[#1C1C1C]">{claim.adminNotes}</p>
                            </div>
                          )}
                          {claim.rejectionReason && (
                            <div className="bg-red-50 rounded-xl p-4 border border-red-200">
                              <p className="text-xs text-red-600 uppercase tracking-widest mb-1 font-semibold">Rejection Reason</p>
                              <p className="text-sm text-red-700">{claim.rejectionReason}</p>
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

                          {/* Memorial section */}
                          {['APPROVED', 'PAID'].includes(claim.status) && (
                            <div className="pt-2">
                              {memorialTokens[claim.id] ? (
                                <div className="flex flex-wrap gap-3 items-center bg-[#0a0f1e]/5 rounded-xl p-3">
                                  <Heart className="w-4 h-4 text-rose-400 shrink-0" />
                                  <p className="text-sm text-[#1C1C1C] flex-1">Memorial page created</p>
                                  <div className="flex gap-2">
                                    <Button size="sm" variant="ghost" asChild>
                                      <a href={`/memorial/${memorialTokens[claim.id]}`} target="_blank" rel="noopener noreferrer">
                                        View
                                      </a>
                                    </Button>
                                    <Button size="sm" variant="ghost" asChild>
                                      <a
                                        href={`https://wa.me/?text=${encodeURIComponent(`Please light a candle in memory of ${claim.deceasedFirstName} ${claim.deceasedLastName}: ${APP_URL}/memorial/${memorialTokens[claim.id]}`)}`}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                      >
                                        <Share2 className="w-3.5 h-3.5" /> Share
                                      </a>
                                    </Button>
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
