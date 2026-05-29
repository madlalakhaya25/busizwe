'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronDown, ArrowRight } from 'lucide-react'
import PageHero from '@/components/public/PageHero'

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
    <div className={`border rounded-xl overflow-hidden transition-colors ${open ? 'border-[#C89B3C]/50 bg-white' : 'border-[#e0d9cc] bg-white'}`}>
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between gap-4 p-5 text-left hover:bg-[#F7F3EA]/60 transition-colors group"
        aria-expanded={open}
      >
        <span className="font-semibold text-[#014D4E]">{q}</span>
        <motion.span animate={{ rotate: open ? 180 : 0 }} transition={{ duration: 0.2 }} className="shrink-0">
          <ChevronDown className={`w-5 h-5 ${open ? 'text-[#C89B3C]' : 'text-[#6b6b6b] group-hover:text-[#C89B3C]'} transition-colors`} />
        </motion.span>
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: 'easeInOut' }}
            className="overflow-hidden"
          >
            <div className="px-5 pb-5 text-[#6b6b6b] leading-relaxed border-t border-[#e0d9cc] pt-4">
              {a}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default function FAQPage() {
  return (
    <>
      <PageHero
        eyebrow="FAQ"
        title="Frequently Asked Questions"
        subtitle="Everything you need to know about Busizwe Burial Society membership, premiums, and claims."
      />

      {/* FAQ sections */}
      <section className="py-24 bg-[#F7F3EA]">
        <div className="max-w-3xl mx-auto px-6 sm:px-8 lg:px-12 space-y-14">
          {FAQS.map((section) => (
            <div key={section.category}>
              <h2 className="font-serif font-semibold text-2xl text-[#014D4E] mb-6 pb-3 border-b-2 border-[#C89B3C]/30">
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
          <div className="bg-[#014D4E] rounded-3xl p-10 text-center relative overflow-hidden">
            <div className="absolute -top-16 -right-16 w-48 h-48 rounded-full bg-[#C89B3C]/10 blur-2xl pointer-events-none" />
            <h3 className="font-serif font-semibold text-2xl text-white mb-3 relative">
              Still Have Questions?
            </h3>
            <p className="text-white/70 mb-7 relative max-w-md mx-auto">
              Our team is ready to help you find the right cover for your family.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center relative">
              <Link
                href="/contact"
                className="flex items-center justify-center h-14 px-10 rounded-xl text-base font-semibold bg-[#C89B3C] text-white hover:bg-[#A8832A] shadow-md hover:shadow-lg transition-all duration-200 gap-2 w-full sm:w-auto"
              >
                Contact Us <ArrowRight className="w-4 h-4" />
              </Link>
              <a
                href="tel:+27800000000"
                className="flex items-center justify-center h-14 px-10 rounded-xl text-base font-semibold bg-white/10 text-white border border-white/25 hover:bg-white/20 transition-all duration-200 w-full sm:w-auto"
              >
                Call 0800 000 000
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
