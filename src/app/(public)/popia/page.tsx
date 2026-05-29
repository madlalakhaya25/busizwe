import React from 'react'
import { Metadata } from 'next'
import PageHero from '@/components/public/PageHero'
import CTASection from '@/components/public/CTASection'

export const metadata: Metadata = {
  title: 'POPIA Compliance',
  description: 'Busizwe Burial Society\'s POPIA compliance notice — your rights under the Protection of Personal Information Act.',
}

const SECTIONS = [
  {
    title: '1. What Is POPIA?',
    body: [
      'The Protection of Personal Information Act, No. 4 of 2013 ("POPIA") is South Africa\'s principal data protection legislation. It came into full effect on 1 July 2021.',
      'POPIA regulates the manner in which organisations may collect, process, store, and share personal information. It gives individuals — called "data subjects" — rights over their own personal information and places obligations on organisations — called "responsible parties" — that handle such information.',
    ],
  },
  {
    title: '2. Our Role as Responsible Party',
    body: [
      'Busizwe Burial Society (Scheme No. MG0003500) is a Responsible Party under POPIA. This means we determine the purpose and means of processing your personal information when you apply for cover, make a claim, or otherwise interact with us.',
      'We have appointed an Information Officer who is responsible for ensuring our compliance with POPIA and who serves as your primary point of contact for any data-related requests.',
      'Information Officer Contact:\nEmail: busizwebs@gmail.com\nPhone: 061 463 1973\nAddress: 52 Wembley Road, Kenville, Durban, 4051',
    ],
  },
  {
    title: '3. The Eight Conditions for Lawful Processing',
    body: [
      'Under POPIA, we are required to process personal information in accordance with eight conditions. Here is how we apply each one:',
      '1. Accountability — We take responsibility for all personal information in our possession and have implemented appropriate policies and controls.\n\n2. Processing Limitation — We collect only the personal information that is necessary for the specific purpose of providing you with funeral cover and administering your policy.\n\n3. Purpose Specification — We collect information for clearly defined, lawful purposes: policy administration, claims processing, legal compliance, and fraud prevention.\n\n4. Further Processing Limitation — We will not use your information for any purpose incompatible with the reason it was originally collected.\n\n5. Information Quality — We take reasonable steps to ensure the personal information we hold is accurate, complete, and up to date. You may request corrections at any time.\n\n6. Openness — We inform you of what information we collect and how it is used through this notice and our Privacy Policy.\n\n7. Security Safeguards — We implement reasonable technical and organisational measures to protect your information against loss, damage, or unauthorised access.\n\n8. Data Subject Participation — You have the right to access, correct, or request deletion of your personal information at any time.',
    ],
  },
  {
    title: '4. Your Rights as a Data Subject',
    body: [
      'POPIA grants you the following rights:',
      '• Right to be notified — You must be informed when your personal information is being collected and for what purpose.\n\n• Right of access — You may request a description of the personal information we hold about you and how it has been used.\n\n• Right to correction or deletion — If your information is inaccurate, outdated, or no longer necessary, you may request that it be corrected or deleted.\n\n• Right to object — You may object to the processing of your personal information for direct marketing purposes at any time.\n\n• Right to complain — If you believe your rights under POPIA have been violated, you have the right to lodge a complaint with the Information Regulator.',
    ],
  },
  {
    title: '5. How to Submit a Data Request',
    body: [
      'To exercise any of your rights under POPIA, submit a written request to our Information Officer:',
      'Email: busizwebs@gmail.com\nPhone: 061 463 1973',
      'Your request must include your full name, contact details, and a clear description of the information or right you are enquiring about. We will respond within 30 days.',
      'There is no charge for submitting a data request. However, the Society may charge a reasonable fee for reproducing or transmitting information where this incurs cost.',
    ],
  },
  {
    title: '6. Direct Marketing',
    body: [
      'We may, from time to time, contact you with information about our products and services. You have the right to opt out of receiving marketing communications at any time by contacting us at busizwebs@gmail.com or by clicking the unsubscribe link in any email we send you.',
      'We will never sell your personal information to third parties for marketing purposes.',
    ],
  },
  {
    title: '7. Transborder Information Flows',
    body: [
      'Your personal information is primarily stored and processed within the Republic of South Africa. In the limited event that any information is transferred to a third party outside of South Africa, we will ensure that the receiving party is subject to laws substantially similar to POPIA, or that they have agreed in writing to comply with equivalent data protection standards.',
    ],
  },
  {
    title: '8. Data Breach Notification',
    body: [
      'In the event of a security compromise that involves your personal information and that poses a risk to your rights and freedoms, we will notify you and the Information Regulator as soon as reasonably possible, as required by Section 22 of POPIA.',
      'Notifications will be sent to the email address registered on your account and/or via SMS where applicable.',
    ],
  },
  {
    title: '9. Complaints to the Information Regulator',
    body: [
      'If you are not satisfied with how we have handled your personal information or your data request, you have the right to lodge a complaint directly with the Information Regulator of South Africa:',
      'Website: www.justice.gov.za/inforeg\nEmail: inforeg@justice.gov.za\nPostal Address: JD House, 27 Stiemens Street, Braamfontein, Johannesburg, 2001',
    ],
  },
  {
    title: '10. Updates to This Notice',
    body: [
      'We may update this POPIA Compliance Notice periodically to reflect changes in the law or our practices. The current version will always be available on our website. This notice was last updated in 2026.',
    ],
  },
]

export default function POPIAPage() {
  return (
    <>
      <PageHero
        eyebrow="Legal"
        title="POPIA Compliance"
        subtitle="Your rights under the Protection of Personal Information Act and how Busizwe Burial Society protects your data."
      />

      <section className="py-24 bg-[#F9FAFB]">
        <div className="max-w-3xl mx-auto px-6 sm:px-8 lg:px-12">

          {/* Highlight box */}
          <div className="mb-12 p-6 bg-[#014D4E] rounded-2xl text-white">
            <p className="text-sm font-semibold mb-1">POPIA Compliance Notice</p>
            <p className="text-sm text-white/70 leading-relaxed">
              This notice is issued in terms of Section 18 of the Protection of Personal Information Act, No. 4 of 2013.
              It describes how Busizwe Burial Society collects, uses, and protects your personal information, and explains your rights as a data subject.
            </p>
          </div>

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
