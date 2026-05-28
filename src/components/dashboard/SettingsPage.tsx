'use client'

import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { User, MapPin, Phone, Calendar, CreditCard, Save, CheckCircle2 } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

interface ProfileData {
  firstName: string
  lastName: string
  phone: string | null
  address: string | null
  city: string | null
  province: string | null
  postalCode: string | null
  idNumber: string | null
  dateOfBirth: Date | null
}

const SA_PROVINCES = [
  'Eastern Cape', 'Free State', 'Gauteng', 'KwaZulu-Natal',
  'Limpopo', 'Mpumalanga', 'Northern Cape', 'North West', 'Western Cape',
]

export default function SettingsPage({
  email,
  profile,
}: {
  email: string
  profile: ProfileData | null
}) {
  const [saving, setSaving] = useState(false)
  const [saved, setSaved] = useState(false)
  const [error, setError] = useState('')

  const [form, setForm] = useState({
    firstName: profile?.firstName ?? '',
    lastName: profile?.lastName ?? '',
    phone: profile?.phone ?? '',
    address: profile?.address ?? '',
    city: profile?.city ?? '',
    province: profile?.province ?? '',
    postalCode: profile?.postalCode ?? '',
  })

  const set = (key: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) =>
    setForm((prev) => ({ ...prev, [key]: e.target.value }))

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault()
    setSaving(true)
    setError('')
    try {
      const res = await fetch('/api/profile', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      if (!res.ok) {
        const data = await res.json()
        setError(data.error ?? 'Failed to save changes.')
      } else {
        setSaved(true)
        setTimeout(() => setSaved(false), 3000)
      }
    } catch {
      setError('An unexpected error occurred.')
    } finally {
      setSaving(false)
    }
  }

  return (
    <div className="max-w-2xl space-y-6">

      {/* Account info (read-only) */}
      <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
        <Card>
          <CardHeader className="pb-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-[#014D4E] flex items-center justify-center shrink-0">
                <User className="w-5 h-5 text-[#C89B3C]" />
              </div>
              <div>
                <CardTitle className="text-base">Account Details</CardTitle>
                <p className="text-xs text-[#6b6b6b] mt-0.5">Your login information managed via Clerk</p>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-3 p-4 bg-[#F7F3EA] rounded-xl">
              <CreditCard className="w-4 h-4 text-[#C89B3C] shrink-0" />
              <div className="min-w-0">
                <p className="text-xs text-[#6b6b6b]">Email address</p>
                <p className="text-sm font-semibold text-[#1C1C1C] truncate">{email}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Personal info form */}
      <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: 0.08 }}>
        <Card>
          <CardHeader className="pb-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-[#014D4E] flex items-center justify-center shrink-0">
                <User className="w-5 h-5 text-[#C89B3C]" />
              </div>
              <div>
                <CardTitle className="text-base">Personal Information</CardTitle>
                <p className="text-xs text-[#6b6b6b] mt-0.5">Update your name and contact details</p>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSave} className="space-y-5">
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="firstName">First Name</Label>
                  <Input id="firstName" value={form.firstName} onChange={set('firstName')} placeholder="Sipho" required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lastName">Last Name</Label>
                  <Input id="lastName" value={form.lastName} onChange={set('lastName')} placeholder="Dlamini" required />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="phone" className="flex items-center gap-1.5">
                  <Phone className="w-3.5 h-3.5 text-[#C89B3C]" /> Phone Number
                </Label>
                <Input id="phone" type="tel" value={form.phone} onChange={set('phone')} placeholder="0821234567" />
              </div>

              {profile?.idNumber && (
                <div className="space-y-2">
                  <Label className="flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5 text-[#C89B3C]" /> SA ID Number
                  </Label>
                  <Input value={profile.idNumber} disabled className="bg-[#F7F3EA] text-[#6b6b6b]" />
                  <p className="text-xs text-[#6b6b6b]">ID number cannot be changed. Contact support if there is an error.</p>
                </div>
              )}

              {/* Address section */}
              <div className="pt-2 border-t border-[#e0d9cc]">
                <div className="flex items-center gap-2 mb-4">
                  <MapPin className="w-4 h-4 text-[#C89B3C]" />
                  <p className="text-sm font-semibold text-[#1C1C1C]">Residential Address</p>
                </div>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="address">Street Address</Label>
                    <Input id="address" value={form.address} onChange={set('address')} placeholder="12 Acacia Street" />
                  </div>
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="city">City / Town</Label>
                      <Input id="city" value={form.city} onChange={set('city')} placeholder="Soweto" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="province">Province</Label>
                      <select
                        id="province"
                        value={form.province}
                        onChange={set('province')}
                        className="flex h-11 w-full rounded-lg border border-input bg-background px-3 py-2 text-sm ring-offset-background focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
                      >
                        <option value="">Select province</option>
                        {SA_PROVINCES.map((p) => (
                          <option key={p} value={p}>{p}</option>
                        ))}
                      </select>
                    </div>
                  </div>
                  <div className="w-full sm:w-1/2">
                    <div className="space-y-2">
                      <Label htmlFor="postalCode">Postal Code</Label>
                      <Input id="postalCode" value={form.postalCode} onChange={set('postalCode')} placeholder="1801" maxLength={4} />
                    </div>
                  </div>
                </div>
              </div>

              {error && (
                <p className="text-sm text-red-600 bg-red-50 border border-red-200 rounded-lg px-4 py-3">{error}</p>
              )}

              <div className="flex items-center gap-3 pt-2">
                <Button type="submit" variant="default" disabled={saving} className="min-w-[140px]">
                  {saving ? 'Saving...' : (
                    <>
                      <Save className="w-4 h-4" />
                      Save Changes
                    </>
                  )}
                </Button>
                {saved && (
                  <motion.div
                    initial={{ opacity: 0, x: -8 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="flex items-center gap-1.5 text-green-700 text-sm font-medium"
                  >
                    <CheckCircle2 className="w-4 h-4" />
                    Changes saved
                  </motion.div>
                )}
              </div>
            </form>
          </CardContent>
        </Card>
      </motion.div>

    </div>
  )
}
