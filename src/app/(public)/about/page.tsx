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
  { icon: Shield, title: 'FSCA Authorised', description: 'We are fully registered and authorised by the Financial Sector Conduct Authority.' },
  { icon: Heart, title: 'Family First', description: 'We started this society because we know what it costs a family when they are not prepared. That drives everything we do.' },
  { icon: Users, title: 'Community Built', description: 'Busizwe grew out of a Durban community. We understand the people we serve because we are part of the same communities.' },
  { icon: Award, title: 'Honest and Simple', description: 'No hidden fees. No confusing terms. What you see on your policy is what you get.' },
  { icon: Clock, title: 'Fast Claims', description: 'Claims are processed within 48 hours. Families should not be waiting on paperwork.' },
  { icon: CheckCircle2, title: 'Open to All', description: 'No medical exam needed. Anyone aged 16 to 84 can join, regardless of health history.' },
]

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="About Us"
        title="Our Story & Mission"
        subtitle="We started in Durban to make sure no South African family faces a funeral they cannot afford. Over 100 members trust us to be there when it matters most."
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
                  Busizwe means <em>we build the nation</em>. That is not just a name. It is the reason this burial society exists. We were started to make sure that when a family loses someone, the cost of a funeral does not become another burden on top of the grief.
                </p>
                <p>
                  We are based in Durban and serve members across all nine provinces. Our cover starts at R19.60 a month and there are no medical examinations required. If you are between 16 and 84 years old, you qualify.
                </p>
                <p>
                  We are fully registered and authorised by the FSCA. When a claim is submitted, we process it within 48 hours so families can focus on what matters.
                </p>
              </div>
            </div>
            <div className="bg-white rounded-2xl p-8 border border-[#E5E7EB] shadow-sm">
              <h3 className="font-serif font-semibold text-xl text-[#014D4E] mb-6">
                Key Facts
              </h3>
              {[
                { label: 'Founded', value: '2024' },
                { label: 'Members', value: '100+' },
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
