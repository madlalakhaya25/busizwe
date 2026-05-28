'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { ChevronDown, ChevronUp, ArrowRight } from 'lucide-react'
import { Button } from '@/components/ui/button'

const FAQS = [
  {
    category: 'Membership & Eligibility',
    items: [
      {
        q: 'Who can join Busizwe Burial Society?',
        a: 'Any South African resident between the ages of 16 and 84 years old can apply for membership. No medical examination is required.',
      },
      {
        q: 'How do I become a member?',
        a: 'You can register online through our website, complete the application form, upload your required documents (ID and proof of residence), and pay your first monthly premium.',
      },
      {
        q: 'Can I add family members to my policy?',
        a: 'Yes. The Immediate Family plan covers your whole household. You can also add adult dependants through our Adult Dependant Add-On plan.',
      },
      {
        q: 'Is there a waiting period?',
        a: 'There is a standard 3-month waiting period for natural causes of death. Accidental death is covered from the date your policy is activated.',
      },
    ],
  },
  {
    category: 'Premiums & Payments',
    items: [
      {
        q: 'How much does funeral cover cost?',
        a: 'Premiums start from as little as R19.60 per month for a single member with R5,000 cover. Full pricing is available on our Products & Pricing page.',
      },
      {
        q: 'How do I pay my monthly premiums?',
        a: 'You can pay via EFT (electronic funds transfer), debit order, or cash at selected payment outlets. Payment details are provided in your member portal.',
      },
      {
        q: 'What happens if I miss a payment?',
        a: 'If you miss a payment, your policy enters a grace period of 30 days. If the premium is not paid within the grace period, your policy may be suspended. Contact us immediately if you experience payment difficulties.',
      },
      {
        q: 'Can I change my cover amount?',
        a: 'Yes. You may apply to change your cover amount. Changes are subject to approval and may affect your premium. Contact our support team to initiate a change.',
      },
    ],
  },
  {
    category: 'Claims',
    items: [
      {
        q: 'How do I submit a claim?',
        a: 'Log in to your member portal, navigate to your policy, and initiate a claim by uploading the required documents (death certificate, ID of deceased, ID of claimant).',
      },
      {
        q: 'How long does it take to process a claim?',
        a: 'We aim to process all valid claims within 48 hours of receiving all required documentation. Complex claims may take slightly longer.',
      },
      {
        q: 'What documents are needed for a claim?',
        a: 'You will need: the original death certificate, the ID document of the deceased, the ID document of the beneficiary/claimant, and the policy number.',
      },
      {
        q: 'How will the claim payout be made?',
        a: 'Claim payouts are made directly to the registered beneficiary\'s bank account via EFT within 48 hours of claim approval.',
      },
    ],
  },
  {
    category: 'Policy & Documents',
    items: [
      {
        q: 'What documents do I need to apply?',
        a: 'You need a valid South African ID document (green barcoded ID or smart ID card) and a proof of residence not older than 3 months.',
      },
      {
        q: 'How do I update my personal information?',
        a: 'Log in to your member dashboard and navigate to your profile settings. You can update your contact details, address, and other information there.',
      },
      {
        q: 'Can I cancel my policy?',
        a: 'Yes, you may cancel your policy at any time by contacting our support team. There are no cancellation fees. Note that contributions already made are non-refundable.',
      },
    ],
  },
]

function FAQItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false)
  return (
    <div className="border border-[#e0d9cc] rounded-xl overflow-hidden">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between p-5 text-left bg-white hover:bg-[#F7F3EA] transition-colors group"
      >
        <span className="font-medium text-[#014D4E] pr-4">{q}</span>
        {open ? (
          <ChevronUp className="w-5 h-5 text-[#C89B3C] shrink-0" />
        ) : (
          <ChevronDown className="w-5 h-5 text-[#6b6b6b] group-hover:text-[#C89B3C] transition-colors shrink-0" />
        )}
      </button>
      {open && (
        <div className="px-5 pb-5 bg-white text-sm text-[#6b6b6b] leading-relaxed border-t border-[#e0d9cc] pt-4">
          {a}
        </div>
      )}
    </div>
  )
}

export default function FAQPage() {
  return (
    <>
      {/* Hero */}
      <section className="bg-[#014D4E] pt-32 pb-20 relative overflow-hidden">
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="inline-block text-xs font-semibold text-[#C89B3C] uppercase tracking-widest mb-4 border border-[#C89B3C]/30 rounded-full px-4 py-1.5">
            FAQ
          </span>
          <h1 className="text-5xl font-bold text-white mb-6" style={{ fontFamily: 'Georgia, serif' }}>
            Frequently Asked Questions
          </h1>
          <p className="text-xl text-white/70">
            Everything you need to know about Busizwe Burial Society membership, premiums, and claims.
          </p>
        </div>
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 60" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
            <path d="M0,30 C480,60 960,0 1440,30 L1440,60 L0,60 Z" fill="#F7F3EA" />
          </svg>
        </div>
      </section>

      {/* FAQ sections */}
      <section className="py-16 bg-[#F7F3EA]">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          {FAQS.map((section) => (
            <div key={section.category}>
              <h2 className="text-xl font-bold text-[#014D4E] mb-5 pb-3 border-b-2 border-[#C89B3C]/30" style={{ fontFamily: 'Georgia, serif' }}>
                {section.category}
              </h2>
              <div className="space-y-3">
                {section.items.map((item) => (
                  <FAQItem key={item.q} q={item.q} a={item.a} />
                ))}
              </div>
            </div>
          ))}

          {/* Still have questions */}
          <div className="bg-[#014D4E] rounded-2xl p-8 text-center">
            <h3 className="text-xl font-bold text-white mb-3" style={{ fontFamily: 'Georgia, serif' }}>
              Still Have Questions?
            </h3>
            <p className="text-white/70 text-sm mb-6">
              Our team is ready to help you find the right cover for your family.
            </p>
            <div className="flex flex-wrap gap-3 justify-center">
              <Button variant="gold" asChild>
                <Link href="/contact">
                  Contact Us <ArrowRight className="w-4 h-4" />
                </Link>
              </Button>
              <Button className="bg-white/10 text-white border border-white/20 hover:bg-white/20" asChild>
                <a href="tel:+27800000000">Call 0800 000 000</a>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
