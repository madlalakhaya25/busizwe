'use client'

import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Users, Plus, Calendar, Phone, X, CheckCircle2, Loader2 } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { formatDate } from '@/lib/utils'

interface Dependant {
  id: string
  firstName: string
  lastName: string
  dateOfBirth: Date
  idNumber: string | null
  relationship: string
  phone: string | null
  policy: { policyNumber: string; product: { name: string } }
}

interface Policy {
  id: string
  policyNumber: string
  product: { name: string }
}

const RELATIONSHIPS = ['SPOUSE', 'CHILD', 'PARENT', 'SIBLING', 'GRANDPARENT', 'GRANDCHILD', 'OTHER']

const RELATIONSHIP_COLORS: Record<string, string> = {
  SPOUSE:      'bg-rose-100 text-rose-700',
  CHILD:       'bg-blue-100 text-blue-700',
  PARENT:      'bg-purple-100 text-purple-700',
  SIBLING:     'bg-amber-100 text-amber-700',
  GRANDPARENT: 'bg-teal-100 text-teal-700',
  GRANDCHILD:  'bg-indigo-100 text-indigo-700',
  OTHER:       'bg-gray-100 text-gray-700',
}

function initials(first: string, last: string) {
  return `${first[0] ?? ''}${last[0] ?? ''}`.toUpperCase()
}

export default function DependantsPage({ dependants, policies }: { dependants: unknown[]; policies: unknown[] }) {
  const typedDependants = dependants as Dependant[]
  const typedPolicies  = policies as Policy[]
  const [showForm, setShowForm] = useState(false)
  const [loading,  setLoading]  = useState(false)
  const [saved,    setSaved]    = useState(false)

  const handleAdd = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setLoading(true)
    const data = Object.fromEntries(new FormData(e.currentTarget))

    try {
      const res = await fetch('/api/dependants', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })
      if (res.ok) {
        setSaved(true)
        setTimeout(() => window.location.reload(), 900)
      }
    } catch {
      //
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="space-y-6 max-w-5xl">

      {/* Header row */}
      <div className="flex items-center justify-between gap-4">
        <p className="text-sm text-[#9a9a9a]">
          <span className="font-bold text-[#1C1C1C]">{typedDependants.length}</span>{' '}
          dependant{typedDependants.length !== 1 ? 's' : ''} registered
        </p>
        {typedPolicies.length > 0 && !showForm && (
          <Button variant="gold" size="sm" onClick={() => setShowForm(true)}>
            <Plus className="w-4 h-4" /> Add Dependant
          </Button>
        )}
      </div>

      {/* Add form */}
      <AnimatePresence>
        {showForm && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
          >
            <Card>
              <CardHeader className="pb-4">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-xl bg-[#014D4E] flex items-center justify-center shrink-0">
                      <Users className="w-4 h-4 text-[#C89B3C]" />
                    </div>
                    <div>
                      <CardTitle className="text-base">Add New Dependant</CardTitle>
                      <p className="text-xs text-[#9a9a9a] mt-0.5">Add a family member to your policy</p>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => setShowForm(false)}
                    className="p-1.5 rounded-lg text-[#9a9a9a] hover:text-[#1C1C1C] hover:bg-[#F9FAFB] transition-colors"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleAdd} className="space-y-5">
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>Policy</Label>
                      <Select name="policyId" required>
                        <SelectTrigger className="h-11"><SelectValue placeholder="Select policy" /></SelectTrigger>
                        <SelectContent>
                          {typedPolicies.map((p) => (
                            <SelectItem key={p.id} value={p.id}>
                              {p.policyNumber} – {p.product.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label>Relationship</Label>
                      <Select name="relationship" required>
                        <SelectTrigger className="h-11"><SelectValue placeholder="Select relationship" /></SelectTrigger>
                        <SelectContent>
                          {RELATIONSHIPS.map((r) => (
                            <SelectItem key={r} value={r}>
                              {r.charAt(0) + r.slice(1).toLowerCase()}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="firstName">First Name</Label>
                      <Input id="firstName" name="firstName" placeholder="e.g. Nomvula" required className="h-11" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="lastName">Last Name</Label>
                      <Input id="lastName" name="lastName" placeholder="e.g. Dlamini" required className="h-11" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="dateOfBirth">Date of Birth</Label>
                      <Input id="dateOfBirth" name="dateOfBirth" type="date" required className="h-11" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="idNumber">SA ID Number <span className="text-[#9a9a9a] font-normal">(optional)</span></Label>
                      <Input id="idNumber" name="idNumber" placeholder="1234567890123" className="h-11 font-mono" />
                    </div>
                    <div className="space-y-2 sm:col-span-2">
                      <Label htmlFor="phone">Phone Number <span className="text-[#9a9a9a] font-normal">(optional)</span></Label>
                      <Input id="phone" name="phone" type="tel" placeholder="0821234567" className="h-11" />
                    </div>
                  </div>

                  <div className="flex items-center gap-3 pt-1">
                    <Button type="submit" variant="default" disabled={loading || saved} className="min-w-[140px]">
                      {saved ? (
                        <><CheckCircle2 className="w-4 h-4" /> Saved!</>
                      ) : loading ? (
                        <><Loader2 className="w-4 h-4 animate-spin" /> Saving…</>
                      ) : (
                        'Save Dependant'
                      )}
                    </Button>
                    <Button type="button" variant="ghost" onClick={() => setShowForm(false)} disabled={loading}>
                      Cancel
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Empty state */}
      {typedDependants.length === 0 && !showForm && (
        <div className="text-center py-16 bg-white rounded-2xl border border-[#E5E7EB]">
          <div className="w-16 h-16 rounded-2xl bg-[#F9FAFB] flex items-center justify-center mx-auto mb-4">
            <Users className="w-8 h-8 text-[#d0c9bc]" />
          </div>
          <h3 className="text-lg font-bold text-[#014D4E] mb-2 font-serif">No Dependants Added</h3>
          <p className="text-[#9a9a9a] text-sm max-w-xs mx-auto mb-6">
            {typedPolicies.length === 0
              ? 'You need an active policy before adding dependants.'
              : 'Add family members to include them in your funeral cover.'}
          </p>
          {typedPolicies.length > 0 && (
            <Button variant="default" onClick={() => setShowForm(true)}>
              <Plus className="w-4 h-4" /> Add First Dependant
            </Button>
          )}
        </div>
      )}

      {/* Dependant cards */}
      {typedDependants.length > 0 && (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {typedDependants.map((dep, i) => (
            <motion.div
              key={dep.id}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35, delay: i * 0.06 }}
            >
              <Card className="hover:shadow-[0_4px_16px_rgba(1,77,78,0.1)] transition-all duration-200 h-full">
                <CardContent className="p-5">
                  {/* Avatar + name */}
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-11 h-11 rounded-full bg-[#014D4E] flex items-center justify-center text-white font-bold text-sm shrink-0">
                      {initials(dep.firstName, dep.lastName)}
                    </div>
                    <div className="min-w-0">
                      <p className="font-bold text-[#1C1C1C] leading-snug truncate">
                        {dep.firstName} {dep.lastName}
                      </p>
                      <span className={`inline-block text-[10px] font-semibold px-2 py-0.5 rounded-full mt-1 ${RELATIONSHIP_COLORS[dep.relationship] ?? 'bg-gray-100 text-gray-700'}`}>
                        {dep.relationship.charAt(0) + dep.relationship.slice(1).toLowerCase()}
                      </span>
                    </div>
                  </div>

                  {/* Details */}
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center gap-2 text-[#6b6b6b]">
                      <Calendar className="w-3.5 h-3.5 text-[#C89B3C] shrink-0" />
                      <span>{formatDate(dep.dateOfBirth)}</span>
                    </div>
                    {dep.phone && (
                      <div className="flex items-center gap-2 text-[#6b6b6b]">
                        <Phone className="w-3.5 h-3.5 text-[#C89B3C] shrink-0" />
                        <span>{dep.phone}</span>
                      </div>
                    )}
                    <div className="pt-2 border-t border-[#E5E7EB]">
                      <p className="text-[10px] text-[#9a9a9a] uppercase tracking-wider mb-1">Policy</p>
                      <p className="text-xs font-semibold text-[#014D4E] font-mono truncate">{dep.policy.policyNumber}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  )
}
