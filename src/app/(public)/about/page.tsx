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
      <section className="py-24 bg-[#F7F3EA]">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
          <div className="grid lg:grid-cols-3 gap-8 lg:gap-12 mb-20">
            <div className="lg:col-span-2">
              <h2 className="font-serif font-semibold text-3xl sm:text-4xl text-[#014D4E] mb-6">
                Who We Are
              </h2>
              <div className="space-y-5 text-[#6b6b6b] text-lg leading-relaxed">
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
            <div className="bg-white rounded-2xl p-8 border border-[#e0d9cc] shadow-[0_4px_24px_rgba(1,77,78,0.08)]">
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
                <div key={item.label} className="flex justify-between items-center py-3 border-b border-[#e0d9cc] last:border-0">
                  <span className="text-sm text-[#6b6b6b]">{item.label}</span>
                  <span className="text-sm font-bold text-[#014D4E]">{item.value}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Values */}
          <h2 className="font-serif font-semibold text-3xl sm:text-4xl text-[#014D4E] mb-10 text-center">
            Our Values
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {TEAM_VALUES.map((value) => (
              <div key={value.title} className="bg-white rounded-2xl p-7 border border-[#e0d9cc] hover:border-[#C89B3C]/40 hover:-translate-y-1 hover:shadow-[0_12px_28px_rgba(200,155,60,0.14)] transition-all duration-200">
                <div className="w-12 h-12 rounded-2xl bg-[#014D4E] flex items-center justify-center mb-5">
                  <value.icon className="w-6 h-6 text-[#C89B3C]" />
                </div>
                <h3 className="font-serif font-semibold text-lg text-[#014D4E] mb-2">{value.title}</h3>
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
