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
  { icon: Heart, title: 'Family First', description: 'This started because of family. It stays true to that. Every member is someone\'s mother, father, grandchild.' },
  { icon: Users, title: 'Community Built', description: 'Not built in a boardroom. Built by someone who had seen enough families struggle and decided to do something about it.' },
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
        subtitle="Started during retirement. Named after a grandson. Built for every South African family that should never have to worry about the cost of a funeral."
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
                  When she retired, she finally had time to act on something she had seen for years. Families losing someone they love, then turning around to face a funeral bill they could not afford. She started Busizwe to change that.
                </p>
                <p>
                  She named it after her grandson, Busa. In Zulu, <em>busa</em> means to govern or to reign. Busizwe is to govern the nation. She gave a small burial society a big name, and she meant it.
                </p>
                <p>
                  We cover all nine provinces. Premiums from R19.60 a month. No medical exam. Just straightforward cover for South African families who deserve to grieve without the added stress.
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
