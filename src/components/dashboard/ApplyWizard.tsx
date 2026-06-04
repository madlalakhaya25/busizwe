'use client'

import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useRouter } from 'next/navigation'
import {
  User, Users, Heart, UserPlus, CheckCircle2,
  ArrowRight, ArrowLeft, Plus, Trash2, Loader2, Shield,
} from 'lucide-react'
import { formatCurrency } from '@/lib/utils'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

interface PricingTier {
  id: string
  ageGroup: string
  coverAmount: number
  premium: number | string
}

interface Product {
  id: string
  name: string
  description: string | null
  pricingTiers: PricingTier[]
}

interface DependantForm {
  firstName: string
  lastName: string
  dateOfBirth: string
  relationship: string
  idNumber: string
  startDate: string
}

const EMPTY_DEP: DependantForm = {
  firstName: '', lastName: '', dateOfBirth: '', relationship: 'SPOUSE', idNumber: '', startDate: '',
}

const RELATIONSHIPS = [
  { value: 'SPOUSE',      label: 'Spouse / Partner' },
  { value: 'CHILD',       label: 'Child' },
  { value: 'PARENT',      label: 'Parent' },
  { value: 'SIBLING',     label: 'Sibling' },
  { value: 'GRANDPARENT', label: 'Grandparent' },
  { value: 'GRANDCHILD',  label: 'Grandchild' },
  { value: 'OTHER',       label: 'Other' },
]

const STEPS = ['Choose Plan', 'Select Cover', 'Dependants', 'Review']

function getIcon(name: string) {
  const n = name.toLowerCase()
  if (n.includes('single parent')) return Heart
  if (n.includes('family'))        return Users
  if (n.includes('add-on') || n.includes('dependant')) return UserPlus
  return User
}

function StepBar({ current }: { current: number }) {
  return (
    <div className="flex items-center justify-center mb-8">
      {STEPS.map((label, i) => (
        <React.Fragment key={label}>
          <div className="flex flex-col items-center gap-1.5">
            <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all duration-200 ${
              i < current  ? 'bg-[#C89B3C] text-white' :
              i === current ? 'bg-[#014D4E] text-white ring-4 ring-[#014D4E]/15' :
                              'bg-[#E5E7EB] text-[#9a9a9a]'
            }`}>
              {i < current ? <CheckCircle2 className="w-4 h-4" /> : i + 1}
            </div>
            <span className={`text-[10px] font-semibold uppercase tracking-wide hidden sm:block ${
              i === current ? 'text-[#014D4E]' : 'text-[#9a9a9a]'
            }`}>{label}</span>
          </div>
          {i < STEPS.length - 1 && (
            <div className={`w-10 sm:w-14 h-0.5 mx-1.5 mb-5 transition-all duration-300 ${
              i < current ? 'bg-[#C89B3C]' : 'bg-[#E5E7EB]'
            }`} />
          )}
        </React.Fragment>
      ))}
    </div>
  )
}

const fade = (dir: 1 | -1) => ({
  initial: { opacity: 0, x: 24 * dir },
  animate: { opacity: 1, x: 0 },
  exit:    { opacity: 0, x: -24 * dir },
  transition: { duration: 0.25 },
})

export default function ApplyWizard({ products }: { products: Product[] }) {
  const router = useRouter()
  const [step, setStep]   = useState(0)
  const [product, setProduct]         = useState<Product | null>(null)
  const [ageGroup, setAgeGroup]       = useState('')
  const [coverAmt, setCoverAmt]       = useState<number | null>(null)
  const [deps, setDeps]               = useState<DependantForm[]>([])
  const [submitting, setSubmitting]   = useState(false)
  const [error, setError]             = useState('')

  const tier = product?.pricingTiers.find(
    t => t.ageGroup === ageGroup && Number(t.coverAmount) === coverAmt
  ) ?? null

  const uniqueAgeGroups  = product ? [...new Set(product.pricingTiers.map(t => t.ageGroup))] : []
  const uniqueCoverAmts  = product ? [...new Set(product.pricingTiers.map(t => Number(t.coverAmount)))] : []

  const addDep    = () => setDeps(d => [...d, { ...EMPTY_DEP }])
  const removeDep = (i: number) => setDeps(d => d.filter((_, j) => j !== i))
  const updateDep = (i: number, key: keyof DependantForm, val: string) =>
    setDeps(d => d.map((dep, j) => j === i ? { ...dep, [key]: val } : dep))

  const handleSubmit = async () => {
    if (!product || !tier) return
    setSubmitting(true)
    setError('')
    try {
      const pRes = await fetch('/api/policies', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ productId: product.id, pricingTierId: tier.id }),
      })
      if (!pRes.ok) {
        const d = await pRes.json()
        setError(d.error ?? 'Failed to submit application.')
        return
      }
      const policy = await pRes.json()

      for (const dep of deps) {
        if (!dep.firstName || !dep.lastName || !dep.dateOfBirth) continue
        await fetch('/api/dependants', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            policyId: policy.id,
            ...dep,
            startDate: dep.startDate || undefined,
          }),
        })
      }

      router.push('/dashboard/policies')
    } catch {
      setError('Something went wrong. Please try again.')
    } finally {
      setSubmitting(false)
    }
  }

  const navBtn = (label: string, onClick: () => void, disabled = false, gold = false) => (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`flex items-center gap-2 h-11 px-7 rounded-xl text-sm font-semibold transition-all duration-200 disabled:opacity-40 disabled:cursor-not-allowed ${
        gold
          ? 'bg-[#C89B3C] text-white hover:bg-[#A8832A] shadow-md hover:shadow-lg'
          : label === 'Back'
          ? 'border-2 border-[#E5E7EB] text-[#6B7280] hover:border-[#014D4E] hover:text-[#014D4E]'
          : 'bg-[#014D4E] text-white hover:bg-[#013638]'
      }`}
    >
      {label === 'Back' && <ArrowLeft className="w-4 h-4" />}
      {label}
      {label !== 'Back' && <ArrowRight className="w-4 h-4" />}
    </button>
  )

  return (
    <div className="max-w-3xl">
      <div className="mb-6">
        <p className="text-xs font-semibold text-[#C89B3C] uppercase tracking-widest mb-1">New Application</p>
        <h1 className="font-serif font-semibold text-2xl sm:text-3xl text-[#014D4E]">Apply for Cover</h1>
      </div>

      <div className="bg-white rounded-2xl border border-[#E5E7EB] shadow-sm p-6 sm:p-8">
        <StepBar current={step} />

        <AnimatePresence mode="wait">

          {/* ── Step 1: Choose Plan ── */}
          {step === 0 && (
            <motion.div key="s1" {...fade(1)}>
              <h2 className="font-serif font-semibold text-xl text-[#014D4E] mb-1">Choose a plan</h2>
              <p className="text-sm text-[#9a9a9a] mb-6">Select the plan that best fits your household.</p>

              {products.length === 0 ? (
                <div className="text-center py-16 text-[#9a9a9a]">
                  <Shield className="w-12 h-12 mx-auto mb-4 opacity-20" />
                  <p className="text-sm font-medium">No plans available right now.</p>
                  <p className="text-xs mt-1">Please contact us on 061 463 1973.</p>
                </div>
              ) : (
                <div className="grid sm:grid-cols-2 gap-4">
                  {products.map(p => {
                    const Icon = getIcon(p.name)
                    const minPrice = Math.min(...p.pricingTiers.map(t => Number(t.premium)))
                    const selected = product?.id === p.id
                    return (
                      <button
                        key={p.id}
                        onClick={() => { setProduct(p); setAgeGroup(''); setCoverAmt(null) }}
                        className={`text-left p-5 rounded-2xl border-2 transition-all duration-200 ${
                          selected
                            ? 'border-[#014D4E] bg-[#014D4E]/[0.04] ring-2 ring-[#014D4E]/10'
                            : 'border-[#E5E7EB] hover:border-[#014D4E]/40 hover:shadow-sm'
                        }`}
                      >
                        <div className="flex items-start justify-between">
                          <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                            selected ? 'bg-[#014D4E]' : 'bg-[#014D4E]/10'
                          }`}>
                            <Icon className={`w-5 h-5 ${selected ? 'text-[#C89B3C]' : 'text-[#014D4E]'}`} />
                          </div>
                          {selected && <CheckCircle2 className="w-5 h-5 text-[#014D4E]" />}
                        </div>
                        <h3 className="font-semibold text-[#1C1C1C] mt-3 text-sm leading-snug">{p.name}</h3>
                        {p.description && (
                          <p className="text-xs text-[#9a9a9a] mt-1 leading-relaxed">{p.description}</p>
                        )}
                        <p className="text-xs font-bold text-[#014D4E] mt-3">
                          From {formatCurrency(minPrice)}/month
                        </p>
                      </button>
                    )
                  })}
                </div>
              )}

              <div className="flex justify-end mt-6">
                {navBtn('Next', () => setStep(1), !product)}
              </div>
            </motion.div>
          )}

          {/* ── Step 2: Select Cover ── */}
          {step === 1 && product && (
            <motion.div key="s2" {...fade(1)}>
              <h2 className="font-serif font-semibold text-xl text-[#014D4E] mb-1">Select your cover</h2>
              <p className="text-sm text-[#9a9a9a] mb-6">Choose your age group and the amount you want to be covered for.</p>

              <div className="mb-6">
                <Label className="text-sm font-semibold text-[#1C1C1C] mb-3 block">Your Age Group</Label>
                <div className="grid grid-cols-3 gap-3">
                  {uniqueAgeGroups.map(ag => (
                    <button
                      key={ag}
                      onClick={() => setAgeGroup(ag)}
                      className={`py-3 px-2 rounded-xl border-2 text-sm font-semibold transition-all ${
                        ageGroup === ag
                          ? 'border-[#014D4E] bg-[#014D4E]/[0.04] text-[#014D4E]'
                          : 'border-[#E5E7EB] text-[#6B7280] hover:border-[#014D4E]/40'
                      }`}
                    >
                      {ag} yrs
                    </button>
                  ))}
                </div>
              </div>

              <div className="mb-6">
                <Label className="text-sm font-semibold text-[#1C1C1C] mb-3 block">Cover Amount</Label>
                <div className="grid grid-cols-2 gap-3">
                  {uniqueCoverAmts.map(ca => (
                    <button
                      key={ca}
                      onClick={() => setCoverAmt(ca)}
                      className={`py-4 px-3 rounded-xl border-2 text-sm font-semibold transition-all ${
                        coverAmt === ca
                          ? 'border-[#C89B3C] bg-[#C89B3C]/[0.06] text-[#014D4E]'
                          : 'border-[#E5E7EB] text-[#6B7280] hover:border-[#C89B3C]/40'
                      }`}
                    >
                      {formatCurrency(ca)} cover
                    </button>
                  ))}
                </div>
              </div>

              <AnimatePresence>
                {tier && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className="bg-[#014D4E] rounded-2xl p-5 text-white flex items-center justify-between mb-6"
                  >
                    <div>
                      <p className="text-white/50 text-[10px] font-semibold uppercase tracking-widest">Monthly Premium</p>
                      <p className="font-serif font-semibold text-3xl mt-1 leading-none">{formatCurrency(Number(tier.premium))}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-white/50 text-[10px] uppercase tracking-widest">Cover</p>
                      <p className="font-semibold text-[#C89B3C] text-lg mt-1">{formatCurrency(Number(tier.coverAmount))}</p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              <div className="flex justify-between mt-2">
                {navBtn('Back', () => setStep(0))}
                {navBtn('Next', () => setStep(2), !tier)}
              </div>
            </motion.div>
          )}

          {/* ── Step 3: Dependants ── */}
          {step === 2 && (
            <motion.div key="s3" {...fade(1)}>
              <h2 className="font-serif font-semibold text-xl text-[#014D4E] mb-1">Add dependants</h2>
              <p className="text-sm text-[#9a9a9a] mb-6">
                Add the family members covered under this policy. You can skip this and add them later.
              </p>

              <div className="space-y-4">
                {deps.map((dep, i) => (
                  <div key={i} className="bg-[#F9FAFB] rounded-2xl p-5 border border-[#E5E7EB]">
                    <div className="flex items-center justify-between mb-4">
                      <p className="text-sm font-semibold text-[#014D4E]">Dependant {i + 1}</p>
                      <button
                        onClick={() => removeDep(i)}
                        className="w-7 h-7 rounded-lg bg-red-50 hover:bg-red-100 flex items-center justify-center transition-colors"
                      >
                        <Trash2 className="w-3.5 h-3.5 text-red-500" />
                      </button>
                    </div>
                    <div className="grid sm:grid-cols-2 gap-4">
                      <div className="space-y-1.5">
                        <Label className="text-xs font-medium text-[#6B7280]">First Name *</Label>
                        <Input value={dep.firstName} onChange={e => updateDep(i, 'firstName', e.target.value)} placeholder="Nomsa" className="h-10" />
                      </div>
                      <div className="space-y-1.5">
                        <Label className="text-xs font-medium text-[#6B7280]">Last Name *</Label>
                        <Input value={dep.lastName} onChange={e => updateDep(i, 'lastName', e.target.value)} placeholder="Dlamini" className="h-10" />
                      </div>
                      <div className="space-y-1.5">
                        <Label className="text-xs font-medium text-[#6B7280]">Date of Birth *</Label>
                        <Input type="date" value={dep.dateOfBirth} onChange={e => updateDep(i, 'dateOfBirth', e.target.value)} className="h-10" />
                      </div>
                      <div className="space-y-1.5">
                        <Label className="text-xs font-medium text-[#6B7280]">Relationship *</Label>
                        <select
                          value={dep.relationship}
                          onChange={e => updateDep(i, 'relationship', e.target.value)}
                          className="flex h-10 w-full rounded-lg border border-input bg-background px-3 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                        >
                          {RELATIONSHIPS.map(r => <option key={r.value} value={r.value}>{r.label}</option>)}
                        </select>
                      </div>
                      <div className="space-y-1.5">
                        <Label className="text-xs font-medium text-[#6B7280]">SA ID Number (optional)</Label>
                        <Input value={dep.idNumber} onChange={e => updateDep(i, 'idNumber', e.target.value)} placeholder="7601015800087" className="h-10" />
                      </div>
                      <div className="space-y-1.5">
                        <Label className="text-xs font-medium text-[#6B7280]">Cover Start Date (optional)</Label>
                        <Input type="date" value={dep.startDate} onChange={e => updateDep(i, 'startDate', e.target.value)} className="h-10" />
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <button
                onClick={addDep}
                className="mt-4 w-full flex items-center justify-center gap-2 h-10 rounded-xl text-sm font-semibold border-2 border-dashed border-[#014D4E]/25 text-[#014D4E] hover:border-[#014D4E]/60 hover:bg-[#014D4E]/[0.03] transition-all"
              >
                <Plus className="w-4 h-4" /> Add Dependant
              </button>

              <div className="flex justify-between mt-6">
                {navBtn('Back', () => setStep(1))}
                <button
                  onClick={() => setStep(3)}
                  className="flex items-center gap-2 h-11 px-7 rounded-xl text-sm font-semibold bg-[#014D4E] text-white hover:bg-[#013638] transition-all"
                >
                  {deps.length > 0 ? 'Next' : 'Skip for Now'} <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </motion.div>
          )}

          {/* ── Step 4: Review ── */}
          {step === 3 && product && tier && (
            <motion.div key="s4" {...fade(1)}>
              <h2 className="font-serif font-semibold text-xl text-[#014D4E] mb-1">Review your application</h2>
              <p className="text-sm text-[#9a9a9a] mb-6">Check the details before submitting.</p>

              <div className="bg-[#F9FAFB] rounded-2xl border border-[#E5E7EB] divide-y divide-[#E5E7EB] mb-5">
                {[
                  ['Plan',            product.name],
                  ['Age Group',       `${tier.ageGroup} years`],
                  ['Cover Amount',    formatCurrency(Number(tier.coverAmount))],
                  ['Monthly Premium', formatCurrency(Number(tier.premium))],
                  ['Dependants',      deps.length > 0 ? `${deps.length} added` : 'None added'],
                ].map(([label, value]) => (
                  <div key={label} className="flex justify-between items-center px-5 py-3.5 text-sm">
                    <span className="text-[#9a9a9a]">{label}</span>
                    <span className="font-semibold text-[#1C1C1C]">{value}</span>
                  </div>
                ))}
              </div>

              <p className="text-xs text-[#9a9a9a] leading-relaxed mb-5">
                Your application will be reviewed and you will be notified once your policy is activated.
                A 3-month waiting period applies for natural death claims. Accidental death is covered from day one.
              </p>

              {error && (
                <p className="text-sm text-red-600 bg-red-50 border border-red-200 rounded-xl px-4 py-3 mb-4">{error}</p>
              )}

              <div className="flex justify-between">
                {navBtn('Back', () => setStep(2))}
                <button
                  onClick={handleSubmit}
                  disabled={submitting}
                  className="flex items-center gap-2 h-11 px-7 rounded-xl text-sm font-semibold bg-[#C89B3C] text-white hover:bg-[#A8832A] disabled:opacity-50 disabled:cursor-not-allowed shadow-md hover:shadow-lg transition-all"
                >
                  {submitting ? (
                    <><Loader2 className="w-4 h-4 animate-spin" /> Submitting...</>
                  ) : (
                    <><CheckCircle2 className="w-4 h-4" /> Submit Application</>
                  )}
                </button>
              </div>
            </motion.div>
          )}

        </AnimatePresence>
      </div>
    </div>
  )
}
