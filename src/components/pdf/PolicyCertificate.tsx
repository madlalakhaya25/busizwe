import React from 'react'
import { Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer'
import { formatDate, formatCurrency } from '@/lib/utils'

const styles = StyleSheet.create({
  page: {
    backgroundColor: '#F7F3EA',
    padding: 0,
    fontFamily: 'Helvetica',
  },
  header: {
    backgroundColor: '#014D4E',
    paddingVertical: 36,
    paddingHorizontal: 48,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  headerLeft: {
    flex: 1,
  },
  orgName: {
    fontSize: 22,
    color: '#C89B3C',
    fontFamily: 'Helvetica-Bold',
    letterSpacing: 1,
  },
  orgSub: {
    fontSize: 10,
    color: '#ffffff',
    marginTop: 4,
    letterSpacing: 2,
  },
  headerRight: {
    alignItems: 'flex-end',
  },
  certLabel: {
    fontSize: 9,
    color: '#C89B3C',
    letterSpacing: 2,
    textTransform: 'uppercase',
  },
  certTitle: {
    fontSize: 16,
    color: '#ffffff',
    fontFamily: 'Helvetica-Bold',
    marginTop: 4,
  },
  goldBar: {
    height: 4,
    backgroundColor: '#C89B3C',
  },
  body: {
    padding: 48,
  },
  sectionTitle: {
    fontSize: 9,
    color: '#C89B3C',
    letterSpacing: 2,
    textTransform: 'uppercase',
    marginBottom: 10,
    fontFamily: 'Helvetica-Bold',
  },
  card: {
    backgroundColor: '#ffffff',
    borderRadius: 8,
    padding: 20,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#e0d9cc',
  },
  row: {
    flexDirection: 'row',
    marginBottom: 8,
  },
  rowHalf: {
    flex: 1,
  },
  label: {
    fontSize: 8,
    color: '#6b6b6b',
    marginBottom: 3,
    letterSpacing: 1,
    textTransform: 'uppercase',
  },
  value: {
    fontSize: 12,
    color: '#014D4E',
    fontFamily: 'Helvetica-Bold',
  },
  valueLg: {
    fontSize: 20,
    color: '#C89B3C',
    fontFamily: 'Helvetica-Bold',
  },
  statusBadge: {
    backgroundColor: '#014D4E',
    borderRadius: 20,
    paddingVertical: 4,
    paddingHorizontal: 12,
    alignSelf: 'flex-start',
  },
  statusText: {
    color: '#ffffff',
    fontSize: 9,
    fontFamily: 'Helvetica-Bold',
    letterSpacing: 1,
  },
  divider: {
    height: 1,
    backgroundColor: '#e0d9cc',
    marginVertical: 12,
  },
  depRow: {
    flexDirection: 'row',
    paddingVertical: 6,
    borderBottomWidth: 1,
    borderBottomColor: '#e0d9cc',
  },
  depName: {
    fontSize: 10,
    color: '#1C1C1C',
    flex: 2,
  },
  depRel: {
    fontSize: 10,
    color: '#6b6b6b',
    flex: 1,
  },
  depDob: {
    fontSize: 10,
    color: '#6b6b6b',
    flex: 1,
    textAlign: 'right',
  },
  footer: {
    backgroundColor: '#014D4E',
    padding: 24,
    marginTop: 'auto',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
  },
  footerLeft: {
    flex: 1,
  },
  footerText: {
    color: '#ffffff',
    fontSize: 8,
    opacity: 0.6,
    lineHeight: 1.6,
  },
  footerRight: {
    alignItems: 'flex-end',
  },
  footerNote: {
    color: '#C89B3C',
    fontSize: 8,
    fontFamily: 'Helvetica-Bold',
  },
  seal: {
    width: 64,
    height: 64,
    borderRadius: 32,
    borderWidth: 2,
    borderColor: '#C89B3C',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 8,
  },
  sealText: {
    color: '#C89B3C',
    fontSize: 7,
    fontFamily: 'Helvetica-Bold',
    textAlign: 'center',
  },
  policyNumberBox: {
    backgroundColor: '#014D4E',
    borderRadius: 6,
    padding: 12,
    marginBottom: 16,
  },
  policyNumberLabel: {
    fontSize: 8,
    color: '#C89B3C',
    letterSpacing: 2,
    textTransform: 'uppercase',
    marginBottom: 4,
  },
  policyNumberValue: {
    fontSize: 18,
    color: '#ffffff',
    fontFamily: 'Helvetica-Bold',
    letterSpacing: 2,
  },
})

function capitalize(s: string) {
  return s.charAt(0).toUpperCase() + s.slice(1).toLowerCase()
}

interface Props {
  policy: {
    policyNumber: string
    status: string
    monthlyPremium: unknown
    coverAmount: unknown
    startDate: Date | null
    endDate: Date | null
    createdAt: Date
    approvedAt: Date | null
    product: { name: string; category: string }
    pricingTier: { ageGroup: string }
    dependants: {
      id: string
      firstName: string
      lastName: string
      dateOfBirth: Date
      relationship: string
    }[]
  }
  user: {
    email: string
    profile: {
      firstName: string
      lastName: string
      idNumber: string | null
      phone: string | null
    } | null
  }
}

export function PolicyCertificatePDF({ policy, user }: Props) {
  const fullName = user.profile
    ? `${user.profile.firstName} ${user.profile.lastName}`
    : user.email

  const ageGroupLabel: Record<string, string> = {
    AGE_16_64: '16 – 64 Years',
    AGE_65_75: '65 – 75 Years',
    AGE_75_84: '75 – 84 Years',
  }

  return (
    <Document
      title={`Policy Certificate – ${policy.policyNumber}`}
      author="Busizwe Burial Society"
      subject="Funeral Cover Policy Certificate"
    >
      <Page size="A4" style={styles.page}>
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.headerLeft}>
            <Text style={styles.orgName}>Busizwe</Text>
            <Text style={styles.orgSub}>BURIAL SOCIETY</Text>
          </View>
          <View style={styles.headerRight}>
            <Text style={styles.certLabel}>Official Document</Text>
            <Text style={styles.certTitle}>Policy Certificate</Text>
          </View>
        </View>

        {/* Gold bar */}
        <View style={styles.goldBar} />

        <View style={styles.body}>
          {/* Policy Number */}
          <View style={styles.policyNumberBox}>
            <Text style={styles.policyNumberLabel}>Policy Number</Text>
            <Text style={styles.policyNumberValue}>{policy.policyNumber}</Text>
          </View>

          {/* Policy holder */}
          <Text style={styles.sectionTitle}>Policyholder Details</Text>
          <View style={styles.card}>
            <View style={styles.row}>
              <View style={styles.rowHalf}>
                <Text style={styles.label}>Full Name</Text>
                <Text style={styles.value}>{fullName}</Text>
              </View>
              <View style={styles.rowHalf}>
                <Text style={styles.label}>ID Number</Text>
                <Text style={styles.value}>{user.profile?.idNumber ?? '—'}</Text>
              </View>
            </View>
            <View style={styles.row}>
              <View style={styles.rowHalf}>
                <Text style={styles.label}>Email</Text>
                <Text style={styles.value}>{user.email}</Text>
              </View>
              <View style={styles.rowHalf}>
                <Text style={styles.label}>Phone</Text>
                <Text style={styles.value}>{user.profile?.phone ?? '—'}</Text>
              </View>
            </View>
          </View>

          {/* Policy details */}
          <Text style={styles.sectionTitle}>Policy Details</Text>
          <View style={styles.card}>
            <View style={styles.row}>
              <View style={styles.rowHalf}>
                <Text style={styles.label}>Product</Text>
                <Text style={styles.value}>{policy.product.name}</Text>
              </View>
              <View style={styles.rowHalf}>
                <Text style={styles.label}>Status</Text>
                <View style={[styles.statusBadge, { backgroundColor: policy.status === 'ACTIVE' ? '#014D4E' : '#C89B3C' }]}>
                  <Text style={styles.statusText}>{policy.status}</Text>
                </View>
              </View>
            </View>
            <View style={styles.divider} />
            <View style={styles.row}>
              <View style={styles.rowHalf}>
                <Text style={styles.label}>Cover Amount</Text>
                <Text style={styles.valueLg}>{formatCurrency(Number(policy.coverAmount))}</Text>
              </View>
              <View style={styles.rowHalf}>
                <Text style={styles.label}>Monthly Premium</Text>
                <Text style={styles.valueLg}>{formatCurrency(Number(policy.monthlyPremium))}</Text>
              </View>
            </View>
            <View style={styles.divider} />
            <View style={styles.row}>
              <View style={styles.rowHalf}>
                <Text style={styles.label}>Age Group</Text>
                <Text style={styles.value}>{ageGroupLabel[policy.pricingTier.ageGroup] ?? policy.pricingTier.ageGroup}</Text>
              </View>
              <View style={styles.rowHalf}>
                <Text style={styles.label}>Policy Start Date</Text>
                <Text style={styles.value}>{formatDate(policy.startDate)}</Text>
              </View>
            </View>
            <View style={styles.row}>
              <View style={styles.rowHalf}>
                <Text style={styles.label}>Date Issued</Text>
                <Text style={styles.value}>{formatDate(policy.createdAt)}</Text>
              </View>
              <View style={styles.rowHalf}>
                <Text style={styles.label}>Approved On</Text>
                <Text style={styles.value}>{formatDate(policy.approvedAt)}</Text>
              </View>
            </View>
          </View>

          {/* Dependants */}
          {policy.dependants.length > 0 && (
            <>
              <Text style={styles.sectionTitle}>Covered Dependants</Text>
              <View style={styles.card}>
                <View style={styles.depRow}>
                  <Text style={[styles.depName, { color: '#6b6b6b', fontSize: 8, textTransform: 'uppercase', letterSpacing: 1 }]}>Name</Text>
                  <Text style={[styles.depRel, { color: '#6b6b6b', fontSize: 8, textTransform: 'uppercase', letterSpacing: 1 }]}>Relationship</Text>
                  <Text style={[styles.depDob, { color: '#6b6b6b', fontSize: 8, textTransform: 'uppercase', letterSpacing: 1 }]}>Date of Birth</Text>
                </View>
                {policy.dependants.map((dep) => (
                  <View key={dep.id} style={styles.depRow}>
                    <Text style={styles.depName}>{dep.firstName} {dep.lastName}</Text>
                    <Text style={styles.depRel}>{capitalize(dep.relationship)}</Text>
                    <Text style={styles.depDob}>{formatDate(dep.dateOfBirth)}</Text>
                  </View>
                ))}
              </View>
            </>
          )}
        </View>

        {/* Footer */}
        <View style={styles.footer}>
          <View style={styles.footerLeft}>
            <Text style={styles.footerText}>
              Busizwe Burial Society | Scheme No. MG0003500 | FSCA Authorised
            </Text>
            <Text style={styles.footerText}>
              52 Wembley Road, Kenville, Durban, 4051 | busizwebs@gmail.com | 061 463 1973
            </Text>
            <Text style={[styles.footerText, { marginTop: 6 }]}>
              This certificate is valid proof of funeral cover. Present this document when lodging a claim.
              This policy is subject to the terms and conditions of Busizwe Burial Society.
            </Text>
          </View>
          <View style={styles.footerRight}>
            <View style={styles.seal}>
              <Text style={styles.sealText}>BBS{'\n'}VERIFIED</Text>
            </View>
            <Text style={[styles.footerNote, { marginTop: 6 }]}>
              Generated {formatDate(new Date())}
            </Text>
          </View>
        </View>
      </Page>
    </Document>
  )
}
