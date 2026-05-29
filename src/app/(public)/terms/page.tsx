import React from 'react'
import { Metadata } from 'next'
import PageHero from '@/components/public/PageHero'
import CTASection from '@/components/public/CTASection'

export const metadata: Metadata = {
  title: 'Terms & Conditions',
  description: 'The terms and conditions governing membership and funeral cover provided by Busizwe Burial Society.',
}

const SECTIONS = [
  {
    title: '1. Definitions',
    body: [
      '"Society" means Busizwe Burial Society, Scheme No. MG0003500, registered and authorised by the FSCA.',
      '"Member" means any person who has applied for and been accepted for funeral cover under a policy issued by the Society.',
      '"Policy" means the funeral cover agreement between the Member and the Society, as set out in the member\'s policy certificate.',
      '"Dependant" means any person registered by the Member under their policy, including spouse, children, and extended family members, as permitted by the chosen plan.',
      '"Premium" means the monthly contribution payable by the Member to maintain the policy in force.',
      '"Waiting Period" means the period from the policy commencement date during which a claim may not be lodged for certain causes of death.',
    ],
  },
  {
    title: '2. Eligibility',
    body: [
      'Membership is open to South African citizens and permanent residents between the ages of 16 and 84 years.',
      'Dependants may be registered from birth. Child cover is available up to age 21, or age 26 if still a full-time student.',
      'Applicants must provide a valid South African ID number. The Society reserves the right to verify all information provided.',
    ],
  },
  {
    title: '3. Policy Commencement & Waiting Periods',
    body: [
      'Cover commences on the date the first premium is received and the application is approved by the Society.',
      'A waiting period of six (6) months applies to natural causes of death for the main member and all registered dependants.',
      'There is no waiting period for accidental death — cover for accidental death applies from the commencement date.',
      'If a member lapses and re-joins, waiting periods may recommence at the Society\'s discretion.',
    ],
  },
  {
    title: '4. Premiums',
    body: [
      'Premiums are due monthly in advance. Failure to pay a premium within 30 days of the due date may result in the policy lapsing.',
      'The Society reserves the right to review premiums annually. Members will be given 30 days\' written notice of any premium change.',
      'Premiums are non-refundable except where required by law. No payment will be made if the policy has lapsed at the time of a claim.',
    ],
  },
  {
    title: '5. Cover Benefits',
    body: [
      'The funeral cover amount payable on a valid claim is as specified on the member\'s policy certificate and determined by the plan selected at the time of application.',
      'Cover amounts range from R5,000 to R50,000 depending on the selected plan. Extended family benefit amounts are plan-specific.',
      'The Society will not be liable for any claim amount exceeding the sum insured specified in the policy certificate.',
    ],
  },
  {
    title: '6. Claiming',
    body: [
      'Claims must be submitted within 90 days of the date of death. Late claims may be rejected at the Society\'s discretion.',
      'The following documents are required to process a claim:\n• Certified copy of the deceased\'s death certificate\n• Certified copy of the main member\'s South African ID\n• Certified copy of the deceased\'s ID (if different from main member)\n• Proof of relationship (e.g. marriage certificate, birth certificate) where applicable\n• Bank account details of the nominated beneficiary\n• Completed claim form',
      'Claims will be processed within 48 hours of receipt of all required documentation. Payment will be made to the nominated beneficiary\'s bank account.',
    ],
  },
  {
    title: '7. Exclusions',
    body: [
      'The Society will not pay a claim arising from:',
      '• Death during the applicable waiting period (natural causes only)\n• Suicide within the first 24 months of the policy\n• Death resulting from participation in an unlawful act\n• Death resulting from war, invasion, or civil war\n• Claims submitted after the 90-day claim period without approved extension',
    ],
  },
  {
    title: '8. Lapsing and Reinstatement',
    body: [
      'A policy will lapse if premiums are unpaid for 30 consecutive days. The Society will send a written notice before lapsing a policy.',
      'A lapsed policy may be reinstated within 90 days of lapsing by paying all outstanding premiums. Reinstated policies may be subject to new waiting periods.',
      'The Society is not liable for any claims arising during the lapse period.',
    ],
  },
  {
    title: '9. Cancellation',
    body: [
      'A member may cancel their policy at any time by providing written notice to the Society. Cancellation takes effect at the end of the current premium period.',
      'The Society may cancel a policy in the event of fraudulent misrepresentation, non-payment of premiums, or breach of these terms.',
      'No premium refund will be made upon cancellation unless required by applicable law.',
    ],
  },
  {
    title: '10. Changes to Terms',
    body: [
      'The Society reserves the right to amend these Terms and Conditions at any time. Members will be given 30 days\' written notice of any material changes. Continued membership after the effective date of changes constitutes acceptance.',
    ],
  },
  {
    title: '11. Complaints & Dispute Resolution',
    body: [
      'Members who are dissatisfied with any decision of the Society are entitled to lodge a formal complaint in writing to busizwebs@gmail.com.',
      'If a complaint cannot be resolved internally within 30 days, members may escalate to the FSCA or the Ombudsman for Long-term Insurance:',
      'FSCA: www.fsca.co.za | 0800 20 37 22\nOmbudsman for Long-term Insurance: 0860 103 236',
    ],
  },
  {
    title: '12. Governing Law',
    body: [
      'These Terms and Conditions are governed by the laws of the Republic of South Africa. Any disputes arising from this agreement shall be subject to the jurisdiction of the South African courts.',
    ],
  },
]

export default function TermsPage() {
  return (
    <>
      <PageHero
        eyebrow="Legal"
        title="Terms & Conditions"
        subtitle="The terms governing your membership and funeral cover with Busizwe Burial Society."
      />

      <section className="py-24 bg-[#F9FAFB]">
        <div className="max-w-3xl mx-auto px-6 sm:px-8 lg:px-12">
          <div className="space-y-10">
            {SECTIONS.map((section) => (
              <div key={section.title}>
                <h2 className="font-serif font-semibold text-[#014D4E] text-xl mb-4">
                  {section.title}
                </h2>
                <div className="space-y-3">
                  {section.body.map((paragraph, i) => (
                    <p key={i} className="text-[#374151] text-sm leading-relaxed whitespace-pre-line">
                      {paragraph}
                    </p>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <div className="mt-14 p-6 bg-white border border-[#E5E7EB] rounded-2xl">
            <p className="text-xs text-[#6B7280] leading-relaxed">
              <span className="font-semibold text-[#014D4E]">Busizwe Burial Society</span> — Scheme No. MG0003500 | FSCA Authorised |
              52 Wembley Road, Kenville, Durban, 4051 | busizwebs@gmail.com | 061 463 1973
            </p>
          </div>
        </div>
      </section>

      <CTASection />
    </>
  )
}
