import React from 'react'
import { Metadata } from 'next'
import PageHero from '@/components/public/PageHero'
import CTASection from '@/components/public/CTASection'

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description: 'How Busizwe Burial Society collects, uses, and protects your personal information in accordance with POPIA.',
}

const SECTIONS = [
  {
    title: '1. Introduction',
    body: [
      'Busizwe Burial Society ("we", "us", "our") is committed to protecting your privacy and the personal information you share with us. This Privacy Policy explains how we collect, use, store, and protect your personal information in accordance with the Protection of Personal Information Act, No. 4 of 2013 ("POPIA") and all applicable South African law.',
      'By using our services, website, or mobile application, you agree to the collection and use of information as described in this policy.',
    ],
  },
  {
    title: '2. Who We Are',
    body: [
      'Busizwe Burial Society is a registered burial society operating under Scheme No. MG0003500, authorised by the Financial Sector Conduct Authority (FSCA). Our registered address is 52 Wembley Road, Kenville, Durban, 4051.',
      'For all privacy-related queries, contact our Information Officer at busizwebs@gmail.com or 061 463 1973.',
    ],
  },
  {
    title: '3. Personal Information We Collect',
    body: [
      'We collect personal information that you provide directly to us when you apply for cover, register on our platform, or contact us. This includes:',
      '• Full name, date of birth, and South African ID number\n• Contact details (phone number, email address, residential address)\n• Banking details for premium debit orders\n• Details of dependants listed on your policy\n• Employment information where relevant to your application\n• Claims-related documentation, including death certificates',
      'We may also collect information automatically when you use our website, including IP address, browser type, pages visited, and session duration.',
    ],
  },
  {
    title: '4. Why We Collect Your Information',
    body: [
      'We process your personal information for the following lawful purposes:',
      '• To assess and process your application for funeral cover\n• To administer your policy and collect premiums\n• To process and pay valid claims\n• To communicate important policy and account information\n• To comply with our legal and regulatory obligations under FSCA, SARS, and relevant legislation\n• To prevent fraud and verify your identity\n• To improve our services and website experience',
    ],
  },
  {
    title: '5. Legal Basis for Processing',
    body: [
      'We process your personal information on one or more of the following lawful grounds under POPIA:',
      '• Performance of a contract — to fulfil your funeral cover policy\n• Legal obligation — compliance with FSCA, FICA, and SARS requirements\n• Legitimate interest — fraud prevention, security, and service improvement\n• Your consent — where you have expressly agreed, for example to receive marketing communications',
    ],
  },
  {
    title: '6. Sharing of Personal Information',
    body: [
      'We do not sell, rent, or trade your personal information. We may share it only with:',
      '• Underwriters and reinsurers involved in providing your cover\n• Payment processors and banking institutions for premium collection\n• Regulatory authorities (FSCA, SARS, South African Police Service) where required by law\n• Service providers who assist us in operating our platform, under strict confidentiality agreements\n• Funeral parlours and service providers where required to fulfil a claim',
      'All third parties who receive your information are required to handle it in accordance with POPIA and our data sharing agreements.',
    ],
  },
  {
    title: '7. Storage and Security',
    body: [
      'Your personal information is stored securely on servers within South Africa. We implement appropriate technical and organisational measures to protect your information against unauthorised access, loss, misuse, or alteration.',
      'These measures include encrypted data transmission (HTTPS/TLS), restricted staff access on a need-to-know basis, regular security assessments, and secure data backup procedures.',
      'Notwithstanding these measures, no method of electronic storage or transmission is completely secure. In the event of a data breach that poses a risk to your rights, we will notify you and the Information Regulator as required by POPIA.',
    ],
  },
  {
    title: '8. Retention of Information',
    body: [
      'We retain your personal information for as long as is necessary to fulfil the purposes for which it was collected, to administer your policy, and to comply with legal obligations.',
      'Policy records are generally retained for a minimum of five (5) years after the policy ends, in accordance with FSCA guidance and the Financial Intelligence Centre Act (FICA).',
    ],
  },
  {
    title: '9. Your Rights Under POPIA',
    body: [
      'As a data subject under POPIA, you have the following rights:',
      '• The right to be notified that your information is being collected\n• The right to access the personal information we hold about you\n• The right to request correction of inaccurate or outdated information\n• The right to request deletion of your information where it is no longer required\n• The right to object to the processing of your information\n• The right to submit a complaint to the Information Regulator',
      'To exercise any of these rights, contact us at busizwebs@gmail.com. We will respond within 30 days of receiving your request.',
    ],
  },
  {
    title: '10. Cookies and Online Tracking',
    body: [
      'Our website uses cookies and similar tracking technologies to improve your browsing experience, analyse website traffic, and remember your preferences. You may disable cookies through your browser settings; however, some features of our website may not function correctly without them.',
    ],
  },
  {
    title: '11. Children\'s Privacy',
    body: [
      'Our services are not directed at children under the age of 18. We do not knowingly collect personal information directly from minors. Dependants under 18 may be added to an adult member\'s policy, in which case the adult member is responsible for ensuring that consent is given on their behalf.',
    ],
  },
  {
    title: '12. Changes to This Policy',
    body: [
      'We may update this Privacy Policy from time to time to reflect changes in law or our practices. We will notify you of any material changes by posting the updated policy on our website and, where appropriate, by email. Continued use of our services after such changes constitutes your acceptance of the updated policy.',
      'This policy was last updated in 2026.',
    ],
  },
  {
    title: '13. Contact & Complaints',
    body: [
      'For questions or concerns about this policy or how we handle your personal information, contact our Information Officer:',
      'Email: busizwebs@gmail.com\nPhone: 061 463 1973\nAddress: 52 Wembley Road, Kenville, Durban, 4051',
      'If you are not satisfied with our response, you may lodge a complaint with the Information Regulator of South Africa:\nWebsite: www.justice.gov.za/inforeg\nEmail: inforeg@justice.gov.za',
    ],
  },
]

export default function PrivacyPolicyPage() {
  return (
    <>
      <PageHero
        eyebrow="Legal"
        title="Privacy Policy"
        subtitle="How we collect, use, and protect your personal information in accordance with POPIA."
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
