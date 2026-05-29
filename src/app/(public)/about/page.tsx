import React from 'react'
import { Metadata } from 'next'
import CTASection from '@/components/public/CTASection'
import PageHero from '@/components/public/PageHero'
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
      <PageHero
        eyebrow="About Us"
        title="Our Story & Mission"
        subtitle="Busizwe Burial Society was founded to ensure every South African family can afford to give their loved ones the dignified farewell they deserve."
      />

      {/* Mission */}
      <section className="py-24 bg-[#F9FAFB]">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">

          {/* Centred section intro */}
          <div className="text-center max-w-2xl mx-auto mb-14">
            <p className="text-xs font-semibold text-[#C89B3C] uppercase tracking-widest mb-3">Our Foundation</p>
            <h2 className="font-serif font-semibold text-[#014D4E] text-3xl sm:text-4xl leading-tight">
              Who We Are
            </h2>
          </div>

          <div className="grid lg:grid-cols-3 gap-8 lg:gap-12 mb-20">
            <div className="lg:col-span-2">
              <div className="space-y-5 text-[#6B7280] text-lg leading-relaxed">
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
            <div className="bg-white rounded-2xl p-8 border border-[#E5E7EB] shadow-sm">
              <h3 className="font-serif font-semibold text-xl text-[#014D4E] mb-6">
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
                <div key={item.label} className="flex justify-between items-center py-3 border-b border-[#E5E7EB] last:border-0">
                  <span className="text-sm text-[#6B7280]">{item.label}</span>
                  <span className="text-sm font-bold text-[#014D4E]">{item.value}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Values */}
          <div className="text-center max-w-2xl mx-auto mb-12">
            <p className="text-xs font-semibold text-[#C89B3C] uppercase tracking-widest mb-3">What Guides Us</p>
            <h2 className="font-serif font-semibold text-[#014D4E] text-3xl sm:text-4xl leading-tight">
              Our Values
            </h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {TEAM_VALUES.map((value) => (
              <div key={value.title} className="bg-white rounded-2xl p-7 border border-[#E5E7EB] hover:border-[#C89B3C]/40 hover:-translate-y-1 hover:shadow-md transition-all duration-200">
                <div className="w-12 h-12 rounded-2xl bg-[#014D4E] flex items-center justify-center mb-5">
                  <value.icon className="w-6 h-6 text-[#C89B3C]" />
                </div>
                <h3 className="font-serif font-semibold text-lg text-[#014D4E] mb-2">{value.title}</h3>
                <p className="text-sm text-[#6B7280] leading-relaxed">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <CTASection />
    </>
  )
}
