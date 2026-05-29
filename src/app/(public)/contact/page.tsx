'use client'

import React, { useState } from 'react'
import { Phone, Mail, MapPin, Clock, Send, CheckCircle2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import PageHero from '@/components/public/PageHero'

const CONTACT_INFO = [
  { icon: Phone, label: 'Phone', value: '061 463 1973 / 076 380 1555', sub: 'Mon–Fri 8am–5pm', href: 'tel:+27614631973' },
  { icon: Mail, label: 'Email', value: 'busizwebs@gmail.com', sub: 'We reply within 24hrs', href: 'mailto:busizwebs@gmail.com' },
  { icon: MapPin, label: 'Address', value: '52 Wembley Road, Kenville', sub: 'Durban, 4051', href: '#' },
  { icon: Clock, label: 'Office Hours', value: 'Mon – Fri: 8am – 5pm', sub: 'Sat: 9am – 1pm', href: '#' },
]

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setLoading(true)
    await new Promise((r) => setTimeout(r, 1200))
    setLoading(false)
    setSubmitted(true)
  }

  return (
    <>
      <PageHero
        eyebrow="Contact"
        title="Get in Touch"
        subtitle="Our team is here to help. Reach out and we will respond within 24 hours."
      />

      {/* Content */}
      <section className="py-24 bg-[#F9FAFB]">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
          <div className="grid lg:grid-cols-3 gap-10 lg:gap-12">
            {/* Contact info */}
            <div className="space-y-5">
              <h2 className="font-serif font-semibold text-2xl sm:text-3xl text-[#014D4E] mb-3">
                Contact Information
              </h2>
              <p className="text-[#6b6b6b] mb-8">
                We are here to help Monday through Friday. Our support team will get back to you as soon as possible.
              </p>
              {CONTACT_INFO.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  className="flex items-start gap-4 p-4 bg-white rounded-xl border border-[#E5E7EB] hover:border-[#C89B3C]/40 hover:shadow-[0_4px_12px_rgba(200,155,60,0.1)] transition-all duration-200 group"
                >
                  <div className="w-10 h-10 rounded-lg bg-[#014D4E] flex items-center justify-center shrink-0">
                    <item.icon className="w-5 h-5 text-[#C89B3C]" />
                  </div>
                  <div>
                    <p className="text-xs text-[#6b6b6b] uppercase tracking-widest mb-0.5">{item.label}</p>
                    <p className="font-semibold text-[#1C1C1C] group-hover:text-[#014D4E] transition-colors">{item.value}</p>
                    <p className="text-xs text-[#6b6b6b]">{item.sub}</p>
                  </div>
                </a>
              ))}
            </div>

            {/* Contact form */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-2xl border border-[#E5E7EB] shadow-sm p-8">
                {submitted ? (
                  <div className="text-center py-12">
                    <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <CheckCircle2 className="w-8 h-8 text-green-600" />
                    </div>
                    <h3 className="font-serif font-semibold text-2xl text-[#014D4E] mb-2">
                      Message Sent
                    </h3>
                    <p className="text-[#6b6b6b] text-sm">
                      Thank you for reaching out. Our team will respond within 24 hours.
                    </p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-5">
                    <h2 className="font-serif font-semibold text-2xl text-[#014D4E] mb-6">
                      Send Us a Message
                    </h2>
                    <div className="grid sm:grid-cols-2 gap-5">
                      <div className="space-y-1.5">
                        <Label htmlFor="firstName">First Name</Label>
                        <Input id="firstName" placeholder="Nomsa" required />
                      </div>
                      <div className="space-y-1.5">
                        <Label htmlFor="lastName">Last Name</Label>
                        <Input id="lastName" placeholder="Dlamini" required />
                      </div>
                    </div>
                    <div className="space-y-1.5">
                      <Label htmlFor="email">Email Address</Label>
                      <Input id="email" type="email" placeholder="nomsa@example.com" required />
                    </div>
                    <div className="space-y-1.5">
                      <Label htmlFor="phone">Phone Number</Label>
                      <Input id="phone" type="tel" placeholder="0821234567" />
                    </div>
                    <div className="space-y-1.5">
                      <Label htmlFor="subject">Subject</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Select a topic" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="membership">New Membership Enquiry</SelectItem>
                          <SelectItem value="policy">Policy Questions</SelectItem>
                          <SelectItem value="claims">Claims Assistance</SelectItem>
                          <SelectItem value="payments">Payment Issues</SelectItem>
                          <SelectItem value="documents">Documents</SelectItem>
                          <SelectItem value="other">Other</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-1.5">
                      <Label htmlFor="message">Message</Label>
                      <Textarea
                        id="message"
                        placeholder="How can we help you?"
                        className="min-h-[120px]"
                        required
                      />
                    </div>
                    <Button variant="default" size="lg" className="w-full" type="submit" disabled={loading}>
                      {loading ? (
                        <span className="flex items-center gap-2">
                          <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                          Sending...
                        </span>
                      ) : (
                        <span className="flex items-center gap-2">
                          <Send className="w-4 h-4" />
                          Send Message
                        </span>
                      )}
                    </Button>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Banking details */}
      <section className="py-16 bg-[#014D4E]">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
          <div className="max-w-3xl mx-auto">
            <p className="text-xs font-semibold text-[#C89B3C] uppercase tracking-widest mb-3 text-center">EFT / Bank Transfer</p>
            <h2 className="font-serif font-semibold text-white text-2xl sm:text-3xl text-center mb-10">Banking Details</h2>
            <div className="bg-white/[0.07] border border-white/10 rounded-2xl p-7 grid sm:grid-cols-2 gap-x-12 gap-y-4">
              {[
                ['Bank',         'Capitec Bank'],
                ['Account Name', 'Busizwe Burial Society'],
                ['Account No',   '2542026544'],
                ['Branch Code',  '470010'],
                ['Account Type', 'Entrepreneur'],
              ].map(([label, value]) => (
                <div key={label} className="flex justify-between items-center border-b border-white/10 pb-4 last:border-0 last:pb-0 sm:last:border-b sm:last:pb-4 sm:[&:nth-last-child(2)]:border-0 sm:[&:nth-last-child(2)]:pb-0">
                  <span className="text-white/50 text-sm">{label}</span>
                  <span className="text-white font-semibold font-mono text-sm">{value}</span>
                </div>
              ))}
            </div>
            <p className="text-white/50 text-sm text-center mt-6">
              Use your <span className="text-[#C89B3C] font-semibold">policy number</span> as the payment reference when making an EFT.
            </p>
          </div>
        </div>
      </section>
    </>
  )
}
