'use client'

import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { User, MapPin, Phone, Save, CheckCircle2, Loader2, Mail } from 'lucide-react'
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

function SectionCard({ icon: Icon, title, subtitle, children }: {
  icon: React.ElementType
  title: string
  subtitle?: string
  children: React.ReactNode
}) {
  return (
    <Card>
      <CardHeader className="pb-4">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-[#014D4E] flex items-center justify-center shrink-0">
            <Icon className="w-4 h-4 text-[#C89B3C]" />
          </div>
          <div>
            <CardTitle className="text-base">{title}</CardTitle>
            {subtitle && <p className="text-xs text-[#9a9a9a] mt-0.5">{subtitle}</p>}
          </div>
        </div>
      </CardHeader>
      <CardContent>{children}</CardContent>
    </Card>
  )
}

function InputField({ id, label, hint, ...props }: React.InputHTMLAttributes<HTMLInputElement> & {
  label: string; hint?: string; id: string
}) {
  return (
    <div className="space-y-2">
      <Label htmlFor={id} className="text-sm font-medium text-[#1C1C1C]">{label}</Label>
      <Input id={id} className="h-11" {...props} />
      {hint && <p className="text-xs text-[#9a9a9a]">{hint}</p>}
    </div>
  )
}

export default function SettingsPage({ email, profile }: { email: string; profile: ProfileData | null }) {
  const [saving, setSaving] = useState(false)
  const [saved,  setSaved]  = useState(false)
  const [error,  setError]  = useState('')

  const [form, setForm] = useState({
    firstName:  profile?.firstName  ?? '',
    lastName:   profile?.lastName   ?? '',
    phone:      profile?.phone      ?? '',
    address:    profile?.address    ?? '',
    city:       profile?.city       ?? '',
    province:   profile?.province   ?? '',
    postalCode: profile?.postalCode ?? '',
  })

  const set = (key: keyof typeof form) => (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => setForm((prev) => ({ ...prev, [key]: e.target.value }))

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
        setTimeout(() => setSaved(false), 3500)
      }
    } catch {
      setError('An unexpected error occurred.')
    } finally {
      setSaving(false)
    }
  }

  return (
    <div className="max-w-2xl space-y-5">

      {/* Account info (read-only) */}
      <motion.div initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.35 }}>
        <SectionCard icon={Mail} title="Account" subtitle="Your login credentials are managed securely via Clerk">
          <div className="flex items-center gap-3 p-4 bg-[#F9FAFB] rounded-xl">
            <div className="w-9 h-9 rounded-xl bg-[#014D4E]/10 flex items-center justify-center shrink-0">
              <Mail className="w-4 h-4 text-[#014D4E]" />
            </div>
            <div className="min-w-0">
              <p className="text-[10px] text-[#9a9a9a] uppercase tracking-wide font-semibold">Email address</p>
              <p className="text-sm font-semibold text-[#1C1C1C] truncate mt-0.5">{email}</p>
            </div>
            <span className="ml-auto text-[10px] font-semibold text-green-600 bg-green-50 px-2 py-0.5 rounded-full border border-green-200 shrink-0">
              Verified
            </span>
          </div>
        </SectionCard>
      </motion.div>

      {/* Personal info form */}
      <motion.div initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.35, delay: 0.08 }}>
        <SectionCard icon={User} title="Personal Information" subtitle="Update your name, phone and address">
          <form onSubmit={handleSave} className="space-y-6">

            {/* Name */}
            <div className="grid sm:grid-cols-2 gap-4">
              <InputField
                id="firstName"
                label="First Name"
                value={form.firstName}
                onChange={set('firstName')}
                placeholder="Sipho"
                required
              />
              <InputField
                id="lastName"
                label="Last Name"
                value={form.lastName}
                onChange={set('lastName')}
                placeholder="Dlamini"
                required
              />
            </div>

            {/* Phone */}
            <div className="grid sm:grid-cols-2 gap-4">
              <InputField
                id="phone"
                label="Phone Number"
                type="tel"
                value={form.phone}
                onChange={set('phone')}
                placeholder="0821234567"
              />
              {profile?.idNumber && (
                <div className="space-y-2">
                  <Label className="text-sm font-medium text-[#1C1C1C]">SA ID Number</Label>
                  <Input
                    value={profile.idNumber}
                    disabled
                    className="h-11 bg-[#F9FAFB] text-[#9a9a9a] font-mono cursor-not-allowed"
                  />
                  <p className="text-xs text-[#9a9a9a]">Contact support to correct your ID.</p>
                </div>
              )}
            </div>

            {/* Address section */}
            <div className="pt-2 border-t border-[#E5E7EB]">
              <div className="flex items-center gap-2 mb-4">
                <MapPin className="w-4 h-4 text-[#C89B3C]" />
                <p className="text-sm font-semibold text-[#1C1C1C]">Residential Address</p>
              </div>
              <div className="space-y-4">
                <InputField
                  id="address"
                  label="Street Address"
                  value={form.address}
                  onChange={set('address')}
                  placeholder="12 Acacia Street"
                />
                <div className="grid sm:grid-cols-2 gap-4">
                  <InputField
                    id="city"
                    label="City / Town"
                    value={form.city}
                    onChange={set('city')}
                    placeholder="Soweto"
                  />
                  <div className="space-y-2">
                    <Label htmlFor="province" className="text-sm font-medium text-[#1C1C1C]">Province</Label>
                    <select
                      id="province"
                      value={form.province}
                      onChange={set('province')}
                      className="flex h-11 w-full rounded-lg border border-input bg-background px-3 py-2 text-sm ring-offset-background focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
                    >
                      <option value="">Select province…</option>
                      {SA_PROVINCES.map((p) => (
                        <option key={p} value={p}>{p}</option>
                      ))}
                    </select>
                  </div>
                </div>
                <div className="sm:max-w-[160px]">
                  <InputField
                    id="postalCode"
                    label="Postal Code"
                    value={form.postalCode}
                    onChange={set('postalCode')}
                    placeholder="1801"
                    maxLength={4}
                  />
                </div>
              </div>
            </div>

            {/* Error */}
            <AnimatePresence>
              {error && (
                <motion.p
                  initial={{ opacity: 0, y: -4 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="text-sm text-red-600 bg-red-50 border border-red-200 rounded-xl px-4 py-3"
                >
                  {error}
                </motion.p>
              )}
            </AnimatePresence>

            {/* Submit */}
            <div className="flex items-center gap-4 pt-1">
              <Button type="submit" variant="default" disabled={saving} className="min-w-[140px] h-11">
                {saving ? (
                  <><Loader2 className="w-4 h-4 animate-spin" /> Saving…</>
                ) : (
                  <><Save className="w-4 h-4" /> Save Changes</>
                )}
              </Button>
              <AnimatePresence>
                {saved && (
                  <motion.div
                    initial={{ opacity: 0, x: -8 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0 }}
                    className="flex items-center gap-1.5 text-green-700 text-sm font-medium"
                  >
                    <CheckCircle2 className="w-4 h-4" /> Profile saved
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </form>
        </SectionCard>
      </motion.div>

      {/* Phone info block */}
      <motion.div initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.35, delay: 0.16 }}>
        <div className="flex items-center gap-3 p-4 bg-[#014D4E] rounded-2xl text-white">
          <Phone className="w-5 h-5 text-[#C89B3C] shrink-0" />
          <div className="min-w-0">
            <p className="text-sm font-semibold">Need help updating your details?</p>
            <p className="text-xs text-white/60 mt-0.5">
              Call us on <span className="text-[#C89B3C] font-semibold">061 463 1973</span> between 08:00 – 17:00 Mon–Fri.
            </p>
          </div>
        </div>
      </motion.div>

    </div>
  )
}
