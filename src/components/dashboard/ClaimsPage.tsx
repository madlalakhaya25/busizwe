'use client'

import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  FileSearch, Plus, X, CheckCircle2, Clock, AlertCircle,
  DollarSign, ChevronRight, Upload, Calendar,
} from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { formatCurrency, formatDate, getStatusColor } from '@/lib/utils'

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

const RELATIONSHIPS = ['Spouse', 'Child', 'Parent', 'Sibling', 'Grandparent', 'Grandchild', 'Other']

function ClaimTimeline({ status }: { status: string }) {
  const steps = STATUS_STEPS
  const currentIndex = status === 'REJECTED'
    ? -1
    : steps.findIndex((s) => s.key === status)

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

export default function ClaimsPage({ claims, policies }: { claims: unknown[]; policies: unknown[] }) {
  const typedClaims = claims as Claim[]
  const typedPolicies = policies as Policy[]
  const [showForm, setShowForm] = useState(false)
  const [loading, setLoading] = useState(false)
  const [expandedId, setExpandedId] = useState<string | null>(null)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setLoading(true)
    const form = e.currentTarget
    const data = Object.fromEntries(new FormData(form))
    try {
      const res = await fetch('/api/claims', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })
      if (res.ok) { setShowForm(false); window.location.reload() }
    } catch { /* noop */ }
    finally { setLoading(false) }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <p className="text-[#6b6b6b] text-sm">
          {typedClaims.length} claim{typedClaims.length !== 1 ? 's' : ''}
        </p>
        {typedPolicies.length > 0 && !showForm && (
          <Button variant="gold" size="sm" onClick={() => setShowForm(true)}>
            <Plus className="w-4 h-4" /> Submit Claim
          </Button>
        )}
      </div>

      {/* Claim submission form */}
      <AnimatePresence>
        {showForm && (
          <motion.div initial={{ opacity: 0, y: -12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -12 }}>
            <Card className="border-[#C89B3C]/30">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-base">Submit a New Claim</CardTitle>
                <button onClick={() => setShowForm(false)} className="text-[#6b6b6b] hover:text-[#1C1C1C]">
                  <X className="w-4 h-4" />
                </button>
              </CardHeader>
              <CardContent>
                <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 mb-6 text-sm text-amber-800">
                  <strong>Important:</strong> Only submit a claim for an active policy. You will need to upload
                  supporting documents (death certificate, deceased&apos;s ID). Our team will contact you within
                  48 hours to guide you through the process.
                </div>
                <form onSubmit={handleSubmit} className="grid sm:grid-cols-2 gap-4">
                  <div className="sm:col-span-2 space-y-1.5">
                    <Label>Policy</Label>
                    <Select name="policyId" required>
                      <SelectTrigger><SelectValue placeholder="Select active policy" /></SelectTrigger>
                      <SelectContent>
                        {typedPolicies.map((p) => (
                          <SelectItem key={p.id} value={p.id}>
                            {p.policyNumber} – {p.product.name} ({formatCurrency(Number(p.coverAmount))})
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-1.5">
                    <Label>Deceased First Name</Label>
                    <Input name="deceasedFirstName" placeholder="First name" required />
                  </div>
                  <div className="space-y-1.5">
                    <Label>Deceased Last Name</Label>
                    <Input name="deceasedLastName" placeholder="Last name" required />
                  </div>
                  <div className="space-y-1.5">
                    <Label>Deceased ID Number (optional)</Label>
                    <Input name="deceasedIdNumber" placeholder="1234567890123" />
                  </div>
                  <div className="space-y-1.5">
                    <Label>Date of Death</Label>
                    <Input name="deceasedDateOfDeath" type="date" required max={new Date().toISOString().split('T')[0]} />
                  </div>
                  <div className="space-y-1.5">
                    <Label>Your Relationship to Deceased</Label>
                    <Select name="relationship" required>
                      <SelectTrigger><SelectValue placeholder="Select relationship" /></SelectTrigger>
                      <SelectContent>
                        {RELATIONSHIPS.map((r) => <SelectItem key={r} value={r}>{r}</SelectItem>)}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-1.5">
                    <Label>Funeral Date (optional)</Label>
                    <Input name="funeralDate" type="date" />
                  </div>
                  <div className="space-y-1.5">
                    <Label>Funeral Home (optional)</Label>
                    <Input name="funeralHome" placeholder="Name of funeral parlour" />
                  </div>
                  <div className="sm:col-span-2 space-y-1.5">
                    <Label>Additional Notes (optional)</Label>
                    <Textarea name="notes" placeholder="Any additional information to support your claim..." className="min-h-[80px]" />
                  </div>

                  <div className="sm:col-span-2 bg-[#F7F3EA] rounded-xl p-4 border border-[#e0d9cc]">
                    <p className="text-sm font-medium text-[#014D4E] mb-2 flex items-center gap-2">
                      <Upload className="w-4 h-4 text-[#C89B3C]" /> Documents to Upload After Submission
                    </p>
                    <ul className="text-xs text-[#6b6b6b] space-y-1 ml-6">
                      <li>• Original death certificate of the deceased</li>
                      <li>• ID document of the deceased</li>
                      <li>• Your ID document (claimant)</li>
                      <li>• Bank account details for payout</li>
                    </ul>
                    <p className="text-xs text-[#6b6b6b] mt-3">
                      Upload these via the <strong>Documents</strong> section after submitting this form.
                    </p>
                  </div>

                  <div className="sm:col-span-2 flex gap-3">
                    <Button type="submit" variant="default" disabled={loading}>
                      {loading ? 'Submitting...' : 'Submit Claim'}
                    </Button>
                    <Button type="button" variant="secondary" onClick={() => setShowForm(false)}>Cancel</Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>

      {/* No claims */}
      {typedClaims.length === 0 && !showForm && (
        <div className="text-center py-20 bg-white rounded-2xl border border-[#e0d9cc]">
          <FileSearch className="w-16 h-16 text-[#e0d9cc] mx-auto mb-4" />
          <h3 className="text-xl font-bold text-[#014D4E] mb-2" style={{ fontFamily: 'Georgia, serif' }}>
            No Claims Submitted
          </h3>
          <p className="text-[#6b6b6b] text-sm max-w-sm mx-auto mb-6">
            {typedPolicies.length === 0
              ? 'You need an active policy before you can submit a claim.'
              : 'If you have experienced a loss, you can submit a claim against your active policy.'}
          </p>
          {typedPolicies.length > 0 && (
            <Button variant="default" onClick={() => setShowForm(true)}>
              <Plus className="w-4 h-4" /> Submit a Claim
            </Button>
          )}
        </div>
      )}

      {/* Claims list */}
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
