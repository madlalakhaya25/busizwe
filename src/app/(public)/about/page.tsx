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
        subtitle="A retirement idea turned into a legacy. Named after her grandson Busa, this society exists so that no family has to face the cost of a funeral alone."
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
                  Busizwe started as an idea during retirement. With more time to sit and think, our founder began turning over something that had troubled her for years — families in our communities left scrambling to cover funeral costs at the very moment they should be grieving. She decided to do something about it.
                </p>
                <p>
                  She named the society after her grandson, Busa. Busizwe means <em>we build the nation</em>, and in giving it his name, she was building something she hopes will look after families like his for a long time to come.
                </p>
                <p>
                  We are not a large corporation. We are a small, community-rooted burial society based in Durban. We keep premiums low, the process simple, and our people easy to reach — because that is exactly what we would want for our own family.
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
