'use client'

import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Users, Plus, Trash2, Calendar, Phone } from 'lucide-react'
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

const RELATIONSHIPS = [
  'SPOUSE', 'CHILD', 'PARENT', 'SIBLING', 'GRANDPARENT', 'GRANDCHILD', 'OTHER'
]

export default function DependantsPage({ dependants, policies }: { dependants: unknown[]; policies: unknown[] }) {
  const typedDependants = dependants as Dependant[]
  const typedPolicies = policies as Policy[]
  const [showForm, setShowForm] = useState(false)
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)

  const handleAdd = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setLoading(true)
    const form = e.currentTarget
    const data = Object.fromEntries(new FormData(form))

    try {
      const res = await fetch('/api/dependants', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })
      if (res.ok) {
        setSuccess(true)
        setShowForm(false)
        window.location.reload()
      }
    } catch {
      //
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <p className="text-[#6b6b6b] text-sm">{typedDependants.length} dependant{typedDependants.length !== 1 ? 's' : ''} registered</p>
        {typedPolicies.length > 0 && (
          <Button variant="gold" size="sm" onClick={() => setShowForm(true)}>
            <Plus className="w-4 h-4" /> Add Dependant
          </Button>
        )}
      </div>

      {/* Add form */}
      {showForm && (
        <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}>
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Add New Dependant</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleAdd} className="grid sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <Label htmlFor="policyId">Policy</Label>
                  <Select name="policyId" required>
                    <SelectTrigger><SelectValue placeholder="Select policy" /></SelectTrigger>
                    <SelectContent>
                      {typedPolicies.map((p) => (
                        <SelectItem key={p.id} value={p.id}>{p.policyNumber} – {p.product.name}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="relationship">Relationship</Label>
                  <Select name="relationship" required>
                    <SelectTrigger><SelectValue placeholder="Select relationship" /></SelectTrigger>
                    <SelectContent>
                      {RELATIONSHIPS.map((r) => (
                        <SelectItem key={r} value={r}>{r.charAt(0) + r.slice(1).toLowerCase()}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="firstName">First Name</Label>
                  <Input id="firstName" name="firstName" placeholder="John" required />
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="lastName">Last Name</Label>
                  <Input id="lastName" name="lastName" placeholder="Doe" required />
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="dateOfBirth">Date of Birth</Label>
                  <Input id="dateOfBirth" name="dateOfBirth" type="date" required />
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="idNumber">ID Number (optional)</Label>
                  <Input id="idNumber" name="idNumber" placeholder="1234567890123" />
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="phone">Phone (optional)</Label>
                  <Input id="phone" name="phone" type="tel" placeholder="0821234567" />
                </div>
                <div className="sm:col-span-2 flex gap-3 pt-2">
                  <Button type="submit" variant="default" disabled={loading}>
                    {loading ? 'Saving...' : 'Save Dependant'}
                  </Button>
                  <Button type="button" variant="secondary" onClick={() => setShowForm(false)}>Cancel</Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </motion.div>
      )}

      {typedDependants.length === 0 && !showForm ? (
        <div className="text-center py-20 bg-white rounded-2xl border border-[#e0d9cc]">
          <Users className="w-16 h-16 text-[#e0d9cc] mx-auto mb-4" />
          <h3 className="text-xl font-bold text-[#014D4E] mb-2" style={{ fontFamily: 'Georgia, serif' }}>No Dependants Added</h3>
          <p className="text-[#6b6b6b] mb-6 max-w-sm mx-auto">
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
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {typedDependants.map((dep, i) => (
            <motion.div
              key={dep.id}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: i * 0.08 }}
            >
              <Card className="hover:shadow-[0_4px_16px_rgba(1,77,78,0.1)] transition-all duration-200">
                <CardContent className="p-5">
                  <div className="flex items-start justify-between mb-4">
                    <div className="w-10 h-10 rounded-full bg-[#014D4E] flex items-center justify-center text-white font-bold text-sm">
                      {dep.firstName[0]}{dep.lastName[0]}
                    </div>
                    <span className="text-xs bg-[#014D4E]/10 text-[#014D4E] rounded-full px-2 py-0.5 font-medium">
                      {dep.relationship.charAt(0) + dep.relationship.slice(1).toLowerCase()}
                    </span>
                  </div>
                  <h3 className="font-bold text-[#1C1C1C] mb-3">{dep.firstName} {dep.lastName}</h3>
                  <div className="space-y-2 text-sm text-[#6b6b6b]">
                    <div className="flex items-center gap-2">
                      <Calendar className="w-3.5 h-3.5 text-[#C89B3C]" />
                      <span>{formatDate(dep.dateOfBirth)}</span>
                    </div>
                    {dep.phone && (
                      <div className="flex items-center gap-2">
                        <Phone className="w-3.5 h-3.5 text-[#C89B3C]" />
                        <span>{dep.phone}</span>
                      </div>
                    )}
                    <div className="pt-1">
                      <span className="text-xs text-[#6b6b6b]">Policy: </span>
                      <span className="text-xs font-medium text-[#014D4E]">{dep.policy.policyNumber}</span>
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
