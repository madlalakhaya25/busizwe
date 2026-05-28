import React from 'react'
import { Metadata } from 'next'
import CTASection from '@/components/public/CTASection'
import { Shield, Heart, Users, CheckCircle2, Award, Clock } from 'lucide-react'

export const metadata: Metadata = {
  title: 'About Us',
  description: 'Learn about Busizwe Burial Society – our mission, values, and commitment to South African families.',
}

const TEAM_VALUES = [
  { icon: Shield, title: 'FSCA Authorised', description: 'Fully registered and authorised by the Financial Sector Conduct Authority.' },
  { icon: Heart, title: 'Family Focused', description: 'Every decision we make is guided by what is best for our members and their families.' },
  { icon: Users, title: 'Community Rooted', description: 'We are built from and for South African communities, with Ubuntu at our core.' },
  { icon: Award, title: 'Excellence', description: 'We hold ourselves to the highest standards of service, transparency, and integrity.' },
  { icon: Clock, title: 'Fast Claims', description: '48-hour claims processing so families can focus on saying goodbye, not paperwork.' },
  { icon: CheckCircle2, title: 'No Exclusions', description: 'No medical examinations. Open to all South Africans aged 16 to 84.' },
]

export default function AboutPage() {
  return (
    <>
      {/* Hero */}
      <section className="bg-[#014D4E] pt-32 pb-20 relative overflow-hidden">
        <div
          className="absolute inset-0 opacity-5 pointer-events-none"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23C89B3C' fill-rule='evenodd'%3E%3Cpath d='M0 40L40 0H20L0 20M40 40V20L20 40'/%3E%3C/g%3E%3C/svg%3E")`,
          }}
        />
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="inline-block text-xs font-semibold text-[#C89B3C] uppercase tracking-widest mb-4 border border-[#C89B3C]/30 rounded-full px-4 py-1.5">
            About Us
          </span>
          <h1 className="text-5xl font-bold text-white mb-6" style={{ fontFamily: 'Georgia, serif' }}>
            Our Story &amp; Mission
          </h1>
          <p className="text-xl text-white/70 leading-relaxed">
            Busizwe Burial Society was founded to ensure every South African family can afford to give their loved ones the dignified farewell they deserve.
          </p>
        </div>
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 60" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
            <path d="M0,30 C480,60 960,0 1440,30 L1440,60 L0,60 Z" fill="#F7F3EA" />
          </svg>
        </div>
      </section>

      {/* Mission */}
      <section className="py-20 bg-[#F7F3EA]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-3 gap-8 mb-16">
            <div className="lg:col-span-2">
              <h2 className="text-3xl font-bold text-[#014D4E] mb-6" style={{ fontFamily: 'Georgia, serif' }}>
                Who We Are
              </h2>
              <div className="space-y-4 text-[#6b6b6b] leading-relaxed">
                <p>
                  Busizwe Burial Society is a South African burial society dedicated to providing affordable, dignified funeral cover to individuals and families across all provinces. Our name, Busizwe, means &ldquo;we build the nation&rdquo; — a reflection of our deep commitment to strengthening South African communities.
                </p>
                <p>
                  We understand that losing a loved one is one of life&apos;s most difficult experiences. The last thing a grieving family should worry about is how to pay for a dignified funeral. That is why we have designed our products to be accessible, affordable, and straightforward.
                </p>
                <p>
                  Our burial society operates under full compliance with FSCA regulations, ensuring that every member&apos;s policy and contribution is managed with integrity, transparency, and care.
                </p>
              </div>
            </div>
            <div className="bg-white rounded-2xl p-8 border border-[#e0d9cc] shadow-[0_4px_16px_rgba(1,77,78,0.06)]">
              <h3 className="text-xl font-bold text-[#014D4E] mb-6" style={{ fontFamily: 'Georgia, serif' }}>
                Key Facts
              </h3>
              {[
                { label: 'Founded', value: '2024' },
                { label: 'Members', value: '5,000+' },
                { label: 'Provinces Served', value: 'All 9' },
                { label: 'Minimum Premium', value: 'R19.60/month' },
                { label: 'Max Cover', value: 'R10,000' },
                { label: 'Claims Timeline', value: '48 hours' },
              ].map((item) => (
                <div key={item.label} className="flex justify-between items-center py-3 border-b border-[#e0d9cc] last:border-0">
                  <span className="text-sm text-[#6b6b6b]">{item.label}</span>
                  <span className="text-sm font-bold text-[#014D4E]">{item.value}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Values */}
          <h2 className="text-3xl font-bold text-[#014D4E] mb-8 text-center" style={{ fontFamily: 'Georgia, serif' }}>
            Our Values
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {TEAM_VALUES.map((value) => (
              <div key={value.title} className="bg-white rounded-2xl p-6 border border-[#e0d9cc] hover:border-[#C89B3C]/40 hover:shadow-[0_4px_16px_rgba(200,155,60,0.1)] transition-all duration-200">
                <div className="w-12 h-12 rounded-xl bg-[#014D4E] flex items-center justify-center mb-4">
                  <value.icon className="w-6 h-6 text-[#C89B3C]" />
                </div>
                <h3 className="font-bold text-[#014D4E] mb-2">{value.title}</h3>
                <p className="text-sm text-[#6b6b6b] leading-relaxed">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <CTASection />
    </>
  )
}
