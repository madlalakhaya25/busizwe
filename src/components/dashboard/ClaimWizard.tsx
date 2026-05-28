'use client'

import React, { useState, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  ChevronLeft, Upload, CheckCircle2, Loader2, Sparkles,
  Heart, Calendar, Users, FileText, AlertCircle,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { formatCurrency } from '@/lib/utils'

interface Policy {
  id: string
  policyNumber: string
  coverAmount: unknown
  product: { name: string }
}

interface WizardData {
  policyId: string
  deceasedFirstName: string
  deceasedLastName: string
  deceasedIdNumber: string
  deceasedDateOfDeath: string
  relationship: string
  funeralDate: string
  funeralHome: string
  notes: string
}

interface OcrResult {
  firstName: string | null
  lastName: string | null
  idNumber: string | null
  dateOfDeath: string | null
}

interface Props {
  policies: Policy[]
  onCancel: () => void
  onComplete: (claimNumber: string) => void
}

const STEPS = ['policy', 'name', 'date', 'relationship', 'certificate', 'extras', 'review'] as const
type Step = typeof STEPS[number]

const RELATIONSHIPS = [
  { value: 'Spouse', label: 'Spouse / partner' },
  { value: 'Parent', label: 'Parent' },
  { value: 'Child', label: 'Child' },
  { value: 'Sibling', label: 'Sibling' },
  { value: 'Grandparent', label: 'Grandparent' },
  { value: 'Grandchild', label: 'Grandchild' },
  { value: 'Other', label: 'Someone dear to me' },
]

const slide = {
  enter: (d: number) => ({ x: d * 48, opacity: 0 }),
  center: { x: 0, opacity: 1 },
  exit: (d: number) => ({ x: d * -48, opacity: 0 }),
}

const HEADING: Record<Step, string> = {
  policy: 'Which policy is this claim for?',
  name: 'Who have you lost?',
  date: 'When did they pass away?',
  relationship: 'They were my…',
  certificate: 'Please upload the death certificate',
  extras: 'Funeral arrangements',
  review: 'Review your claim',
}

const SUBTEXT: Record<Step, string> = {
  policy: 'Select the active policy under which you are claiming.',
  name: 'We are deeply sorry for your loss. Take your time.',
  date: 'We need the official date of death from the death certificate.',
  relationship: 'Your relationship to the person who passed.',
  certificate: 'Our system will read it automatically to save you time.',
  extras: 'These details are optional — add what you have.',
  review: 'Please confirm the details below before submitting.',
}

function ProgressDots({ current, total }: { current: number; total: number }) {
  return (
    <div className="flex items-center justify-center gap-1.5">
      {Array.from({ length: total }).map((_, i) => (
        <div
          key={i}
          className={`rounded-full transition-all duration-300 ${
            i < current ? 'w-2 h-2 bg-[#014D4E]' :
            i === current ? 'w-3 h-2 bg-[#C89B3C]' :
            'w-2 h-2 bg-[#e0d9cc]'
          }`}
        />
      ))}
    </div>
  )
}

export default function ClaimWizard({ policies, onCancel, onComplete }: Props) {
  const [stepIndex, setStepIndex] = useState(0)
  const [direction, setDirection] = useState(1)
  const [data, setData] = useState<WizardData>({
    policyId: policies.length === 1 ? policies[0].id : '',
    deceasedFirstName: '',
    deceasedLastName: '',
    deceasedIdNumber: '',
    deceasedDateOfDeath: '',
    relationship: '',
    funeralDate: '',
    funeralHome: '',
    notes: '',
  })
  const [ocrLoading, setOcrLoading] = useState(false)
  const [ocrResult, setOcrResult] = useState<OcrResult | null>(null)
  const [certFileName, setCertFileName] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState('')
  const fileRef = useRef<HTMLInputElement>(null)

  const step = STEPS[stepIndex]
  const totalSteps = STEPS.length

  const goNext = () => { setDirection(1); setStepIndex((i) => i + 1) }
  const goBack = () => { setDirection(-1); setStepIndex((i) => i - 1) }

  const set = (key: keyof WizardData, value: string) =>
    setData((d) => ({ ...d, [key]: value }))

  const canAdvance = (): boolean => {
    switch (step) {
      case 'policy': return !!data.policyId
      case 'name': return !!data.deceasedFirstName.trim() && !!data.deceasedLastName.trim()
      case 'date': return !!data.deceasedDateOfDeath
      case 'relationship': return !!data.relationship
      case 'certificate': return true // optional — can skip
      case 'extras': return true
      case 'review': return true
    }
  }

  const handleFileUpload = async (file: File) => {
    setCertFileName(file.name)
    setOcrLoading(true)
    setOcrResult(null)
    try {
      // Use FileReader — browser-native, no Node.js Buffer polyfill needed
      const base64 = await new Promise<string>((resolve, reject) => {
        const reader = new FileReader()
        reader.onload = () => resolve((reader.result as string).split(',')[1])
        reader.onerror = reject
        reader.readAsDataURL(file)
      })
      const res = await fetch('/api/claims/ocr', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ base64, mimeType: file.type }),
      })
      if (res.ok) {
        const result: OcrResult = await res.json()
        setOcrResult(result)
        if (result.firstName && !data.deceasedFirstName) set('deceasedFirstName', result.firstName)
        if (result.lastName && !data.deceasedLastName) set('deceasedLastName', result.lastName)
        if (result.idNumber && !data.deceasedIdNumber) set('deceasedIdNumber', result.idNumber)
        if (result.dateOfDeath && !data.deceasedDateOfDeath) set('deceasedDateOfDeath', result.dateOfDeath)
      }
    } catch { /* noop */ }
    finally { setOcrLoading(false) }
  }

  const handleSubmit = async () => {
    setSubmitting(true)
    setError('')
    try {
      const res = await fetch('/api/claims', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          policyId: data.policyId,
          deceasedFirstName: data.deceasedFirstName,
          deceasedLastName: data.deceasedLastName,
          deceasedIdNumber: data.deceasedIdNumber || undefined,
          deceasedDateOfDeath: data.deceasedDateOfDeath,
          relationship: data.relationship,
          funeralDate: data.funeralDate || undefined,
          funeralHome: data.funeralHome || undefined,
          notes: data.notes || undefined,
        }),
      })
      if (res.ok) {
        const claim = await res.json() as { claimNumber: string }
        onComplete(claim.claimNumber)
      } else {
        const body = await res.json() as { error?: string }
        setError(typeof body.error === 'string' ? body.error : 'Something went wrong. Please try again.')
      }
    } catch {
      setError('Connection error. Please check your internet and try again.')
    }
    finally { setSubmitting(false) }
  }

  const selectedPolicy = policies.find((p) => p.id === data.policyId)

  const renderStep = () => {
    switch (step) {
      case 'policy':
        return (
          <div className="space-y-3">
            {policies.map((p) => (
              <button
                key={p.id}
                type="button"
                onClick={() => set('policyId', p.id)}
                className={`w-full text-left rounded-2xl border-2 p-4 transition-all ${
                  data.policyId === p.id
                    ? 'border-[#014D4E] bg-[#014D4E]/5'
                    : 'border-[#e0d9cc] hover:border-[#014D4E]/40'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-semibold text-[#014D4E]">{p.product.name}</p>
                    <p className="text-sm text-[#6b6b6b] font-mono mt-0.5">{p.policyNumber}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-[#C89B3C]">{formatCurrency(Number(p.coverAmount))}</p>
                    <p className="text-xs text-[#6b6b6b]">cover</p>
                  </div>
                </div>
                {data.policyId === p.id && (
                  <div className="mt-2 flex items-center gap-1 text-[#014D4E] text-xs font-medium">
                    <CheckCircle2 className="w-3.5 h-3.5" /> Selected
                  </div>
                )}
              </button>
            ))}
          </div>
        )

      case 'name':
        return (
          <div className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium text-[#6b6b6b]">First name</label>
              <Input
                value={data.deceasedFirstName}
                onChange={(e) => set('deceasedFirstName', e.target.value)}
                placeholder="e.g. Nomsa"
                className="text-lg h-12"
                autoFocus
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-[#6b6b6b]">Last name</label>
              <Input
                value={data.deceasedLastName}
                onChange={(e) => set('deceasedLastName', e.target.value)}
                placeholder="e.g. Dlamini"
                className="text-lg h-12"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-[#6b6b6b]">ID number <span className="font-normal">(optional)</span></label>
              <Input
                value={data.deceasedIdNumber}
                onChange={(e) => set('deceasedIdNumber', e.target.value)}
                placeholder="13-digit SA ID number"
                maxLength={13}
              />
            </div>
          </div>
        )

      case 'date':
        return (
          <div className="space-y-2">
            <label className="text-sm font-medium text-[#6b6b6b]">Date of passing</label>
            <Input
              type="date"
              value={data.deceasedDateOfDeath}
              onChange={(e) => set('deceasedDateOfDeath', e.target.value)}
              max={new Date().toISOString().split('T')[0]}
              className="text-lg h-12"
              autoFocus
            />
          </div>
        )

      case 'relationship':
        return (
          <div className="grid grid-cols-2 gap-3">
            {RELATIONSHIPS.map((r) => (
              <button
                key={r.value}
                type="button"
                onClick={() => set('relationship', r.value)}
                className={`rounded-2xl border-2 p-4 text-sm font-medium transition-all text-center ${
                  data.relationship === r.value
                    ? 'border-[#014D4E] bg-[#014D4E] text-white'
                    : 'border-[#e0d9cc] text-[#1C1C1C] hover:border-[#014D4E]/40'
                }`}
              >
                {r.label}
              </button>
            ))}
          </div>
        )

      case 'certificate':
        return (
          <div className="space-y-4">
            <input
              ref={fileRef}
              type="file"
              accept="image/*,.pdf"
              className="hidden"
              onChange={(e) => { const f = e.target.files?.[0]; if (f) handleFileUpload(f) }}
            />
            <button
              type="button"
              onClick={() => fileRef.current?.click()}
              className="w-full border-2 border-dashed border-[#C89B3C]/40 rounded-2xl p-8 flex flex-col items-center gap-3 hover:border-[#C89B3C] hover:bg-[#C89B3C]/5 transition-all"
            >
              <Upload className="w-8 h-8 text-[#C89B3C]" />
              <div className="text-center">
                <p className="font-medium text-[#014D4E]">
                  {certFileName || 'Tap to upload death certificate'}
                </p>
                <p className="text-xs text-[#6b6b6b] mt-1">JPG, PNG or PDF · max 10 MB</p>
              </div>
            </button>

            {ocrLoading && (
              <div className="flex items-center gap-3 px-4 py-3 bg-[#014D4E]/5 rounded-xl">
                <Loader2 className="w-4 h-4 text-[#014D4E] animate-spin shrink-0" />
                <p className="text-sm text-[#014D4E]">Reading the document…</p>
              </div>
            )}

            {ocrResult && !ocrLoading && (
              <div className="bg-green-50 border border-green-200 rounded-xl p-4 space-y-2">
                <div className="flex items-center gap-2 mb-1">
                  <Sparkles className="w-4 h-4 text-green-600" />
                  <p className="text-sm font-semibold text-green-700">We found these details</p>
                </div>
                <div className="grid grid-cols-2 gap-2 text-sm">
                  {ocrResult.firstName && <div><span className="text-[#6b6b6b]">First name: </span><span className="font-medium">{ocrResult.firstName}</span></div>}
                  {ocrResult.lastName && <div><span className="text-[#6b6b6b]">Last name: </span><span className="font-medium">{ocrResult.lastName}</span></div>}
                  {ocrResult.dateOfDeath && <div><span className="text-[#6b6b6b]">Date: </span><span className="font-medium">{ocrResult.dateOfDeath}</span></div>}
                  {ocrResult.idNumber && <div><span className="text-[#6b6b6b]">ID: </span><span className="font-medium">{ocrResult.idNumber}</span></div>}
                </div>
                <p className="text-xs text-green-600">Fields applied automatically. You can correct them in the previous steps.</p>
              </div>
            )}

            <p className="text-xs text-[#6b6b6b] text-center">
              You can also skip this and upload documents later via the <strong>Documents</strong> section.
            </p>
          </div>
        )

      case 'extras':
        return (
          <div className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium text-[#6b6b6b]">Funeral date <span className="font-normal">(optional)</span></label>
              <Input
                type="date"
                value={data.funeralDate}
                onChange={(e) => set('funeralDate', e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-[#6b6b6b]">Funeral home / parlour <span className="font-normal">(optional)</span></label>
              <Input
                value={data.funeralHome}
                onChange={(e) => set('funeralHome', e.target.value)}
                placeholder="Name of funeral parlour"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-[#6b6b6b]">Additional notes <span className="font-normal">(optional)</span></label>
              <Textarea
                value={data.notes}
                onChange={(e) => set('notes', e.target.value)}
                placeholder="Any information that might help us process your claim…"
                className="min-h-[80px]"
              />
            </div>
          </div>
        )

      case 'review':
        return (
          <div className="space-y-3">
            {error && (
              <div className="flex items-start gap-2 bg-red-50 border border-red-200 rounded-xl p-3">
                <AlertCircle className="w-4 h-4 text-red-600 shrink-0 mt-0.5" />
                <p className="text-sm text-red-700">{error}</p>
              </div>
            )}
            <ReviewRow icon={FileText} label="Policy" value={`${selectedPolicy?.policyNumber} — ${selectedPolicy?.product.name}`} />
            <ReviewRow icon={Heart} label="Deceased" value={`${data.deceasedFirstName} ${data.deceasedLastName}${data.deceasedIdNumber ? ` (ID: ${data.deceasedIdNumber})` : ''}`} />
            <ReviewRow icon={Calendar} label="Date of passing" value={new Date(data.deceasedDateOfDeath).toLocaleDateString('en-ZA', { day: 'numeric', month: 'long', year: 'numeric' })} />
            <ReviewRow icon={Users} label="Relationship" value={data.relationship} />
            {selectedPolicy && (
              <div className="mt-4 bg-[#014D4E] rounded-2xl p-4 text-center">
                <p className="text-xs text-white/60 uppercase tracking-widest mb-1">Claim amount</p>
                <p className="text-3xl font-bold text-[#C89B3C]">{formatCurrency(Number(selectedPolicy.coverAmount))}</p>
              </div>
            )}
            <p className="text-xs text-[#6b6b6b] text-center pt-2">
              Our team will review your claim within 48 hours and contact you by phone and WhatsApp.
            </p>
          </div>
        )
    }
  }

  return (
    <div className="max-w-lg mx-auto">
      {/* Header */}
      <div className="flex items-center gap-3 mb-6">
        {stepIndex > 0 && (
          <button onClick={goBack} className="text-[#6b6b6b] hover:text-[#014D4E] transition-colors p-1">
            <ChevronLeft className="w-5 h-5" />
          </button>
        )}
        <div className="flex-1">
          <ProgressDots current={stepIndex} total={totalSteps} />
        </div>
        <button onClick={onCancel} className="text-xs text-[#6b6b6b] hover:text-[#1C1C1C]">Cancel</button>
      </div>

      {/* Step content */}
      <AnimatePresence mode="wait" custom={direction}>
        <motion.div
          key={step}
          custom={direction}
          variants={slide}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{ duration: 0.22, ease: 'easeOut' }}
        >
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-[#014D4E] mb-1" style={{ fontFamily: 'Georgia, serif' }}>
              {HEADING[step]}
            </h2>
            <p className="text-sm text-[#6b6b6b]">{SUBTEXT[step]}</p>
          </div>

          {renderStep()}
        </motion.div>
      </AnimatePresence>

      {/* Footer navigation */}
      <div className="mt-8">
        {step === 'review' ? (
          <Button
            variant="default"
            className="w-full h-12 text-base"
            onClick={handleSubmit}
            disabled={submitting}
          >
            {submitting ? <><Loader2 className="w-4 h-4 animate-spin" /> Submitting…</> : 'Submit Claim'}
          </Button>
        ) : (
          <Button
            variant="gold"
            className="w-full h-12 text-base"
            onClick={goNext}
            disabled={!canAdvance()}
          >
            {step === 'certificate' && !certFileName ? 'Skip for now' : 'Continue'}
          </Button>
        )}
      </div>
    </div>
  )
}

function ReviewRow({ icon: Icon, label, value }: { icon: React.ElementType; label: string; value: string }) {
  return (
    <div className="flex items-start gap-3 py-2 border-b border-[#e0d9cc] last:border-0">
      <Icon className="w-4 h-4 text-[#C89B3C] shrink-0 mt-0.5" />
      <div className="flex-1 min-w-0">
        <p className="text-xs text-[#6b6b6b] uppercase tracking-widest">{label}</p>
        <p className="text-sm font-medium text-[#1C1C1C] mt-0.5">{value}</p>
      </div>
    </div>
  )
}
