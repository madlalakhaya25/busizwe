'use client'

import React, { useState } from 'react'
import { Phone, Mail, MapPin, Clock, Send, CheckCircle2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'

const CONTACT_INFO = [
  { icon: Phone, label: 'Phone', value: '0800 000 000', sub: 'Mon–Fri 8am–5pm', href: 'tel:+27800000000' },
  { icon: Mail, label: 'Email', value: 'info@busizwe.co.za', sub: 'We reply within 24hrs', href: 'mailto:info@busizwe.co.za' },
  { icon: MapPin, label: 'Address', value: '123 Main Street, Johannesburg', sub: 'Gauteng, 2000', href: '#' },
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
      {/* Hero */}
      <section className="bg-[#014D4E] pt-32 pb-20 relative overflow-hidden">
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="inline-block text-xs font-semibold text-[#C89B3C] uppercase tracking-widest mb-4 border border-[#C89B3C]/30 rounded-full px-4 py-1.5">
            Contact
          </span>
          <h1 className="text-5xl font-bold text-white mb-6" style={{ fontFamily: 'Georgia, serif' }}>
            Get in Touch
          </h1>
          <p className="text-xl text-white/70">
            Our team is here to help. Reach out and we will respond within 24 hours.
          </p>
        </div>
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 60" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
            <path d="M0,30 C480,60 960,0 1440,30 L1440,60 L0,60 Z" fill="#F7F3EA" />
          </svg>
        </div>
      </section>

      {/* Content */}
      <section className="py-16 bg-[#F7F3EA]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-3 gap-10">
            {/* Contact info */}
            <div className="space-y-5">
              <h2 className="text-2xl font-bold text-[#014D4E] mb-2" style={{ fontFamily: 'Georgia, serif' }}>
                Contact Information
              </h2>
              <p className="text-[#6b6b6b] text-sm mb-6">
                We are here to help Monday through Friday. Our support team will get back to you as soon as possible.
              </p>
              {CONTACT_INFO.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  className="flex items-start gap-4 p-4 bg-white rounded-xl border border-[#e0d9cc] hover:border-[#C89B3C]/40 hover:shadow-[0_4px_12px_rgba(200,155,60,0.1)] transition-all duration-200 group"
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
              <div className="bg-white rounded-2xl border border-[#e0d9cc] shadow-[0_4px_24px_rgba(1,77,78,0.08)] p-8">
                {submitted ? (
                  <div className="text-center py-12">
                    <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <CheckCircle2 className="w-8 h-8 text-green-600" />
                    </div>
                    <h3 className="text-xl font-bold text-[#014D4E] mb-2" style={{ fontFamily: 'Georgia, serif' }}>
                      Message Sent!
                    </h3>
                    <p className="text-[#6b6b6b] text-sm">
                      Thank you for reaching out. Our team will respond within 24 hours.
                    </p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-5">
                    <h2 className="text-xl font-bold text-[#014D4E] mb-6" style={{ fontFamily: 'Georgia, serif' }}>
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
    </>
  )
}
